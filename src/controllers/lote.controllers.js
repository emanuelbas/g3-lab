const Estudio = require('../models/Estudio');
const Lote = require('../models/Lote')


const encolarEstudio = async (req,res) => {

    let idestudio = req.headers.idestudio;
    let estudio = await Estudio.findById(idestudio) 
    Lote.find().sort([['createdAt', 'descending']]).then(async (lotes) => {
        ultimoLote = lotes[0]
        if (ultimoLote && ultimoLote.cantEstudios < 10){
            // Lo agrego al ultimo lote
            ultimoLote.estudios.push(idestudio)
            ultimoLote.cantEstudios++
            await ultimoLote.save()
            estudio.lote = ultimoLote
            await estudio.save()
            return res.status(200).json(ultimoLote);

        } else {
            // Creo un lote nuevo (no existe ningun lote o el ultimo esta completo)

            nuevoLote = new Lote({
                estudios : [idestudio],
                cantEstudios : 1,
                estado : 'creado'
            })


            nuevoLote.save().then(async (l)=>{
                console.log(l);
                estudio.lote = ultimoLote
                await estudio.save()
                return res.status(200).json(l);
            })

            
            
        }
    })

    return 'ok'
}

module.exports = {
    encolarEstudio    
}