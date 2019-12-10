import { Raycaster, Box3, BoxHelper } from 'three';
import props from './config/defaults';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

class PickHelper{
    constructor(){
        this.raycaster = new Raycaster();
        this.pickedObject = null;
        this.pickedObjectSavedColor = 0;
        this.INTERSECTED = null;
    }

    Pick(normalizedPosition, scene, camera, time){
        this.raycaster.setFromCamera(normalizedPosition, camera);

        props.boundingBox.some((mesh) => {
            if(this.raycaster.ray.intersectsBox( mesh.box ) ){
                console.log("DA");
            }else console.log("NU");
        });

    }
}

export {PickHelper as default}