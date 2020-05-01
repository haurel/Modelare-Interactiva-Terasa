export default {
    /**
     * Give the user some powers (or not).
     */
    /* user: {
      gui: false,
      orbit: false,
      stats: false,
    }, */

    /**
     * Set the axesHelper properties
     */
    axesHelper: {
        axisSize: 100,
    },

    gridHelper: {
        divisions: 100,
        size: 100,
    },

    /**
     * Set the camera properties.
     */
    camera: {
      fov: 45,
      aspect: window.innerWidth / window.innerHeight,
      near: 1,
      far: 3500,
    },
    
    /**
     * Set the camera properties.
     */

    camera2DSigle : {
      left: -60,
      right: 100,
      top: 100,
      bottom: -100,
      near: 1,
      far: 100,
    },
  
    /**
     * OrbitControl for difference 
     */
    
    /**
     * Background color used on draw (false for transparent).
     */
    backgroundColor: 0x87ceeb,
  
    /**
     * Set a default pixel ratio (1 for more performance).
     */
    defaultPixelRatio: window.devicePixelRatio,

    /**
     * Check for mobile device (for devicePixelRatio or less intensive stuff).
     */
    //mobile: (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)),
  };