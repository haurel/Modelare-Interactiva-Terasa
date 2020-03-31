import textureCount from './config/textureCount';
import TextureLoad from './TextureSet';
import props from './config/defaults';
import wallTextureSettings from './config/wallTextureSettings';

export default function getSelectedColor(_src){
    /* _src = _src.replace(/^.*[\\\/]/, '');
    var x = _src.substr(0, _src.lastIndexOf('.')); */
    //console.log(_src);
    //console.log(textureCount[_src].wallTexture);
    //console.log(textureCount)
    if(_src === "1"){
        TextureLoad(props.meshHouse.children[1], wallTextureSettings.texture_wall_001, "BigMesh");
    }else if(_src === "2"){
        TextureLoad(props.meshHouse.children[1], wallTextureSettings.texture_wall_002, "BigMesh");
    }
}
