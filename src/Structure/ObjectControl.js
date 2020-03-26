/**
 * THREE.ObjectControls
 * @constructor
 * @param domElement - the renderer's dom element
 * @param camera - the camera.
 * @param objectsArray - the array with object 
 * @param plane - plane for intersect with object.
 */

import { Vector3, Vector2, Raycaster, Box3, BoxHelper, Matrix4 } from "three";
import props from './config/defaults';
THREE.ObjectControl = function(domElement, camera, objectsArray, plane) {
    /* Function variable */
    _dragObjects = objectsArray;
    _camera = camera;
    _plane = plane;
    domElement =(domElement !== undefined) ? domElement : document;

    /* Standard variable */
    var _mouse, _deltaMouse = new Vector3(); 
    var _previousMousePosition = new Vector2(0,0);
    var _raycaster = new Raycaster();
    var _offset = new Vector3();

    /* FOR OBJECT VARIABLE */
    var _INTERSECTED = null, _SELECTED = null, _INDEX = null, _SELECTED_TEMP = null;
    var _objectForCheckCollision = [], _isDragged = false, _isRotated = false, 
            _itsCollision = false, _isMoved = false;
    var _originalObjectPosition = new Vector3();

    /**
     * @param event - event from domElement
     */
    this.MouseLocation = ( event ) => {
        _mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		_mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    };

    /**
     * @param event - event from domElement
     */
    this.DeltaMouseMove = ( event ) =>{
        _deltaMouse.x = event.offsetX - previousMousePosition.x;
        _deltaMouse.y = event.offsetY - previousMousePosition.y;
    }


    this.CheckCollision = () =>{
        var boxesCollision = false;
        if( _raycaster.ray.intersectBox( _objectForCheckCollision[0].box )){
            boxesCollision = true;
            _itsCollision = true;
        }

        if( boxesCollision && _isMoved ){
            _SELECTED_TEMP.children[0].children[1].material.color.setHex(0xff0000);
            
        }else if( _isMoved ){
            _itsCollision = false;
            _SELECTED_TEMP.children[0].children[1].material.color.setHex(0x00ff00);
        }
    }


    domElement.addEventListener('mousedown', mouseDown, false);
    domElement.addEventListener('mousemove', mouseMove, false);
    domElement.addEventListener('mouseup', mouseUp, false);

//#region Mouse Move, Down, Up
    function mouseDown( event ){
        event.preventDefault();
        MouseLocation( event );

        _raycaster.setFromCamera(_mouse, _camera);

        if( props.parameters.translate ){
            var intersects = _raycaster.intersectObjects( _dragObjects );

            if( intersects.length > 0 ){
                props.orbitControls.enabled = false;
                _SELECTED = intersects[0].object;
                _originalObjectPosition.copy( _SELECTED.position );
                
                _isDragged = true;
                var intersects = _raycaster.intersectObject( _plane );
                _offset.copy( intersects[0].point ).sub( plane.position );

                //container.style.cursor = 'move';
            }
        }else if( props.parameters.rotate ){
            var intersects = _raycaster.intersectObjects( _dragObjects );
            if( intersects.length > 0){
                props.orbitControls.enabled = false;
                _SELECTED = intersects[0].object;
                
                _isRotated = true;

                //container.style.cursor = 'crosshair';
            }
        }
    }

    function mouseMove( event ){
        event.preventDefault();
        MouseLocation( event );

        _raycaster.setFromCamera( _mouse, _camera );
        
        if( _SELECTED ){
            if( props.parameters.translate ){
                var intersects = _raycaster.intersectObject( _plane );

                if( _SELECTED_TEMP === null){
                    CloneToSelectedTemp( _SELECTED );
                }else{
                    _SELECTED_TEMP.position.copy( intersects[0].point.sub( _offset ));
                    _SELECTED_TEMP.helper.update();
                } return;
            }else if( props.parameters.rotate && _isRotated ){
                var angleRad = Math.atan2( _mouse.y - _SELECTED.position.y,
                                    _mouse.X - _SELECTED.position.x );
                var angleOfRotation = ( 180 / Math.PI ) * angleRad;

                _SELECTED.rotation.y = angleOfRotation;
            }
        }

        //If Not SELECTED OBJECT
        var intersects = _raycaster.intersectObject( _dragObjects );
        if( intersects.length > 0 && _SELECTED === null){
            if( props.parameters.translate ){
                if( _INTERSECTED != intersects[0].object ){
                    _INDEX = intersects[0].object.i;

                    _INTERSECTED = intersects[0].object;

                    _plane.applyMatrix4( new Matrix4().makeRotationZ(
                        -Math.PI / 2
                    ));
                    _plane.position.copy( _INTERSECTED.position );
                }

                //container.style.cursor = 'pointer';
                _dragObjects[ _INDEX ].helper.material.visible = true;
                _dragObjects[ _INDEX ].helper.update();

                _dragObjects.some( ( mesh, i) => {
                    if( i !== _INDEX ) _objectForCheckCollision.push( mesh );
                });
            }else if( props.parameters.rotate ){
                if( _INTERSECTED !== intersects[0].object ){
                    _INTERSECTED = intersects[0].object;
                    _INDEX = intersects[0].object.i;
                }
                //container.style.cursor = 'pointer';
                _dragObjects[ _INDEX ].helper.material.visible = true;
                _dragObjects[ _INDEX ].helper.update();
            }
        }else{
            if( props.parameters.translate || props.parameters.rotate){
                if( _INDEX !== null || ( _INDEX !== null && !_isRotated ) ){
                    _dragObjects[ _INDEX ].helper.material.visible = false;
                    _dragObjects[ _INDEX ].helper.update();

                    //container.style.cursor = 'auto';

                    _INTERSECTED = null;
                    _INDEX = null;
                    _objectForCheckCollision = [];
                }
            }
        }
    }

    function mouseUp( event ){
        event.preventDefault();
        MouseLocation( event );

        props.orbitControls.enabled = true;

        if( _INTERSECTED ){
            if( props.parameters.translate ){
                if( _itsCollision ){
                    _SELECTED.position.copy( _originalObjectPosition );
                }else{
                    _plane.position.copy( _INTERSECTED.position );
                    _SELECTED.position.copy( _SELECTED_TEMP.position );
                    _SELECTED.box = Box3().setFromObject( _SELECTED );
                    _SELECTED.updateMatrixWorld( true );
                }
                _SELECTED.children[0].children[0].material.color.setHex(0xffffff);
                _SELECTED.children[0].children[1].material.color.setHex(0xffffff);
                _SELECTED.helper.update();


                props.scene.remove( _SELECTED_TEMP );
                props.scene.remove ( _SELECTED_TEMP.helper );

                _SELECTED_TEMP = _SELECTED = null;
                _isDragged = _isMoved = false;
                _objectForCheckCollision = [];
            }else if( props.parameters.rotate ){
                _SELECTED = null;
                _isRotated = false;
            }
        }
        //container.style.cursor = 'auto';
    }
//#endregion Mouse Move, Down, Up'


    function CloneToSelectedTemp( SELECTED ){
        _SELECTED_TEMP = SELECTED.clone();
        _SELECTED_TEMP.box = new Box3().setFromObject( _SELECTED_TEMP );
        _SELECTED_TEMP.updateMatrixWorld( true );
        _SELECTED_TEMP.helper = new BoxHelper( _SELECTED_TEMP, 0xffff00 );
        _SELECTED_TEMP.helper.update();

        _SELECTED_TEMP.helper.material.visible = true;
        _SELECTED_TEMP.helper.matrixAutoUpdate = true;

        _SELECTED_TEMP.children[0].children[0].material.color.setHex(0x00ff00);
        _SELECTED_TEMP.children[0].children[1].material.color.setHex(0x00ff00);

        props.scene.add( _SELECTED_TEMP );
        props.scene.add( _SELECTED_TEMP.helper );

        _isMoved = true;

        if( _isDragged ) animate(); //!!!!!!!!

    }
};