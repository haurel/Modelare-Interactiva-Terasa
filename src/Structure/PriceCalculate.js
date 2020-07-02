import props from './config/defaults';

export default class PriceCalculate{
    constructor(){
        this._totalprice = null;
        this._totalObjectInScene = new Map();

        this._priceAllObjects = 0;


        this._teraceMaterialPrice = null;
        this._teraceMaterialLength = null;
        this._teraceMaterialWidth = null;
        this._teraceMaterialSurfaceArea = null;
        this._teraceSurfaceArea = null;
        this._teraceTotalMaterialNeeded = null;
        this._totalPriceTerace = null;
        this._totalMaterialM2 = null;
        this._totalMaterialM2PerTerace = null;
    }

    UpdateObjectsInScene( _newmesh ){
        var key = _newmesh.objectName;
        var value = _newmesh.price;

        if(this._totalObjectInScene.has(key)){
            //console.log(this._totalObjectInScene.get(key))
            this._totalObjectInScene.set(key, (value + this._totalObjectInScene.get(key)));
        }
        else this._totalObjectInScene.set(key, value);
        

        this._priceAllObjects += value;
        console.warn("ADD", this._priceAllObjects);
        //console.log(this._priceAllObjects);
    }

    UpdateObjectPriceAfterDelete( _oldmesh ){
        var key = _oldmesh.objectName;
        var value = _oldmesh.price;

        if(this._totalObjectInScene.has(key)){
            if(this._totalObjectInScene.get(key) !== value){
                this._totalObjectInScene.set(key, (this._totalObjectInScene.get(key) - value));
                this._priceAllObjects -= value;
            }else{
                this._totalObjectInScene.delete(key)
                this._priceAllObjects -= value;
            }
        }

        console.warn("DELETE", this._priceAllObjects,  this._totalObjectInScene);

    }

    UpdateTeraceMaterial( price, length, width, mesh ){
        this._teraceMaterialPrice = price;
        this._teraceMaterialLength = length / 100; // cm -> m
        this._teraceMaterialWidth = width / 100;    // cm -> m
        //console.log( this._teraceMaterialLength, this._teraceMaterialWidth);
        this.CalculateTeraceSurface( mesh );
    }

    CalculateTeraceSurface( mesh ){
        this._teraceMaterialSurfaceArea = this._teraceMaterialWidth * this._teraceMaterialLength; // m

        if(mesh.drawMode === 'default'){
            this._teraceSurfaceArea = mesh.geometry.parameters.width * mesh.geometry.parameters.height;
        }else if( mesh.drawMode === 'custom' ){
            var max = mesh.geometry.boundingBox.max;
            var min = mesh.geometry.boundingBox.min;

            var w = (max.x - min.x) / 11.65 // din cauza ca terasa default se scaleaza cu (11.65, 12.10, 1) pentru a avea dim de 7 respectiv 5
            var h = (max.y - min.y) / 12.10

            this._teraceSurfaceArea = w * h;
        }
        
        //this._teraceTotalMaterialNeeded = Math.ceil(this._teraceSurfaceArea / this._teraceMaterialSurfaceArea);
        this._teraceTotalMaterialNeeded = this._teraceSurfaceArea / this._teraceMaterialSurfaceArea;
        this._totalPriceTerace = this._teraceMaterialPrice *  this._teraceSurfaceArea;

        
        this._totalMaterialM2 = 1 / this._teraceMaterialSurfaceArea;
        this._totalMaterialM2PerTerace = this._teraceSurfaceArea * this._totalMaterialM2;
        
    }

    GetTeraceInformation(){
        return[
            this._totalPriceTerace,
            this._teraceTotalMaterialNeeded,
            this._totalMaterialM2,
        ]
    }

    GetTotalPriceObjects(){
        return this._priceAllObjects;
    }

    GetObjectsInformation(){
        return this._totalObjectInScene;
    }
}
