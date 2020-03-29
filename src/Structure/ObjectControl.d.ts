import { Camera, Vector3, Vector2, Raycaster, Mesh } from "three/build/three.module";
import { EventDispatcher } from "three";


export class ObjectControl extends EventDispatcher{
    constructor( domElement?: HTMLElement, camera: Camera, objectsArray, plane);

    _camera: Camera;
    //_domElement: HTMLElement | HTMLDocument;
    _dragObjects : [];
    //
    _mouse : Vector2;
    _deltaMouse : Vector3;

    _previousMousePosition : Vector2;
    //_raycaster : Raycaster;
    _offset : Vector3;

    _INTERSECTED : null;
    _SELECTED : null;
    _INDEX : null;
    _SELECTED_TEMP : null;
    _objectForCheckCollision : [];
    
    _isDragged : boolean;
    _isRotated : boolean;
    _itsCollision : boolean;
    _isMoved : boolean;

    _originalObjectPosition : Vector3;

    activate(): void;
    MouseLocation(): void;

    CheckCollision():void;

}