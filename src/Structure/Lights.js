import { Group, HemisphereLight, HemisphereLightHelper, DirectionalLight, DirectionalLightHelper, Camera, CameraHelper, SpotLight } from "three";



export default class Lights extends Group{
    constructor(){
        super();
        this.name = "Lights Settings";
        this.CreateHemispehereLight();
        this.CreateDirectionalLight();
        //this.CreateSpotLight();
        //this.CreateHelpersForLights();
    }

    CreateHemispehereLight(){
        this.hemiLight = new HemisphereLight(
            //0xffffff, //sky color
            //0xff00ff, //ground color
            //0.01 // intensity color
            0xddeeff, 0x0f0e0d, 0.02
        );
        this.hemiLight.color.setHSL(0.6, 0.75, 0.5);
        this.hemiLight.groundColor.setHSL(0.095, 0.7, 1);
        //this.hemiLight.position.set(0, 800, 0);


        this.add(this.hemiLight);
    }

    CreateDirectionalLight(){
        this.directionalLight = new DirectionalLight(
            0xffffff,
            0.64
            //1.89
        );
        //this.directionalLight.position.set(3, 2.3, 2);
        this.directionalLight.position.set(200, 100, 200);
        //this.directionalLight.position.set(100, 520, 100);
        //this.directionalLight.position.multiplyScalar(0.2);

        //this.directionalLight.target.position.set(0, 0, 0);
        
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.mapSize.width = this.directionalLight.shadow.mapSize.height = 1024 * 2;

        const d = -100;

        this.directionalLight.shadow.camera.left = -d;
        this.directionalLight.shadow.camera.right = d;
        this.directionalLight.shadow.camera.top = d;
        this.directionalLight.shadow.camera.bottom = -d;

        //this.directionalLight.shadow.camera.far = 3500;
        //this.directionalLight.shadow.camera.near = -1000;
        this.directionalLight.shadow.camera.far = 500;
        this.directionalLight.shadow.camera.near = -100;
        //this.directionalLight.shadow.bias = -0.0001;

        this.add(this.directionalLight);
        //this.add(this.directionalLight.target);
    }

    CreateSpotLight(){
        this.spotLight = new SpotLight(0xffffff, 0.1);
        this.spotLight.castShadow = true;
        this.spotLight.shadow.mapSize.width = 4096;
        this.spotLight.shadow.mapSize.height = 4096;

        this.spotLight.position.set(30, 120, 50);

        this.add(this.spotLight);
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