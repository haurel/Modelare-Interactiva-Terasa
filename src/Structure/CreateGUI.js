/**
 * Create GUI
 */
import props from './config/defaults';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

var CreateGUI = function (){
    props.gui = new GUI();
    var scope = this;
    this.traslateValue = props.gui.add( props.parameters, 'translate')
        .name('Translate')
        .listen()
    this.rotateValue = props.gui.add( props.parameters, 'rotate' )
    .name('Rotate')
    .listen()

   
    this.GetTranslate = () =>{
        return scope.traslateValue;
    }

    this.GetRotate = () =>{
        return scope.rotateValue;
    }

    this.Update = (name)=>{
        for (let param in props.parameters){
            props.parameters[param] = false;
        }
        props.parameters[name] = true;

        /* for (let param in props.parameters){
            console.warn(param +": " + props.parameters[param]);
        } */
    }


    
}

CreateGUI.prototype.constructor = CreateGUI;

export { CreateGUI }