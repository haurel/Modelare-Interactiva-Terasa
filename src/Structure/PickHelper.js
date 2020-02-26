import { Raycaster } from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

import props from './config/defaults';
import render from './render';

class PickHelper{
    constructor(){
        this.raycaster = new Raycaster();
        this.pickedObject = null;
        this.pickedObjectNeedHelp = false;
        this.pickedObjectSavedColor = 0;
        this.INTERSECTED = null;
        this.pickedObjectIndex = null;
    }

    Pick(normalizedPosition, scene, camera, time){
        this.raycaster.setFromCamera(normalizedPosition, camera);
        props.draggable = true;
        props.boundingBox.some((mesh, i) => {
            if(this.raycaster.ray.intersectsBox( mesh.box )){
                console.log("Ai selectat un obiect", i);
                mesh.helper.material.visible = true;
                //this.addSelectedObject(mesh);
                //props.outlinePass.selectedObjects = props.selectedObjects;

                
            }else{
                mesh.helper.material.visible = false;
                //props.outlinePass.selectedObjects = [];
                console.log("Obiect deselectat", i);
            }
        });
    }

    checkIntersection(pickPosition, camera){
        this.raycaster.setFromCamera(pickPosition, camera);

        var intersects = this.raycaster.intersectObjects( [ props.scene ], true);

        if( intersects.length > 0){
            var selectedObject = intersects[0].object;
            //console.log(selectedObject);
            this.addSelectedObject(selectedObject);
            props.outlinePass.selectedObjects = selectedObject;
        }else{

        }
    }   

    addSelectedObject(object) {
        props.selectedObjects = [];
        props.selectedObjects.push(object);
    }
}

export { PickHelper as default }

/* document.addEventListener('mousedown', () =>{
                    if(this.raycaster.ray.intersectsBox( mesh.box ) ){
                        //mesh.position.set(Math.random() % 30 + 5, 0, 0);
                        document.addEventListener('mousemove', ()=>{
                            // const projector = new Projector();
                            //const mouse2D = new Vector3(normalizedPosition.x, normalizedPosition.y, 0.5);
                            //const mouse3D = projector.vector.unproject(mouse2D.clone(), camera);
                            //console.log(mouse3D);
                            var vector = new Vector3(normalizedPosition.x, normalizedPosition.y, 0.5);
                            vector.unproject( camera );
                            var dir = vector.sub( camera.position ).normalize();
                            var distance = - camera.position.z / dir.z;
                            var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
                            //console.log(dir, distance, pos);
                            //mesh.position.copy(pos);
        
                            mesh.helper.update();
                            const box_temp = new Box3().setFromObject(mesh.helper);
                            mesh.box = box_temp; 
                            
                        }, false);
                    }
                }); */