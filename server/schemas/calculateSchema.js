'use strict';

const exampleRequestSchema = {
    "amount": 123123,
    "token0": {"chainId": 56, "decimals": 18, "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "symbol": "BNB"},
    "token1": {"chainId": 56, "decimals": 18, "address": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", "symbol": "BUSD"}
}

export const requestSchema = {
    type: 'object',
    properties: {
        amount: {type: 'number'},
        chain: {
            type: 'object',
            properties: {
                chainId: {type: 'string'},
                chainRPC: {type: 'string'},
            }
        },
        token0: {
            type: 'object',
            properties: {
                chainId: {type: 'number'},
                decimals: {type: 'number'},
                address: {type: 'address'},
                symbol: {type: 'string', maxLength: 5}
            }
        },
        token1: {
            type: 'object', properties: {
                chainId: {type: 'number'},
                decimals: {type: 'number'},
                address: {type: 'address'},
                symbol: {type: 'string', maxLength: 5}
            }
        },
    },
    required: ['amount', 'token0', 'token1']
}

const exampleResponseSchema = {
    "total": 1460740,
    "youSave": 0,
    "exchange": [{"name": "Super Link", "logo": "https://coin98.s3.ap-southeast-1.amazonaws.com/logoSuperLink.png", "amount": 1460740}, {
        "name": "PancakeSwap",
        "logo": "https://coin98.s3.amazonaws.com/srtwkXLdPbxSymnf",
        "amount": 1460740
    }, {"name": "Biswap", "logo": "https://coin98.s3.amazonaws.com/4wrd1g8rsG7qNivS", "amount": 1320620}, {
        "name": "ApeSwap",
        "logo": "https://coin98.s3.amazonaws.com/HhJ5OtIAkHVmakpW",
        "amount": 418551
    }, {"name": "BabySwap", "logo": "https://coin98.s3.amazonaws.com/gIJIAXKzGTsNNVVW", "amount": 311277}, {
        "name": "Mdex",
        "logo": "https://coin98.s3.amazonaws.com/8OUit3qR1R1FOv7U",
        "amount": 154168
    }, {"name": "Warden", "logo": "https://coin98.s3.amazonaws.com/NieXJJcRxEHn2GrI", "amount": 34323.9}, {
        "name": "Wault Finance",
        "logo": "https://coin98.s3.amazonaws.com/xjOXjgAytIHUIW9f",
        "amount": 21156.2
    }],
    "data": [{
        "impact": 2.19349,
        "percent": 100,
        "fee": 13.731,
        "uiFee": 36.615875343491595,
        "uiFeeV2": 11685.92,
        "amountTrue": 4577,
        "amountSplit": 4577,
        "amountExact": 1460740,
        "factory": "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
        "initCode": "0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5",
        "name": "PancakeSwap",
        "logo": "https://coin98.s3.amazonaws.com/srtwkXLdPbxSymnf",
        "router": [{
            "decimals": 18,
            "symbol": "BNB",
            "chainId": 56,
            "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
            "logoURI": "https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/BNBVer2.png"
        }, {
            "decimals": 18,
            "symbol": "BUSD",
            "name": "Binance USD",
            "chainId": 56,
            "address": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
            "logoURI": "https://coin98.s3.amazonaws.com/1M4PPVwJga2kEn6T"
        }]
    }]
}

export const responseSchema = {
    type: 'object',
    properties: {
        total: {type: 'number'},
        youSave: {type: 'number'},
        exchange: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {type: 'string'},
                    logo: {type: 'string'},
                    amount: {type: 'number'}
                }
            }
        },
        data: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    impact: {type: 'number'},
                    percent: {type: 'number'},
                    fee: {type: 'number'},
                    uiFee: {type: 'number'},
                    uiFeeV2: {type: 'number'},
                    amountTrue: {type: 'number'},
                    amountSplit: {type: 'number'},
                    amountExact: {type: 'number'},
                    factory: {type: 'string'},
                    initCode: {type: 'string'},
                    name: {type: 'string'},
                    logo: {type: 'string'},
                    router: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                decimals: {type: 'number'},
                                symbol: {type: 'string'},
                                chainId: {type: 'number'},
                                address: {type: 'address'},
                                logoURI: {type: 'string'}
                            }
                        }
                    }
                }
            }
        }
    }
};
