import { Group, HemisphereLight, HemisphereLightHelper, DirectionalLight, DirectionalLightHelper, Camera, CameraHelper, SpotLight } from "three";
import { PointLight, AmbientLight, Color, Object3D } from "three/build/three.module";
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import props from '../Structure/config/defaults';

export default class Lights extends Group{
    constructor(){
        super();
        this.name = "Lights Settings";
    
        this.CreateHemispehereLight();
        this.CreateDirectionalLight();
        this.CreateSpotLight();
       
        //this.CreateHelpersForLights();
    }

    CreateHemispehereLight(){
        this.hemiLight = new HemisphereLight(
            //0xffffff, //sky color
            //0xff00ff, //ground color
            //0.01 // intensity color
            //0xddeeff, 0x0f0e0d, 0.06
            0xffffff, 0xffffff, 0.6
        );
        /* this.hemiLight.color.setHSL(0.6, 0.75, 0.5);
        this.hemiLight.groundColor.setHSL(0.095, 0.7, 1); */
        this.hemiLight.color.setHSL( 0.6, 0.75, 0.5 );
        this.hemiLight.groundColor.setHSL( 0.095, 0.5, 0.5 );
        //this.hemiLight.position.set(300, -100, 20);
        this.hemiLight.position.set(0, 50, 0);

        this.add(this.hemiLight);
    }

    CreateDirectionalLight(){
        

        this.directionalLight = new DirectionalLight(
            0xffffff,
            1
            //1.89
        );
        this.directionalLight.position.set(0, -2, 20);
        //this.directionalLight.position.set(200, 100, 200);
        //this.directionalLight.position.set(100, 520, 100);
        this.directionalLight.position.multiplyScalar(5);
        
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.mapSize.width = this.directionalLight.shadow.mapSize.height = 1024 * 2;

        //const d = -100;
        const d = 300;

        this.directionalLight.shadow.camera.left = -d;
        this.directionalLight.shadow.camera.right = d;
        this.directionalLight.shadow.camera.top = d;
        this.directionalLight.shadow.camera.bottom = -d;

        //this.directionalLight.shadow.camera.far = 3500;
        //this.directionalLight.shadow.camera.near = -1000;
        //this.directionalLight.shadow.camera.far = 500;
        //this.directionalLight.shadow.camera.near = -100;

        this.directionalLight.shadowDarkeness = 0.35;
        this.directionalLight.shadow.bias = -0.0001;

        this.add(this.directionalLight);
        //this.add(this.directionalLight.target);
    }

    CreateSpotLight(){
        var geometry = new THREE.SphereGeometry( 1, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        var sphere = new THREE.Mesh( geometry, material );
        //sphere.position.set(40, -12, 10);

        props.transformControlLight = new TransformControls(props.camera2D, props.renderer.domElement);
        var group = new Group();

        group.position.set(40, -12, 10);
        this.spotLight = new SpotLight(0xffffff, 12);
        this.spotLight.castShadow = true;
        this.spotLight.shadow.mapSize.width = 4096;
        this.spotLight.shadow.mapSize.height = 4096;
        this.spotLight.target.position.x = 28;
        this.spotLight.target.position.y = -39;
        this.spotLight.target.position.y = 1;
        this.spotLight.updateMatrixWorld();
        //this.spotLight.position.set(40, -12, 10);

        group.add(this.spotLight);
        group.add(sphere);
        this.add(group);

        props.transformControlLight.setSize(0.4);
        props.transformControlLight.attach( group );
        props.scene.add( props.transformControlLight );
        //console.log(props.scene);

/*         var color = new Color();
        color.setHSL( 0.6, 0.75, 0.5 );
        console.log(  color.getHexString() );
       
        var light = new PointLight( color.getHexString(), 1000, 10 );
        light.position.set( 40, -40, 10);
        this.add(light); */

        /*
        var lighta = new AmbientLight( color.getHexString(), 0.1 );
        this.add(lighta); */
    }

    CreateHelpersForLights(){
        this.groupHelpers = new Group();
        this.helperHemiLight = new HemisphereLightHelper(
            this.hemiLight, 
            600 //size
        );
        //this.groupHelpers.add(this.helperHemiLight);

        this.helperDirectionalLight = new DirectionalLightHelper(
            this.directionalLight,
            10,      //size
            0xff0000 //color de unde porneste lumina
        );
        this.groupHelpers.add(this.helperDirectionalLight);

        this.helperLightCamHelper = new CameraHelper(this.directionalLight.shadow.camera);
        //this.groupHelpers.add(this.helperLightCamHelper);

        this.add(this.groupHelpers);
    }
}