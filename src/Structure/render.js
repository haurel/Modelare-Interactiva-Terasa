import Stats from 'stats.js';


import props from './config/defaults';
import settings from './config/settings';

/**
 * Update the environment
 */
/* const updateEnvironment = () => {
    props.structure.cube.rotation.x += 0.01;
    props.structure.cube.rotation.z += 0.01;
}; */

//const canvas = document.getElementById('canvas');
//const canvas = document.body;  
const canvas = document.getElementById('scena');
/**
 * @returns Scene FPS
 */
const initStats = () =>{
    var stats = new Stats();
    stats.setMode(0);
        //Put the statistics panel in the top left corner
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.left = '0px';
        //Add to body
    document.body.appendChild(stats.domElement);
        //Return to this instance
    return stats;
}


/**
 * Render function  called on every frame
*/
export default function render(){
    if(settings.backgroundColor !== false) 
        props.renderer.setClearColor(settings.backgroundColor);
    //stats.update();

    //props.renderer.setClearColor( 0xfff0f0 );
    //props.renderer.setClearAlpha( 0.0 );
    
    //props.orbitControls.update();
    props.renderer.render(props.scene, props.camera2D);
}

/**
 * Update the camera and renderer base on window size
 */
const windowResizeHandler = () => {
    props.camera.aspect = window.innerWidth / window.innerHeight;
    props.camera.updateProjectionMatrix();
    props.renderer.setSize(window.innerWidth, window.innerHeight);
}






// 2D & 3D 
/* const getRelativeMousePositionOnlyPerspectivCamera = (event) =>{
    const rect =  canvas.getBoundingClientRect();
    return {
        x: ((event.clientX - rect.left) / (rect.width - rect.left )) * 2 - 1,
        y: - ((event.clientY - rect.top) / (rect.bottom - rect.top )) * 2 + 1
        // x: ((0.4 * window.innerWidth + 1) / ( (0.6 * window.innerWidth - 2) - (0.4 * window.innerWidth + 1))) * 2 - 1,
        //y: -(((1 - (window.innerHeight - 2))) / (1 - (1 - (window.innerHeight - 2)))) * 2 + 1

        //x: ((event.clientX * 0.5 - (0.4 * rect.left + 1)) / ((0.6 * rect.width - 2) - (0.4 * rect.left + 1))) * 2 - 1,
        //y: - ((event.clientY - (0.4 * rect.top + 1)) / (rect.bottom - (0.4 * rect.top + 1))) * 2 + 1
    };
} */

/* const getRelativMousePosition = (event) =>{
    const rect = canvas.getBoundingClientRect();
    var x = ((event.clientX  - (0.6 * rect.left + 1)) / ((rect.width * 0.6 - 2) - (rect.left * 0.6 + 1))) * 2 - 1;
    var xPerspectivCamera = ((event.clientX * 0.5 - (0.4 * rect.left + 1)) / ((0.6 * rect.width - 2) - (0.4 * rect.left + 1))) * 2 - 1;


    if(Math.abs(parseFloat(x)) <= Math.abs(parseFloat(xPerspectivCamera))){
        //console.log(x + " - " + xPerspectivCamera);
        return true;
    }else{
        //console.log( x + " - " + xPerspectivCamera);
        return false;
    } 

} */

/* const setPikerPosition = (event) =>{
    const pos = getRelativeMousePositionOnlyPerspectivCamera(event);
    pickPosition.x = pos.x;
    pickPosition.y = pos.y;


    //props.pickHelper.SetMousePosition(pickPosition);
    //props.pickHelper.CalculateMousePosition(event);


    const mousePos = getRelativMousePosition(event);
    if(mousePos){
        props.orbitControls.enabled = false;
    }else if(!mousePos){
        props.orbitControls.enabled = true;
    }
} */
