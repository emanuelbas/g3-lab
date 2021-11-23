import { EstudioService } from 'src/app/services/estudio.service';

interface State {

    verBotonBajarPresupuesto() : any;
    verBotonLotes() : any;
    verBotonAlgoMas() : any;
    verBotonBajarCI() : boolean;
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
            default:
              // code block
          } 
    }

    public siguiente(idEstudio:string, servicio:EstudioService){
        alert("Cambiar de estado")
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

    public verBotonLotes(){
        return this.currentState.verBotonLotes()
    }
    public verBotonSubirRecibo(){
        return this.currentState.verBotonSubirRecibo()
    }
    public verBotonBajarCI(){
        return this.currentState.verBotonBajarCI()
    }
    public reiniciarEstado(idEstudio:string, servicio:EstudioService){
        this.currentState.reiniciarEstado(idEstudio,servicio)
    }

}
class State{

}

class EsperandoPresupuestoState implements State {

    verBotonBajarPresupuesto(): boolean{return true}
    verBotonLotes(): boolean{return false}
    verBotonAlgoMas(): boolean{return false}
    verBotonBajarCI() : boolean{return false}
    siguiente(idEstudio:string, servicio: EstudioService) : any{
        console.log('SERVICIO.Cambiar a estado ComprobanteDePago')
        servicio.setEstado(idEstudio,'Esperando comprobante de pago').toPromise().then(()=>window.location.reload())
    }
    reiniciarEstado(idEstudio:string, servicio:EstudioService):any{
        servicio.setEstado(idEstudio,'Esperando presupuesto').toPromise().then(()=>window.location.reload())
    }
}

class EsperandoComprobanteDePagoState implements State {

    verBotonBajarPresupuesto(): boolean{return false}
    verBotonSubirRecibo(): boolean{return false}
    verBotonLotes(): boolean{return false}
    verBotonAlgoMas(): boolean{return false}
    verBotonBajarCI() : boolean{return false}
    siguiente(idEstudio:string, servicio: EstudioService) : any{
        console.log('SERVICIO.Cambiar a estado EnviarCI')
        servicio.setEstado(idEstudio,'Esperando consentiminto informado').toPromise().then(()=>window.location.reload())
    }
    reiniciarEstado(idEstudio:string, servicio:EstudioService):any{
        servicio.setEstado(idEstudio,'Esperando presupuesto').toPromise().then(()=>window.location.reload())
    }
}

export {
    Estudio
}