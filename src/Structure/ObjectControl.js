/**
 * ObjectControls
 * @constructor
 * @param domElement - the renderer's dom element
 * @param camera - the camera.
 * @param objectsArray - the array with object 
 * @param plane - plane for intersect with object.
 */

import { Vector3, Vector2, Raycaster, Box3, BoxHelper, Matrix4, EventDispatcher, Mesh} from 'three';
import props from './config/defaults';
import prepare from './prepare';
import { PlaneGeometry, MeshBasicMaterial } from 'three/build/three.module';



var ObjectControl = function(domElement, camera, objectsArray, plane){ 
    //if ( domElement === undefined ) console.warn( 'THREE.OrbitControls: The second parameter "domElement" is now mandatory.' );
    //if ( domElement === document ) console.error( 'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.' );
    
    var planeTest = new Mesh( new PlaneGeometry( 100, 100, 30, 30 ), 
    new MeshBasicMaterial( { color: 0x03fc32, opacity: 0, transparent: false, wireframe: true } ) );
    planeTest.visible = true;
    //planeTest.rotateX(Math.PI / 2);
    planeTest.scale.set(10, 10, 10);
    planeTest.name = "Plane Test";
    props.scene.add( planeTest );  

    
    this._dragObjects = objectsArray;
    this._camera = camera;
    //this.domElement = (domElement !== undefined) ? domElement : document;
    //console.log(objectsArray);

    /* Standard variable */
    this._mouse = new Vector2();
    this._deltaMouse = new Vector3(); 
    this._previousMousePosition = new Vector2(0,0);
    var _raycaster = new Raycaster();
    this._offset = new Vector3();

    /* FOR OBJECT VARIABLE */
    this._INTERSECTED = null, 
    this._SELECTED = null,
    this._SELECTED_PREVIOUS = null,
    this._INDEX = null, 
    this._SELECTED_TEMP = null;
    this._objectForCheckCollision = [], 
    this._isDragged = false, 
    this._isRotated = false, 
    this._itsCollision = false, 
    this._isMoved = false;
    this._originalObjectPosition = new Vector3();

    this.activate = function(){
        props.renderer.domElement.addEventListener('mousedown', mouseDown, false);
        props.renderer.domElement.addEventListener('mousemove', mouseMove, false);
        props.renderer.domElement.addEventListener('mouseup', mouseUp, false);
    }
    
    var scope = this;
    /**
    * @param event - event from domElement
    */
    function MouseLocation( event ){
        /* scope._mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        scope._mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; */
        scope._mouse.x = ( ( event.clientX - props.renderer.domElement.offsetLeft ) / props.renderer.domElement.clientWidth ) * 2 - 1;
        scope._mouse.y = - ( ( event.clientY - props.renderer.domElement.offsetTop ) / props.renderer.domElement.clientHeight ) * 2 + 1;   
    };

    /**
     * @param event - event from domElement
     */
    function DeltaMouseMove( event ){
        scope._deltaMouse.x = event.offsetX - previousMousePosition.x;
        scope._deltaMouse.y = event.offsetY - previousMousePosition.y;
    }

    function GetIsDragged(){
        return scope._isDragged;
    }


    this.CheckCollision = () =>{
        var boxesCollision = false;
        //console.log("Check collisionLenght: ", scope._objectForCheckCollision);
        if(scope._objectForCheckCollision.length > 0){
            props.objectsArray.some(( mesh, i )=>{
                if(_raycaster.ray.intersectBox( scope._objectForCheckCollision[i].box )){
                    boxesCollision = true;
                    scope._itsCollision = true;
                    console.clear();
                }
            });
            
        }

        if( boxesCollision && scope._isMoved ){
            domElement.style.cursor = 'no-drop';
            scope._SELECTED_TEMP.children[0].children[1].material.color.setHex(0xff0000);
        }else if( scope._isMoved ){
            scope._itsCollision = false;
            scope._SELECTED_TEMP.children[0].children[1].material.color.setHex(0x00ff00);
            domElement.style.cursor = 'move';
        }
    }

    this.UpdateArrayObject = () =>{
        props.objectsArray.some(( mesh, i )=>{
            mesh.i = i;
            //console.log(mesh);
        });
        props.allObject--;
    }


//#region Mouse Move, Down, Up
    function mouseDown( event ){
        event.preventDefault();
        MouseLocation( event );
        scope.dispatchEvent( { type: 'down' } );

        if( scope._SELECTED_PREVIOUS !== scope._SELECTED ){
            props.objectsArray.some( ( mesh, i) => {
                if( i !== scope._INDEX ) scope._objectForCheckCollision.push( mesh );
            });
        }

        _raycaster.setFromCamera(scope._mouse, props.camera2D);

        //if( props.parameters.translate ){
        if( props.objectActions['drag'] === true){

            var intersects = _raycaster.intersectObjects( props.objectsArray );
            if( intersects.length > 0 ){
                props.orbitControls.enabled = false;
                scope._SELECTED = intersects[0].object;
                scope._originalObjectPosition.copy( scope._SELECTED.position );
                
                scope._isDragged = true;
                var intersects = _raycaster.intersectObject( planeTest );
                scope._offset.copy( intersects[0].point ).sub( planeTest.position );

                domElement.style.cursor = 'move';

                props.objectsArray.some(( mesh, i )=>{
                    if(i !== scope._INDEX) scope._objectForCheckCollision.push(mesh);
                });
            }
        }else if( props.objectActions['rotate'] === true ){
            var intersects = _raycaster.intersectObjects( props.objectsArray );
            if( intersects.length > 0){
                //props.orbitControls.enabled = false;
                scope._SELECTED = intersects[0].object;
                
                scope._isRotated = true;

                domElement.style.cursor = 'crosshair';
            }
        }else if( props.objectActions['delete'] === true){
            var intersects = _raycaster.intersectObjects( props.objectsArray );
            if(intersects.length > 0){
                props.scene.remove( intersects[0].object.parent );
                props.objectsArray[ scope._INDEX ].helper.material.visible = false;
                props.objectsArray[ scope._INDEX ].helper.update();

                
                props.objectsArray.splice( scope._INDEX, 1);
                scope.UpdateArrayObject();
                console.log(props.objectsArray);
            }
        }
    }

    function mouseMove( event ){
        event.preventDefault();
        MouseLocation( event );
        scope.dispatchEvent( { type: 'move' } );

        _raycaster.setFromCamera( scope._mouse, props.camera2D);
        
        if( scope._SELECTED ){
            if( props.objectActions['drag'] === true){
                var intersects = _raycaster.intersectObject( planeTest );

                if( scope._SELECTED_TEMP === null){
                    CloneToSelectedTemp( scope._SELECTED );
                    scope._isMoved = true;
                }else{
                    scope._SELECTED_TEMP.position.copy( intersects[0].point.sub( scope._offset ));
                    scope._SELECTED_TEMP.helper.update();
                } 

                scope.CheckCollision();
                //console.log(props.objectsArray);
                return;
            }else if( props.objectActions['rotate'] === true && scope._isRotated === true ){
                var angleRad = Math.atan2( scope._mouse.y - scope._SELECTED.position.y, scope._mouse.x - scope._SELECTED.position.x );
                var angleOfRotation = ( 180 / Math.PI ) * angleRad;
                
                scope._SELECTED.rotation.y = angleOfRotation;
            }
        }

        var intersects = _raycaster.intersectObjects( props.objectsArray );

        if( intersects.length > 0 && scope._SELECTED === null){
            if( props.objectActions['drag'] === true ){
                if( scope._INTERSECTED != intersects[0].object ){
                    scope._INDEX = intersects[0].object.i;

                    scope._INTERSECTED = intersects[0].object;

                    planeTest.applyMatrix3 = new Matrix4().makeRotationZ( -Math.PI / 2);
                    planeTest.position.copy( scope._INTERSECTED.position );

                }

                domElement.style.cursor = 'pointer';

                props.objectsArray[ scope._INDEX ].helper.material.visible = true;
                props.objectsArray[ scope._INDEX ].helper.update();
                
            }else if( props.objectActions['rotate'] === true ){
                if( scope._INTERSECTED != intersects[0].object ){
                    scope._INTERSECTED = intersects[0].object;
                    scope._INDEX = intersects[0].object.i;

                }
                domElement.style.cursor = 'pointer';
                props.objectsArray[ scope._INDEX ].helper.material.visible = true;
                props.objectsArray[ scope._INDEX ].helper.update();
            }else if( props.objectActions['delete'] === true){
                if( scope._INTERSECTED != intersects[0].object ){
                    scope._INTERSECTED = intersects[0].object;
                    scope._INDEX = intersects[0].object.i;

                }
                domElement.style.cursor = 'pointer';
                props.objectsArray[ scope._INDEX ].helper.material.visible = true;
                props.objectsArray[ scope._INDEX ].helper.update();
            }
        }else{
            if( props.objectActions['drag'] === true){
                if( scope._INDEX !== null){
                    props.objectsArray[ scope._INDEX ].helper.material.visible = false;
                    props.objectsArray[ scope._INDEX ].helper.update();

                    domElement.style.cursor = 'auto';

                    scope._INTERSECTED = null;
                    scope._INDEX = null;
                    scope._objectForCheckCollision = [];
                }
            }
            else if(props.objectActions['rotate'] === true ){
                if(scope._INDEX !== null && !scope._isRotated){
                    props.objectsArray[ scope._INDEX ].helper.material.visible = false;
                    props.objectsArray[ scope._INDEX ].helper.update();

                    domElement.style.cursor = 'auto';

                    scope._INTERSECTED = null;
                    scope._INDEX = null;
                    scope._objectForCheckCollision = [];
                }
            }else if( props.objectActions['delete'] === true){
                if(scope._INDEX !== null){
                    props.objectsArray[ scope._INDEX ].helper.material.visible = false;
                    props.objectsArray[ scope._INDEX ].helper.update();

                    domElement.style.cursor = 'auto';

                    scope._INTERSECTED = null;
                    scope._INDEX = null;
                }
            }
        }
        //scope.dispatchEvent( { type: 'mouseMove', message: 'vroom vroom!' } );
    }

    function mouseUp( event ){
        event.preventDefault();
        MouseLocation( event );
        console.log(scope._INTERSECTED);
        if( scope._INTERSECTED ){
            //if( props.parameters.translate ){
            if( props.objectActions['drag'] === true){
                if( scope._itsCollision ){
                    scope._SELECTED.position.copy( scope._originalObjectPosition );
                    scope._SELECTED.children[0].children[0].material.color.setHex(0xffffff);
                    scope._SELECTED.children[0].children[1].material.color.setHex(0xffffff);
                }else{
                    planeTest.position.copy( scope._INTERSECTED.position );
                    scope._SELECTED.position.copy( scope._SELECTED_TEMP.position );

                    scope._SELECTED.children[0].children[0].material.color.setHex(0xffffff);
                    scope._SELECTED.children[0].children[1].material.color.setHex(0xffffff);
                    scope._SELECTED.box = new Box3().setFromObject( scope._SELECTED );
                    scope._SELECTED.updateMatrixWorld( true );
                    
                    scope._SELECTED.helper.update();
                }

                props.scene.remove( scope._SELECTED_TEMP );
                props.scene.remove ( scope._SELECTED_TEMP.helper );


                scope._SELECTED_PREVIOUS = scope._SELECTED;

                scope._SELECTED_TEMP = null; 
                scope._SELECTED = null;
                scope._isDragged = null; 
                scope._isMoved = false;
                scope._objectForCheckCollision.length = 0;
            }else if( props.objectActions['rotate'] === true ){
                scope._SELECTED = null;
                scope._isRotated = false;
                //console.log("AM RIDICAT MOUSUL", scope._isRotated, scope._SELECTED);
            }else if( props.objectActions['delete'] === true){
                scope._INDEX= null;

            }
        }
        //props.orbitControls.enabled = true;

        domElement.style.cursor = 'auto';
    }
//#endregion Mouse Move, Down, Up'


    function CloneToSelectedTemp( SELECTED ){
        scope._SELECTED_TEMP = SELECTED.clone();
        scope._SELECTED_TEMP.box = new Box3().setFromObject( scope._SELECTED_TEMP );
        scope._SELECTED_TEMP.updateMatrixWorld( true );
        scope._SELECTED_TEMP.helper = new BoxHelper( scope._SELECTED_TEMP, 0xffff00 );


        scope._SELECTED_TEMP.helper.material.visible = true;
        scope._SELECTED_TEMP.helper.matrixAutoUpdate = true;
        scope._SELECTED_TEMP.helper.update();

        scope._SELECTED_TEMP.children[0].children[0].material.color.setHex(0x00ff00);
        scope._SELECTED_TEMP.children[0].children[1].material.color.setHex(0x00ff00);

        props.scene.add( scope._SELECTED_TEMP );
        props.scene.add( scope._SELECTED_TEMP.helper );

        scope._isMoved = true;
    }

    this.activate();
};

ObjectControl.prototype = Object.create( EventDispatcher.prototype );
ObjectControl.prototype.constructor = ObjectControl;

export { ObjectControl };