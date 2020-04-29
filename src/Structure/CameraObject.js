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

var cameraBoth = {
    camera2D : {
        aspectRatio : (window.innerWidth / 6) / (window.innerHeight / 6),

    },
    camera3 : {

    }
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
        camera.position.set(0, -100, 50);
        camera.rotation.set(1, 0, 0);
        //camera.position.set(x, y, z);
        return camera;
    }
}

export { CameraObject }

 /* var SCREEN_W, SCREEN_H;
    SCREEN_W = window.innerWidth;
    SCREEN_H = window.innerHeight;
    
    
    var left,bottom,width,height;
    left = 0; bottom = 0; width = 0.4*SCREEN_W-2; height = SCREEN_H-2;


    props.renderer.setViewport(left,bottom,width,height);
    props.renderer.setScissor(left,bottom,width,height);
    props.renderer.setScissorTest (true);
    props.camera2D.aspect = width / height;
    props.camera2D.updateProjectionMatrix();
    props.renderer.render(props.scene, props.camera2D);

    left = 0.4*SCREEN_W+1; bottom = 1; width = 0.6*SCREEN_W-2; height = SCREEN_H-2;
    props.renderer.setViewport (left,bottom,width,height);
    props.renderer.setScissor(left,bottom,width,height);
    props.renderer.setScissorTest (true);  // clip out "viewport"
    props.camera.aspect = width / height;
    props.camera.updateProjectionMatrix();
    props.renderer.render(props.scene,props.camera); */