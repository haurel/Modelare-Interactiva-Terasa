import { PointLight, BoxGeometry, Mesh, AxesHelper, GridHelper, MeshBasicMaterial, 
         HemisphereLight, HemisphereLightHelper, DirectionalLight, DirectionalLightHelper,
         Group, RepeatWrapping, BoxHelper, Box3, Vector3, TextureLoader, MeshStandardMaterial,
         TangentSpaceNormalMap, Vector2, Texture,
    } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import props from './config/defaults';
import settings from './config/settings';
import wallTextureSettings from './config/wallTextureSettings';
import teraceTextureSettings from './config/teraceTextureSettings';


import TextureLoad from './TextureSet';


/**
 * Build the environment.
 */
const helpers = new Group();
const createHelpers = () =>{
    props.helpersStructure.axesHelper = new AxesHelper(
        settings.axesHelper.axisSize,
    );
    
    props.helpersStructure.gridHelper = new GridHelper(
        settings.gridHelper.size,
        settings.gridHelper.divisions,
    )

    //const cameraHelper = new CameraHelper(props.camera);
    helpers.add(props.helpersStructure.gridHelper, props.helpersStructure.axesHelper);
    //props.scene.add(helpers);
    //props.scene.add(props.helpersStructure.gridHelper, props.helpersStructure.axesHelper);
};

const createLights = () => {
    const lights = [];
    lights[0] = new PointLight(0xffffff, 0.2, 0);
    lights[1] = new PointLight(0xffffff, 0.2, 0);
    lights[2] = new PointLight(0xffffff, 0.2, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    props.scene.add(lights[0]);
    props.scene.add(lights[1]);
    props.scene.add(lights[2]);
}

const lightGroup = new Group();
const createSunLight = () => {
    const hemiLight = new HemisphereLight(0xffffff, 0xff00ff, 0.2);
    hemiLight.color.setHSL(0.6, 0.75, 0.5);
    hemiLight.groundColor.setHSL(0.095, 0.5, 0.5);
    hemiLight.position.set(0, 200, 0);

    //props.scene.add(hemiLight);
    lightGroup.add(hemiLight);

    const helperHemiLight = new HemisphereLightHelper(hemiLight, 600);
    lightGroup.add(helperHemiLight);
    //props.scene.add(helperHemiLight);

    const directionalLight = new DirectionalLight(0xffffff, 1.89);
    directionalLight.position.set(-1, 0.75, 1);
    directionalLight.position.multiplyScalar(300);
    directionalLight.name = "Directional Light";

    //props.scene.add(directionalLight);
    lightGroup.add(directionalLight);

    const helperDirectionalLight = new DirectionalLightHelper(directionalLight, 10, 0xff0000);
    lightGroup.add(helperDirectionalLight);
    //props.scene.add(helperDirectionalLight);

    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024 * 2;

    const d = 300;

    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;

    directionalLight.shadow.camera.far = 3500;
    directionalLight.shadow.bias = -0.0001;


    //props.scene.add(lightGroup);
}

const loadHouse = (locationFile, setPosition, name) => {   
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./node_modules/three/examples/js/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(locationFile, (gltf) => {
        const mesh = gltf.scene;
        mesh.position.set(setPosition.x, setPosition.y, setPosition.z);
        mesh.scale.set(6, 6, 6);
        mesh.position.set(50, 0, -70);
        mesh.rotation.set(0, Math.PI, 0);
        
        mesh.traverse(function (child){
            if(child instanceof Mesh){
                if(child.name === "textureToChange"){
                    child.material = new MeshBasicMaterial({
                        color: 0x0f0f00,
                    });
                }
            }
        })
        console.log(mesh);
        props.meshHouse.add(mesh); 
    })
}

const loadTerace = (setPosition, setSize, name, texture, metalic) => {
    /**
    * Plane 
    */
    const textureLoader = new TextureLoader();
    const geometry = new BoxGeometry(58, 50, 0.01);

    const rotation = new Vector3(Math.PI / 2, 0, 0);
    const material = new MeshStandardMaterial();
    const planeMesh = new Mesh(geometry, material);

    TextureLoad(planeMesh, teraceTextureSettings.ceramic_terace_001, "BasicMesh");

    planeMesh.rotation.set(rotation.x, rotation.y, rotation.z);
    planeMesh.position.set(setPosition.x, setPosition.y, setPosition.z);
    planeMesh.scale.set(setSize.x, setSize.y, setSize.z)
    props.meshHouse.add(planeMesh);

    
    /* const material = new MeshStandardMaterial({
        metalness: 0.0,
        roughness: 0.005,
        bumpScale: 0.5,
        displacementScale: 0,
        displacementBias: 0,
        emissiveIntensity: 0.5,
    });


    textureLoader.load(texture[0], (map)=>{
        map.wrapS = RepeatWrapping;
        map.wrapT = RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(3, 3);
        material.map = map;
        material.needsUpdate = true;
        
    });

    textureLoader.load(texture[1], (map) => {
        map.wrapS = RepeatWrapping;
        map.wrapT = RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(3, 3);
        material.displacementMap = map;
        material.needsUpdate = true;
        
    });

    textureLoader.load(texture[2], (map)=>{
        map.wrapS = RepeatWrapping;
        map.wrapT = RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(3, 3);
        material.normalMap = map;
        material.normalMapType = TangentSpaceNormalMap;
        material.normalScale = new Vector2(0.7, 0.9);
        material.needsUpdate = true;
    });

    if(metalic === true){
        textureLoader.load(texture[3], (map)=>{
            map.wrapS = RepeatWrapping;
            map.wrapT = RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(3, 3);
            material.metalnessMap = map;
            material.metalness = 0.9;
            material.roughness = 0.08;
            material.needsUpdate = true;
        });
    } */

    
}

const loadChair = (locationFile, setPosition, setSize, name) =>{
    const loader = new GLTFLoader();
    loader.load(locationFile, (gltf) =>{
        const mesh = gltf.scene;
        //props.scene.add(mesh);
        
        mesh.scale.set(setSize.x, setSize.y, setSize.z);
        const helper = new BoxHelper(mesh);
        helper.material.visible = false;
        helper.geometry.computeBoundingBox();
        helper.update();

        const boundingBox = new Box3().setFromObject(helper);
        mesh.updateMatrixWorld( true ); // ensure world matrix is up to date
        boundingBox.applyMatrix4( mesh.matrixWorld );
        console.log( boundingBox );
        
        props.boundingBox.push(mesh);

        //se apeleaza doar aici
        constructCollider();

        
        props.boxMeshsLength++;
        
        props.scene.add(mesh);
    })
}

const constructCollider = () => {
    props.boundingBox.forEach((mesh)=>{
        mesh.box = new Box3().setFromObject( mesh );
        //console.log("S", mesh.box);
        mesh.helper = new BoxHelper(mesh, 0xff00ff);
        
        props.scene.add(mesh.helper);
        
    });
}


const tempFunctionForChangeTexture = (event) =>{
    if(event.keyCode == 66){
        //console.log(props.meshHouse.children[1]);
        //console.log(wallTextureSettings.texture_wall_001);
        TextureLoad(props.meshHouse.children[1], wallTextureSettings.texture_wall_001);
    }else if(event.keyCode == 65){
        TextureLoad(props.meshHouse.children[1], wallTextureSettings.texture_wall_002);
    }
}

window.addEventListener('keydown', tempFunctionForChangeTexture, false);

export default createEnvironment  => {
    createHelpers(); createSunLight();
    
    const allHelpersGroup = new Group(); allHelpersGroup.add(lightGroup, helpers);
    props.scene.add(allHelpersGroup);

    props.meshHouse = new Group();
    const position = new Vector3(10, 0 , 0);
    const position2 = new Vector3(0, 0, 0);
                                          
    
    loadTerace(new Vector3(21.5, 0.06, 0), new Vector3(1, 1, 1), "Terace", teraceTextureSettings.ceramic_terace_001, true);
    loadHouse('/src/Structure/House/HouseCompressed/Cyprys_HouseGLTF_002.gltf', position2, "House");


    props.boxMeshs = new Group();
    
    loadChair('/src/Structure/Chair/chair001.gltf', new Vector3(5, 0.06, 10), new Vector3(2.80, 2.80, 2.80), "Chair");
    //props.structure.box = new Mesh(geometry, material);
    
    props.scene.add(props.meshHouse);
}
