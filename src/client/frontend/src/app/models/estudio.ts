interface State {

    verBotonBajarPresupuesto() : any;
    verBotonLotes() : any;
    verBotonAlgoMas() : any;
}

class Estudio {

    currentState : any;

    // Este objeto se va a crear con el estado actual leido de la base
    // Según en que estado se encuentre va a responder distinto a los pedidos
    constructor(state?: string) {
        switch(state) {
            case 'Esperando presupuesto':
              console.log("Se crea un estudio con estado Espernado presupuesto")
              this.currentState = new EsperandoPresupuestoState
              break;
            case "Esperando comprobante de pago":
                console.log("Se crea un estudio con estado Esperando comprobante de pago")
                this.currentState = new EsperandoComprobanteDePagoState
              break;
            default:
              // code block
          } 
    }

    public setState(state: State){
        this.currentState = state

    }

    public getState(){
        return this.currentState;
    }

}
class State{

}

class EsperandoPresupuestoState implements State {

    verBotonBajarPresupuesto(): boolean{return true}
    verBotonLotes(): boolean{return false}
    verBotonAlgoMas(): boolean{return false}
}

class EsperandoComprobanteDePagoState implements State {

    verBotonBajarPresupuesto(): boolean{return true}
    verBotonSubirRecibo(): boolean{return true}
    verBotonLotes(): boolean{return false}
    verBotonAlgoMas(): boolean{return false}
}

export {
    Estudio
}