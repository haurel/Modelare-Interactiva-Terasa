import { MeshPhongMaterial, TextureLoader, Mesh } from "three/build/three.module"

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
                    child.material = new MeshPhongMaterial( {shininess: 5, lightMapIntensity: 0.9} );
                    child.material.map = texture[0];
                    child.material.displacementMap = texture[1];
                    child.material.normalMap = texture[2];
                    child.material.aoMap = texture[3];
                    child.material.specularMap = texture[4];

                    child.material.needsUpdate = true;
                }
            }
        })
    },

    ObjectTexture: function( mesh, texture ){

    }
}

export { PaintObject }