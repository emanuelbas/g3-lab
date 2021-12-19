import { EstudioService } from 'src/app/services/estudio.service';

interface State {

    verBotonBajarPresupuesto() : any;
    verBotonSubirComprobanteDePago() : boolean;
    verBotonBajarComprobanteDePago() : boolean;
    verBotonBajarCI() : boolean;
    verBotonSubirCIF() : boolean;
    verBotonBajarCIF() : boolean;
    verBotonSeleccionarTurno() : boolean;
    verTurno() : boolean;
    verBotonMuestraTomada() : boolean;
    verFormExtraccionMuestra() : boolean;
    verFormRetiroMuestra() : boolean;
    verBotonMuestraRealizada() : boolean;
    verContadorDeMuestras() : boolean;
    verBotonMuestraProcesada() : boolean;
    verBotonInciarProcesamiento() : boolean;
    verBotonSubirInterpretacion() : boolean;
    verBotonDescargarInterpretacion() : boolean;
    verBotonEntregado() : boolean;
    verBotonSubirResultado() : boolean;

    siguiente(idEstudio:string, servicio:EstudioService) : any;
    reiniciarEstado(idEstudio:string, servicio:EstudioService) : any;



    
}

class Estudio {

    currentState : any;

    // Este objeto se va a crear con el estado actual leido de la base
    // Según en que estado se encuentre va a responder distinto a los pedidos
    constructor(state?: string) {
        switch(state) {
            case 'Esperando presupuesto':
              console.log("Se crea un estudio con estado Espernado presupuesto")
              this.currentState = new EsperandoPresupuestoState()
              break;
            case "Esperando comprobante de pago":
                console.log("Se crea un estudio con estado Esperando comprobante de pago")
                this.currentState = new EsperandoComprobanteDePagoState()
              break;
              case "Esperando envio de consentimiento informado":
                console.log("Se crea un estudio con estado Esperando comprobante de pago")
                this.currentState = new EsperandoEnviarCIState()
              break;
              case "Esperando carga de consentimiento informado FIRMADO":
                console.log("Se crea un estudio con estado Esperando comprobante de pago")
                this.currentState = new EsperandoCIFState()
              break;
              case "Esperando seleccion de turno":
                console.log("Se crea un estudio con estado Esperando comprobante de pago")
                this.currentState = new EsperandoSeleccionDeTurnotate()
              break;
              case "Esperando toma de muestra":
                console.log("Se crea un estudio con estado Esperando comprobante de pago")
                this.currentState = new EsperandoTomaDeMuestraState()
              break;
              case "Esperando retiro de muestra desde el sector de extracciones":
                console.log("Se crea un estudio con estado Esperando comprobante de pago")
                this.currentState = new EsperandoRertiroDeMuestraState()
              break;
              case "Esperando iniciar procesamiento biotecnologico":
                console.log("Se crea un estudio con estado Esperando comprobante de pago")
                this.currentState = new EsperandoProcesamientoState()
              break;
              case "Esperando resultado de lote":
                console.log("Se crea un estudio con estado Esperando comprobante de pago")
                this.currentState = new EsperandoResultadoState()
              break;
              case "Esperando interpretacion de resultado e informe":
                console.log("Se crea un estudio con estado Esperando comprobante de pago")
                this.currentState = new EsperandoInterpretacionState()
              break;
              case "Esperando ser entregado a medico derivante":
                console.log("Se crea un estudio con estado Esperando comprobante de pago")
                this.currentState = new EsperandoEnvioAMedicoState()
              break;
              case "Entregado":
                console.log("Se crea un estudio con estado Esperando comprobante de pago")
                this.currentState = new EntregadoState()
              break;
              
            default:
              // code block
          } 
    }

    public siguiente(idEstudio:string, servicio:EstudioService){
        // Crear nuevo historial con servicio
        //                              Definir datos
        // servicio.agregarAHistorial(idEstudio,-,-,-)
        //      llama a servicio angular
        //      llama a endpoint express
        this.currentState.siguiente(idEstudio,servicio)
    }
    public setState(state: State){
        this.currentState = state

    }

    public getState(){
        return this.currentState;
    }

    public verBotonBajarPresupuesto(){
        return this.currentState.verBotonBajarPresupuesto()
    }
    public verBotonSubirComprobanteDePago(){
        return this.currentState.verBotonSubirComprobanteDePago()
    }
    public verBotonBajarComprobanteDePago(){
        return this.currentState.verBotonBajarComprobanteDePago()
    }
    public verBotonLotes(){
        return this.currentState.verBotonLotes()
    }
    public verBotonBajarCI(){
        return this.currentState.verBotonBajarCI()
    }
    public verBotonSubirCIF(){
        return this.currentState.verBotonSubirCIF()
    }
    public verBotonBajarCIF(){
        return this.currentState.verBotonBajarCIF()
    }
    public verBotonSeleccionarTurno(){
        return this.currentState.verBotonSeleccionarTurno()
    }
    public verTurno(){
        return this.currentState.verTurno()
    }
    public verBotonMuestraTomada(){
        return this.currentState.verBotonMuestraTomada()
    }
    public verFormExtraccionMuestra(){
        return this.currentState.verFormExtraccionMuestra()
    }
    public verFormRetiroMuestra(){
        return this.currentState.verFormRetiroMuestra()
    }
    public verBotonMuestraRealizada(){
        return this.currentState.verBotonMuestraRealizada()
    }
    public verContadorDeMuestras(){
        return this.currentState.verContadorDeMuestras()
    }
    public verBotonMuestraProcesada(){
        return this.currentState.verBotonMuestraProcesada()
    }
    public verBotonSubirInterpretacion(){
        return this.currentState.verBotonSubirInterpretacion()
    }
    public verBotonDescargarInterpretacion(){
        return this.currentState.verBotonDescargarInterpretacion()
    }
    public verBotonEntregado(){
        return this.currentState.verBotonEntregado()
    }
    public verBotonMuestraRetirada(){
        return this.currentState.verBotonMuestraRetirada()
    }
    public verBotonSubirResultado(){
        return this.currentState.verBotonSubirResultado()
    }
    public reiniciarEstado(idEstudio:string, servicio:EstudioService){
        this.currentState.reiniciarEstado(idEstudio,servicio)
    }
    public verBotonInciarProcesamiento(){
        return this.currentState.verBotonInciarProcesamiento()
    }
    public agregarAlHistorial(){

    }
    public verBotonBajarPresupuestoLegado() {
        return this.currentState.verBotonBajarPresupuestoLegado()
    }

}
class State implements State{

    verBotonBajarPresupuesto() :boolean{return false}
    verBotonSubirComprobanteDePago() :boolean{return false}
    verBotonBajarComprobanteDePago() :boolean{return false}
    verBotonBajarCI() :boolean{return false}
    verBotonSubirCIF() :boolean{return false}
    verBotonBajarCIF() :boolean{return false}
    verBotonSeleccionarTurno() :boolean{return false}
    verTurno() :boolean{return false}
    verBotonMuestraTomada():boolean{return false}
    verFormExtraccionMuestra() :boolean{return false}
    verFormRetiroMuestra() :boolean{return false}
    verBotonMuestraRealizada() :boolean{return false}
    verContadorDeMuestras() :boolean{return false}
    verBotonMuestraProcesada():boolean{return false}
    verBotonSubirInterpretacion() :boolean{return false}
    verBotonDescargarInterpretacion():boolean{return false}
    verBotonEntregado():boolean{return false}
    verBotonMuestraRetirada():boolean{return false}
    verBotonSubirResultado():boolean{return false}
    verBotonInciarProcesamiento ():boolean{return false}
    verBotonBajarPresupuestoLegado(): boolean{return false}

    siguiente(idEstudio:string, servicio:EstudioService) :boolean{return false}
    reiniciarEstado(idEstudio:string, servicio:EstudioService):any{
        servicio.setEstado(idEstudio,'Esperando presupuesto').toPromise().then(()=>window.location.reload())
    }


}

class EsperandoPresupuestoState extends State {

    verBotonBajarPresupuesto(): boolean{return true}
    siguiente(idEstudio:string, servicio: EstudioService) : any{
        console.log('SERVICIO.Cambiar a estado ComprobanteDePago')
        servicio.setEstado(idEstudio,'Esperando comprobante de pago').toPromise().then(()=>window.location.reload())
    }
    reiniciarEstado(idEstudio:string, servicio:EstudioService):any{
        servicio.setEstado(idEstudio,'Esperando presupuesto').toPromise().then(()=>window.location.reload())
    }

}

class EsperandoComprobanteDePagoState extends State {


    siguiente(idEstudio:string, servicio: EstudioService) : any{
        let estado = 'Esperando envio de consentimiento informado'
        servicio.setEstado(idEstudio,estado).toPromise().then(()=>window.location.reload())
    }
    reiniciarEstado(idEstudio:string, servicio:EstudioService):any{
        servicio.setEstado(idEstudio,'Esperando presupuesto').toPromise().then(()=>window.location.reload())
    }
    verBotonSubirComprobanteDePago() :boolean{return true}
    verBotonBajarPresupuestoLegado(): boolean{return true}

}


class EsperandoEnviarCIState extends State {
    siguiente(idEstudio:string, servicio: EstudioService) : any{
        let estado = 'Esperando carga de consentimiento informado FIRMADO'
        servicio.setEstado(idEstudio,estado).toPromise().then(()=>window.location.reload())
    }
    verBotonBajarCI() : boolean{return true}
    verBotonBajarComprobanteDePago() :boolean{return true}
}

class EsperandoCIFState extends State {
    siguiente(idEstudio:string, servicio: EstudioService) : any{
        let estado = 'Esperando seleccion de turno'
        servicio.setEstado(idEstudio,estado).toPromise().then(()=>window.location.reload())
    }
    verBotonSubirCIF() : boolean{return true}
    verBotonBajarComprobanteDePago() :boolean{return true}
}

class EsperandoSeleccionDeTurnotate extends State {
    siguiente(idEstudio:string, servicio: EstudioService) : any{
        let estado = 'Esperando toma de muestra'
        servicio.setEstado(idEstudio,estado).toPromise().then(()=>window.location.reload())
    }
    verBotonSeleccionarTurno() : boolean{return true}
    verBotonBajarComprobanteDePago() :boolean{return true}
    verBotonBajarCIF() : boolean{return true}
}

class EsperandoTomaDeMuestraState extends State {
    siguiente(idEstudio:string, servicio: EstudioService) : any{
        let estado = 'Esperando retiro de muestra desde el sector de extracciones'
        servicio.setEstado(idEstudio,estado).toPromise().then(()=>window.location.reload())
    }
    verBotonMuestraTomada() : boolean{return true}
    verBotonBajarComprobanteDePago() :boolean{return true}
    verBotonBajarCIF() : boolean{return true}
}
class EsperandoRertiroDeMuestraState extends State {
    siguiente(idEstudio:string, servicio: EstudioService) : any{
        // Actualizar estudio con datos de lote
        servicio.encolarALote(idEstudio).subscribe(()=>{
            let estado = 'Esperando iniciar procesamiento biotecnologico'
            servicio.setEstado(idEstudio,estado).toPromise().then(()=>window.location.reload())
        })
    }
    verBotonMuestraRetirada() : boolean{return true}
    verBotonBajarComprobanteDePago() :boolean{return true}
    verBotonBajarCIF() : boolean{return true}
}
class EsperandoProcesamientoState extends State {
    siguiente(idEstudio:string, servicio: EstudioService) : any{
        let estado = 'Esperando resultado de lote'
        servicio.nextEstadoLote(idEstudio).subscribe(()=>{
            servicio.setEstado(idEstudio,estado).toPromise().then(()=>window.location.reload())
        })
    }
    verFormExtraccionMuestra() : boolean{return true}
    verBotonMuestraProcesada() : boolean{return true}
    verBotonInciarProcesamiento() : boolean{return true}
    verBotonBajarComprobanteDePago() :boolean{return true}
    verBotonBajarCIF() : boolean{return true}
}

class EsperandoResultadoState extends State {
    siguiente(idEstudio:string, servicio: EstudioService) : any{
        let estado = 'Esperando interpretacion de resultado e informe'
        servicio.setEstado(idEstudio,estado).toPromise().then(()=>window.location.reload())
    }
    verBotonSubirResultado() : boolean{return true}
    verBotonBajarComprobanteDePago() :boolean{return true}
    verBotonBajarCIF() : boolean{return true}
}

class EsperandoInterpretacionState extends State {
    siguiente(idEstudio:string, servicio: EstudioService) : any{
        let estado = 'Esperando ser entregado a medico derivante'
        servicio.setEstado(idEstudio,estado).toPromise().then(()=>window.location.reload())
    }
    verBotonSubirInterpretacion() : boolean{return true}
    verBotonBajarComprobanteDePago() :boolean{return true}
    verBotonBajarCIF() : boolean{return true}
}

class EsperandoEnvioAMedicoState extends State {
    siguiente(idEstudio:string, servicio: EstudioService) : any{
        let estado = 'Entregado'
        servicio.setEstado(idEstudio,estado).toPromise().then(()=>window.location.reload())
    }
    verBotonEntregado() : boolean{return true}
    verBotonBajarComprobanteDePago() :boolean{return true}
    verBotonBajarCIF() : boolean{return true}
}
class EntregadoState extends State {
    siguiente(idEstudio:string, servicio: EstudioService) : any{
        let estado = 'Entregado'
        servicio.setEstado(idEstudio,estado).toPromise().then(()=>window.location.reload())
    }
    verBotonBajarCIF() : boolean{return true}
}


export {
    Estudio
}