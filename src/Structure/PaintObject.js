import { MeshPhongMaterial, TextureLoader, Mesh, Vector2 } from "three/build/three.module"
import { RepeatWrapping, ObjectSpaceNormalMap } from "three";

var PaintObject = {
    LoadTextureArray: function( _texture ){
        var texture = [];
        for(let i = 0; i < 5; i++){
            texture[i] = new TextureLoader().
                load( 
                    _texture[ Object.keys(_texture)[i] ]
                );
        }
        //console.warn(texture);
        return texture;
    },
//Mai am de facut setari la texturi.
    HouseSetTexture: function( houseMesh, texture){
        houseMesh.traverse(( child ) =>{
            if( child instanceof Mesh ){
                if( child.name == "textureToChange"){
                    child.material = new MeshPhongMaterial( {shininess: 5, 
                        lightMapIntensity: 0.9, 
                        flatShading: false,
                        metalness: 1.0,
				        roughness: 0.4,
				        ambientIntensity: 0.2,
				        aoMapIntensity: 1.0,
				        envMapIntensity: 1.0,
                    });
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

    }
}

export { PaintObject }