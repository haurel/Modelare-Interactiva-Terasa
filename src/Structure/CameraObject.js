import { OrthographicCamera } from "three/build/three.module";
import { PerspectiveCamera } from "three";



var camera2D = {
    width : window.innerWidth / 6,
    height : window.innerHeight / 6,
    viewSize : window.innerHeight / 6,
    aspectRatio : (window.innerWidth / 6) / (window.innerHeight / 6),
    far : -200,
    near : 200,
}

var camera3D = {
    fov : 45,
    aspectRatio : (window.innerWidth / 6) / (window.innerHeight / 6),
    near : 1,
    far: 200,
}



var CameraObject = { 
    Camera2D: function (_camera2D = camera2D){
        var camera = new OrthographicCamera(
            ( -_camera2D.aspectRatio * _camera2D.viewSize) / 2,
            ( _camera2D.aspectRatio * _camera2D.viewSize ) / 2,
            _camera2D.viewSize / 2,
            -_camera2D.viewSize / 2,
            _camera2D.far,
            _camera2D.near
        );
        camera.position.set(0, -30, 100); //100
        return camera;
    },

    Camera3D: function ( _camera3D = camera3D){
        var camera = new PerspectiveCamera(
            _camera3D.fov,
            _camera3D.aspectRatio,
            _camera3D.near,
            _camera3D.far
        );
        camera.position.set(30, -120, 50);
        camera.rotation.set(1, 0, 0);
        //camera.position.set(x, y, z);
        return camera;
    },

    Camera3DMoving: function( _camera3D = camera3D){
        var camera = new PerspectiveCamera(
            _camera3D.fov,
            _camera3D.aspectRatio,
            _camera3D.near,
            _camera3D.far
        )

        //camera.position.set(0, -70, 15);
        //amera.position.y = 10;
        /* camera.up.set(0, -1, 1);
        camera.lookAt(0, 1, 0); */
        camera.name = "Camera3DMoving";

        return camera;
    }
}

export { CameraObject }

