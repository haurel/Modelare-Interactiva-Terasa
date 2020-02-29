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
     * @type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
     */
    orbitControls: {},

/**
 *  For objects from scene
 */
    /**
     * House Mesh and Plane
     * @type { THREE.Group }
     */
    meshHouse: {},


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

    /**
     * @type { THREE.Group }
     */
    fance: {},

    /**
     * @type { THREE.TransformControl }
     */
    control: {},

    /**
     *  @type { var }
     */
    composer : null,
    effectFXAA : null,
    outlinePass : null,
    renderPass: null,
    moved : false,
    /**
     * @type { Array }
     */
    selectedObjects : [],

    /**
     * @type { var }
     */
    needUpdate : null,
  
};