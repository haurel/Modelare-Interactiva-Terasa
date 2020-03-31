import otherTexture from "./config/otherTexture"
import { BoxGeometry, Mesh, RepeatWrapping, TangentSpaceNormalMap } from "three";
import { MeshPhongMaterial, TextureLoader, Group, Vector3, MeshStandardMaterial, 
        MeshBasicMaterial,
        Vector2
    } from "three/build/three.module";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import teraceTextureSettings from "./config/teraceTextureSettings";


var InitializationStaticObjects = {
//#region Grass
    Grass: function(_scale = new Vector3(0.48, 0.48, 0.48), _position = new Vector3(-140, 50, -0.01)){
       /*  if( !_scale.isVector3 || !_position.isVector3 )
            console.warn("Grass Generation error, check scale or position."); */
        const rotation = new Vector3(Math.PI / 2, 0, 0);
        
        var texture = otherTexture.grass_texture;

        var geometry = new BoxGeometry(120, 148, 0.01);
        var material = new MeshPhongMaterial({
            shininess : 5,
            lightMapIntensity : 0.9,
        });
        var meshGrass = new Mesh( geometry, material );
        meshGrass.receiveShadow = true;
        //meshGrass.castShadow = true;

        var textureLoadGrass = [];
        for(let i = 0;i < 5; i++){
            textureLoadGrass[i] = new TextureLoader().load(texture[Object.keys(texture)[i]]);
        }

        //#region texture
        meshGrass.material.map = textureLoadGrass[0];
        meshGrass.material.displacementMap = textureLoadGrass[1];
        meshGrass.material.normalMap = textureLoadGrass[2];
        meshGrass.material.aoMap = textureLoadGrass[3];
        meshGrass.material.specularMap = textureLoadGrass[4];


        meshGrass.material.map.wrapS = RepeatWrapping;
        meshGrass.material.map.wrapT = RepeatWrapping;
        meshGrass.material.map.anisotropy = 4;
        meshGrass.material.map.repeat.set(3,3);
        meshGrass.material.displacementScale = 1.2;
        meshGrass.material.displacementMap.wrapS = RepeatWrapping;
        meshGrass.material.displacementMap.wrapT = RepeatWrapping;
        meshGrass.material.displacementMap.anisotropy = 4;
        meshGrass.material.displacementMap.repeat.set(3,3);
        meshGrass.material.normalMapType = TangentSpaceNormalMap;
        meshGrass.material.normalScale = new Vector2(0.7, 0.9);
        meshGrass.material.normalMap.wrapS = RepeatWrapping;
        meshGrass.material.normalMap.wrapT = RepeatWrapping;
        meshGrass.material.normalMap.anisotropy = 4;
        meshGrass.material.normalMap.repeat.set(3, 3);
        meshGrass.material.aoMapIntensity = 10;
        //#endregion texture

        meshGrass.position.set( _position.x, _position.y, _position.z );
        meshGrass.scale.set( _scale.x, _scale.y, _scale.z );
        //meshGrass.rotation.set( rotation.x, rotation.y, rotation.z );
        meshGrass.name = "Grass";

        //return meshGrass;

        const grassGroup = new Group();

        //grassGroup.add(meshGrass);
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 3; j++){
                var newGrass = meshGrass.clone();
                newGrass.name= "Grass_2";
                newGrass.position.set((_position.x + 40 * i), (_position.y - 60 * j), _position.z);
                grassGroup.add(newGrass);
            }
        }
        return grassGroup;
    },
//#endregion 
//#region Fence
    Fence: function(_scale = new Vector3(0, 0, 0), _position = new Vector3(0, 0, 0)){
        const loader = new GLTFLoader();
        const fenceGroup = new Group();
        loader.load('/src/Structure/House/OtherModels/gardCurte.gltf', (gltf) =>{
            const mesh = gltf.scene;

            mesh.traverse( function (child ){
                if( child instanceof Mesh){
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            })
            //console.log(_position);
            mesh.traverse( function ( child ){
                if(child instanceof Group){
                    if(child.name === "wall"){
                        child.name = "Fence_1";
                        child.scale.set(2.5, 2.5, 2.5);
                        child.position.set(_position.x, _position.y, _position.z);
                        child.rotateZ(Math.PI / 2);
                        var pozX = 0;
                        var pozZ = 5;
                        for(let i = 0; i < 16; i++){
                            if(i >= 10){
                                var newModel = child.clone();
                                newModel.name = "Fence_2"; 
                                newModel.rotation.set(Math.PI / 2, 0, Math.PI /2);
                                newModel.position.set((_position.x + 12.5) + (pozX * 24.1), _position.y, _position.z + (pozZ * 28));
                                fenceGroup.add(newModel);
                                pozZ--;
                            }
                            else if(i >= 6 && i < 10){
                                var newModel = child.clone();
                                newModel.name = "Fence_3"; 
                                newModel.rotation.set(Math.PI / 2, 0, 0);
                                newModel.position.set((_position.x + 12.5) + (pozX * 28), _position.y, _position.z + (5 * 31));
                                fenceGroup.add(newModel);
                                pozX++;
                            }else if(i < 6){
                                var newModel = child.clone();
                                newModel.name = "Fence_4"; 
                                newModel.position.set(_position.x, _position.y, _position.z + (i * 28));
                                fenceGroup.add(newModel);
                            }
                        }
                        fenceGroup.name = "Fence"
                    }
                }
            })
        })
        fenceGroup.receiveShadow = true;
        fenceGroup.castShadow = true;

        //console.log("Fence - Initializare: ", fenceGroup);
        return fenceGroup;
    },
//#endregion
//#region House 
    House: function( _scale = new Vector3(6, 6, 6), _position = new Vector3(0, 0, 0)){
        const meshHouse = new Group();
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        const location = '/src/Structure/House/HouseCompressed/Cyprys_HouseGLTF_002.gltf';
        dracoLoader.setDecoderPath('./node_modules/three/examples/js/libs/draco/');
        loader.setDRACOLoader( dracoLoader );

        loader.load(location, (gltf) => {
            const mesh = gltf.scene;
            mesh.position.set(_position.x, _position.y, _position.z);
            mesh.scale.set(_scale.x, _scale.y, _scale.z);
            mesh.rotation.set(Math.PI / 2, 0, 0);

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
            meshHouse.add(mesh);
        })

        

        return meshHouse;
    },
//#endregion
//#region Terrace
    Terrace: function(_scale = new Vector3(10, 10, 10), _position = new Vector3(28, -15, 1)){
        //const geometry = new BoxGeometry(7 ,7, 0.10, 30, 30, 30);
        const geometry = new BoxGeometry(7, 7, 0.10);
        const material = new MeshStandardMaterial({
            metalness: teraceTextureSettings.default_material_settings.metalness,
            roughness: teraceTextureSettings.default_material_settings.roughness,
            bumpScale: teraceTextureSettings.default_material_settings.bumpScale,
            displacementScale: teraceTextureSettings.default_material_settings.displacementScale,
            displacementBias: teraceTextureSettings.default_material_settings.displacementBias,
            emissiveIntensity: teraceTextureSettings.default_material_settings.emissiveIntensity,
            refractionRatio : -1,
        });

        const meshTerrace = new Mesh( geometry, material );
        meshTerrace.receiveShadow = true;

        meshTerrace.position.set( _position.x, _position.y, _position.z );
        meshTerrace.scale.set( _scale.x, _scale.y, _scale.z );

        var texture = teraceTextureSettings.parchet_terace_002;
        var textureLoadTerrace = [];
        for(let i = 0;i < 4; i++){
            textureLoadTerrace[i] = new TextureLoader().load(texture[Object.keys(texture)[i]]);
        }

        meshTerrace.material.map = textureLoadTerrace[0];
        meshTerrace.material.map.wrapS = RepeatWrapping;
        meshTerrace.material.map.wrapT = RepeatWrapping;
        meshTerrace.material.map.anisotropy = 4;
        meshTerrace.material.map.repeat.set(3,3);
        
        meshTerrace.material.displacementMap = textureLoadTerrace[1];
        meshTerrace.material.displacementMap.wrapS = RepeatWrapping;
        meshTerrace.material.displacementMap.wrapT = RepeatWrapping;
        meshTerrace.material.displacementMap.anisotropy = 4;
        meshTerrace.material.displacementMap.repeat.set(3,3);

        meshTerrace.material.normalMap = textureLoadTerrace[2];
        meshTerrace.material.normalMapType = TangentSpaceNormalMap;
        meshTerrace.material.normalScale = new Vector2(0.7, 0.9);
        meshTerrace.material.normalMap.wrapS = RepeatWrapping;
        meshTerrace.material.normalMap.wrapT = RepeatWrapping;
        meshTerrace.material.normalMap.anisotropy = 4;
        meshTerrace.material.normalMap.repeat.set(3, 3);

        meshTerrace.material.metalnessMap = textureLoadTerrace[3];
        meshTerrace.material.metalnessMap.wrapS = RepeatWrapping;
        meshTerrace.material.metalnessMap.wrapT = RepeatWrapping;
        meshTerrace.material.metalnessMap.anisotropy = 4;
        meshTerrace.material.metalnessMap.repeat.set(3, 3);

        meshTerrace.material.needsUpdate = true;


        return meshTerrace;
    },
//#endregion
}


export { InitializationStaticObjects }