import { RepeatWrapping } from "three";

export default{
    texture_wall_001:{
        diffuse_map: "/src/Structure/House/HouseTexture/brick_001_diffuse.jpg",
        disp_map: "/src/Structure/House/HouseTexture/brick_001_displacement.jpg",
        nrm_map: "/src/Structure/House/HouseTexture/brick_001_normal.jpg",
        anisotropy: 4,
        repeatSet: 1,
        wrapSorT: RepeatWrapping,
        roughness: 1.0,
        bumScale: 0.8,
        metalness: 0.0,
    },
    texture_wall_002:{
        diffuse_map: "/src/Structure/House/HouseTexture/brick_002_diffuse.png",
        disp_map: "/src/Structure/House/HouseTexture/brick_002_bump.png",
        nrm_map: "/src/Structure/House/HouseTexture/brick_002_normal.png",
        rgh_map: "/src/Structure/House/HouseTexture/brick_002_rgh.png",
        occ_map: "/src/Structure/House/HouseTexture/brick_002_occ.png",
        spec_map: "/src/Structure/House/HouseTexture/brick_002_spec.png",
        anisotropy: 4,
        repeatSet: 1,
        wrapSorT: RepeatWrapping,
        roughness: 1.0,
        bumScale: 0.8,
        metalness: 0.0,
    },
}