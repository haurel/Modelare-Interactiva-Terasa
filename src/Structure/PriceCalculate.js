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

        //console.log(this._priceAllObjects);
    }

    UpdateTeraceMaterial( price, length, width, mesh ){
        this._teraceMaterialPrice = price;
        this._teraceMaterialLength = length / 100; // cm -> m
        this._teraceMaterialWidth = width / 100;    // cm -> m
        //console.log( this._teraceMaterialLength, this._teraceMaterialWidth);
        this.CalculateTeraceSurface( mesh );
    }

    UpdateTotalPrice(){

    }


    CalculateTeraceSurface( mesh ){
        this._teraceMaterialSurfaceArea = this._teraceMaterialWidth * this._teraceMaterialLength; // m
        this._teraceSurfaceArea = mesh.geometry.parameters.width * mesh.geometry.parameters.height;

        this._teraceTotalMaterialNeeded = Math.ceil(this._teraceSurfaceArea / this._teraceMaterialSurfaceArea);

        this._totalPriceTerace = this._teraceMaterialPrice * this._teraceTotalMaterialNeeded;

        //console.warn(this._teraceSurfaceArea + "\n" + this._teraceMaterialSurfaceArea + "\n" + this._teraceTotalMaterialNeeded);
        
    }

    GetTeraceInformation(){
        return[
            this._totalPriceTerace,
            this._teraceTotalMaterialNeeded,
        ]
    }

    GetObjectsInformation(){
        return this._totalObjectInScene;
    }
}
