import * as THREE from 'three'

import { WebGLRenderer, Scene, PerspectiveCamera, Vector3, PCFSoftShadowMap, Box3, sRGBEncoding, ReinhardToneMapping, OrthographicCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';


import { InitializationStaticObjects } from './InitializationStaticObjects';
import props from './config/defaults';
import settings from './config/settings';

import createEnvironment from './environment';
import render from './render';
import { CameraObject } from './CameraObject';
import { CustomTerace } from './CustomTerace';

import { ObjectControl } from './ObjectControl';
/**
* Create scene of type THREE.Scene.
*/
const createScene = () => {
    props.scene = new Scene();
    props.scene.name = "Scene"
   
    window.scene = props.scene;
    window.THREE = THREE;

};

/**
* Create renderer of type THREE.WebGLRenderer.
*/
const createRenderer = () => {
    //Create the renderer
    props.renderer = new WebGLRenderer({
        alpha: !settings.backgroundColor,
    });

    props.renderer.setPixelRatio(settings.defaultPixelRatio);

    props.renderer.setSize(window.innerWidth, window.innerHeight);

    props.renderer.gammaInput = true;

    props.renderer.gammaOutput = true;
    props.renderer.gammaFactor = 2;

    
    props.renderer.shadowMap.enabled = true;
    props.renderer.shadowMapSoft = true;
    props.renderer.shadowMap.type = PCFSoftShadowMap;   
    
    props.renderer.outputEncoding = sRGBEncoding;
    props.renderer.toneMapping = ReinhardToneMapping;
    props.renderer.toneMappingExposure = 1.2;

    props.renderer.physicallyCorrectLights = true;

    var container = document.getElementById( 'main' );
    document.body.appendChild( container );
    container.appendChild( props.renderer.domElement );

};


/* const createCamera = () => {
    // Create the camera 
    props.camera = new PerspectiveCamera(
        settings.camera.fov,
        settings.camera.aspect,
        settings.camera.near,
        settings.camera.far,
    );

    props.camera.position.set(0, 35, 80);
    
    props.camera.lookAt(new Vector3(0, 0, 0));

}

const createCamera2D = () =>{
    //Create camera
    props.camera2D = new OrthographicCamera(
        -15,		// Left
        55,		// Right
        100,		// Top
        -100,		// Bottom
        0,          // Near 
        100        // Far
    );

    props.camera2D.position.set(0, 50, 5);
    props.camera2D.zoom = 1.2;
    props.camera2D.up = new Vector3(0, 0, -1);
    props.camera2D.lookAt(new Vector3(0, -1, 0));


} */


const createOrbitControls = () => {
    props.orbitControls = new OrbitControls(
        props.camera2D,
        props.renderer.domElement
    )
    //props.orbitControls.update();
    //console.log(props.orbitControls);

    /* props.orbitControls = new TrackballControls( props.camera2D, 
        props.renderer.domElement);
    props.orbitControls.rotateSpeed = 13.0;
    props.orbitControls.zoomSpeed = 1.2;
    props.orbitControls.panSpeed = 0.8;
    props.orbitControls.noZoom = false;
    props.orbitControls.noPan = false;
    props.orbitControls.staticMoving = true;
    props.orbitControls.dynamicDampingFactor = 0.3;*/
}

/**
* Create all necessary parts of the architecture and start building
*/

function animate(){
    requestAnimationFrame(animate);
    //props.orbitControls.update();
    //props.transformControlLight.updateMatrix();
    
    if(props.teraceMode['custom'] === true){
       
        props.customTerace = new CustomTerace();
        if(props.obj !== null){
            props.obj = null;
        }
        props.teraceMode['custom'] = false;
        props.scene.remove(props.terace);
    }else if( props.teraceMode['default'] === true){
        if(props.customTerace !== null){
            props.customTerace.dezactive();
        }
        props.obj = new ObjectControl();
        props.scene.remove(props.terace);
        
        props.terace = InitializationStaticObjects.Terrace();
        props.scene.add(props.terace);
        props.teraceMode['default'] = false;
    }

    if(props.camera2D.name === "Camera3DMoving"){
        
        if(props.keyboard[87]){ // W key
            props.camera2D.position.x -= Math.sin(props.camera2D.rotation.y) * 0.2;
		    props.camera2D.position.y -= -Math.cos(props.camera2D.rotation.y) * 0.2;
            
        }
        if(props.keyboard[83]){ // S key
            props.camera2D.position.x += Math.sin(props.camera2D.rotation.y) * 0.2;
		    props.camera2D.position.y += -Math.cos(props.camera2D.rotation.y) * 0.2;
            
        }
        if(props.keyboard[65]){ // A key
            props.camera2D.position.x += Math.sin(props.camera2D.rotation.y - Math.PI/2) * 0.2;
            props.camera2D.position.y += -Math.cos(props.camera2D.rotation.y - Math.PI/2) * 0.2;
        }
        if(props.keyboard[68]){ // D key
            props.camera2D.position.x += Math.sin(props.camera2D.rotation.y + Math.PI/2) * 0.2;
		    props.camera2D.position.y += -Math.cos(props.camera2D.rotation.y + Math.PI/2) * 0.2;
        }
        if(props.keyboard[69]){ //q
            props.camera2D.rotation.y -= Math.PI*0.02
        }
        if(props.keyboard[81]){ //e
            props.camera2D.rotation.y += Math.PI*0.02
        }
    }

  
    render();
}


function LoadCompleteScene(){
    createScene();
    var w = window.innerWidth / 6, h = window.innerHeight / 6;
    var viewSize = h;
    var aspectRatio = w / h;
    /* props.camera2D = new OrthographicCamera(
        (-aspectRatio * viewSize) / 2,
        (aspectRatio * viewSize) / 2,
        viewSize / 2,
        -viewSize / 2,
        -200, 
        200
    );
    props.scene.add(props.camera2D);
    props.camera2D.position.set(0, 0, 100); */

    //props.camera2D = CameraObject.Camera2D();
    props.camera2D = CameraObject.Camera3D();
    //props.camera2D = CameraObject.Camera3DMoving();
    props.scene.add(props.camera2D);
    //props.camera2D.position.set(0, 0, 30);
    createRenderer();    
    createEnvironment();

    
    //createOrbitControls();

    
    
    
    animate();
    
};

export default { LoadCompleteScene, animate };

