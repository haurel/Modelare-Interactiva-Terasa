import chairTextureSettings from './chairTextureSettings';
import tableTextureSettings from './tableTextureSettings';

export default{
    chair_001:{
        material_number : 2,
    },

    chair_002:{
        material_number : 4,
    },

    objects:{
        'chair_001' : [
            chairTextureSettings.leather_chair_014,
            chairTextureSettings.material_001,
            chairTextureSettings.material_004,
        ],
        'chair_003' : [
            chairTextureSettings.leather_chair_014,
            chairTextureSettings.material_001,
        ],
        'chair_004': [
            tableTextureSettings.wood_000,
            tableTextureSettings.wood_001,
        ],
        'chair_006' :[
            chairTextureSettings.material_005,
            chairTextureSettings.material_001,
            chairTextureSettings.material_004,
        ],
        'chair_007':[
            chairTextureSettings.material_004,
            chairTextureSettings.material_006,
            chairTextureSettings.leather_chair_002
        ],
        'masa_001' : [
            tableTextureSettings.wood_001,
            tableTextureSettings.wood_000,
        ]
    },
}