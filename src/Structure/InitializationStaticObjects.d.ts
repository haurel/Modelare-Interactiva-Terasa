import { Vector3 } from "three/build/three.module";

export namespace InitializationStaticObjects{
    /**
     * 
     * @param _scale 
     * @param _position 
     * @returns meshGrass
     */
    export function Grass (_scale : Vector3, _position : Vector3);
    /**
     * 
     * @param _scale 
     * @param _position 
     * @returns meshFence
     */
    export function Fence( _scale : Vector3, _position : Vector3);
    /**
     * 
     * @param _scale 
     * @param _position 
     * @returns meshHouse
     */
    export function House( _scale : Vector3, _position : Vector3);
    /**
     * 
     * @param _scale 
     * @param _position 
     * @returns meshTerrace
     */
    export function Terrace( _scale : Vector3, _position : Vector3);
}