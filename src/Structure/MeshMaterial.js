import MeshMaterialCount from './config/MeshMaterial';
import props from './config/defaults';
import { SphereGeometry, MeshPhongMaterial, TextureLoader, Mesh, Vector3 } from 'three/build/three.module';

var MeshMaterial = function( objectSelected ){

    var _object = objectSelected;
    var _objectName = objectSelected.name;
    var _count = 0;
    var _arrayTextureName = [];
    var _arrayObjectToDisplay = [];

    var position = new Vector3();
    position.copy( objectSelected.position );
    position.x += - 10;
    console.log( _objectName );
    for (let [key, value] of Object.entries(MeshMaterialCount.chair)) {
        if(key === _objectName){
            value.forEach( (texture)=>{
                _arrayTextureName.push( texture );
            })
        } 

    }
    console.log( _arrayTextureName );
    console.log( _arrayTextureName[0].diffuse_map)

    for(let i = 0; i <  _arrayTextureName.length; i++){
        var geometry = new SphereGeometry(10, 32, 32);
        var material = new MeshPhongMaterial();

        var texture = new TextureLoader().load(_arrayTextureName[i].diffuse_map);

        material.map = texture;
        var sphere = new Mesh( geometry, material );
        sphere.position.set(position.x, position.y - 10, position.z );
        sphere.i = i;
        position.x += 10;
        props.scene.add( sphere );


    }


    
}
MeshMaterial.prototype.constructor = MeshMaterial;
export { MeshMaterial };