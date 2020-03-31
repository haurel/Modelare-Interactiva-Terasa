import { Object3D } from "three";
import { NotEqualStencilFunc, Group } from "three/build/three.module";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

export default {

    /**
     * Scenes allow you to set up what and where is to be rendered by three.js.
     * This is where have place objects, lights and cameras.
     *
     * @type { THREE.Scene }
     * @see https://threejs.org/docs/#Reference/Scenes/Scene
     */
    scene: {},
  
    /**
     * The WebGL renderer displays scenes using WebGL.
     *
     * @type { THREE.WebGLRenderer }
     * @see https://threejs.org/docs/#Reference/Renderers/WebGLRenderer
     */
    renderer: {},
  
    /**
     * Camera with perspective projection.
     *
     * @type { THREE.PerspectiveCamera }
     * @see https://threejs.org/docs/#Reference/Cameras/PerspectiveCamera
     */
    camera: {},
   
    /**
     * Camera with ortographics projection
     * @type { THREE.OrthographicCamera }
     * @see 
     */
    camera2D: {},

    /**
     * Orbit Controls
     * 
     * @type { TrackballControls } from 'three/examples/jsm/controls/OrbitControls.js'
     */
    orbitControls: {},

/**
 *  For objects from scene
 */
//#region Scene 
    /**
     * House Mesh and Plane
     * @type { THREE.Group }
     */
    meshHouse: {},
    /**
     * @type { THREE.Group }
     */
    fance: {},
    /**
     * @type { var }
     */
    grass : null,
//#endregion

//#region 
    /**
     * @type { array }
     */
    itemsPreviousLoaded : [],
    /**
     * @type { Object3D }
     */
    chair_model_01 : {},
//#endregion
//#region Global variable

    /**
     * Object to store the environment in.
     */
    structure: {},

    /**
     * Object to store the helpers
     * @type { THREE.BoxHelper }
     */
    helpersStructure: {},


    /**
     * @type { Array }
     */
    boundingBox: [],
    objectsArray: [],



    /**
     * @type { THREE.TransformControl }
     */
    control: {},

    /**
     * @type { THREE.DragControls }
     */
    dragControl : undefined,


    /**
     * @type { var }
     */
    needUpdate : null,

    /**
     * @type { var }
     */
    indexOfObject : null,

    /**
     * @type { var }
     */
    cameraControl : undefined,
    plane : undefined,

    /**
     * @type { var }
     */
    parameters : undefined,

    /**
     * @type { var }
     */
    allObject: 0,

    /**
     * @type { var }
     */
    parameters:{
        translate: true,
		rotate: false
    },
    gui : null,


    /**
     * @type { var }
     */
    obj : null,


    /**
     * @type { Array}
     */
    addObjectsToScene : [],

//#endregion
};