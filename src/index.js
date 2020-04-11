import './css/wave.scss';

import prepare from './Structure/prepare';
import getSelectedColor from './Structure/functionForUI';
import props from './Structure/config/defaults';
import ObjectLoad from './Structure/ObjectLoad';
import { Vector3, Group, Object3D, Box3, BoxGeometry, MeshBasicMaterial, Mesh, TextureLoader, ShaderMaterial, PlaneGeometry } from 'three/build/three.module';
import { CameraObject } from './Structure/CameraObject';
import { PaintObject } from './Structure/PaintObject';
import chairTextureSettings from './Structure/config/chairTextureSettings';


/* document.addEventListener('DOMContentLoaded', () => {
    const wallTexture = document.getElementById("img_select");
    wallTexture.addEventListener('click', getSelectedColor(wallTexture.getAttribute("src")));
    console.log("in");
}); */

function init(src) {
    console.warn(src);
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

function ChangeView( typeOfView ){
    if( typeOfView === '2D'){
        props.scene.remove(props.camera2D)
        props.camera2D = null;

        props.camera2D = CameraObject.Camera2D();
        props.scene.add( props.camera2D );
    }
    else if( typeOfView === '3D'){
        props.scene.remove(props.camera2D);
        props.camera2D = null;

        props.camera2D = CameraObject.Camera3D();
        props.scene.add(props.camera2D);
    }
}

window.ChangeView = function( typeOfView ){
    ChangeView( typeOfView );
}

function takeModel(name){
    props.addObjectsToScene.push(name);
    var chair = new ObjectLoad('/src/Structure/Chair/chair_001.gltf',
                new Vector3(5, -30, 5.40),
                new Vector3(2, 2, 2),
                "Chair_002");
    var tempObject = chair.Load();
    console.log("Mesh loaded index.js", tempObject.children);

    props.scene.add(tempObject);
}

window.takeModel = function(name){
    takeModel(name);
}

function ChangeColor(){
    //console.log(props.objectsMeshOnlyArray[0].children);
    //props.objectsMeshOnlyArray[0].children[1].material.visible = false;

    if(props.objectsMeshIndexTextureChange === null){
        alert("Please select an object!!");
    }else{  
        var textureArray = PaintObject.LoadTextureArray(
            chairTextureSettings.leather_chair_014
        )

        console.log(props.objectsMeshIndexTextureChange);
        console.log(props.objectsMeshIndexTextureChange);
        PaintObject.ObjectTexture( props.objectsMeshOnlyArray[props.objectsMeshIndexTextureChange]
                                .children[1], textureArray 
            );
    }
}

window.ChangeColor = function(){
    ChangeColor();
}


function Action( actionName ){
    Object.keys(props.objectActions).forEach(v => props.objectActions[v] = false)

    if( actionName === 'drag'){
        props.objectActions['drag'] = true;
    }else if(actionName === 'rotate'){
        props.objectActions['rotate'] = true;
    }else if( actionName === 'paint'){
        props.objectActions['paint'] = true;
    }else if( actionName === 'delete'){
        props.objectActions['delete'] = true;
    }
    console.log(props.objectActions);
}

function changeBackground(){
    const barOuter = document.querySelector("#image-container");
    const options = document.querySelectorAll("#image-container #image-right");
    let current = 1;
    options.forEach((option, i) => (option.index = i + 1));
    options.forEach(option =>
                    option.addEventListener("click", function() {
    barOuter.className = "#image-container";
    barOuter.classList.add(`pos${option.index}`);
    if (option.index > current) {
        barOuter.classList.add("right");
    } else if (option.index < current) {
        barOuter.classList.add("left");
    }
    current = option.index;
    }));
}

window.Action = function( actionName ){
    Action( actionName );
}

//prepare();
prepare.LoadCompleteScene();


