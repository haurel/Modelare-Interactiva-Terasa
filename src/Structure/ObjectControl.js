/**
 * ObjectControls
 * @constructor
 * @param domElement - the renderer's dom element
 * @param camera - the camera.
 * @param objectsArray - the array with object 
 * @param plane - plane for intersect with object.
 */

import { Vector3, Vector2, Raycaster, Box3, BoxHelper, Matrix4 } from "three";
import props from './config/defaults';
//THREE.ObjectControl = function(domElement, camera, objectsArray, plane) {
var ObjectControl = function(domElement, camera, objectsArray, plane){ 
    if ( domElement === undefined ) console.warn( 'THREE.OrbitControls: The second parameter "domElement" is now mandatory.' );
    if ( domElement === document ) console.error( 'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.' );
    
    var scope = this;
    
    this._dragObjects = objectsArray;
    this._camera = camera;
    this._plane = plane;
    this.domElement = (domElement !== undefined) ? domElement : document;
    
        /* Standard variable */
    this._mouse = new Vector2();
    this._deltaMouse = new Vector3(); 
    this._previousMousePosition = new Vector2(0,0);
    this._raycaster = new Raycaster();
    this._offset = new Vector3();

        /* FOR OBJECT VARIABLE */
    this._INTERSECTED = null, 
    this._SELECTED = null,
    this._INDEX = null, 
    this._SELECTED_TEMP = null;
    this._objectForCheckCollision = [], 
    this._isDragged = false, 
    this._isRotated = false, 
    this._itsCollision = false, 
    this._isMoved = false;
    this._originalObjectPosition = new Vector3();


    

    /**
     * @param event - event from domElement
     */
    function MouseLocation( event ){
        scope._mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		scope._mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    };

    /**
     * @param event - event from domElement
     */
    function DeltaMouseMove( event ){
        scope._deltaMouse.x = event.offsetX - previousMousePosition.x;
        scope._deltaMouse.y = event.offsetY - previousMousePosition.y;
    }


    function CheckCollision(){
        var boxesCollision = false;
        if( scope._raycaster.ray.intersectBox( scope._objectForCheckCollision[0].box )){
            boxesCollision = true;
            scope._itsCollision = true;
        }

        if( boxesCollision && scope._isMoved ){
            scope._SELECTED_TEMP.children[0].children[1].material.color.setHex(0xff0000);
            
        }else if( _isMoved ){
            scope._itsCollision = false;
            scope._SELECTED_TEMP.children[0].children[1].material.color.setHex(0x00ff00);
        }
    }


    domElement.addEventListener('mousedown', mouseDown, false);
    domElement.addEventListener('mousemove', mouseMove, false);
    domElement.addEventListener('mouseup', mouseUp, false);

//#region Mouse Move, Down, Up
    function mouseDown( event ){
        event.preventDefault();
        MouseLocation( event );

        scope._raycaster.setFromCamera(scope._mouse, scope._camera);

        if( props.parameters.translate ){
            var intersects = scope._raycaster.intersectObjects( scope._dragObjects );

            if( intersects.length > 0 ){
                props.orbitControls.enabled = false;
                scope._SELECTED = intersects[0].object;
                scope._originalObjectPosition.copy( scope._SELECTED.position );
                
                scope._isDragged = true;
                var intersects = scope._raycaster.intersectObject( _plane );
                scope._offset.copy( intersects[0].point ).sub( scope._plane.position );

                //container.style.cursor = 'move';
            }
        }else if( props.parameters.rotate ){
            var intersects = scope._raycaster.intersectObjects( scope._dragObjects );
            if( intersects.length > 0){
                props.orbitControls.enabled = false;
                scope._SELECTED = intersects[0].object;
                
                scope._isRotated = true;

                //container.style.cursor = 'crosshair';
            }
        }
    }

    function mouseMove( event ){
        event.preventDefault();
        MouseLocation( event );

        scope._raycaster.setFromCamera( scope._mouse, scope._camera );
        
        if( scope._SELECTED ){
            if( props.parameters.translate ){
                var intersects = _raycaster.intersectObject( scope._plane );

                if( scope._SELECTED_TEMP === null){
                    CloneToSelectedTemp( scope._SELECTED );
                }else{
                    scope._SELECTED_TEMP.position.copy( intersects[0].point.sub( scope._offset ));
                    scope._SELECTED_TEMP.helper.update();
                } return;
            }else if( props.parameters.rotate && scope._isRotated ){
                var angleRad = Math.atan2( scope._mouse.y - scope._SELECTED.position.y,
                    scope._mouse.X - scope._SELECTED.position.x );
                var angleOfRotation = ( 180 / Math.PI ) * angleRad;

                scope._SELECTED.rotation.y = angleOfRotation;
            }
        }

        //If Not SELECTED OBJECT
        var intersects = scope._raycaster.intersectObjects( scope._dragObjects );
        if( intersects.length > 0 && _SELECTED === null){
            if( props.parameters.translate ){
                if( scope._INTERSECTED != intersects[0].object ){
                    scope._INDEX = intersects[0].object.i;

                    scope._INTERSECTED = intersects[0].object;

                    scope._plane.applyMatrix4( new Matrix4().makeRotationZ(
                        -Math.PI / 2
                    ));
                    scope._plane.position.copy( scope._INTERSECTED.position );
                }

                //container.style.cursor = 'pointer';
                scope._dragObjects[ _INDEX ].helper.material.visible = true;
                scope._dragObjects[ _INDEX ].helper.update();

                scope._dragObjects.some( ( mesh, i) => {
                    if( i !== scope._INDEX ) scope._objectForCheckCollision.push( mesh );
                });
            }else if( props.parameters.rotate ){
                if( scope._INTERSECTED !== intersects[0].object ){
                    scope._INTERSECTED = intersects[0].object;
                    scope._INDEX = intersects[0].object.i;
                }
                //container.style.cursor = 'pointer';
                scope._dragObjects[ _INDEX ].helper.material.visible = true;
                scope. _dragObjects[ _INDEX ].helper.update();
            }
        }else{
            if( props.parameters.translate || props.parameters.rotate){
                if( scope._INDEX !== null || ( scope._INDEX !== null && !scope._isRotated ) ){
                    scope._dragObjects[ scope._INDEX ].helper.material.visible = false;
                    scope._dragObjects[ scope._INDEX ].helper.update();

                    //container.style.cursor = 'auto';

                    scope._INTERSECTED = null;
                    scope._INDEX = null;
                    scope._objectForCheckCollision = [];
                }
            }
        }
    }

    function mouseUp( event ){
        event.preventDefault();
        MouseLocation( event );

        props.orbitControls.enabled = true;

        if( scope._INTERSECTED ){
            if( props.parameters.translate ){
                if( scope._itsCollision ){
                    scope._SELECTED.position.copy( scope._originalObjectPosition );
                }else{
                    scope._plane.position.copy( _INTERSECTED.position );
                    scope._SELECTED.position.copy( _SELECTED_TEMP.position );
                    scope._SELECTED.box = Box3().setFromObject( _SELECTED );
                    scope._SELECTED.updateMatrixWorld( true );
                }
                scope._SELECTED.children[0].children[0].material.color.setHex(0xffffff);
                scope._SELECTED.children[0].children[1].material.color.setHex(0xffffff);
                scope._SELECTED.helper.update();


                props.scene.remove( scope._SELECTED_TEMP );
                props.scene.remove ( scope._SELECTED_TEMP.helper );

                scope._SELECTED_TEMP = _SELECTED = null;
                scope._isDragged = _isMoved = false;
                scope._objectForCheckCollision = [];
            }else if( props.parameters.rotate ){
                scope._SELECTED = null;
                scope._isRotated = false;
            }
        }
        //container.style.cursor = 'auto';
    }
//#endregion Mouse Move, Down, Up'


    function CloneToSelectedTemp( SELECTED ){
        scope._SELECTED_TEMP = SELECTED.clone();
        scope._SELECTED_TEMP.box = new Box3().setFromObject( scope._SELECTED_TEMP );
        scope._SELECTED_TEMP.updateMatrixWorld( true );
        scope._SELECTED_TEMP.helper = new BoxHelper( scope._SELECTED_TEMP, 0xffff00 );
        scope._SELECTED_TEMP.helper.update();

        scope._SELECTED_TEMP.helper.material.visible = true;
        scope._SELECTED_TEMP.helper.matrixAutoUpdate = true;

        scope._SELECTED_TEMP.children[0].children[0].material.color.setHex(0x00ff00);
        scope._SELECTED_TEMP.children[0].children[1].material.color.setHex(0x00ff00);

        props.scene.add( _SELECTED_TEMP );
        props.scene.add( _SELECTED_TEMP.helper );

        scope._isMoved = true;

        //if( _isDragged ) animate(); //!!!!!!!!

    }
};

//ObjectControl.prototype = Object.create( EventDispatcher.prototype );
ObjectControl.prototype.constructor = ObjectControl;

export { ObjectControl }