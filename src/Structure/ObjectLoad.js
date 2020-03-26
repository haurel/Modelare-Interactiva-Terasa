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
 THREE.ObjectLoad = function( objectPath, positionToScene, 
    scaleObject, nameObject){

    _objectPath = objectPath;
    _position = positionToScene;
    _scale = scaleObject;
    _name = nameObject;

    var group = new Group();

    this.Load = () =>{
        const loader = new GLTFLoader();
        loader.load( _objectPath, ( gltf ) =>{
            const mesh = gltf.scene;

            mesh.scale.set( _scale.x, _scale.y, _scale.z );
            //mesh.position.set( _position.x, _position.y, _position.z );
            mesh.name = _name;

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

            group.add( box );
            group.name = "Group of Mesh";

            props.scene.add( box.helper );
            box.add( mesh );
        });
        return group;
    };

    this.DrawBox = ( width, height, depth ) => {
        var geometry, material, box;
        geometry = BoxGeometry(
            width, height, depth
        );
        material = MeshBasicMaterial({
            color: 0xffff00,
            tranparent: true,
            opacity: 0,
            wireframe: true,
            depthTest: true
        });


        box = Mesh( geometry, material );
        box.i = props.allObject; props.allObject++;

        box.rotation.set( rotation.x, rotation.y, rotation.z );
        box.box= new Box3().setFromObject( box );
        box.updateMatrixWorld( true );
        box.helper = BoxHelper( box, 0xffff00 );
        box.helper.update();
        box.helper.material.visible = false;
        box.helper.matrixAutoUpdate = true;

        props.objectsArray.push( box );
        box.position.set( position.x, position.y, position.z );

        return box;
    };



 };