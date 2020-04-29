import { MeshPhongMaterial, TextureLoader, Mesh, Vector2, MeshBasicMaterial, MeshStandardMaterial, ImageUtils } from "three/build/three.module"
import { RepeatWrapping, ObjectSpaceNormalMap, TangentSpaceNormalMap } from "three";

var PaintObject = {
    LoadTextureArray: function( _texture ){
        var texture = [];
        for(let i = 0; i < 5; i++){
            texture[i] = new TextureLoader().
                load( 
                    _texture[ Object.keys(_texture)[i] ]
                );
        }

        for(let i = 0; i < 5; i++){
            texture[i] = ImageUtils.loadTexture( _texture[ Object.keys(_texture)[i] ]);
        }
        //console.warn(texture);
        return texture;
    },
//Mai am de facut setari la texturi.
    HouseSetTexture: function( houseMesh, texture){
        console.log(houseMesh);
        houseMesh.traverse(( child ) =>{
            if( child instanceof Mesh ){
                if( child.name == "textureToChange"){
                    /* child.material = new MeshStandardMaterial( { 
                     shininess: 5, 
                        lightMapIntensity: 0.9, 
                        flatShading: false,
                        metalness: 1.0,
				        roughness: 0.4,
				        ambientIntensity: 0.2,
				        aoMapIntensity: 1.0,
				        envMapIntensity: 1.0,
                    }); */

                    console.log(child.material);
                    child.material.map = texture[0];
                    child.material.displacementMap = texture[1];
                    child.material.normalMap = texture[2];
                    child.material.aoMap = texture[3];
                    child.material.specularMap = texture[4];

                    child.material.wrapS = RepeatWrapping;
                    child.material.wrapT = RepeatWrapping;
                    child.material.anisotropy = 4

                    child.material.map.wrapS = RepeatWrapping;
                    child.material.map.wrapT = RepeatWrapping;
                    child.material.map.anisotropy = 4;
                    child.material.map.repeat.set(1.5 , 1.5);


                    child.material.displacementBias = - 0.528408;
                    child.material.displacementScale = 1.0236143;
                    child.material.normalScale = new Vector2( 1, - 1 );

                
                    child.material.needsUpdate = true;
                }
            }
        })
    },

    ObjectTexture: function( mesh, texture ){
        //const material = new MeshPhongMaterial();

        mesh.traverse((child)=>{
            if(child.name === "change_material"){
                console.warn(child);
                //child.material = new MeshStandardMaterial();
                child.material.map = texture[0];
                //child.material.displacementMap = texture[1];
                child.material.normalMap = texture[2];
                child.material.aoMap = texture[3];


                //child.material.specularMap = texture[4];
        
                /* child.material.map.wrapS = RepeatWrapping;
                child.material.map.wrapT = RepeatWrapping;
                child.material.map.anisotropy = 4;
                child.material.map.repeat.set(6, 6);
                
                child.material.normalMapType = TangentSpaceNormalMap;
                child.material.displacementBias = - 0.48000408;
                child.material.displacementScale = 0.9909636143;
                child.material.normalScale = new Vector2( 1.8, - 1.8); */
        
                child.material.needsUpdate = true;
            }
        })
    }
}

export { PaintObject }