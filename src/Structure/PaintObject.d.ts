export namespace PaintObject{
    /**
     * 
     * @param texture texture name from settings/wallTextureSettings.js
     * @returns ArrayTextures and this is passed to HouseSetTexture or ObjectTexture method
     */
    export function LoadTextureArray( texture );
    /**
     * 
     * @param houseMesh house mesh from scene
     * @param texture array of texture loaded from LoadTextureArray method
     */
    export function HouseSetTexture( houseMesh, texture);
    /**
     * 
     * @param mesh object mesh from scene to which we change its texture
     * @param texture array of texture loaded from LoadTextureArray method
     */
    export function ObjectTexture( mesh,  texture);
}