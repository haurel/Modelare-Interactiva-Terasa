import props from './config/defaults';
import settings from './config/settings';
import { PerspectiveCamera, OrthographicCamera, Vector3 } from 'three';

export default class Camera{
    constructor(){
        this.OrthographicCamera();
        this.activeCamera = undefined;
    }

    DefaultCamera(){
        props.camera = new PerspectiveCamera(
            settings.camera.fov,
            settings.camera.aspect,
            settings.camera.near,
            settings.camera.far,
        );
        props.camera.position.set(0, 35, 80);
        props.camera.lookAt(new Vector3(0, 0, 0));

        this.activeCamera = "Camera3D";
    }

    OrthographicCamera(){
        props.camera2D = new OrthographicCamera(
            settings.camera2DSigle.left,
            settings.camera2DSigle.right,
            settings.camera2DSigle.top,
            settings.camera2DSigle.bottom,
            settings.camera2DSigle.near,
            settings.camera2DSigle.far
        );

        props.camera2D.position.set(0, 50, 5);
        props.camera2D.zoom = 1;
        props.camera2D.up = new Vector3(0, 0, -1);
        props.camera2D.lookAt(new Vector3(0, -1, 0));

        this.activeCamera = "Camera2D";
    }

    TwoCameraOnScreen(){
        props.camera = new PerspectiveCamera(
            settings.camera.fov,
            settings.camera.aspect,
            settings.camera.near,
            settings.camera.far,
        );
        props.camera.position.set(0, 35, 80);
        props.camera.lookAt(new Vector3(0, 0, 0));

        props.camera2D = new OrthographicCamera(
            -15,		// Left
            55,		// Right
            100,		// Top
            -100,		// Bottom
            0,          // Near 
            100        // Far
        );

        props.camera2D.position.set(0, 50, 5);
        props.camera2D.zoom = 1.2;
        props.camera2D.up = new Vector3(0, 0, -1);
        props.camera2D.lookAt(new Vector3(0, -1, 0));

        this.activeCamera = "Camera2D&3D";
    }

    get ActiveCamera(){
        return this.activeCamera;
    }

    DeleteAllCamera(){
        props.camera2D = undefined;
        props.camera = undefined;
        this.activeCamera = undefined;
    }

}
