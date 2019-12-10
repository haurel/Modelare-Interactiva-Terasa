import { TextureLoader, Mesh, RepeatWrapping, MeshStandardMaterial, TextureEncoding } from "three";
import {  } from './config/teraceTextureSettings';


const textureLoaded = [];

const SetTextureToObject = (mesh, texture) =>{
    mesh.traverse((child) =>{
        if(child instanceof Mesh){
            if(child.name == "textureToChange"){
                child.material.color.setHex(0xffffff);
                
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
                    
                child.material.needsUpdate = true;
            }
        }
    })
}

const SetTextureBasicMesh = (mesh, texture)=>{
    const material = new MeshStandardMaterial({
        metalness: default_material_settings.metalness,
        roughness: default_material_settings.roughness,
        bumpScale: default_material_settings.bumpScale,
        displacementScale: default_material_settings.displacementScale,
        displacementBias: default_material_settings.displacementBias,
        emissiveIntensity: default_material_settings.emissiveIntensity,
    });

    material.map = texture[0];
    material.map.wrapS = RepeatWrapping;
    material.map.wrapT = RepeatWrapping;
    material.map.anisotropy = 4;
    material.map.repeat.set(3,3);
    
    material.displacementMap = texture[1];
    material.displacementMap.wrapS = RepeatWrapping;
    material.displacementMap.wrapT = RepeatWrapping;
    material.displacementMap.anisotropy = 4;
    material.displacementMap.repeat.set(3,3);

    material.normalMap = texture[2];
    material.normalMapType = TangentSpaceNormalMap;
    material.normalScale = new Vector2(0.7, 0.9);
    material.normalMap.wrapS = RepeatWrapping;
    material.normalMap.wrapT = RepeatWrapping;
    material.normalMap.anisotropy = 4;
    material.normalMap.repeat.set(3, 3);

    //exista textura pentru nuanta metalica
    if(texture[3] !== ""){
        material.metalnessMap = texture[3];
        material.metalnessMap.wrapS = RepeatWrapping;
        material.metalnessMap.wrapT = RepeatWrapping;
        material.metalnessMap.anisotropy = 4;
        material.metalnessMap.repeat.set(3, 3);
    }

    material.needsUpdate = true;
}

const LoadTexture = (texture) =>{
    /* for(let i = 0; i < 3; i++){
        console.log(texture[Object.keys(texture)[i]]);
    } */
    for(let i = 0; i < 4; i++){
        textureLoaded[i] = new TextureLoader().load(texture[Object.keys(texture)[i]]);
    }
}

export default (mesh, texture, methodSet) =>{
    LoadTexture(texture);
    if(methodSet === "BigMesh"){
        SetTextureToObject(mesh, textureLoaded);
    }else if(methodSet === "BasicMesh"){

    }
}
