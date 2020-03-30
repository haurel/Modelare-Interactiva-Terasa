/* import { Raycaster, Box3, BoxHelper, Vector2, Mesh, PlaneGeometry, MeshBasicMaterial, Vector3, Ray } from 'three';
import { Projector } from 'three/examples/jsm/renderers/Projector'

import props from './config/defaults';
import render from './render';

//private methods and variables

var _mousePosition = new Vector2(0, 0);
var _raycaster = new Raycaster();
var _camera;
var _SELECTED;
var _plane;
var _INTERSECTED;
var _offset = new Vector3();
var _mouseOnObject = -1;

function _CreatePlane(){
    _plane = new Mesh(
        new PlaneGeometry(100, 100, 8, 8),
        new MeshBasicMaterial({
            color: 0x03fc32,
            opacity: 0.25,
            transparent: false, //true
            wireframe: true
        })
    );
    _plane.rotation.set(0, 0, Math.PI / 2);
    _plane.position.set(0, 1, 0);
    
    _plane.visible = true; //false
    _plane.name = "PLANE FOR INTERSECT";
    props.scene.add(_plane);
}

export default class PickHelper{
    constructor(){
        _CreatePlane();
    }

    SetMousePosition(mousep){
        _mousePosition = mousep;
    }

    SetCamera(camera){
        _camera = camera;
    }

    CalculateMousePosition(event){
        event.preventDefault();
        var mouse = new Vector2();

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        _raycaster.setFromCamera(_mousePosition, _camera);

        if(_SELECTED){
            var _intersects = _raycaster.intersectObject ( _plane );
            _SELECTED.position.copy( _intersects[0].point.sub(_offset));
            return;
        }
    
        var _intersects = _raycaster.intersectObjects( props.boundingBox, true );
        
        if(_intersects.length > 0){
            _mouseOnObject = _intersects[0].object.parent.i;
            console.log(_mouseOnObject);
            if(_INTERSECTED !== _intersects[0].object){
                if(_INTERSECTED){
                    console.log(_mouseOnObject);
                    
                }
                _INTERSECTED = _intersects[0].object;
                _plane.position.copy( _INTERSECTED.position );
                _plane.lookAt( _camera.position );
            }
            document.body.style.cursor = 'pointer';
            if(_mouseOnObject !== -1){
                props.boundingBox[_mouseOnObject].helper.material.visible = true;
                props.boundingBox[_mouseOnObject].helper.update();
            }
        }else{
            _INTERSECTED = null;
            document.body.style.cursor = 'auto';
            if(_mouseOnObject !== -1){
                props.boundingBox[_mouseOnObject].helper.material.visible = false;
                props.boundingBox[_mouseOnObject].helper.update();
                _mouseOnObject = -1;
            }
        }
    }

    MoveObject(event){
        event.preventDefault();
        var mouse = new Vector2();

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        _raycaster.setFromCamera(mouse, _camera);
        var _intersects = _raycaster.intersectObjects( props.boundingBox, true );
        if(_intersects.length > 0){
            _SELECTED = _intersects[0].object;
            var _intersects = _raycaster.intersectObject( _plane );
            console.log(_intersects);
            _offset.copy( _intersects[0].point).sub( _plane.position );
            document.body.style.cursor = 'move';
        }
    }

    CancelMove(event){
        event.preventDefault();

        if(_INTERSECTED){
            _plane.position.copy( _INTERSECTED.position );

            _SELECTED = null;
        }

        document.body.style.cursor = 'auto';
    }


} */

/* class PickHelper{
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
        
        
        props.boundingBox.some((mesh, i) => { */
            
            /* if(this.raycaster.ray.intersectsBox( mesh.box )){
                //console.log("Ai selectat un obiect", i);
                //if(this.INTERSECTED !== typeof mesh && typeof this.INTERSECTED !== "object"){
                //if(this.INTERSECTED !== mesh || this.INTERSECTED === null){
                mesh.helper.material.visible = true;
                props.boundingBox[i].helper.update();
                
                //props.control.attach(mesh);
                console.log(props.boundingBox[i].box);
                this.INTERSECTED = mesh;
                props.indexOfObject = i;                

            }
            else{
                mesh.helper.material.visible = false;
                if(this.INTERSECTED !== null && this.INTERSECTED === mesh){
                    console.log("Am intrat");
                    //props.control.detach();
                    //props.control.dispose(); 
                    this.INTERSECTED = null;
                }
                //props.outlinePass.selectedObjects = [];
                //console.log("Obiect deselectat", i);
            } */

/*             if(this.raycaster.ray.intersectsBox( mesh.box )){
                  this.INTERSECTED = mesh;       

            }
            else{
                
            }
        });
    }


}

export { PickHelper as default } */





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