import * as THREE from 'three'

import { WebGLRenderer, Scene, PerspectiveCamera, Vector3, PCFSoftShadowMap, Box3, sRGBEncoding, ReinhardToneMapping, OrthographicCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';







import props from './config/defaults';
import settings from './config/settings';
import Camera from './Camera';


import createEnvironment from './environment';
import render from './render';


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
    //props.renderer.compile(props.scene, props.camera);
    // Set the pixel ratio for detail or perfomance
    props.renderer.setPixelRatio(settings.defaultPixelRatio);

    // Set the size of the render to fit the window
    props.renderer.setSize(window.innerWidth, window.innerHeight);

    // TODO: Check for which cases this is necessary
    props.renderer.gammaInput = true;

    // TODO: Check for which cases this is necessary
    props.renderer.gammaOutput = true;
    props.renderer.gammaFactor = 2;

    
    props.renderer.shadowMap.enabled = true;
    props.renderer.shadowMapSoft = true;
    props.renderer.shadowMap.type = PCFSoftShadowMap;   
    
    props.renderer.outputEncoding = sRGBEncoding;
    props.renderer.toneMapping = ReinhardToneMapping;
    props.renderer.toneMappingExposure = 1.2;

    // Append the render canvas to the DOM
    document.body.appendChild(props.renderer.domElement);
};

/**
* Create camera of type THREE.PerspectiveCamera
*/

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
    /* props.orbitControls = new OrbitControls(
        props.camera2D,
        props.renderer.domElement
    )
    props.orbitControls.update();
    console.log(props.orbitControls); */

    var controls = new TrackballControls( props.camera2D, 
        props.renderer.domElement);
        /* controls.rotateSpeed = 13.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3; */
}

/**
* Create all necessary parts of the architecture and start building
*/

function animate(){
    requestAnimationFrame(animate);
    render();
}
import { CameraObject } from './CameraObject';
export default () => {
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

    props.camera2D = CameraObject.Camera2D();
    props.scene.add(props.camera2D);
    //props.camera2D.position.set(0, 0, 30);
    createRenderer();    
    createEnvironment();


    props.obj = new ObjectControl(props.renderer.domElement, props.camera2D,
        props.objectsArray, props.plane);
    
    /* props.obj.addEventListener('move', function ( event ) {
            //alert( "hallo" );
    });
    props.obj.addEventListener('down', function ( event ) {
        //alert( "hallo" );
    }); */

    animate();
    
    //render();

    
};

