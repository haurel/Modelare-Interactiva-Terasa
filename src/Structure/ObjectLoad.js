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
import { PaintObject } from './PaintObject';
import chairTextureSettings from './config/chairTextureSettings';
//ObjectLoad = function( objectPath, positionToScene, 
    //scaleObject, nameObject){
export default class ObjectLoad{

    constructor(objectPath, positionToScene, 
        scaleObject, nameObject){
            this._objectPath = objectPath;
            this._rotation = new Vector3(Math.PI / 2, 0, 0);
            this._position = positionToScene;
            //this._scale = scaleObject;
            this._scale = new Vector3(10, 10, 10);
            this._name = nameObject;
            this.group = new Group();
    }
    
    Load(){
        const loader = new GLTFLoader();
        loader.load( this._objectPath, ( gltf ) =>{
            const mesh = gltf.scene;
            console.log(mesh);
            //mesh.scale.set(30, 30,30);
            mesh.scale.set(2.5, 2.5, 2.5);
            props.objectsMeshOnlyArray.push(mesh);
            //console.log("ObjectLoad-Mesh", props.objectsMeshOnlyArray);
            //mesh.scale.set( this._scale.x, this._scale.y, this._scale.z );
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


            console.log(objectwidth, objectheight, objectdepth);
            mesh.position.set( 0, -objectheight / 2, 0 );
            var box = this.DrawBox( objectwidth, objectheight, objectdepth );
            //console.log("BOX: ", box);
            this.group.add( box );
            this.group.name = "Group of Mesh";

            props.scene.add( box.helper );
            box.add( mesh );
            

            //console.log(props.scene);

            /* var textureArray = PaintObject.LoadTextureArray(
                chairTextureSettings.leather_chair_014
            )
            PaintObject.ObjectTexture( mesh, textureArray ); */
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
            transparent: false,
            opacity: 0.0,
            wireframe: true,
            depthTest: true
        });


        box = new Mesh( geometry, material );
        box.name = "box"
        //if( props.indexDeleteObject === null){
            box.i = props.allObject; props.allObject++;
/*         }else{
            box.i = props.indexDeleteObject;
            props.indexDeleteObject = null;
        }  */

        box.rotation.set( this._rotation.x, this._rotation.y, this._rotation.z );
        box.box= new Box3().setFromObject( box );
        box.position.set( this._position.x, this._position.y, this._position.z );
        box.updateMatrixWorld( true );
        box.helper = new BoxHelper( box, 0xffff00 );
        
        box.helper.material.visible = false;
        box.helper.update();
        box.helper.matrixAutoUpdate = true;
        
        box.width = width;
        box.height = height;
        box.depth = depth;
        
        props.objectsArray.push( box );

        //console.log(props.objectsArray);

        /* props.objectsArray[0].helper.material.visible = true;
        props.objectsArray[0].helper.update(); */
        

        return box;
    };

    RedrawBoxForClone(mesh){
        
    }



 };