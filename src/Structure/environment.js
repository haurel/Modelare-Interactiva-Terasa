import { PointLight, BoxGeometry, MeshPhongMaterial, 
         Mesh, DoubleSide, AxesHelper, GridHelper,
         HemisphereLight, HemisphereLightHelper,
         DirectionalLight, DirectionalLightHelper,
         Group, ImageUtils, sRGBEncoding, RepeatWrapping,
         BoxHelper,
         Box3,
         Vector3,
         TextureLoader,
         MeshLambertMaterial,
         MeshStandardMaterial,
         PlaneGeometry,
         BackSide,
         FrontSide,
         TangentSpaceNormalMap,
         Vector2,
    } from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import props from './config/defaults';
import settings from './config/settings';





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

const loadHouse = (locationFile, setPosition, name, newTexture) => {   
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
        
        

        var _tempMap = new TextureLoader().load(newTexture[0]);
        var _tempMap2 = new TextureLoader().load(newTexture[1]);
        var _tempMap3 = new TextureLoader().load(newTexture[2]);
        /* _tempMap.encoding = sRGBEncoding;
        _tempMap.flipY = false;
        _tempMap2.encoding = sRGBEncoding;
        _tempMap2.flipY = false;
        _tempMap3.encoding = sRGBEncoding;
        _tempMap3.flipY = false; */
        mesh.traverse(function (child){
            if(child instanceof Mesh){
                if(child.name === "walls"){
                   //if(child.material.name == "wood_brown.001"){

                    child.material.map = _tempMap;
                    child.material.map.wrapS = RepeatWrapping;
                    child.material.map.wrapT = RepeatWrapping;
                    child.material.map.anisotropy = 4;
                    child.material.map.repeat.set( 1, 1);

                    child.material.bumpScale = 0.8;
                    child.material.bumpMap = _tempMap2;
                    child.material.bumpMap.wrapS = RepeatWrapping;
                    child.material.bumpMap.wrapT = RepeatWrapping;
                    child.material.bumpMap.anisotropy = 4;
                    child.material.bumpMap.repeat.set(0.9, 0.9); 
                    
                    child.material.roughness = 1.0;
                    child.material.roughnessMap= _tempMap3;
                    child.material.roughnessMap.wrapS = RepeatWrapping;
                    child.material.roughnessMap.wrapT = RepeatWrapping;
                    child.material.roughnessMap.anisotropy = 4;
                    child.material.roughnessMap.repeat.set(0.9, 0.9);
                    
                    //pentru materialul a da a metalic
                    child.material.metalness = 0.0;
                    
                    child.material.needsUpdate = true;
                   //}
                }
            }
        })

        props.meshHouse.add(mesh); 
    })
}

const loadTerace = (setPosition, setSize, name, texture, metalic) => {
    /**
    * Plane 
    */
    const textureLoader = new TextureLoader();
    const geometry = new BoxGeometry(58, 50, 0.01);
    const material = new MeshStandardMaterial({
        metalness: 0.0,
        roughness: 0.005,
        bumpScale: 0.5,
        displacementScale: 0,
        displacementBias: 0,
        emissiveIntensity: 0.5,
    });


    /**
     * Load all 3 map
     */
    textureLoader.load(texture[0], (map)=>{
        map.wrapS = RepeatWrapping;
        map.wrapT = RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(3, 3);
        material.map = map;
        material.side = DoubleSide;
        material.needsUpdate = true;
        
    });

    textureLoader.load(texture[1], (map) => {
        map.wrapS = RepeatWrapping;
        map.wrapT = RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(3, 3);
        material.displacementMap = map;
        material.side = FrontSide;
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
        material.side = FrontSide;
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
            material.side = FrontSide;
            material.needsUpdate = true;
        });
    }

    const rotation = new Vector3(Math.PI / 2, 0, 0)
    const planeMesh = new Mesh(geometry, material);
    planeMesh.rotation.set(rotation.x, rotation.y, rotation.z);
    planeMesh.position.set(setPosition.x, setPosition.y, setPosition.z);
    planeMesh.scale.set(setSize.x, setSize.y, setSize.z)
    props.meshHouse.add(planeMesh);
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
        console.log("S", mesh.box);
        mesh.helper = new BoxHelper(mesh, 0xff00ff);
        
        props.scene.add(mesh.helper);
        
    });
}




export default createEnvironment  => {
    createHelpers(); createSunLight();
    
    const allHelpersGroup = new Group(); allHelpersGroup.add(lightGroup, helpers);
    props.scene.add(allHelpersGroup);

    props.meshHouse = new Group();
    const position = new Vector3(10, 0 , 0);
    const position2 = new Vector3(0, 0, 0);

    /**
     * Teste
     */
    const texture = ["/src/Structure/House/HouseTexture/brick_001_diffuse.jpg",
                    "/src/Structure/House/HouseTexture/brick_001_displacement.jpg",
                    "/src/Structure/House/HouseTexture/brick_001_normal.jpg"
                    ];
    const texture_2 = ["/src/Structure/House/brick_002_diffuse.jpg",
                    "/src/Structure/House/brick_002_displacement.jpg",
                    "/src/Structure/House/brick_002_normal.jpg"
                    ];

    const texture_3 = ["/src/Structure/House/House/tiles_1_diffuse.jpg",
                    "/src/Structure/House/tiles_1_displacement.jpg",
                    "/src/Structure/House/tiles_1_normal.jpg",
                    "/src/Structure/House/tiles_1_roughness.jpg"
                    ];
    const texture_4 = ["/src/Structure/House/House/tiles_2_diffuse.jpg",
                    "/src/Structure/House/tiles_2_displacement.jpg",
                    "/src/Structure/House/tiles_2_normal.jpg",
                    "/src/Structure/House/tiles_2_roughness.jpg"
                    ];
    
                    //repeat 20, 20
    const textureTerace = ["/src/Structure/House/Terasa/ceramic_1_diffuse.jpg",
                            "/src/Structure/House/Terasa/ceramic_1_displacement.jpg",
                            "/src/Structure/House/Terasa/ceramic_1_normal.jpg"];
                    //repeat 6, 6
    const textureTerace_2 = ["/src/Structure/House/Terasa/parchet_1_diffuse.jpg",
                            "/src/Structure/House/Terasa/parchet_1_displacement.jpg",
                            "/src/Structure/House/Terasa/parchet_1_normal.jpg"];  
                    //repeat 15, 15
    const textureTerace_3 = ["/src/Structure/House/Terasa/wood_travertine_1_diffuse.jpg ",
                            "/src/Structure/House/Terasa/wood_travertine_1_displacement.jpg",
                            "/src/Structure/House/Terasa/wood_travertine_1_normal.jpg"]; 
                    //repeat  
    const textureTerace_4 = ["/src/Structure/House/Terasa/parchet_2_diffuse.jpg ",
                            "/src/Structure/House/Terasa/parchet_2_displacement.jpg",
                            "/src/Structure/House/Terasa/parchet_2_normal.jpg",
                            "/src/Structure/House/Terasa/parchet_2_metalic.jpg"];  
                                                    
    loadHouse('/src/Structure/House/HouseCompressed/Cyprys_HouseGLTF_002.gltf', position2, "2", texture_2);
    loadTerace(new Vector3(21.5, 0.06, 0), new Vector3(1, 1, 1), "Terace", textureTerace_4, true);

    props.boxMeshs = new Group();
    
    loadChair('/src/Structure/Chair/chair001.gltf', new Vector3(5, 0.06, 10), new Vector3(2.80, 2.80, 2.80), "Chair");
    //props.structure.box = new Mesh(geometry, material);
    
    props.scene.add(props.meshHouse);
}
