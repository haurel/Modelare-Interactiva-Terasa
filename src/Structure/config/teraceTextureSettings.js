import { RepeatWrapping, TangentSpaceNormalMap, Vector2, MeshStandardMaterial } from "three";



export default{
    default_material_settings:{
        //MeshStandarMaterial
        metalness: 0.5,
        roughness: 0.8,
        bumpScale: 0.5,
        displacementScale: 0.4,
        displacementBias: 0.001,
        emissiveIntensity: 0.1,
    },

    default_texture:{
        diffuse_map: "/src/Structure/House/Terasa/biscuiti_001_col.png",
        nrm_map: "/src/Structure/House/Terasa/biscuiti_001_nrm.png",
        occ_map: "/src/Structure/House/Terasa/biscuiti_001_occ.png",
    },
    
    1:{
        diffuse_map: "/src/Structure/House/Terasa/biscuiti_001_col.png",
        nrm_map: "/src/Structure/House/Terasa/biscuiti_001_nrm.png",
        occ_map: "/src/Structure/House/Terasa/biscuiti_001_occ.png",
        lungime: 16,
        latime: 10,
        pret: 43.67,
    },

    2:{
        diffuse_map: "/src/Structure/House/Terasa/biscuiti_002_col.png",
        nrm_map: "/src/Structure/House/Terasa/biscuiti_002_nrm.png",
        occ_map: "/src/Structure/House/Terasa/biscuiti_002_occ.png",
        lungime: 100,
        latime: 100,
        pret: 50.16,
    },


    3:{
        diffuse_map: "/src/Structure/House/Terasa/parchet_001_col.png",
        nrm_map: "/src/Structure/House/Terasa/parchet_001_nrm.png",
        occ_map: "/src/Structure/House/Terasa/parchet_001_occ.png",
        lungime: 33,
        latime: 33,
        pret: 28.99,
    },

    4:{
        diffuse_map: "/src/Structure/House/Terasa/ceramic_001_col.png",
        nrm_map: "/src/Structure/House/Terasa/ceramic_001_nrm.png",
        occ_map: "/src/Structure/House/Terasa/ceramic_001_occ.png",
        lungime: 25,
        latime: 25,
        pret: 15.55,
    },

    5:{
        diffuse_map: "/src/Structure/House/Terasa/parchet_002_col.png",
        nrm_map: "/src/Structure/House/Terasa/parchet_002_nrm.png",
        occ_map: "/src/Structure/House/Terasa/parchet_002_occ.png", 
        lungime: 120.3,
        latime: 19.3,
        pret: 18.74,
    }

}
