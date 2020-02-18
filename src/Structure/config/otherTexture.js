import { RepeatWrapping, TangentSpaceNormalMap, Vector2, MeshStandardMaterial } from "three";

export default{
    default_material_settings:{
        //MeshStandarMaterial
        metalness: 0.0,
        roughness: 1,
        bumpScale: 0.10,
        displacementScale: 0,
        displacementBias: 0.1,
        emissiveIntensity: 0.5,
    },

    grass_texture:{
        diffuse_map: "/src/Structure/House/GrassTexture/grass_diffuse.png",
        disp_map: "/src/Structure/House/GrassTexture/grass_disp.png",
        nrm_map: "/src/Structure/House/GrassTexture/grass_normal.png",
        ao_map: "/src/Structure/House/GrassTexture/grass_occ.png",
        spec_map: "/src/Structure/House/GrassTexture/grass_spec.png",
        anisotropy: 4,
        repeatSet: 3,
        wrapSorT: RepeatWrapping,
        normalMapType: TangentSpaceNormalMap,
        //normalScale: Vector2(0.7, 0.9),
    }
}