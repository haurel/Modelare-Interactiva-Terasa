import { WebGLRenderer, Scene, PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


import props from './config/defaults';
import settings from './config/settings';



import createEnvironment from './environment';
import render from './render';



/**
* Create scene of type THREE.Scene.
*/
const createScene = () => {
    props.scene = new Scene();
};

/**
* Create renderer of type THREE.WebGLRenderer.
*/
const createRenderer = () => {
    //Create the renderer
    props.renderer = new WebGLRenderer({
        alpha: !settings.backgroundColor,
    });
    props.renderer.compile(props.scene, props.camera);
    // Set the pixel ratio for detail or perfomance
    props.renderer.setPixelRatio(settings.defaultPixelRatio);

    // Set the size of the render to fit the window
    props.renderer.setSize(window.innerWidth, window.innerHeight);

    // TODO: Check for which cases this is necessary
    props.renderer.gammaInput = true;

    // TODO: Check for which cases this is necessary
    props.renderer.gammaOutput = true;

    // Append the render canvas to the DOM
    document.body.appendChild(props.renderer.domElement);
};

/**
* Create camera of type THREE.PerspectiveCamera
*/

const createCamera = () => {
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

const createOrbitControls = () => {
    props.orbitControls = new OrbitControls(
        props.camera,
        props.renderer.domElement
    )
}


/**
* Create all necessary parts of the architecture and start building
*/

export default () => {
    createScene();
    createRenderer();
    createCamera();
    createOrbitControls();

    
    createEnvironment();
    
    render();
};