/**
 * THREE.ObjectLoad
 * @constructor
 * @param objectPath - Location .gltf
 * @param positionToScene - Position of object in Scene VECTOR3
 * @param scaleObject - Object Scale VECTOR3
 * @param nameObject - Object name
 */

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Box3, Vector3, Group, BoxGeometry, MeshBasicMaterial, Mesh, BoxHelper } from "three";
import props from './config/defaults';

//ObjectLoad = function( objectPath, positionToScene, 
    //scaleObject, nameObject){
export default class ObjectLoad{

    constructor(objectPath, positionToScene, 
        scaleObject, nameObject){
            this._objectPath = objectPath;
            this._rotation = new Vector3(0, 0, 0);
            this._position = positionToScene;
            this._scale = scaleObject;
            this._name = nameObject;
            this.group = new Group();
    }
    
    Load(){
        const loader = new GLTFLoader();
        loader.load( this._objectPath, ( gltf ) =>{
            const mesh = gltf.scene;

            mesh.scale.set( this._scale.x, this._scale.y, this._scale.z );
            //mesh.position.set( _position.x, _position.y, _position.z );
            mesh.name = this._name;

            var gltfBox = new Box3().setFromObject( mesh );
            var getSize = new Vector3();

            gltfBox.getSize( getSize );

            var objectwidth = getSize.x;
            var objectheight = getSize.y;
            var objectdepth = getSize.z;
                        
            objectwidth = objectwidth + parseInt(2);
            objectheight = objectheight + parseInt(2);
            objectdepth  = objectdepth + parseInt(1);
            
            mesh.position.set( 0, -objectheight / 2, 0 );
            var box = this.DrawBox( objectwidth, objectheight, objectdepth );
            console.log("BOX: ", box);
            this.group.add( box );
            this.group.name = "Group of Mesh";

            props.scene.add( box.helper );
            box.add( mesh );
            
            console.log(props.scene);
        });
        return this.group;
    };

    DrawBox( width, height, depth ){
        var geometry, material, box;
        geometry = new BoxGeometry(
            width, height, depth
        );
        material = new MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.0,
            wireframe: true,
            depthTest: true
        });


        box = new Mesh( geometry, material );
        box.i = props.allObject; props.allObject++;

        box.rotation.set( this._rotation.x, this._rotation.y, this._rotation.z );
        box.box= new Box3().setFromObject( box );
        box.position.set( this._position.x, this._position.y, this._position.z );
        box.updateMatrixWorld( true );
        box.helper = new BoxHelper( box, 0xffff00 );
        
        box.helper.material.visible = false;
        box.helper.update();
        box.helper.matrixAutoUpdate = true;

        props.objectsArray.push( box );
        

        return box;
    };



 };