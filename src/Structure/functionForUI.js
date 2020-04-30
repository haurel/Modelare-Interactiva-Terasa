import textureCount from './config/textureCount';
import TextureLoad from './TextureSet';
import props from './config/defaults';
import wallTextureSettings from './config/wallTextureSettings';
import { PaintObject } from './PaintObject';
import teraceTextureSettings from './config/teraceTextureSettings';


export function getSelectedColor(_src){

    for (let [key,value] of Object.entries(wallTextureSettings)) {
        if(key === _src){
            var textureArray = PaintObject.LoadTextureArray(
                value
            )
            PaintObject.HouseSetTexture( props.meshHouse.children[0], textureArray );
        }
    }

}

export function getTeraceColor(_src){
    for(let [key, value] of Object.entries(teraceTextureSettings)){
        if(key === _src){
            var textureArray = PaintObject.LoadTextureArray(
                value
            );
            PaintObject.TeraceChangeTexture( props.terace, textureArray );
        }
    }
}



