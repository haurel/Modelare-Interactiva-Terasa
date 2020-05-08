import { SphereGeometry, MeshBasicMaterial, Mesh, Vector2, Raycaster, Vector3, EventDispatcher, Geometry, LineBasicMaterial, Line, Shape, ShapeGeometry, MeshStandardMaterial, TextureLoader } from "three/build/three.module";
import { DoubleSide, RepeatWrapping, TangentSpaceNormalMap } from "three";

import props from './config/defaults';
import teraceTextureSettings from "./config/teraceTextureSettings";

var CustomTerace = function(){

    this._groupOfPoints = [];
    this._selectedPoint = [];
    this._verticesPoints = [];
    this._intersectedPoint = null;

    var _this = this;
    this.active = function(){
        props.renderer.domElement.addEventListener('mousedown', SetPoints, false);
        window.addEventListener('keydown', DrawSurface);
    }
    function SetPoints(event){
        event.preventDefault();

        var points = new SphereGeometry(0.5, 32, 32);
        var pointsMaterial = new MeshBasicMaterial({
            color: 0xff00f0
        });

        var pointsMesh = new Mesh(points, pointsMaterial);
        pointsMesh.name = "PointTerace";

        var mouse = new Vector2();
        mouse.x = ( ( event.clientX - props.renderer.domElement.offsetLeft ) / props.renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( ( event.clientY - props.renderer.domElement.offsetTop ) / props.renderer.domElement.clientHeight ) * 2 + 1;   

        var raycaster = new Raycaster();
        raycaster.setFromCamera( mouse, props.camera2D );
        var intersects = raycaster.intersectObject( props.planeIntersect );
        if(intersects.length > 0){
            var pos = new Vector3(
                intersects[0].point.x,
                intersects[0].point.y,
                intersects[0].point.z,
            )
            pointsMesh.position.copy( pos );
        }
        _this._groupOfPoints.push( pointsMesh );
        props.scene.add(pointsMesh);
    }

    function DrawSurface(event){
        if(event.keyCode === 90){
            //z 
            props.renderer.domElement.removeEventListener('mousedown', SetPoints, { passive: true });
            //swtich mousedown event
            props.renderer.domElement.addEventListener('mousedown', SelectPoints, false);
        }else if(event.keyCode === 88){
            //x 
            DrawTerace();
        }
    }

    function SelectPoints(event){
        event.preventDefault();

        var mouse = new Vector2();
        mouse.x = ( ( event.clientX - props.renderer.domElement.offsetLeft ) / props.renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( ( event.clientY - props.renderer.domElement.offsetTop ) / props.renderer.domElement.clientHeight ) * 2 + 1;   

        var raycaster = new Raycaster();
        raycaster.setFromCamera( mouse, props.camera2D );
        var intersects = raycaster.intersectObjects( _this._groupOfPoints, true);
        if(intersects.length > 0){
            var pointFound = intersects[0].object;

            if( pointFound != _this._intersectedPoint){
                if(_this._selectedPoint.length > 0){
                    var line = DrawLineBeetwenTwoPoints( _this._selectedPoint[0].position,
                            pointFound.position);
                    props.scene.add(line);

                    var xSelectedPoint = _this._selectedPoint[0].position.x;
                    var ySelectedPoint = _this._selectedPoint[0].position.y;

                    var vertex = [];
                    vertex.push( xSelectedPoint );
                    vertex.push( ySelectedPoint );
                    _this._verticesPoints.push( vertex );
                    
                    vertex = [];
                    var xPointFound = pointFound.position.x,
                    yPointFound = pointFound.position.y;
                    vertex.push( xPointFound );
                    vertex.push( yPointFound );
                    _this._verticesPoints.push( vertex );

                    _this._selectedPoint = [];
                }else{
                    _this._intersectedPoint = pointFound;
                    _this._selectedPoint.push( pointFound );
                }
            }else{
                _this._intersectedPoint = null;
                _this._selectedPoint = [];
            }
        }

    }

    function DrawLineBeetwenTwoPoints( pointStart, pointEnd ){
        var geometryLine = new Geometry();
        geometryLine.vertices.push( pointStart.clone() );
        geometryLine.vertices.push( pointEnd.clone() );

        var materialLine = new LineBasicMaterial({
            color: "yellow"
        })

        var line = new Line(geometryLine, materialLine);
        line.name = "LineTerace";

        return line;
    }

    function DrawTerace(){
        var surface = new Shape();
        surface.moveTo( _this._verticesPoints[0][0],  _this._verticesPoints[0][1] );
        for(var i = 1; i <  _this._verticesPoints.length; i++)
            surface.lineTo(  _this._verticesPoints[i][0],  _this._verticesPoints[i][1] );
        surface.lineTo(  _this._verticesPoints[0][0],  _this._verticesPoints[0][1] );

        var geometry = new ShapeGeometry( surface );

        geometry.computeBoundingBox();
        boxUnwrapUVs(geometry);
        //calculate UV coordinates, if uv attribute is not present, it will be added
       

        //geometry.computeBoundingBox();

        //calculare UV pentru texturare
        /* var max = geometry.boundingBox.max,
            min = geometry.boundingBox.min;
        
        var offset = new Vector2(0 - min.x, 0 - min.y );
        var range = new Vector2(max.x - min.y, max.y - min.y);
        var faces = geometry.faces;

        geometry.faceVertexUvs[0] = [];

        for(var i = 0; i < faces.length; i++){
            var v1 = geometry.vertices[faces[i].a], 
                v2 = geometry.vertices[faces[i].b], 
                v3 = geometry.vertices[faces[i].c];
            
            geometry.faceVertexUvs[0].push([
                new THREE.Vector2((v1.x + offset.x)/range.x ,(v1.y + offset.y)/range.y),
                new THREE.Vector2((v2.x + offset.x)/range.x ,(v2.y + offset.y)/range.y),
                new THREE.Vector2((v3.x + offset.x)/range.x ,(v3.y + offset.y)/range.y)
            ]);    
        }

        geometry.uvsNeedUpdate = true; */


        var material = new MeshStandardMaterial({
            //side: DoubleSide,
        })

        var texture = teraceTextureSettings.default_texture;
        var textureLoadTerrace = [];
        for(let i = 0;i < 3; i++){
            textureLoadTerrace[i] = new TextureLoader().load(texture[Object.keys(texture)[i]]);
        }

        material.wrapS = material.wrapT = RepeatWrapping;
        material.map = textureLoadTerrace[0];
        material.map.wrapS = RepeatWrapping;
        material.map.wrapT = RepeatWrapping;
        material.map.anisotropy = 4;
        material.map.repeat.set(6, 6);
        

        material.normalMap = textureLoadTerrace[1];
        material.normalMap.wrapS = RepeatWrapping;
        material.normalMap.wrapT = RepeatWrapping;
        material.aoMap = textureLoadTerrace[2];
        material.normalMapType = TangentSpaceNormalMap;
        material.normalScale = new Vector2(0.7, 0.9);

        material.needsUpdate = true;



        props.terace = new Mesh(geometry, material);
        props.terace.position.z = 1.2;
        props.scene.add(props.terace);
        /* var hex  = 0xff0000;
        var bbox = new THREE.BoxHelper( props.terace , hex );
        bbox.name = "TeraceBoundingBox";
		bbox.update();
		props.scene.add( bbox ); */

        
		/* var boundingBox = new THREE.Box3().setFromObject(props.terace)
		console.warn("BoudingBox.getSize()",boundingBox.getSize() ); */
                    
        scene.traverse( function(child){
            if(child.name === "PointTerace" || child.name === "LineTerace"){
                child.material.visible = false;
                    
            }
        })
    }

    function boxUnwrapUVs(geometry) {
        if (!geometry.boundingBox) geometry.computeBoundingBox();
        var sz = geometry.boundingBox.getSize(new THREE.Vector3());
        var center = geometry.boundingBox.getCenter(new THREE.Vector3())
        var min = geometry.boundingBox.min;
        if (geometry.faceVertexUvs[0].length == 0) {
          for (var i = 0; i < geometry.faces.length; i++) {
            geometry.faceVertexUvs[0].push([new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2()]);
          }
        }
        for (var i = 0; i < geometry.faces.length; i++) {
          var face = geometry.faces[i];
          var faceUVs = geometry.faceVertexUvs[0][i]
          var va = geometry.vertices[geometry.faces[i].a]
          var vb = geometry.vertices[geometry.faces[i].b]
          var vc = geometry.vertices[geometry.faces[i].c]
          var vab = new THREE.Vector3().copy(vb).sub(va)
          var vac = new THREE.Vector3().copy(vc).sub(va)
          //now we have 2 vectors to get the cross product of...
          var vcross = new THREE.Vector3().copy(vab).cross(vac);
          //Find the largest axis of the plane normal...
          vcross.set(Math.abs(vcross.x), Math.abs(vcross.y), Math.abs(vcross.z))
          var majorAxis = vcross.x > vcross.y ? (vcross.x > vcross.z ? 'x' : vcross.y > vcross.z ? 'y' : vcross.y > vcross.z) : vcross.y > vcross.z ? 'y' : 'z'
          //Take the other two axis from the largest axis
          var uAxis = majorAxis == 'x' ? 'y' : majorAxis == 'y' ? 'x' : 'x';
          var vAxis = majorAxis == 'x' ? 'z' : majorAxis == 'y' ? 'z' : 'y';
          faceUVs[0].set((va[uAxis] - min[uAxis]) / sz[uAxis], (va[vAxis] - min[vAxis]) / sz[vAxis])
          faceUVs[1].set((vb[uAxis] - min[uAxis]) / sz[uAxis], (vb[vAxis] - min[vAxis]) / sz[vAxis])
          faceUVs[2].set((vc[uAxis] - min[uAxis]) / sz[uAxis], (vc[vAxis] - min[vAxis]) / sz[vAxis])
        }
        geometry.elementsNeedUpdate = geometry.verticesNeedUpdate = true;
      }

    this.active();
}

CustomTerace.prototype = Object.create( EventDispatcher.prototype );
CustomTerace.prototype.constructor = CustomTerace;

export { CustomTerace };