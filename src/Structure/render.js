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
    pickHelper.Pick(pickPosition, props.scene, props.camera, time);
    //pickHelper.ControlPickObj(); 
    //console.log("Am dat click");
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

    props.renderer.autoClear = true;
    props.renderer.setClearColor( 0xfff0f0 );
    props.renderer.setClearAlpha( 0.0 );

    props.composer.render();
    props.renderer.render(props.scene, props.camera);
    props.composer.render();
    props.orbitControls.update();
    
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