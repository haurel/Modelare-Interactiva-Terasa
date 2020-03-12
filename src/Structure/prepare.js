import { WebGLRenderer, Scene, PerspectiveCamera, Vector3, PCFSoftShadowMap, Box3, sRGBEncoding, ReinhardToneMapping, OrthographicCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';






import * as THREE from 'three'

import props from './config/defaults';
import settings from './config/settings';
import Camera from './Camera';


import createEnvironment from './environment';
import render from './render';



/**
* Create scene of type THREE.Scene.
*/
const createScene = () => {
    props.scene = new Scene();

   
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
    props.orbitControls = new OrbitControls(
        props.camera,
        props.renderer.domElement
    )

    /* props.controls.enableDamping = true;
	props.controls.dampingFactor = 0.25; */
}

const createTransformControl = () =>{
    props.control = new TransformControls(props.camera2D, props.renderer.domElement);
    props.control.setSize(0.6);
    props.control.setSpace("world");
    props.control.dragging = true;
    console.log(props.control.dragging);
    /* props.control.setMode('rotate');
    props.control.showX = false; */
    props.control.showY = false;
    props.scene.add(props.control);
    
    props.control.addEventListener('mouseUp', function () {
        if(props.indexOfObject !== null){
            //console.log(props.indexOfObject);
            
            props.boundingBox[props.indexOfObject].helper.update();
            var box3Temp = new Box3().setFromObject(props.boundingBox[props.indexOfObject].helper);
            props.boundingBox[props.indexOfObject].box = box3Temp;

            //console.log("UPDATE", props.boundingBox[props.indexOfObject].helper);
        }
    });

}

const createDragControl = () =>{
    props.dragControl = new DragControls(
        props.boundingBox,
        props.camera2D,
        props.renderer.domElement
    )

    props.dragControl.addEventListener( 'drag', render );
}

/* const createOutlineObject = () =>{
    props.composer = new EffectComposer( props.renderer );

    props.renderPass = new RenderPass( props.scene, props.camera );
    props.composer.addPass( props.renderPass );

    props.outlinePass = new OutlinePass( new Vector2(window.innerWidth, window.innerHeight), props.scene, props.camera );
    props.composer.addPass(props.outlinePass);

    props.effectFXAA = new ShaderPass( FXAAShader );
    props.effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight );
    props.effectFXAA.renderToScreen = true;
    props.composer.addPass( props.effectFXAA );

    props.outlinePass.edgeStrength = 10;
    props.outlinePass.edgeGlow = 1;
    props.outlinePass.edgeThinckness = 4;
} */

/**
* Create all necessary parts of the architecture and start building
*/

function animate(){
    render();
    requestAnimationFrame(animate);
}

export default () => {
    createScene();
    createRenderer();
    //createCamera();
    //createCamera2D();
    props.cameraControl = new Camera();
    //createOrbitControls();
    //createTransformControl();
    //createOutlineObject();
    createEnvironment();
    createDragControl();
    animate();

    render();

    
};

