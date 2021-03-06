/**
 * ObjectControls
 * @constructor
 * @param domElement - the renderer's dom element
 * @param camera - the camera.
 * @param objectsArray - the array with object 
 * @param plane - plane for intersect with object.
 */

import { Vector3, Vector2, Raycaster, Box3, BoxHelper, Matrix4, EventDispatcher, Mesh} from 'three';
import props from './config/defaults';
import { PlaneGeometry, MeshBasicMaterial, BoxGeometry, Group, Ray, Geometry } from 'three/build/three.module';
import { MeshMaterial } from './MeshMaterial';
import MeshMaterialCount from './config/MeshMaterial';
import { PaintObject } from './PaintObject';

var ObjectControl = function(){ 
    this._mouse = new Vector2();
    this._deltaMouse = new Vector3(); 
    this._previousMousePosition = new Vector2(0,0);
    this._raycaster = new Raycaster();
    this._offset = new Vector3();

    /* FOR OBJECT VARIABLE */
    this._INTERSECTED = null, 
    this._SELECTED = null,
    this._SELECTED_PREVIOUS = null,
    this._INDEX = null, 
    this._SELECTED_TEMP = null;
    this._CURRENTSELECTEDPOSITION = null;
    this._PAINTSELECTEDPOSITION = new Vector3(-100, -40, 5.4);
    this._TERASAPOSITION = null;
    this._TERASAPOSITIONPAINT = new Vector3(-100, -30, 1);
    this._MeshTerace = null;

    this._MATERIAL_COLOR = null;
    this._objectForCheckCollision = [], 
    this._isDragged = false, 
    this._isRotated = false, 
    this._itsCollision = false, 
    this._isMoved = false;
    this._isSelect = false;
    this._sphereScene = false;
    this._originalObjectPosition = new Vector3();

    this._originalCameraPositionX = null;

    this._hoveredObject = null;
    this._latestMouseProjection = null;
    this._toolTipDisplayTimeout;


    this._mouseXOnMouseDown = null;
    this._targetRotationOnMouseDown = null;
    this._targetRotation = null;
    this._windowHalfX = props.renderer.domElement.clientWidth / 2;
    
    this.activate = function(){
        props.renderer.domElement.addEventListener('mousedown', mouseDown, false);
        props.renderer.domElement.addEventListener('mousemove', mouseMove, false);
        props.renderer.domElement.addEventListener('mouseup', mouseUp, false);
    }

    this.dezactive = function(){
        props.renderer.domElement.removeEventListener('mousedown', mouseDown, { passive: true });
        props.renderer.domElement.removeEventListener('mousemove', mouseMove, { passive: true });
        props.renderer.domElement.removeEventListener('mouseup', mouseUp, { passive: true });
    }
    
    var scope = this;

    function DisplayInformation(){
        var divElement = $("#toolTipScene");

        if (divElement && scope._latestMouseProjection) {
            divElement.css({
              display: "block",
              opacity: 0.0
            });
            var canvasHalfWidth = props.renderer.domElement.offsetWidth / 2;
            var canvasHalfHeight = props.renderer.domElement.offsetHeight / 2;

            var tooltipPosition = scope._latestMouseProjection.clone().project(props.camera2D);
            tooltipPosition.x = (tooltipPosition.x * canvasHalfWidth) + canvasHalfWidth + props.renderer.domElement.offsetLeft;
            tooltipPosition.y = -(tooltipPosition.y * canvasHalfHeight) + canvasHalfHeight + props.renderer.domElement.offsetTop;

            var tootipWidth = divElement[0].offsetWidth;
            var tootipHeight = divElement[0].offsetHeight;

            divElement.css({
            left: `${tooltipPosition.x - tootipWidth/2}px`,
            top: `${tooltipPosition.y - tootipHeight - 5}px`
            });
            var display = null;
            var displayTrue = false;
            var displayInfo = null;
            Object.keys(props.objectActions).forEach(v => {
                    if(props.objectActions[v] === true){
                        if(v === 'drag'){
                            displayInfo = ". Mutare obiect prin drag'n'drop";
                        }else if(v === 'paint'){
                            displayInfo = ". Selectarea obiectului va duce la scena de Paiting.";
                        }else if(v === 'delete'){
                            displayInfo = ". Selectarea obiectului duce la stergerea acestuia.";
                        }else if(v === 'rotate'){
							displayInfo = ""
						}
            
                        divElement.find('span').text("Interactive mode: " + v.toUpperCase() + displayInfo);
                        
                        displayTrue = true;

                    }
                } 
                
            )
            if(!displayTrue){
                divElement.find('span').text("Interactive mode: NONE");
            }
            //divElement.find('span').text(display);

            setTimeout(function() {
            divElement.css({
                opacity: 1.0
            });
            }, 25);
        }
    }

    // This will immediately hide tooltip.
    function HideTooltip() {
        var divElement = $("#toolTipScene");
        if (divElement) {
        divElement.css({
            display: "none"
        });
        }
    }
    /**
    * @param event - event from domElement
    */
    function MouseLocation( event ){
        /* scope._mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        scope._mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; */
        scope._mouse.x = ( ( event.clientX - props.renderer.domElement.offsetLeft ) / props.renderer.domElement.clientWidth ) * 2 - 1;
        scope._mouse.y = - ( ( event.clientY - props.renderer.domElement.offsetTop ) / props.renderer.domElement.clientHeight ) * 2 + 1;   
    };

    /**
     * @param event - event from domElement
     */
    function DeltaMouseMove( event ){
        scope._deltaMouse.x = event.offsetX - previousMousePosition.x;
        scope._deltaMouse.y = event.offsetY - previousMousePosition.y;
    }

    function GetIsDragged(){
        return scope._isDragged;
    }

    function CreatePlaneForPainting( _material ){
        const geometry = new PlaneGeometry(7, 5, 30, 30);
        const material = _material;

        scope._MeshTerace = new Mesh( geometry, material );
        scope._MeshTerace.receiveShadow = true;

        scope._MeshTerace.position.set(-100, -30, 1);
        scope._MeshTerace.name = "TeraceForPaint";
        scope._MeshTerace.scale.set(11.65, 12.10, 1);
        props.scene.add( scope._MeshTerace );
    }


    this.CheckCollision = ( _inputMesh ) =>{
        var boxesCollision = false;
        var boxInput = new Box3().setFromObject( _inputMesh );
        console.log(boxInput);
        
        if(scope._objectForCheckCollision.length > 0){
            scope._objectForCheckCollision.some( (mesh, i) =>{
                var meshBox = new Box3().setFromObject( mesh );

                if(boxInput.intersectsBox( meshBox )){
                    boxesCollision = true;
                    scope._itsCollision = true;
                }
                /* if(_raycaster.ray.intersectBox( scope._objectForCheckCollision[i].box )){
                    console.clear();
                    boxesCollision = true;
                    scope._itsCollision = true;
                    
                } */
            });
        }
            

        if( boxesCollision && scope._isMoved ){
            props.renderer.domElement.style.cursor = 'no-drop';
           // scope._SELECTED_TEMP.children[0].children[1].material.color.setHex(0xff0000);

           /* if(scope._SELECTED_TEMP.children[0].children[0] instanceof Group){
                for(let i = 0; i < scope._SELECTED_TEMP.children[0].children[0].length; i++){
                    scope._SELECTED_TEMP.children[0].children[0].children[i].material.color.setHex(0xff0000);
                }
            }else scope._SELECTED_TEMP.children[0].children[0].material.color.setHex(0xff0000); */
        }else if( scope._isMoved ){
            scope._itsCollision = false;

            /* if(scope._SELECTED_TEMP.children[0].children[0] instanceof Group){
                for(let i = 0; i < scope._SELECTED_TEMP.children[0].children[0].length; i++){
                    scope._SELECTED_TEMP.children[0].children[0].children[i].material.color.setHex(0x00ff00);
                }
            }else scope._SELECTED_TEMP.children[0].children[0].material.color.setHex(0x00ff00); */
            //scope._SELECTED_TEMP.children[0].children[1].material.color.setHex(0x00ff00);
            props.renderer.domElement.style.cursor = 'move';
        }
    }

    this.UpdateArrayObject = () =>{
        props.objectsArray.some(( mesh, i )=>{
            mesh.i = i;
            //console.log(mesh);
        });
        props.allObject--;

        props.objectsMeshOnlyArray.some((mesh, i)=>{

        })
    }


//#region Mouse Move, Down, Up
    function mouseDown( event ){
        event.preventDefault();
        MouseLocation( event );
        scope.dispatchEvent( { type: 'down' } );

        
        if( !scope._isSelect ){
            if( scope._SELECTED_PREVIOUS !== scope._SELECTED ){
                console.log(props.objectsArray)
                props.objectsArray.some( ( mesh, i) => {
                    if( i !== scope._INDEX ) scope._objectForCheckCollision.push( mesh );
                });

            }

            scope._raycaster.setFromCamera(scope._mouse, props.camera2D);

            
            var intersects = scope._raycaster.intersectObjects( props.objectsArray );
            if( intersects.length > 0 && intersects[0].object.i !== 0){
                props.orbitControls.enabled = false;
                scope._SELECTED = intersects[0].object;
                
                if( props.objectActions['drag'] ){
                    scope._originalObjectPosition.copy( scope._SELECTED.position );
                
                    var divElement = $("#toolTipScene");
                    if (divElement) {
                    divElement.css({
                        display: "none"
                    });
                    }

                    var intersectPlane = scope._raycaster.intersectObject( props.planeIntersect); //planeTest );
                    
                    scope._offset.copy( intersectPlane[0].point ).sub( props.planeIntersect.position ); //planeTest.position );
                    
                    scope._isDragged = true;
                    props.renderer.domElement.style.cursor = 'move';
                    props.objectsArray.some(( mesh, i )=>{
                        //console.log(i, "->", scope._INDEX);
                        if(i !== scope._INDEX){
                            scope._objectForCheckCollision.push(mesh);
                        }
                    });
                }
                else if( props.objectActions['rotate'] ){
                    scope._isRotated = true;
                    props.renderer.domElement.style.cursor = 'crosshair';

                    scope._mouseXOnMouseDown = event.clientX - scope._windowHalfX;
/*                     scope._targetRotationOnMouseDown = scope._targetRotation; */

                    console.log(scope._targetRotation);
                }
                else if( props.objectActions['delete'] ){
                        props.scene.remove( intersects[0].object.parent );
                        //props.objectsArray[ scope._INDEX ].helper.material.visible = false;
                        //props.objectsArray[ scope._INDEX ].helper.update();
                        console.warn( intersects[0].object.parent );
                        props.objectsArray.splice( scope._INDEX, 1);
                        props.objectsMeshOnlyArray.splice( scope._INDEX , 1);
                        scope.UpdateArrayObject();

                        /* for(const [key, value] of props.priceCalculate.GetObjectsInformation().entries()){
                            console.log(key,  intersects[0].object.parent.objectName);
                            if(key === intersects[0].object.parent.objectName && value === intersects[0].object.parent.price){
                                
                            }
                        } */
                        props.priceCalculate.UpdateObjectPriceAfterDelete(intersects[0].object.parent)

                        document.getElementById("objects").textContent = "Obiecte de exterior: ";
                        for(const [key, value] of props.priceCalculate.GetObjectsInformation().entries()){
                            //console.log(key + ": " +value);
                            document.getElementById("objects").setAttribute('style', 'white-space: pre;');
                            document.getElementById("objects").textContent += key + "- " + value.toFixed(2) + "lei\r\n";
                        }

                        var divElement = $("#toolTipScene");
                        if (divElement) {
                        divElement.css({
                            display: "none"
                        });
                        }

                }
                else if( props.objectActions['paint'] ){
                    if( !scope._isSelect){
                        console.log(props.objectsArray[ scope._INDEX]);
                        if(props.objectsArray[ scope._INDEX].paint === "true"){
                        //console.log( props.objectsArray[ scope._INDEX ].position);
                            scope._CURRENTSELECTEDPOSITION = new Vector3();
                            scope._CURRENTSELECTEDPOSITION.setFromMatrixPosition(props.objectsArray[ scope._INDEX ].matrixWorld);
                        //console.log(scope._CURRENTSELECTEDPOSITION);



                            props.objectsArray[ scope._INDEX ].position.set( scope._PAINTSELECTEDPOSITION.x, 
                                    scope._PAINTSELECTEDPOSITION.y,
                                    scope._PAINTSELECTEDPOSITION.z 
                            );

                            var divElement = $("#toolTipScene");
                            divElement.css({
                                display: "block",
                                opacity: 1.0
                            });


                            divElement.css({
                                left: `${268.386}px`,
                                top: `${150}px`
                            });
                            divElement.find('span').text("Modul Pating, pentru a iesi apasa pe obiect.");


                            props.objectsMeshIndexTextureChange = scope._INDEX;
                            scope._isSelect = true;
                            //console.log(props.objectsArray);
                            MeshMaterial( props.objectsArray[ scope._INDEX ] );


                            scope._TERASAPOSITION = new Vector3();
                            scope._TERASAPOSITION.setFromMatrixPosition( props.scene.getObjectByName('Terace').matrixWorld );

                            /* props.scene.getObjectByName('Terace').position.set(
                                scope._TERASAPOSITIONPAINT.x,
                                scope._TERASAPOSITIONPAINT.y,
                                scope._TERASAPOSITIONPAINT.z
                            ); */

                            CreatePlaneForPainting( props.scene.getObjectByName('Terace').material);



                        /*  scope._TERASAPOSITION = new Vector3();
                            scope._TERASAPOSITION.setFromMatrixPosition( props.scene.children[4].matrixWorld);

                            
                            props.scene.children[4].position.set(
                                scope._TERASAPOSITIONPAINT.x,
                                scope._TERASAPOSITIONPAINT.y,
                                scope._TERASAPOSITIONPAINT.z
                            ); */

                            scope._originalCameraPositionX = props.camera2D.position.x;
                            props.camera2D.zoom = 3.5;
                            props.camera2D.position.setX( -100 );
                            props.camera2D.updateProjectionMatrix();
                        }
                        else{
                            var divElement = $("#toolTipScene");
                            divElement.css({
                                display: "block",
                                opacity: 1.0
                            });


                            var canvasHalfWidth = props.renderer.domElement.offsetWidth / 2;
                            var canvasHalfHeight = props.renderer.domElement.offsetHeight / 2;

                            var tooltipPosition = scope._latestMouseProjection.clone().project(props.camera2D);
                            tooltipPosition.x = (tooltipPosition.x * canvasHalfWidth) + canvasHalfWidth + props.renderer.domElement.offsetLeft;
                            tooltipPosition.y = -(tooltipPosition.y * canvasHalfHeight) + canvasHalfHeight + props.renderer.domElement.offsetTop;

                            var tootipWidth = divElement[0].offsetWidth;
                            var tootipHeight = divElement[0].offsetHeight;

                            divElement.css({
                            left: `${tooltipPosition.x - tootipWidth/2}px`,
                            top: `${tooltipPosition.y - tootipHeight - 5}px`
                            });
                            
                            divElement.find('span').text("Acest obiect nu are mai multe culori.");

                            scope._INDEX = null;
                            scope._INTERSECTED = null;
                            scope._SELECTED = null;
                            props.objectsMeshIndexTextureChange = null;
                            scope._isSelect = false;
                        }
                        //console.log(props.scene);
                        
                    }else if( scope._isSelect ){
                        //props.objectsArray[ scope._INDEX ].helper.material.visible = false;
                        //props.objectsArray[ scope._INDEX ].helper.update();
                        

                        scope._INDEX = null;
                        scope._INTERSECTED = null;
                        scope._SELECTED = null;
                        props.objectsMeshIndexTextureChange = null;
                        scope._isSelect = false;
                    }
                }
            }
        }else{
            scope._raycaster.setFromCamera(scope._mouse, props.camera2D);

            var intersects_material = scope._raycaster.intersectObjects( props.sphereScene );
            //console.log(intersects_material);
            if(intersects_material.length > 0){
                var _arrayTextureName = [];
                var i = intersects_material[0].object.i;
                for (let [key, value] of Object.entries(MeshMaterialCount.objects)) {
					console.log("KEY: " + key + "Value: ",value);
					console.log(props.objectsArray[ scope._INDEX ].name);
                    if(key === props.objectsArray[ scope._INDEX ].name){
                         _arrayTextureName.push( value[i] );
                    } 
                }
                console.log(_arrayTextureName[0]);
                var textureArray = PaintObject.LoadTextureArray( _arrayTextureName[0] );
                //console.warn(props.objectsMeshOnlyArray[props.objectsMeshIndexTextureChange].children[0]);
                PaintObject.ObjectTexture(props.objectsMeshOnlyArray[props.objectsMeshIndexTextureChange], textureArray );
               /*  console.log("INTERSECT",_arrayTextureName); */
            }else{
                var intersects = scope._raycaster.intersectObjects( props.objectsArray );
                if( intersects.length > 0 ){
                    console.log(scope._SELECTED, intersects.object);
                    if( intersects[0].object === scope._SELECTED){
                        //props.objectsArray[ scope._INDEX ].helper.material.visible = false;
                        //props.objectsArray[ scope._INDEX ].helper.update();

                        props.objectsArray[ scope._INDEX ].position.set( scope._CURRENTSELECTEDPOSITION.x, 
                            scope._CURRENTSELECTEDPOSITION.y,
                            scope._CURRENTSELECTEDPOSITION.z 
                        );
                            // 4 daca nu e transformcontrol


                        /* props.scene.getObjectByName('Terace').position.set(
                            scope._TERASAPOSITION.x,
                            scope._TERASAPOSITION.y,
                            scope._TERASAPOSITION.z
                        ); */

                        props.scene.remove( scope._MeshTerace );

                        var divElement = $("#toolTipScene");
                        if (divElement) {
                        divElement.css({
                            display: "none"
                        });
                        }

                        scope._INDEX = null;
                        scope._INTERSECTED = null;
                        scope._SELECTED = null;
                        props.objectsMeshIndexTextureChange = null;
                        scope._isSelect = false;

                        props.sphereScene.forEach(element => {
                            props.scene.remove( element );
                        });
                        props.sphereScene = [];

                        props.camera2D.position.setX( scope._originalCameraPositionX );
                        props.camera2D.zoom = 1;
                        props.camera2D.updateProjectionMatrix();

                        scope._originalCameraPositionX = null;
                        
                    }else{
                        alert("Exista un obiect selectat deja!");
                    }
                }
            }

        } 
    }

    function mouseMove( event ){
        event.preventDefault();
        MouseLocation( event );
        scope.dispatchEvent( { type: 'move' } );

        scope._raycaster.setFromCamera( scope._mouse, props.camera2D);
        

        if( props.objectActions['paint'] && scope._isSelect ){
            var intersects_materials = scope._raycaster.intersectObjects( props.sphereScene );
            if( intersects_materials.length > 0){
                props.renderer.domElement.style.cursor = 'crosshair';
            }else{
                props.renderer.domElement.style.cursor = 'auto';
            }
        }




        if( scope._SELECTED ){
            
            if( props.objectActions['drag'] ){
                var intersects = scope._raycaster.intersectObject( props.planeIntersect ); //planeTest );
                
                if( scope._SELECTED_TEMP === null){
                    CloneToSelectedTemp( scope._SELECTED );
                    scope._isMoved = true;
                }else{
                    scope._SELECTED_TEMP.position.copy( intersects[0].point.sub( scope._offset ));

                    console.log("MOVE:", intersects[0].point, "\n offset: ", scope._offset);
                    //scope._SELECTED_TEMP.helper.update();
                } 

                scope.CheckCollision(scope._SELECTED_TEMP);
                return;
            }else if( props.objectActions['rotate'] && scope._isRotated ){
                /* var angleRad = Math.atan2( scope._mouse.y - scope._SELECTED.position.y, scope._mouse.x - scope._SELECTED.position.x );
                var angleOfRotation = ( 180 / Math.PI ) * angleRad;
                scope._SELECTED.rotation.y += angleOfRotation * 0.00005; */
                var mouseX = event.clientX - scope._windowHalfX;
                
                scope._targetRotation = ( mouseX - scope._mouseXOnMouseDown ) * 0.2;

                
                scope._SELECTED.rotation.y += ( scope._targetRotation - scope._SELECTED.rotation.y ) * 0.09;
                
                /* var geometry;
                geometry = new BoxGeometry(
                    scope._SELECTED.width, scope._SELECTED.height, scope._SELECTED.depth
                );
                scope._SELECTED.updateMatrix(); 
                scope._SELECTED.geometry.applyMatrix( scope._SELECTED.matrix );
                scope._SELECTED.updateMatrixWorld( true );
                

                scope._SELECTED.geometry = geometry;
                scope._SELECTED.box= new Box3().setFromObject( scope._SELECTED ); */
                

            }
        }
        scope._latestMouseProjection = undefined;
        scope._hoveredObject = undefined;

        var intersects = scope._raycaster.intersectObjects( props.objectsArray );
        if( intersects.length > 0 && scope._SELECTED === null && intersects[0].object.i !== 0){

            scope._latestMouseProjection = intersects[0].point;
            scope._hoveredObject = intersects[0].object;

            if (scope._tooltipDisplayTimeout || !scope._latestMouseProjection) {
                clearTimeout(scope._tooltipDisplayTimeout);
                scope._tooltipDisplayTimeout = undefined;
                HideTooltip();
              }
            
              if (!scope._tooltipDisplayTimeout && scope._latestMouseProjection) {
                    scope._tooltipDisplayTimeout = setTimeout(function() {
                        scope._tooltipDisplayTimeout = undefined;
                        DisplayInformation();
                }, 50);
            }

            if( scope._INTERSECTED != intersects[0].object ){
                scope._INDEX = intersects[0].object.i;
                scope._INTERSECTED = intersects[0].object;
        
                props.planeIntersect.applyMatrix3 = new Matrix4().makeRotationZ( -Math.PI / 2);
                props.planeIntersect.position.copy( scope._INTERSECTED.position );

                //props.objectsArray[ scope._INDEX ].helper.material.visible = true;
                //props.objectsArray[ scope._INDEX ].helper.update();

                //props.scene.add( props.objectsArray [ scope._INDEX].helper);
            }

            if( props.objectActions['paint'] && !scope._isSelect){
                props.renderer.domElement.style.cursor = 'pointer';
                //props.objectsArray[ scope._INDEX ].helper.material.visible = true;
                //props.objectsArray[ scope._INDEX ].helper.update();
            }else if( !props.objectActions['paint'] ){
                props.renderer.domElement.style.cursor = 'pointer';
                //props.objectsArray[ scope._INDEX ].helper.material.visible = true;
                //props.objectsArray[ scope._INDEX ].helper.update();
            }


        }else{
            if( scope._INDEX !== null){
                if( props.objectActions['rotate'] && !scope._isRotated){
                    //props.objectsArray[ scope._INDEX ].helper.material.visible = false;
                    //props.objectsArray[ scope._INDEX ].helper.update();
                    props.renderer.domElement.style.cursor = 'auto';

                    scope._INTERSECTED = null;
                    scope._INDEX = null;
                    scope._objectForCheckCollision = [];

                }else if( props.objectActions['paint'] && !scope._isSelect){
                    //props.objectsArray[ scope._INDEX ].helper.material.visible = false;
                    //props.objectsArray[ scope._INDEX ].helper.update();
                    props.renderer.domElement.style.cursor = 'auto';

                    scope._INTERSECTED = null;
                    scope._INDEX = null;
                }else if( !props.objectActions['rotate'] && !props.objectActions['paint']){
                    //props.objectsArray[ scope._INDEX ].helper.material.visible = false;
                    //props.objectsArray[ scope._INDEX ].helper.update();
                    props.renderer.domElement.style.cursor = 'auto';

                    scope._INTERSECTED = null;
                    scope._INDEX = null;
                    scope._objectForCheckCollision = [];
                }
            }
        }

        
    }

    function mouseUp( event ){
        event.preventDefault();
        MouseLocation( event );
        
        if( scope._INTERSECTED ){
            if( props.objectActions['drag'] ){
                if( scope._itsCollision ){
                    scope._SELECTED.position.copy( scope._originalObjectPosition );
                    //if(scope._SELECTED_TEMP.children[0].children[0] instanceof Group){
                        /* for(let i = 0; i < scope._SELECTED_TEMP.children[0].children[0].length; i++){
                            //scope._SELECTED_TEMP.children[0].children[0].children[i].material.color.setHex(0xffffff);
                            scope._SELECTED_TEMP.children[0].children[0].children[i].material.color.setRGB(scope._MATERIAL_COLOR.x, scope._MATERIAL_COLOR.y, scope._MATERIAL_COLOR.z) 
                        }
                    }else scope._SELECTED.children[0].children[0].children[i].material.color.setRGB(scope._MATERIAL_COLOR.x, scope._MATERIAL_COLOR.y, scope._MATERIAL_COLOR.z)  */
                    //scope._SELECTED.children[0].children[0].material.color.setHex(0xffffff);
                    //scope._SELECTED.children[0].children[1].material.color.setHex(0xffffff);
                }else{
                    props.planeIntersect.position.copy( scope._INTERSECTED.position );
                    scope._SELECTED.position.copy( scope._SELECTED_TEMP.position );

                   /*  if(scope._SELECTED_TEMP.children[0].children[0] instanceof Group){
                        for(let i = 0; i < scope._SELECTED_TEMP.children[0].children[0].length; i++){
                            scope._SELECTED_TEMP.children[0].children[0].children[i].material.color.setRGB(scope._MATERIAL_COLOR.x, scope._MATERIAL_COLOR.y, scope._MATERIAL_COLOR.z)
                            //scope._SELECTED_TEMP.children[0].children[0].children[i].material.color.setHex(0xffffff);
                        }
                    }else scope._SELECTED.children[0].children[0].material.color.setRGB(scope._MATERIAL_COLOR.x, scope._MATERIAL_COLOR.y, scope._MATERIAL_COLOR.z)  */
                    //scope._SELECTED.children[0].children[0].material.color.setHex(0xffffff);
                    //scope._SELECTED.children[0].children[1].material.color.setHex(0xffffff);
                    scope._SELECTED.box = new Box3().setFromObject( scope._SELECTED );
                    scope._SELECTED.updateMatrixWorld( true );
                    
                    
                }
                props.scene.remove( scope._SELECTED_TEMP );
                props.scene.remove ( scope._SELECTED_TEMP.helper );
            }
            
            scope._SELECTED_PREVIOUS = scope._SELECTED;

            scope._SELECTED_TEMP = null;
            scope._isDragged = null; 
            scope._isMoved = false;
            scope._objectForCheckCollision.length = 0;
                
            if( scope._isRotated ){
                scope._isRotated = false;
            } 
            if ( props.objectActions['delete'] ) scope._INDEX= null;
            if ( !props.objectActions['paint'] ) scope._SELECTED = null;
                
        }
        //props.orbitControls.enabled = true;

        props.renderer.domElement.style.cursor = 'auto';
    }
//#endregion Mouse Move, Down, Up'


    function CloneToSelectedTemp( SELECTED ){
       /*  scope._MATERIAL_COLOR = new Vector3(SELECTED.children[0].children[0].material.color.r, 
            SELECTED.children[0].children[0].material.color.g,
            SELECTED.children[0].children[0].material.color.b) */

        scope._SELECTED_TEMP = SELECTED.clone();
        scope._SELECTED_TEMP.box = new Box3().setFromObject( scope._SELECTED_TEMP );
        scope._SELECTED_TEMP.updateMatrixWorld( true );
        //scope._SELECTED_TEMP.helper = new BoxHelper( scope._SELECTED_TEMP, 0xffff00 );


        //scope._SELECTED_TEMP.helper.material.visible = true;
        //scope._SELECTED_TEMP.helper.matrixAutoUpdate = true;
        //scope._SELECTED_TEMP.helper.update();

        /* if(scope._SELECTED_TEMP.children[0].children[0] instanceof Group){
            for(let i = 0; i < scope._SELECTED_TEMP.children[0].children[0].length; i++){
                scope._SELECTED_TEMP.children[0].children[0].children[i].material.color.setHex(0x00ff00);
            }
        }else scope._SELECTED_TEMP.children[0].children[0].material.color.setHex(0x00ff00); */
        //scope._SELECTED_TEMP.children[0].children[1].material.color.setHex(0x00ff00);

        props.scene.add( scope._SELECTED_TEMP );
        //props.scene.add( scope._SELECTED_TEMP.helper );

        scope._isMoved = true;
    }

    this.activate();
};

ObjectControl.prototype = Object.create( EventDispatcher.prototype );
ObjectControl.prototype.constructor = ObjectControl;

export { ObjectControl };