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

        //intersecteaza toate obiectele iar meshele nu le i a complete ci pe bucati
        /* var intersectedObjects = this.raycaster.intersectObjects(scene.children, true);
        console.log("IntersectedObject", intersectedObjects);
        if(intersectedObjects.length > 0){
            console.log("O mers");  
            console.log(props.scene);  
        }else {
            console.log("Nu o mers");
        } */
        
        props.boundingBox.some((mesh) => {
            if(this.raycaster.ray.intersectsBox( mesh.box ) ){
                console.log("DA");
            }else console.log("NU");
        });

        /* const box = new Box3().setFromObject(scene.children[2]);
        const helper = new BoxHelper(scene.children[2], 0xff0000);
        helper.name = "box-helper";
        //console.log(box);s
        if(this.raycaster.ray.intersectsBox(box) === true)
        {
            if(!props.scene.getObjectByName("box-helper")){
                helper.material.visible = true;
                props.scene.add(helper);
            }else props.scene.children[3].material.visible = true;
            
        }else{
            if(!props.scene.getObjectByName("box-helper")){
                helper.material.visible = false;
                props.scene.add(helper);
            }else props.scene.children[3].material.visible = false;
        } */


        /* if (intersectedObjects.length) {
            // pick the first object. It's the closest one
            this.pickedObject = intersectedObjects[0].object;
            // save its color
            this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
            // set its emissive color to flashing red/yellow
            this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
        }else console.log("Nu merge"); */
    }
}

export {PickHelper as default}