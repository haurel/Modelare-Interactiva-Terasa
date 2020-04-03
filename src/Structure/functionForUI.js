import textureCount from './config/textureCount';
import TextureLoad from './TextureSet';
import props from './config/defaults';
import wallTextureSettings from './config/wallTextureSettings';
import { PaintObject } from './PaintObject';


export default function getSelectedColor(_src){
    /* _src = _src.replace(/^.*[\\\/]/, '');
    var x = _src.substr(0, _src.lastIndexOf('.')); */
    //console.log(_src);
    //console.log(textureCount[_src].wallTexture);
    //console.log(textureCount)
    if(_src === "1"){
        TextureLoad(props.meshHouse.children[1], wallTextureSettings.texture_wall_001, "BigMesh");
    }else if(_src === "2"){
        var textureArray = PaintObject.LoadTextureArray(
            wallTextureSettings.model_brick_002
        )
        PaintObject.HouseSetTexture( props.meshHouse.children[0], textureArray );
        //TextureLoad(props.meshHouse.children[1], wallTextureSettings.texture_wall_002, "BigMesh");
    }
}
