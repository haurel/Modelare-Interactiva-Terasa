export default {

    /**
     * Scenes allow you to set up what and where is to be rendered by three.js.
     * This is where you place objects, lights and cameras.
     *
     * @type {THREE.Scene}
     * @see https://threejs.org/docs/#Reference/Scenes/Scene
     */
    scene: {},
  
    /**
     * The WebGL renderer displays your beautifully crafted scenes using WebGL.
     *
     * @type {THREE.WebGLRenderer}
     * @see https://threejs.org/docs/#Reference/Renderers/WebGLRenderer
     */
    renderer: {},
  
    /**
     * Camera with perspective projection.
     *
     * @type {THREE.PerspectiveCamera}
     * @see https://threejs.org/docs/#Reference/Cameras/PerspectiveCamera
     */
    camera: {},
   
    /**
     * Orbit Controls
     * 
     * @type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
     */
    orbitControls: {},


    /**
     * House Mesh and Plane
     * @type { THREE.Group }
     */
    meshHouse: {},

    /**
     * Chair Mesh
     * @type { THREE.Group }
     */
    meshChair: {},
    /**
    * @type { THREE.Box3 }
    */
    boxChair: {},

    /**
     * @type { THREE.BoxHelper }
     */
    boxHelperChair: {},
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
     * GroupBox for all mesh
     * @type { THREE.Group }
     */
    boxMeshs: {},
    /**
     * @type { const }
     */
    boxMeshsLength : 0,
    /**
     * @type { Array }
     */
    boundingBox: [],
  
};