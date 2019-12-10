import { Group, HemisphereLight, HemisphereLightHelper, DirectionalLight, DirectionalLightHelper, Camera, CameraHelper } from "three";
import { runInThisContext } from "vm";


export default class Lights extends Group{
    constructor(){
        super();
        this.name = "Lights Settings";
        this.CreateHemispehereLight();
        this.CreateDirectionalLight();
        //this.CreateHelpersForLights();
    }

    CreateHemispehereLight(){
        this.hemiLight = new HemisphereLight(
            0xffffff, //sky color
            0xff00ff, //ground color
            0.2 // intensity color
        );
        this.hemiLight.color.setHSL(0.6, 0.75, 0.5);
        this.hemiLight.groundColor.setHSL(0.095, 0.5, 0.5);
        this.hemiLight.position.set(0, 200, 0);


        this.add(this.hemiLight);
    }

    CreateDirectionalLight(){
        this.directionalLight = new DirectionalLight(
            0xffffff,
            1.89
        );
        //this.directionalLight.position.set(-1, 1.2, 1);
        this.directionalLight.position.set(20, 200, 22);
        //this.directionalLight.position.multiplyScalar(300);

        //this.directionalLight.target.position.set(300, 400, 200);
        
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.mapSize.width = this.directionalLight.shadow.mapSize.height = 1024 * 2;

        const d = 500;

        this.directionalLight.shadow.camera.left = -d;
        this.directionalLight.shadow.camera.right = d;
        this.directionalLight.shadow.camera.top = d;
        this.directionalLight.shadow.camera.bottom = -d;

        this.directionalLight.shadow.camera.far = 3500;
        this.directionalLight.shadow.camera.near = -1000;
        this.directionalLight.shadow.bias = -0.0001;

        this.add(this.directionalLight);
    }

    CreateHelpersForLights(){
        this.groupHelpers = new Group();
        this.helperHemiLight = new HemisphereLightHelper(
            this.hemiLight, 
            600 //size
        );
        this.groupHelpers.add(this.helperHemiLight);

        this.helperDirectionalLight = new DirectionalLightHelper(
            this.directionalLight,
            10,      //size
            0xff0000 //color de unde porneste lumina
        );
        this.groupHelpers.add(this.helperDirectionalLight);

        this.helperLightCamHelper = new CameraHelper(this.directionalLight.shadow.camera);
        this.groupHelpers.add(this.helperLightCamHelper);

        this.add(this.groupHelpers);
    }
}