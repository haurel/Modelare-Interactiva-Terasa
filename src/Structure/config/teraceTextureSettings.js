import { RepeatWrapping, TangentSpaceNormalMap, Vector2, MeshStandardMaterial } from "three";



export default{
    default_material_settings:{
        //MeshStandarMaterial
        metalness: 0.2,
        roughness: 0.8,
        bumpScale: 0.5,
        displacementScale: 0.4,
        displacementBias: 0.001,
        emissiveIntensity: 0.1,
    },
    ceramic_terace_001:{
        diffuse_map: "/src/Structure/House/Terasa/ceramic_1_diffuse.jpg",
        disp_map: "/src/Structure/House/Terasa/ceramic_1_displacement.jpg",
        nrm_map: "/src/Structure/House/Terasa/ceramic_1_normal.jpg",
        metalness: "",
        anisotropy: 4,
        repeatSet: 3,
        wrapSorT: RepeatWrapping,
        normalMapType: TangentSpaceNormalMap,
        //normalScale: Vector2(0.7, 0.9),
    },

    parchet_terace_001:{                             
        diffuse_map: "/src/Structure/House/Terasa/parchet_1_diffuse.jpg",
        disp_map: "/src/Structure/House/Terasa/parchet_1_displacement.jpg",
        nrm_map: "/src/Structure/House/Terasa/parchet_1_normal.jpg",
        metalness_map: "",
        anisotropy: 4,
        repeatSet: 3,
        wrapSorT: RepeatWrapping,
        normalMapType: TangentSpaceNormalMap,
        //normalScale: Vector2(0.7, 0.9),
    },

    parchet_terace_002:{                             
        diffuse_map: "/src/Structure/House/Terasa/parchet_2_diffuse.jpg",
        disp_map: "/src/Structure/House/Terasa/parchet_2_displacement.jpg",
        nrm_map: "/src/Structure/House/Terasa/parchet_2_normal.jpg",
        metalness_map: "/src/Structure/House/Terasa/parchet_2_metalic.jpg",
        anisotropy: 4,
        repeatSet: 3,
        wrapSorT: RepeatWrapping,
        normalMapType: TangentSpaceNormalMap,
        //normalScale: Vector2(0.7, 0.9),
    },

    travertine_terace_002:{                             
        diffuse_map: "/src/Structure/House/Terasa/wood_travertine_1_diffuse.jpg",
        disp_map: "/src/Structure/House/Terasa/wood_travertine_1_displacement.jpg",
        nrm_map: "/src/Structure/House/Terasa/wood_travertine_1_normal.jpg",
        metalness_map: "",
        anisotropy: 4,
        repeatSet: 3,
        wrapSorT: RepeatWrapping,
        normalMapType: TangentSpaceNormalMap,
        //normalScale: Vector2(0.7, 0.9),
    },

}
