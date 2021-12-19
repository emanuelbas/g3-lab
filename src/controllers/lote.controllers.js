const Estudio = require('../models/Estudio');
const Lote = require('../models/Lote')


const encolarEstudio = async (req,res) => {

    let idestudio = req.headers.idestudio;

    Lote.find().sort([['createdAt', 'ascending']]).then(async (lotes) => {
        ultimoLote = lotes[0]
        if (ultimoLote && ultimoLote.cantEstudios < 10){
            // Lo agrego al ultimo lote
            ultimoLote.estudios.push(idestudio)
            ultimoLote.cantEstudios = 1
            await ultimoLote.save()
            return res.status(200).json(ultimoLote);

        } else {
            // Creo un lote nuevo (no existe ningun lote o el ultimo esta completo)

            nuevoLote = new Lote({
                estudios : [idestudio],
                cantEstudios : 1,
                estado : 'creado'
            })
            return "hola"

            nuevoLote.save().then((l)=>{
                console.log(l);
                return res.status(200).json(l);
            })

            
            
        }
    })

    return 'ok'
}

module.exports = {
    encolarEstudio    
}