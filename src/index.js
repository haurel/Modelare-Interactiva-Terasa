import './css/wave.scss';

import prepare from './Structure/prepare';
import getSelectedColor from './Structure/functionForUI';
import props from './Structure/config/defaults';
import ObjectLoad from './Structure/ObjectLoad';
import { Vector3, Group, Object3D, Box3, BoxGeometry, MeshBasicMaterial, Mesh } from 'three/build/three.module';
import { BoxHelper } from 'three';
/* document.addEventListener('DOMContentLoaded', () => {
    const wallTexture = document.getElementById("img_select");
    wallTexture.addEventListener('click', getSelectedColor(wallTexture.getAttribute("src")));
    console.log("in");
}); */

function init(src) {
    document.querySelectorAll('.img_select').forEach(item => {
        item.addEventListener('click', event => {
          //console.log(src);
            var _src = item.getAttribute('src').replace(/^.*[\\\/]/, '');
            var x = _src.substr(0, _src.lastIndexOf('.'));
            //console.log(x);
            getSelectedColor(x);
         });
        })
   }
window.init = function(src){
    init(src);
}

function takeModel(name){
    props.addObjectsToScene.push(name);
    console.warn(name + " Array: " + props.addObjectsToScene[0]);

    if(props.addObjectsToScene[0] === 'chair_model_1' && !props.itemsPreviousLoaded.includes('chair_model_1')){
        var chair = new ObjectLoad('/src/Structure/Chair/chair_001.gltf',
                new Vector3(5, -30, 3),
                new Vector3(2, 2, 2),
                "Chair_002");
        var tempObject = chair.Load();
        props.scene.add(tempObject);
       /*  props.chair_model_01 = new Object3D();
        var chair = new ObjectLoad('/src/Structure/Chair/chair_001.gltf',
                new Vector3(5, -30, 3),
                new Vector3(2, 2, 2),
                "chair_model_1"
        );
        props.chair_model_01.add(chair.Load());
        props.chair_model_01.name = "Chair_Model_01";
        props.scene.add(props.chair_model_01);

        
        props.itemsPreviousLoaded.push('chair_model_1');
        props.addObjectsToScene.pop();
    }else{
        var chair_temp = props.chair_model_01.clone();
        //console.log("Nonclone: ", props.chair_model_01);
        //console.log(chair_temp);    
        props.scene.add(chair_temp);
        */
    }   
}

window.takeModel = function(name){
    takeModel(name);
}

//prepare();
prepare.LoadCompleteScene();


