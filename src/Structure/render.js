import Stats from 'stats.js';


import props from './config/defaults';
import settings from './config/settings';

import PickHelper from './PickHelper';



const pickHelper = new PickHelper();

const pickPosition = {x: 0, y: 0};
const time = 0;

/**
 * Update the environment
 */
/* const updateEnvironment = () => {
    props.structure.cube.rotation.x += 0.01;
    props.structure.cube.rotation.z += 0.01;
}; */

//const canvas = document.getElementById('canvas');
const canvas = document.body;  
const getCanvasRelativePosition = (event) =>{
    const rect =  canvas.getBoundingClientRect();
    return {
        x: ((event.clientX - rect.left) / (rect.width - rect.left )) * 2 - 1,
        y: - ((event.clientY - rect.top) / (rect.bottom - rect.top )) * 2 + 1
    };
}

const setPikerPosition = (event) =>{
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = pos.x;
    pickPosition.y = pos.y;
    //console.log(pickPosition);
}

const clearPickPosition = () =>{
    pickPosition.x = -100000;
    pickPosition.y = -100000;
}

const pickObj = () =>{
    pickHelper.Pick(pickPosition, props.scene, props.camera, time) 
}

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
//const stats = initStats();
/**
 * Render function  called on every frame
 */
export default function render(){
    if(settings.backgroundColor !== false) 
        props.renderer.setClearColor(settings.backgroundColor);
    //console.log(pickPosition);
    
    
    //updateEnvironment()
    
    //stats.update();
    requestAnimationFrame(render);

    props.renderer.render(props.scene, props.camera);
}

/**
 * Update the camera and renderer base on window size
 */
const windowResizeHandler = () => {
    props.camera.aspect = window.innerWidth / window.innerHeight;
    props.camera.updateProjectionMatrix();
    props.renderer.setSize(window.innerWidth, window.innerHeight);
}

document.addEventListener('resize', windowResizeHandler, false);

document.addEventListener('mousedown', pickObj, false);
document.addEventListener('mousemove', setPikerPosition);
document.addEventListener('mouseout', clearPickPosition);
document.addEventListener('mouseleave', clearPickPosition);

document.addEventListener('touchstart', (event) => {
        // prevent the window from scrolling
    event.preventDefault();
    setPickPosition(event.touches[0]);
}, {passive: false});
    
document.addEventListener('touchmove', (event) => {
    setPickPosition(event.touches[0]);
});
    
document.addEventListener('touchend', clearPickPosition);