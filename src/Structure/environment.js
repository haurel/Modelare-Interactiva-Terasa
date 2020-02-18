import { BoxGeometry, Mesh, AxesHelper, GridHelper, MeshBasicMaterial, 
         Group, RepeatWrapping, BoxHelper, Box3, Vector3, TextureLoader, MeshStandardMaterial, Vector2,
         Object3D, TangentSpaceNormalMap, ImageUtils, CubeGeometry, BackSide, MeshFaceMaterial, 
         MeshPhongMaterial,
} from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import props from './config/defaults';
import settings from './config/settings';
import wallTextureSettings from './config/wallTextureSettings';
import teraceTextureSettings from './config/teraceTextureSettings';
import chairTextureSetttings from './config/chairTextureSettings';

import TextureLoad from './TextureSet';
import Lights from './Lights';
import otherTexture from './config/otherTexture';

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
                child.receiveShadow = true;
                child.castShadow = true;
            }
        })
        props.meshHouse.add(mesh); 
    })
}

const loadTerace = (setPosition, setSize, name, texture) => {
    /**
    * Plane 
    */
    const textureLoader = new TextureLoader();
    const geometry = new BoxGeometry(58, 50, 0.01);

    const rotation = new Vector3(Math.PI / 2, 0, 0);
    const material = new MeshStandardMaterial();
    const planeMesh = new Mesh(geometry, material);
    planeMesh.receiveShadow = true;
    planeMesh.castShadow = true;
    //console.log(planeMesh.material)
    TextureLoad(planeMesh, texture, "BasicMesh");

    planeMesh.rotation.set(rotation.x, rotation.y, rotation.z);
    planeMesh.position.set(setPosition.x, setPosition.y, setPosition.z);
    planeMesh.scale.set(setSize.x, setSize.y, setSize.z)
    props.meshHouse.add(planeMesh);
}

const gazon = () => {
    var texture = otherTexture.grass_texture;

    const geometry = new BoxGeometry(120, 148, 0.01);

    const rotation = new Vector3(Math.PI / 2, 0, 0);
    const material = new MeshPhongMaterial({
        shininess: 5, lightMapIntensity: 0.9
    })
    //const material = new MeshBasicMaterial({color: 0x9ACD32});
    const planeMesh = new Mesh(geometry, material);
    planeMesh.receiveShadow = true;
    planeMesh.castShadow = true;

    
    const textureLoaded = [];
    for(let i = 0; i < 5; i++){
        textureLoaded[i] = new TextureLoader().load(texture[Object.keys(texture)[i]]);
    }

    planeMesh.material.map = textureLoaded[0];
    planeMesh.material.map.wrapS = RepeatWrapping;
    planeMesh.material.map.wrapT = RepeatWrapping;
    planeMesh.material.map.anisotropy = 4;
    planeMesh.material.map.repeat.set(3,3);

    planeMesh.material.displacementMap = textureLoaded[1];
    planeMesh.material.displacementScale = 1.2;
    planeMesh.material.displacementMap.wrapS = RepeatWrapping;
    planeMesh.material.displacementMap.wrapT = RepeatWrapping;
    planeMesh.material.displacementMap.anisotropy = 4;
    planeMesh.material.displacementMap.repeat.set(3,3);

    planeMesh.material.normalMap = textureLoaded[2];
    planeMesh.material.normalMapType = TangentSpaceNormalMap;
    planeMesh.material.normalScale = new Vector2(0.7, 0.9);
    planeMesh.material.normalMap.wrapS = RepeatWrapping;
    planeMesh.material.normalMap.wrapT = RepeatWrapping;
    planeMesh.material.normalMap.anisotropy = 4;
    planeMesh.material.normalMap.repeat.set(3, 3);

    planeMesh.material.aoMap = textureLoaded[3];
    planeMesh.material.aoMapIntensity = 10;
    planeMesh.material.specularMap = textureLoaded[4];

    var setPosition = new Vector3(21.5, -0.30, 0);
    var setSize = new Vector3(1, 1, 1)
    planeMesh.rotation.set(rotation.x, rotation.y, rotation.z);
    planeMesh.position.set(setPosition.x, setPosition.y, setPosition.z);
    planeMesh.scale.set(setSize.x, setSize.y, setSize.z)

    props.scene.add(planeMesh);
}

const loadChair = (locationFile, setPosition, setSize, name) =>{
    const loader = new GLTFLoader();
    loader.load(locationFile, (gltf) =>{
        const mesh = gltf.scene;

        mesh.scale.set(setSize.x, setSize.y, setSize.z);
        mesh.position.set(setPosition.x, setPosition.y, setPosition.z);
        mesh.name = name;

        const tempTexture = [];
        for(let i = 0; i < 4; i++){
             tempTexture[i] = new TextureLoader().load(chairTextureSetttings.leather_chair_002[Object.keys(chairTextureSetttings.leather_chair_002)[i]]);
        }
        //console.log(text);
       
        //console.log(mesh);
        mesh.traverse((child)=>{
            if(child instanceof Mesh){
                if(child.name === "Cube"){
                    child.material = new MeshBasicMaterial({
                        color: 0xcaa472,
                    });
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
                if(child.name === "Plane"){
                    child.material.map = tempTexture[0];
                    child.material.map.wrapS = RepeatWrapping;
                    child.material.map.wrapT = RepeatWrapping;
                    child.material.map.anisotropy = 4;
                    child.material.map.repeat.set( 0.7, 0.7);

                    /* child.material.displacementMap = tempTexture[1];
                    child.material.displacementMap.wrapS = RepeatWrapping;
                    child.material.displacementMap.wrapT = RepeatWrapping;
                    child.material.displacementMap.anisotropy = 1;
                    child.material.displacementScale = 0.0;
                    child.material.displacementMap.repeat.set(0.7, 0.7); */

                    child.material.normalMap = tempTexture[2];
                    child.material.normalMap.wrapS = RepeatWrapping;
                    child.material.normalMap.wrapT = RepeatWrapping;
                    child.material.normalMap.anisotropy = 8;
                    child.material.normalMap.repeat.set(0.7, 0.7);
                    child.material.normalScale = new Vector2(0.6, 0.9);

                    child.material.roughnessMap = tempTexture[3];
                    child.material.roughnessMap.wrapS = RepeatWrapping;
                    child.material.roughnessMap.wrapT = RepeatWrapping;
                    child.material.roughnessMap.repeat.set(0.7, 0.7);
                    child.material.roughness = 1.0;
                    child.material.metalness = 0.4;

                    
                    child.material.displacementBias = 0.002;
                    child.material.emissiveIntensity = 0.9;
                    child.material.needsUpdate = true;

                    child.receiveShadow = true;
                    child.castShadow = true;
                }
                
            }
        })
        
        const helper = new BoxHelper(mesh);
        helper.material.visible = false;
        helper.geometry.computeBoundingBox();
        helper.update();

        const boundingBox = new Box3().setFromObject(helper);
        mesh.updateMatrixWorld( true ); // ensure world matrix is up to date
        boundingBox.applyMatrix4( mesh.matrixWorld );
        //console.log( boundingBox );
        
        props.boundingBox.push(mesh);

        //se apeleaza doar aici
        constructCollider();

        props.boxMeshsLength++;
        
        
        props.scene.add(mesh);
        //console.log(props.scene);
    })
}

const loadGard = (position, rotation) =>{
    const loader = new GLTFLoader();
    

    loader.load('/src/Structure/House/OtherModels/gardCurte.gltf', (gltf) => {
        const mesh = gltf.scene;
        
        mesh.traverse( function ( child ){
            if(child instanceof Group){
                if(child.name === 'wall'){
                    child.name = "gardCurte";
                    child.scale.set(2.5, 2.5, 2.5);
                    child.position.set(position.x, position.y, position.z);
                    child.rotateZ(Math.PI / 2);
                    //props.fance.add(child);
                    var pozX = 0;
                    var pozZ = 5;
                    for(let i = 0; i < 16; i++){
                        if(i >= 10){
                            var newModel = child.clone();
                            newModel.name = "gardCurte"; 
                            newModel.rotation.set(Math.PI / 2, 0, Math.PI /2);
                            newModel.position.set((position.x + 12.5) + (pozX * 24.1), position.y, position.z + (pozZ * 28));
                            props.fance.add(newModel);
                            pozZ--;
                        }
                        else if(i >= 6 && i < 10){
                            var newModel = child.clone();
                            newModel.name = "gardCurte"; 
                            newModel.rotation.set(Math.PI / 2, 0, 0);
                            newModel.position.set((position.x + 12.5) + (pozX * 28), position.y, position.z + (5 * 31));
                            props.fance.add(newModel);
                            pozX++;
                        }else if(i < 6){
                            var newModel = child.clone();
                            newModel.name = "gardCurte"; 
                            newModel.position.set(position.x, position.y, position.z + (i * 28));
                            props.fance.add(newModel);
                        }
                    }
                    props.fance.name = "GrupGard";
                }
            }
        });
    })
}

const skybox = () =>{
    var skyGeometry = new CubeGeometry( 1000, 1000, 1000 );

    var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
			map: ImageUtils.loadTexture("/src/Structure/Sky/sky.jpg"),
			side: BackSide
		}));
	var skyMaterial = new MeshFaceMaterial( materialArray );
    var skyBox = new Mesh( skyGeometry, skyMaterial );
    props.scene.add(skyBox);
}

const constructCollider = () => {
    props.boundingBox.forEach((mesh)=>{
        mesh.box = new Box3().setFromObject( mesh );
        //console.log("S", mesh.box);
        mesh.helper = new BoxHelper(mesh, 0xff00ff);
        mesh.helper.material.visible = false;
        props.scene.add(mesh.helper);
        
    });
}


const tempFunctionForChangeTexture = (event) =>{
    if(event.keyCode == 66){
        //console.log(props.meshHouse.children[1]);
        //console.log(wallTextureSettings.texture_wall_001);
        TextureLoad(props.meshHouse.children[1], wallTextureSettings.texture_wall_001, "BigMesh");
    }else if(event.keyCode == 65){
        TextureLoad(props.meshHouse.children[1], wallTextureSettings.texture_wall_002, "BigMesh");
    }
}

window.addEventListener('keydown', tempFunctionForChangeTexture, false);

export default createEnvironment  => {
    createHelpers();
    //props.scene.add(helpers);

    const lights = new Lights();
    props.scene.add(lights);

    
    props.fance = new Group();
    props.meshHouse = new Group();
    const position = new Vector3(10, 0 , 0);
    const position2 = new Vector3(0, 0, 0);
                                          
    
    loadTerace(new Vector3(21.5, 0.06, 0), 
            new Vector3(1, 1, 1), 
            "Terace", 
            teraceTextureSettings.parchet_terace_002
    );
    loadHouse('/src/Structure/House/HouseCompressed/Cyprys_HouseGLTF_002.gltf', 
            position2, 
            "House"
    );

    //props.boxMeshs = new Group();

    loadChair('/src/Structure/Chair/chair_001.gltf', 
            new Vector3(5, 0.06, 10), 
            new Vector3(2.80, 2.80, 2.80), 
            "Chair_001"
    );

    loadChair('/src/Structure/Chair/chair_001.gltf',
            new Vector3(15, 0.06, 10),
            new Vector3(2, 2, 2),
            "Chair_002"
    );

    var posGard = -80;
    /* for(let i = 0; i < 6; i++){
        
        loadGard(new Vector3(-30, 0, -80 + (i * 28)));
    } */

    loadGard(new Vector3(-30, 0 , -80));
    /* props.scene.traverse(function (child){
        if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            console.log(i);
        }
    }); */
    //props.structure.box = new Mesh(geometry, material);
    
    


    console.log(props.scene);

    props.scene.add(props.meshHouse, Math.PI / 2);
    props.scene.add(props.fance);
    gazon();
    //skybox();
    
}
