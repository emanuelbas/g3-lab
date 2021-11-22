interface State {

    verBotonPresupuesto() : any;
    verBotonLotes() : any;
    verBotonAlgoMas() : any;
}

class Estudio {

    currentState : any;
    constructor(state: string) {
        switch(state) {
            case 'Esperando presupuesto':
              console.log("Se crea un estudio con estado espernado presupuesto")
              this.currentState = new EsperandoPresupuestoState
              break;
            case "otro":
              // code block
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


    verBotonPresupuesto(): boolean{return true}
    verBotonLotes(): boolean{return false}
    verBotonAlgoMas(): boolean{return false}
}

let estudio = new Estudio('Esperando presupuesto')
console.log(estudio.currentState.verBotonAlgoMas())