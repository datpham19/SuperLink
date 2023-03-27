import * as factoryUniV2 from '../ABIs/factory-univ2.json' assert {type: "json"};
import * as factoryUniV3 from '../ABIs/factory-univ3.json' assert {type: "json"};
import * as factoryCurveV2 from '../ABIs/factory-curvev2.json' assert {type: "json"};

import * as poolUniV2 from '../ABIs/pool-univ2.json' assert {type: "json"};
import * as poolUniV3 from '../ABIs/pool-univ3.json' assert {type: "json"};
import * as amountOutUniV3 from '../ABIs/amount-univ3.json' assert {type: "json"};
import * as poolCurveV1 from '../ABIs/pool-curvev1.json' assert {type: "json"};
import * as poolCurveV1Under from '../ABIs/pool-curvev1-under.json' assert {type: "json"};
import * as poolCurveV1Aave from '../ABIs/pool-curvev1-aave.json' assert {type: "json"};
import * as poolCurveV2 from '../ABIs/pool-curvev2.json' assert {type: "json"};

import * as poolCurveV2Fac from '../ABIs/pool-curvev2-fac.json' assert {type: "json"};
import * as tokenWrapperCompound from '../ABIs/token-wrapper-compose.json' assert {type: "json"};
import * as tokenWrapperAave from '../ABIs/token-wrapper-aave.json' assert {type: "json"};

import * as adapter from '../ABIs/adapter.json' assert {type: "json"};


// Import the ABI files
const ABI_FACTORY_UNI_V2 = factoryUniV2.default;
const ABI_FACTORY_UNI_V3 = factoryUniV3.default;
const ABI_FACTORY_CURVE_V2 = factoryCurveV2.default;

const ABI_POOL_UNI_V2 = poolUniV2.default;
const ABI_POOL_UNI_V3 = poolUniV3.default;
const ABI_CALL_AMOUNT_OUT_UNI_V3 = amountOutUniV3.default;
const ABI_POOL_CURVE_V1 = poolCurveV1.default;
const ABI_POOL_CURVE_V1_UNDER = poolCurveV1Under.default;
const ABI_POOL_CURVE_V1_AAVE = poolCurveV1Aave.default;

//const ABI_POOL_CURVE_V2 = factoryUniV3.default;
const ABI_POOL_CURVE_V2 = poolCurveV2.default;
const ABI_POOL_CURVE_V2_FAC = poolCurveV2Fac.default;

const ABI_TOKEN_WRAPPER_COMPOUND = tokenWrapperCompound.default;
const TOKEN_WRAPPER_AAVE = tokenWrapperAave.default;
const ABI_ADAPTER = adapter.default;

export const ADDRESS_CONTRACT = {
    adapter: "0x3aBB59464Ec3E291EA67Bf1d7fb4c6f09f5F251B",
    executor: "0x45b582b0e3F2c5f698d8Ef09288051b64C71A748",
    uniswapV2: "0xe4D2394AEf495B1A3aeda413FBADda84f59F1698",
    stableSwap: "0x14019b6fec14cf6777954078917f8a239Aa1BE93",
}

export const chainType = {
    solana: 'solana',
    kucoin: 'kucoin',
    boba: 'boba',
    avax: 'avax',
    binanceSmart: 'binanceSmart',
    fantom: 'fantom',
    matic: 'matic',
    ether: 'ether',
    heco: 'heco',
    '97': '97'
};

export const POOL_TYPE = {
    uniV2: 'uniV2',
    uniV3: 'uniV3',
    curveV1: 'curveV1',
    curveV2: 'curveV2',
    curveV2Fac: 'curveV2Fac',
    balancer: 'balancer'
}
export const LIST_FACTORY_ADDRESS = {
    [chainType.binanceSmart]: [
        {
            "tradeType": "pancakeSwap",
            "chain": "binanceSmart",
            "name": "PancakeSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/7186-zUssGAbXlB6ZqsJ0.png",
            "router": "0x10ED43C718714eb63d5aA57B78B54704E256024E",
            "factory": "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
            "initCode": "0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5",
            "graphQl": "https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2",

        },

        {
            "tradeType": "apeswap",
            "chain": "binanceSmart",
            "name": "ApeSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/1281-LpBefLmAJ7vbzkdC.png",
            "router": "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7",
            "factory": "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6",
            "initCode": "0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b",
            "graphQl": "https://graph.apeswap.finance/subgraphs/name/ape-swap/apeswap-subgraph",

        },

        {
            "tradeType": "unifi",
            "chain": "binanceSmart",
            "name": "Unifi Protocol",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/7077-QNvTgviWs1bOCQiR.png",
            "router": "0xBE930734eDAfc41676A76d2240f206Ed36dafbA2",
            "factory": "0xA5Ba037Ec16c45f8ae09e013C1849554C01385f5",
            "initCode": "0xa90f5671e014e72743ed3bfd909b833a46f2fcaa856692b76f87181abc8fdaff",
            "graphQl": "",

        },

        {
            "tradeType": "cheeseswap",
            "chain": "binanceSmart",
            "name": "CheeseSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/8217-rmokTXHfEtdXKayH.png",
            "router": "0x3047799262d8D2EF41eD2a222205968bC9B0d895",
            "factory": "0xdd538E4Fd1b69B7863E1F741213276A6Cf1EfB3B",
            "initCode": "0xf52c5189a89e7ca2ef4f19f2798e3900fba7a316de7cef6c5a9446621ba86286",
            "graphQl": "https://api.thegraph.com/subgraphs/name/blockartist/cheesesub",

        },

        {
            "tradeType": "jetswap",
            "chain": "binanceSmart",
            "name": "JetSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/10810-NwaK28M0oVIdW922.png",
            "router": "0xBe65b8f75B9F20f4C522e0067a3887FADa714800",
            "factory": "0x0eb58E5c8aA63314ff5547289185cC4583DfCBD5",
            "initCode": "0x3125d0a15fa7af49ce234ba1cf5f931bad0504242e0e1ee9fcd7d1d7aa88c651",
            "graphQl": "https://api.thegraph.com/subgraphs/name/smartcookie0501/jetswap-subgraph",

        },

        {
            "tradeType": "mdex",
            "chain": "binanceSmart",
            "name": "Mdex",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/8335-03v0I7vzncLi2RTW.png",
            "router": "0x0384E9ad329396C3A6A401243Ca71633B2bC4333",
            "factory": "0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8",
            "initCode": "0x0d994d996174b05cfc7bed897dc1b20b4c458fc8d64fe98bc78b3c64a6b4d093",
            "graphQl": null,

        },

        {
            "tradeType": "waultFinance",
            "chain": "binanceSmart",
            "name": "Wault Finance",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/8588-BD5fgBZxf4MgyM6c.png",
            "router": "0xD48745E39BbED146eEC15b79cBF964884F9877c2",
            "factory": "0xB42E3FE71b7E0673335b3331B3e1053BD9822570",
            "initCode": "0x9599db1eaa37ab366bf260f51beefce9296eb6197de387c533d905e9b82debe9",
            "graphQl": "https://api.thegraph.com/subgraphs/name/waultfinance/waultswap-bsc",

        },

        {
            "tradeType": "biswap",
            "chain": "binanceSmart",
            "name": "Biswap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/10746-kMHr2LKOuXuwWhDy.png",
            "router": "0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8",
            "factory": "0x858E3312ed3A876947EA49d572A7C42DE08af7EE",
            "initCode": "0xfea293c909d87cd4153593f077b76bb7e94340200f4ee84211ae8e4f9bd7ffdf",
            "graphQl": "https://api.thegraph.com/subgraphs/name/biswapcom/exchange5",

        },

        {
            "tradeType": "babyswap",
            "chain": "binanceSmart",
            "name": "BabySwap",
            "chainId": 56,
            "logo": "https://coin98.s3.amazonaws.com/gIJIAXKzGTsNNVVW",
            "router": "0x325E343f1dE602396E256B67eFd1F61C3A6B38Bd",
            "factory": "0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da",
            "initCode": "0x48c8bec5512d397a5d512fbb7d83d515e7b6d91e9838730bd1aa1b16575da7f5",
            "graphQl": null,

        },

        {
            "tradeType": "autoshark",
            "chain": "binanceSmart",
            "name": "Auto Shark",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/10303-AQO7ekiPpM5KsfpI.png",
            "router": "0xB0EeB0632bAB15F120735e5838908378936bd484",
            "factory": "0xe759Dd4B9f99392Be64f1050a6A8018f73B53a13",
            "initCode": "0x024c8482358faf5eeea4ff7f0a18734bc482bf2e61ec04711fcee726756287ee",
            "graphQl": "https://api.thegraph.com/subgraphs/name/autoshark-finance/exchange-v1",

        },

        {
            "tradeType": "cafeswap",
            "chain": "binanceSmart",
            "name": "CafeSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/1317-GaOVirXEhlqW75fq.png",
            "router": "0x933DAea3a5995Fb94b14A7696a5F3ffD7B1E385A",
            "factory": "0x3e708FdbE3ADA63fc94F8F61811196f1302137AD",
            "initCode": "0x90bcdb5d0bf0e8db3852b0b7d7e05cc8f7c6eb6d511213c5ba02d1d1dbeda8d3",
            "graphQl": "https://api.thegraph.com/subgraphs/name/autoshark-finance/exchange",

        },

        {
            "tradeType": "JustLiquidityRouter",
            "chain": "binanceSmart",
            "name": "JustLiquidity",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/6937-NSxpYYrQ2KZAuH4I.png",
            "router": "0xbd67d157502A23309Db761c41965600c2Ec788b2",
            "factory": "0x553990F2CBA90272390f62C5BDb1681fFc899675",
            "initCode": "0xb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18",
            "graphQl": null,

        },

        {
            "tradeType": "HyperJump",
            "chain": "binanceSmart",
            "name": "HyperJump",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/14658-HyaRbwLpp87hhfBA.png",
            "router": "0x3bc677674df90A9e5D741f28f6CA303357D0E4Ec",
            "factory": "0xaC653cE27E04C6ac565FD87F18128aD33ca03Ba2",
            "initCode": "0x0b3961eeccfbf746d2d5c59ee3c8ae3a5dcf8dc9b0dfb6f89e1e8ca0b32b544b",
            "graphQl": "https://api.thegraph.com/subgraphs/name/angry-mech/hyperjump-bsc-main",

        },

        {
            "tradeType": "JulSwap",
            "chain": "binanceSmart",
            "name": "JulSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/8164-aMUIoHIGeNxtrjxz.png",
            "router": null,
            "factory": "0x553990F2CBA90272390f62C5BDb1681fFc899675",
            "initCode": "0xb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18",
            "graphQl": "",

        },

        {
            "tradeType": "plannet",
            "chain": "binanceSmart",
            "name": "Plannet",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/1489-945BR21MmqW2Fnxf.png",
            "router": null,
            "factory": "0xa053582601214FEb3778031a002135cbBB7DBa18",
            "initCode": "0xe59afd81a2bf00e2528a56d56c1c6e9fc9768e49872e603ee0d5ab6374e175e1",
            "graphQl": "https://api.thegraph.com/subgraphs/name/makemyideatech/planet-finance",

        },

        {
            "tradeType": "plearnclub",
            "chain": "binanceSmart",
            "name": "Plearnclub",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/ta%CC%89i%20xuo%CC%82%CC%81ng-pvQv2jadBuQqPx2X.png",
            "router": null,
            "factory": "0x4750A965f72E09c434b7a40f1735144c983440D2",
            "initCode": "0x047caab6a82a0dad4b77f15197f50d4673b220a10d06fda5691d41b18e687adb",
            "graphQl": "https://api.thegraph.com/subgraphs/name/jozzee-ookbee/plearn-exchange",

        },

        {
            "tradeType": "LatteSwap",
            "chain": "binanceSmart",
            "name": "LatteSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/12324-40et2aCIAUJLwAP6.png",
            "router": null,
            "factory": "0x4DcE5Bdb81B8D5EdB66cA1b8b2616A8E0Dd5f807",
            "initCode": "0xd186cd0235b0839707c25b5e4a518a7e67159a1c74f36680d920c0d82097db36",
            "graphQl": "https://api.thegraph.com/subgraphs/name/latteswap-official/exchange",

        },

        {
            "tradeType": "JSwap",
            "chain": "binanceSmart",
            "name": "JSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/1476-kr4qzcVi1gNVmjnd.png",
            "router": null,
            "factory": "0xd654CbF99F2907F06c88399AE123606121247D5C",
            "initCode": "0x6e68534dd22358c18cfccdcd5fe2f0e76764cfa79fb8b77f9fc12b5e1625a2b5",
            "graphQl": "",

        },

        {
            "tradeType": "definix",
            "chain": "binanceSmart",
            "name": "Definix",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/10661-W2XoicryzRNcs5Rc.png",
            "router": null,
            "factory": "0x43eBb0cb9bD53A3Ed928Dd662095aCE1cef92D19",
            "initCode": "0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5",
            "graphQl": null,

        },

        {
            "tradeType": "Warden",
            "chain": "binanceSmart",
            "name": "Warden",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/8981-FG3xLrx2mxaF7GJy.png",
            "router": null,
            "factory": "0x3657952d7bA5A0A4799809b5B6fdfF9ec5B46293",
            "initCode": "0xfbbcb3ce9944dd53a7ef447076d0e4e4811911365339bab292e4733d5b37a120",
            "graphQl": "https://api.thegraph.com/subgraphs/name/wardenluna/warden-pool",

        },

        {
            "tradeType": "ELK",
            "chain": "binanceSmart",
            "name": "ELK",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/10095%20(1)-vrqvnF5yQrhVZI3K.png",
            "router": "0xA63B831264183D755756ca9AE5190fF5183d65D6",
            "factory": "0x31aFfd875e9f68cd6Cd12Cee8943566c9A4bBA13",
            "initCode": "0x84845e7ccb283dec564acfcd3d9287a491dec6d675705545a2ab8be22ad78f31",
            "graphQl": "https://api.thegraph.com/subgraphs/name/elkfinance/elkdex-bsc",

        },

        {
            "tradeType": "BARY",
            "logo": "https://coin98.s3.amazonaws.com/f5ULNjbOGYBeFwBR",
            "name": "Baryon",
            "chain": "binanceSmart",
            "chainId": 56,
            "router": "",
            "factory": "0x03879E2a3944FD601e7638DfCBC9253fb793b599",
            "initCode": "0xaa6de7108cd6c8de3a445fd2e61ac164d0c2556eaf6fbb132cb70a2e75f5e5c7",
            "graphQl": "",
        }


    ],
    [chainType.ether]: [
        {
            name: "DXswapRouter",
            route: "0xB9960d9bcA016e9748bE75dd52F02188B9d0829f",
            factory: "0xd34971bab6e5e356fd250715f5de0492bb070452",
            initCode: "0xd306a548755b9295ee49cc729e13ca4a45e00199bbd890fa146da43a50571776"
        },
        {
            name: "Unifi",
            route: "0x79F12D68631eC6396aAB3CdF31F07C90D0023c9A",
            factory: "0x08e7974cacf66c5a92a37c221a15d3c30c7d97e0",
            initCode: "0x44684722f15fdeed2f020712b87ff5db6e63b732cb8ad12777180fb094fee9e1"
        },
        {
            name: "LuaSwap",
            route: "0x1d5C6F1607A171Ad52EFB270121331b3039dD83e",
            factory: "0x0388c1e0f210abae597b7de712b9510c6c36c857",
            initCode: "0xf176ce2ef2ec9c3333f7ab282e4269fdd75024da47415e2c7c6e04272fc1bfab"
        },
        {
            name: "Defi swap",
            route: "0xCeB90E4C17d626BE0fACd78b79c9c87d7ca181b3",
            factory: "0x9deb29c9a4c7a88a3c0257393b7f3335338d9a9d",
            initCode: "0x69d637e77615df9f235f642acebbdad8963ef35c5523142078c9b8f9d0ceba7e"
        },
        {
            name: "Convx",
            route: "0x8Cda39226daf33ae1Aba0C92C34d1a1982Cf0210",
            factory: "0x4eef5746ed22a2fd368629c1852365bf5dcb79f1",
            initCode: "0x9fb44e670c5e09087865a6e5c85ae0fc3e365ede68ae928445f8a92971c11eb6"
        },
        {
            name: "UniswapV2",
            route: "0x03f7724180AA6b939894B5Ca4314783B0b36b329",
            factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
            initCode: "0x65d1a3b1e46c6e4f1be1ad5f99ef14dc488ae0549dc97db9b30afe2241ce1c7a"
        },
        {
            name: "SushiSwap",
            route: "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f",
            factory: "0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac",
            initCode: "0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303"
        }
    ],
    [chainType[97]]: [
        {
            "tradeType": "pancakeSwap",
            "chain": "binanceSmart",
            "name": "PancakeSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/7186-zUssGAbXlB6ZqsJ0.png",
            "router": "0x10ED43C718714eb63d5aA57B78B54704E256024E",
            "factory": "0x6725F303b657a9451d8BA641348b6761A6CC7a17",
            "initCode": "0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5",
            "graphQl": "https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2",

        },
        {
            "tradeType": "openSwap",
            "chain": "binanceSmart",
            "name": "openSwap",
            "chainId": 56,
            "logo": "https://file.coin98.com/images/7186-zUssGAbXlB6ZqsJ0.png",
            "router": "0x10ED43C718714eb63d5aA57B78B54704E256024E",
            "factory": "0xDE5CC59535312A8ECCfdB74694C338b6231e490D",
            "initCode": "0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5",
            "graphQl": "https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2",

        },
    ]
}

export const ABI = {
    POOL_UNI_V2: ABI_POOL_UNI_V2,
    POOL_UNI_V3: ABI_POOL_UNI_V3,
    POOL_CURVE_V1: ABI_POOL_CURVE_V1,
    POOL_CURVE_V2: ABI_POOL_CURVE_V2,
    POOL_CURVE_V2_FAC: ABI_POOL_CURVE_V2_FAC,
    POOL_CURVE_V1_UNDER: ABI_POOL_CURVE_V1_UNDER,
    POOL_CURVE_V1_AAVE: ABI_POOL_CURVE_V1_AAVE,

    FACTORY_UNI_V2: ABI_FACTORY_UNI_V2,
    FACTORY_UNI_V3: ABI_FACTORY_UNI_V3,
    FACTORY_CURVE_V2: ABI_FACTORY_CURVE_V2,

    QUOTER_UNI_V3: ABI_CALL_AMOUNT_OUT_UNI_V3,
    TOKEN_WRAPPER_COMPOUND: ABI_TOKEN_WRAPPER_COMPOUND,
    TOKEN_WRAPPER_AAVE: TOKEN_WRAPPER_AAVE,
    ABI_ADAPTER: ABI_ADAPTER

}
export const tokenTrungGian = {
    [chainType.binanceSmart]: [
        { chainId: 56, address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', decimals: 18, symbol: 'WBNB', name: 'Wrapped BNB' },
        { chainId: 56, address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', decimals: 18, symbol: 'BUSD', name: 'Binance USD' },
        { chainId: 56, address: '0x55d398326f99059fF775485246999027B3197955', decimals: 18, symbol: 'USDT', name: 'Tether USD' },
        { chainId: 56, address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', decimals: 18, symbol: 'USDC', name: 'Binance-Peg USD Coin' }
    ],
    [chainType.ether]: [
        { chainId: 1, address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', decimals: 18, symbol: 'ETH', name: 'Ether', usdPrice: 1697 },
        { chainId: 1, address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals: 18, symbol: 'DAI', name: 'Dai Stablecoin', usdPrice: 1 },
        { chainId: 1, address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6, symbol: 'USDC', name: 'USD//C', usdPrice: 1 },
        { chainId: 1, address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6, symbol: 'USDT', name: 'Tether USD', usdPrice: 1 },
        { chainId: 1, address: '0xc00e94Cb662C3520282E6f5717214004A7f26888', decimals: 18, symbol: 'COMP', name: 'Compound', usdPrice: 50 },
        { chainId: 1, address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', decimals: 18, symbol: 'MKR', name: 'Maker}', usdPrice: 50 },
    ],

    [chainType[97]]: [
        { chainId: 1, address: '0xCA8eB2dec4Fe3a5abbFDc017dE48E461A936623D', decimals: 18, symbol: 'USDC', name: 'USD//C', usdPrice: 1 },
        { chainId: 1, address: '0x0fb5d7c73fa349a90392f873a4fa1ecf6a3d0a96', decimals: 18, symbol: 'USDT', name: 'USDT', usdPrice: 1 }
    ]
}


export const DATA_POOL_CURVE_TESTNET_BSC = [

    {
        "id": "0",
        "address": "0xd5E56CD4c8111643a94Ee084df31F44055a1EC9F",
        "coinsAddresses": [
            "0x3304dd20f6Fe094Cb0134a6c8ae07EcE26c7b6A7",
            "0xCA8eB2dec4Fe3a5abbFDc017dE48E461A936623D",
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000"
        ],
        "decimals": [
            "18",
            "18",
            "0",
            "0"
        ],
        "virtualPrice": "1025357684572733513",
        "amplificationCoefficient": "1000",
        "assetType": "0",
        "totalSupply": "409988947134236354025788583",
        "lpTokenAddress": "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490",
        "name": "Pancake StableSwap USDC/BUSD",
        "symbol": "3Crv",
        "priceOracle": 0,

        "poolUrls": {
            "swap": [
                "https://curve.fi/#/ethereum/pools/3pool/swap",
                "https://classic.curve.fi/3pool"
            ],
            "deposit": [
                "https://curve.fi/#/ethereum/pools/3pool/deposit",
                "https://classic.curve.fi/3pool/deposit"
            ],
            "withdraw": [
                "https://curve.fi/#/ethereum/pools/3pool/withdraw",
                "https://classic.curve.fi/3pool/withdraw"
            ]
        },
        "implementation": "",
        "assetTypeName": "usd",
        "coins": [
            {
                "address": "0x3304dd20f6Fe094Cb0134a6c8ae07EcE26c7b6A7",
                "usdPrice": 1.003,
                "decimals": "18",
                "isBasePoolLpToken": false,
                "symbol": "BUSD",
                "poolBalance": "188797625122201283032332029"
            },
            {
                "address": "0xCA8eB2dec4Fe3a5abbFDc017dE48E461A936623D",
                "usdPrice": 1.004,
                "decimals": "18",
                "isBasePoolLpToken": false,
                "symbol": "USDC",
                "poolBalance": "197981356991458"
            }
        ],
        "usdTotal": 422129871.08046025,
        "isMetaPool": false,
        "usdTotalExcludingBasePool": 422129871.08046025,
        "gaugeAddress": "0xbfcf63294ad7105dea65aa58f8ae5be2d9d0952a",
        "gaugeRewards": [],
        "gaugeCrvApy": [
            0.6662330746372814,
            1.6655826865932035
        ],
        type: POOL_TYPE.curveV1,
        A: 1000,
        fee: 15000000

    },
    {
        "id": "1",
        "address": "0xc418d68751Cbe0407C8fdd90Cde73cE95b892f39",
        "coinsAddresses": [
            "0x0fB5D7c73FA349A90392f873a4FA1eCf6a3d0a96",
            "0x3304dd20f6Fe094Cb0134a6c8ae07EcE26c7b6A7",
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000"
        ],
        "decimals": [
            "18",
            "18",
            "0",
            "0"
        ],
        "virtualPrice": "1025357684572733513",
        "amplificationCoefficient": "1000",
        "assetType": "0",
        "totalSupply": "409988947134236354025788583",
        "lpTokenAddress": "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490",
        "name": "Pancake StableSwap USDT/BUSD",
        "symbol": "3Crv",
        "priceOracle": 0,

        "poolUrls": {
            "swap": [
                "https://curve.fi/#/ethereum/pools/3pool/swap",
                "https://classic.curve.fi/3pool"
            ],
            "deposit": [
                "https://curve.fi/#/ethereum/pools/3pool/deposit",
                "https://classic.curve.fi/3pool/deposit"
            ],
            "withdraw": [
                "https://curve.fi/#/ethereum/pools/3pool/withdraw",
                "https://classic.curve.fi/3pool/withdraw"
            ]
        },
        "implementation": "",
        "assetTypeName": "usd",
        "coins": [
            {
                "address": "0x0fB5D7c73FA349A90392f873a4FA1eCf6a3d0a96",
                "usdPrice": 1.003,
                "decimals": "18",
                "isBasePoolLpToken": false,
                "symbol": "USDT",
                "poolBalance": "188797625122201283032332029"
            },
            {
                "address": "0x3304dd20f6Fe094Cb0134a6c8ae07EcE26c7b6A7",
                "usdPrice": 1.004,
                "decimals": "18",
                "isBasePoolLpToken": false,
                "symbol": "BUSD",
                "poolBalance": "197981356991458"
            }
        ],
        "usdTotal": 422129871.08046025,
        "isMetaPool": false,
        "usdTotalExcludingBasePool": 422129871.08046025,
        "gaugeAddress": "0xbfcf63294ad7105dea65aa58f8ae5be2d9d0952a",
        "gaugeRewards": [],
        "gaugeCrvApy": [
            0.6662330746372814,
            1.6655826865932035
        ],
        type: POOL_TYPE.curveV1,
        A: 1000,
        fee: 15000000

    }
]