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
        //x: ((event.clientX - rect.left) / (rect.width - rect.left )) * 2 - 1,
        //y: - ((event.clientY - rect.top) / (rect.bottom - rect.top )) * 2 + 1
        /* x: ((0.4 * window.innerWidth + 1) / ( (0.6 * window.innerWidth - 2) - (0.4 * window.innerWidth + 1))) * 2 - 1,
        y: -(((1 - (window.innerHeight - 2))) / (1 - (1 - (window.innerHeight - 2)))) * 2 + 1 */

        x: ((event.clientX * 0.5 - (0.4 * rect.left + 1)) / ((0.6 * rect.width - 2) - (0.4 * rect.left + 1))) * 2 - 1,
        y: - ((event.clientY - (0.4 * rect.top + 1)) / (rect.bottom - (0.4 * rect.top + 1))) * 2 + 1
    };
}

const setPikerPosition = (event) =>{
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = pos.x;
    pickPosition.y = pos.y;
    
}

const clearPickPosition = () =>{
    pickPosition.x = -100000;
    pickPosition.y = -100000;
}

const pickObj = () =>{
    pickHelper.Pick(pickPosition, props.scene, props.camera, time);
    //pickHelper.ControlPickObj(); 
    //console.log("Am dat click");
    //console.log(pickPosition);
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
   

    //updateEnvironment()
    //stats.update();

    
    //props.renderer.setClearColor( 0xfff0f0 );
    //props.renderer.setClearAlpha( 0.0 );
    
    props.orbitControls.update();

    requestAnimationFrame(render);

    var SCREEN_W, SCREEN_H;
    SCREEN_W = window.innerWidth;
    SCREEN_H = window.innerHeight;
    
    
    var left,bottom,width,height;
    left = 0; bottom = 0; width = 0.4*SCREEN_W-2; height = SCREEN_H-2;


    props.renderer.setViewport(left,bottom,width,height);
    props.renderer.setScissor(left,bottom,width,height);
    props.renderer.setScissorTest (true);
    props.camera2D.aspect = width / height;
    props.camera2D.updateProjectionMatrix();
    props.renderer.render(props.scene, props.camera2D);

    left = 0.4*SCREEN_W+1; bottom = 1; width = 0.6*SCREEN_W-2; height = SCREEN_H-2;
    props.renderer.setViewport (left,bottom,width,height);
    props.renderer.setScissor(left,bottom,width,height);
    props.renderer.setScissorTest (true);  // clip out "viewport"
    props.camera.aspect = width / height;
    props.camera.updateProjectionMatrix();
    props.renderer.render (props.scene,props.camera);
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

document.addEventListener('mousedown', pickObj, true);
document.addEventListener('mousemove', setPikerPosition);


/* props.orbitControls.addEventListener( 'change', function() {
    props.moved = true;
}); */

/* window.addEventListener( 'mousedown', function () {
    props.moved = false;
}, false);

window.addEventListener( 'mouseup', function () {
    if(!props.moved)
        pickHelper.checkIntersection(pickPosition, props.camera);
});

window.addEventListener( 'mousemove', onTouchMove );
window.addEventListener( 'touchmove', onTouchMove );

function onTouchMove( event ) {
    var x, y;
	if ( event.changedTouches ) {

		x = event.changedTouches[ 0 ].pageX;
		y = event.changedTouches[ 0 ].pageY;
	} else {

        x = event.clientX;
        y = event.clientY;

	}

	pickPosition.x = ( x / window.innerWidth ) * 2 - 1;
	pickPosition.y = - ( y / window.innerHeight ) * 2 + 1;
} */

/* document.addEventListener('mouseout', clearPickPosition);
document.addEventListener('mouseleave', clearPickPosition); */

/* document.addEventListener('touchstart', (event) => {
        // prevent the window from scrolling
    event.preventDefault();
    setPickPosition(event.touches[0]);
}, {passive: false});
    
document.addEventListener('touchmove', (event) => {
    setPickPosition(event.touches[0]);
});
    
document.addEventListener('touchend', clearPickPosition); */