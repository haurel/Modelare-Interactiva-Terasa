import { TextureLoader, Mesh, RepeatWrapping, MeshStandardMaterial, TangentSpaceNormalMap,
        Vector2,
        MeshPhongMaterial
} from "three";
import DefaultSettings from './config/teraceTextureSettings';


const textureLoaded = [];

const SetTextureToObject = (mesh, texture) =>{
    mesh.traverse((child) =>{
        if(child instanceof Mesh){
            if(child.name == "textureToChange"){
                child.material = new MeshPhongMaterial({shininess: 5, lightMapIntensity: 0.9});
                child.material.map = texture[0];
                child.material.bumpMap = texture[1];
                child.material.normalMap = texture[2];
                child.material.lightMap = texture[4];
                child.material.specularMap = texture[5];

                /* child.material.color.setHex(0xffffff);
                
                child.material.map = texture[0];
                child.material.map.wrapS = RepeatWrapping;
                child.material.map.wrapT = RepeatWrapping;
                child.material.map.anisotropy = 4;
                child.material.map.repeat.set( 1 , 1);

                child.material.bumpScale = 0.8;
                child.material.bumpMap = texture[1];
                child.material.bumpMap.wrapS = RepeatWrapping;
                child.material.bumpMap.wrapT = RepeatWrapping;
                child.material.bumpMap.anisotropy = 4;
                child.material.bumpMap.repeat.set(1, 1); 
                    
                child.material.roughness = 1.0;
                child.material.roughnessMap= texture[2];
                child.material.roughnessMap.wrapS = RepeatWrapping;
                child.material.roughnessMap.wrapT = RepeatWrapping;
                child.material.roughnessMap.anisotropy = 4;
                child.material.roughnessMap.repeat.set(1, 1);
                    
                //pentru material metalic, 0 - nu 1 - da
                child.material.metalness = 0.0;
                    
                child.material.needsUpdate = true; */
            }
        }
    })
}

const SetTextureBasicMesh = (mesh, texture)=>{
    const material = new MeshStandardMaterial({
        metalness: DefaultSettings.default_material_settings.metalness,
        roughness: DefaultSettings.default_material_settings.roughness,
        bumpScale: DefaultSettings.default_material_settings.bumpScale,
        displacementScale: DefaultSettings.default_material_settings.displacementScale,
        displacementBias: DefaultSettings.default_material_settings.displacementBias,
        emissiveIntensity: DefaultSettings.default_material_settings.emissiveIntensity,
    });
    //console.log(texture);
    mesh.material.map = texture[0];
    mesh.material.map.wrapS = RepeatWrapping;
    mesh.material.map.wrapT = RepeatWrapping;
    mesh.material.map.anisotropy = 4;
    mesh.material.map.repeat.set(3,3);
    
    mesh.material.displacementMap = texture[1];
    mesh.material.displacementMap.wrapS = RepeatWrapping;
    mesh.material.displacementMap.wrapT = RepeatWrapping;
    mesh.material.displacementMap.anisotropy = 4;
    mesh.material.displacementMap.repeat.set(3,3);

    mesh.material.normalMap = texture[2];
    mesh.material.normalMapType = TangentSpaceNormalMap;
    mesh.material.normalScale = new Vector2(0.7, 0.9);
    mesh.material.normalMap.wrapS = RepeatWrapping;
    mesh.material.normalMap.wrapT = RepeatWrapping;
    mesh.material.normalMap.anisotropy = 4;
    mesh.material.normalMap.repeat.set(3, 3);

    //exista textura pentru nuanta metalica
    if(texture[3] !== ""){
        material.metalnessMap = texture[3];
        material.metalnessMap.wrapS = RepeatWrapping;
        material.metalnessMap.wrapT = RepeatWrapping;
        material.metalnessMap.anisotropy = 4;
        material.metalnessMap.repeat.set(3, 3);
    }

    mesh.material.needsUpdate = true;
}

const LoadTexture = (texture) =>{
    /* for(let i = 0; i < 3; i++){
        console.log(texture[Object.keys(texture)[i]]);
    } */
    for(let i = 0; i < 6; i++){
        textureLoaded[i] = new TextureLoader().load(texture[Object.keys(texture)[i]]);
    }
}

export default (mesh, texture, methodSet) =>{
    LoadTexture(texture);
    if(methodSet === "BigMesh"){
        SetTextureToObject(mesh, textureLoaded);
    }else if(methodSet === "BasicMesh"){
        SetTextureBasicMesh(mesh, textureLoaded);
    }
}
