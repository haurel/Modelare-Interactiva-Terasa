import { Vector2 } from "three";

export default class CameraMoveWithMouse{
    constructor(activeCamera){
        this.activeCamera = activeCamera;
        this.rect = document.body.getBoundingClientRect();
        this.posXY = new Vector2(null, null);
    }

    GetRelativeMousePositionCamera3D(event){
        this.posXY.setX(((event.clientX - rect.left) / (rect.width - rect.left )) * 2 - 1)
        this.posXY.setY(- ((event.clientY - rect.top) / (rect.bottom - rect.top )) * 2 + 1);
    }

    GetRelativMousePositionCameraOrtoPersp(event){
        this.posXY.setX(((event.clientX * 0.5 - (0.4 * rect.left + 1)) / ((0.6 * rect.width - 2) - (0.4 * rect.left + 1))) * 2 - 1);
        this.posXY.setY(- ((event.clientY - (0.4 * rect.top + 1)) / (rect.bottom - (0.4 * rect.top + 1))) * 2 + 1);
    }

    OribitControlPropCameraOrtoPersp(event){
        const mousePositionInScreen = this.GetRelativeMousePositionCamera3D(event);

        var x = ((event.clientX  - (0.6 * rect.left + 1)) / ((rect.width * 0.6 - 2) - (rect.left * 0.6 + 1))) * 2 - 1;
        var xPerspectivCamera = ((event.clientX * 0.5 - (0.4 * rect.left + 1)) / ((0.6 * rect.width - 2) - (0.4 * rect.left + 1))) * 2 - 1;

        if(Math.abs(parseFloat(x)) <= Math.abs(parseFloat(xPerspectivCamera))){
            //props.orbitControls.enabled
        }else{
            //props.orbitControls.enabled = true;
        } 
    }

}