export namespace CameraObject{
    /**
    * @param { _camera2D } _camera2D with camera settings(width, height, viewsize, aspectRatio, far, near)
    * @param { _camera2D } _camera2D_array{ widht : var, height: var, viewSize : val, aspectRation: val, far: var, near: var}
    * @returns { camera } Return 2D Camera
    */
    export function Camera2D( _camera2D );
    /**
    * @param { _camera3D } _camera3D with camera settings(width, height, viewsize, aspectRatio, far, near)
    * @param { _camera3D } __camera3D_array{ widht : var, height: var, viewSize : val, aspectRation: val, far: var, near: var}
    * @returns { camera } Return 3D camera
    */
    export function Camera3D( _camera3D );
    /**
    * @param { _cameraBoth } _cameraBoth with camera settings(width, height, viewsize, aspectRatio, far, near)
    * @param { _cameraBoth } _cameraBotharray{ widht : var, height: var, viewSize : val, aspectRation: val, far: var, near: var}
    * @returns { camera } Return half 2D camera half 3D
    */
    export function CameraBoth ( _cameraBoth );
}