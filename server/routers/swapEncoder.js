
import {POOL_TYPE, ADDRESS_CONTRACT, ABI} from "./constants.js";
import {web3} from "./web3.js";
import Web3 from "web3";


const encodePairUniv2 = (dataPool) => {
    const {coins, address} = dataPool
    const [fromToken, toToken] = coins

    return web3.eth.abi.encodeParameter({
            SwapParam: {
                fromToken: "address",
                toToken: "address",
                targetExchange: "address",
                payload: "bytes",
            },
        },
        {
            fromToken: fromToken.address,  //USDC
            toToken: toToken.address,
            targetExchange: address,
            payload: "0x",
        })
}

const encodePairCurveV1 = (dataPool) => {

    const {coins, address, i, j} = dataPool

    //console.log(coins[i],coins[j],i,j)

    const payload2 = web3.eth.abi.encodeParameter({
            CurveV2Data: {
                i: "uint256",
                j: "uint256",
                underlyingSwap: "bool",
            },
        },
        {
            i: i,
            j: j,
            underlyingSwap: 0,
        });

    return web3.eth.abi.encodeParameter({
            SwapParam: {
                //index:"uint256",
                fromToken: "address",
                toToken: "address",
                targetExchange: "address",
                payload: "bytes",
                //networkFee: "uint256"
            },
        },
        {
            //index:1,
            fromToken: coins[i].address,  //USDC
            toToken: coins[j].address,
            targetExchange: address,
            payload: payload2,
            //networkFee: 11,
        })
}

const okla = (dataPool) => {
    const {amountIn, amountOut, coins, i, j} = dataPool

}

const encodePair = (dataPool) => {
    okla(dataPool)
    switch (dataPool.type) {
        case POOL_TYPE.uniV2:
            return encodePairUniv2(dataPool)
        case POOL_TYPE.curveV1:
            return encodePairCurveV1(dataPool)
        default:
            return "0x"
    }
}

const getAddressAdapter = (type) => {
    switch (type) {
        case POOL_TYPE.uniV2:
            return ADDRESS_CONTRACT.uniswapV2
        case POOL_TYPE.curveV1:
            return ADDRESS_CONTRACT.stableSwap
        default:
            return "0x"
    }
}

const encodeAllPair = (dataRoute, subRoute) => {
    const {coins} = dataRoute
    const [fromToken, toToken] = coins

    const arrayAmountIn = subRoute.map(item => {
        const wei = Math.floor(item.amountIn / 10 ** 18)

        return BigInt(wei)
    })
    const arrayAmountOut = subRoute.map(item => {
        const wei = Math.floor(item.amountOut / 10 ** 18)

        return BigInt(wei)
    })

    const arrayAddressAdapter = subRoute.map(item => getAddressAdapter(item.type))
    const arrayDataEncode = subRoute.map(item => item.dataEncode)

    const encodeAmountIn1 = web3.eth.abi.encodeParameters(
        ['uint256[]'], [arrayAmountIn]
    );
    const encodeAmountOut1 = web3.eth.abi.encodeParameters(
        ['uint256[]'], [arrayAmountOut]
    );
    const encodeRouters1 = web3.eth.abi.encodeParameters(
        ['address[]'], [arrayAddressAdapter]
    );
    const encodePayload1 = web3.eth.abi.encodeParameters(
        ['bytes[]'], [arrayDataEncode]
    );
    let fromToken1 = fromToken.address
    const element1 = web3.eth.abi.encodeParameter({
            ElementSwap: {
                encodeRouters: "bytes",
                encodeAmountIn: "bytes",
                encodeAmountOut: "bytes",
                fromToken: "address",
                encodePayload: "bytes",
            },
        },
        {
            encodeRouters: encodeRouters1,
            encodeAmountIn: encodeAmountIn1,
            encodeAmountOut: encodeAmountOut1,
            fromToken: fromToken1,
            encodePayload: encodePayload1,
        });

    return element1
}

const encodePath = (routeInput) => {
    const arrayData = routeInput.map(item => item.dataEncodeAllPair)
    const chain1 = web3.eth.abi.encodeParameters(
        ['bytes[]'], [arrayData]
    );
    return chain1
}

export const encodeRouter = (routeInput) => {
    const routeOutput = routeInput.map(item => {
        const route = item.route.map(routeItem => {

            const newSubRoute = routeItem.subRoute.map(it => {
                const encodeData = encodePair(it)
                return {
                    ...it,
                    dataEncode: encodeData
                }
            })

            const dataEncodeAllPair = encodeAllPair(routeItem, newSubRoute)


            return {
                ...routeItem,
                subRoute: newSubRoute,
                dataEncodeAllPair: dataEncodeAllPair
            }
        })

        const dataEncodePath = encodePath(route)

        return {
            ...item,
            route: route,
            dataEncodePath: dataEncodePath
        }
    })

    const arrayDataPath = routeOutput.map(item => item.dataEncodePath)


    const dataEncodeRoute = web3.eth.abi.encodeParameters(
        ['bytes[]'], [arrayDataPath]
    );

    return dataEncodeRoute
}

export const decodeRoute = (data) => {
    const dataChain1 = web3.eth.abi.decodeParameters(['bytes[]'], data);
    console.log("🚀 ~ file: swapEncoder.js:196 ~ decodeRoute ~ dataChain1:", dataChain1)
    /* const adaptor1 = web3.eth.abi.decodeParameters(['bytes[]'], dataChain1)[0][1];
    const ele1 = web3.eth.abi.decodeParameter(
        {
            "ElementSwap": {
                "encodeRouters": "bytes",
                "encodeAmountIn": "bytes",
                "encodeAmountOut": "bytes",
                "fromToken": "address",
                "encodePayload": "bytes",
            },
        }, adaptor1);

    //console.log(ele1);

    const router = web3.eth.abi.decodeParameters(['address[]'], ele1.encodeRouters)[0];
    const amountIn = web3.eth.abi.decodeParameters(['uint256[]'], ele1.encodeAmountIn)[0];
    const amountOut = web3.eth.abi.decodeParameters(['uint256[]'], ele1.encodeAmountOut)[0];
    const fromToken = ele1.fromToken
    const payloadele1 = web3.eth.abi.decodeParameters(['bytes[]'], ele1.encodePayload)[0]


    payloadele1.map((item, index) => {
        const swapele1 = web3.eth.abi.decodeParameter(
            {
                "SwapParam": {
                    //"index":"uint256",
                    "fromToken": "address",
                    "toToken": "address",
                    "targetExchange": "address",
                    "payload": "bytes",
                    //"networkFee": "uint256"
                },
            }, item);


        console.log("router ", router[index])
        console.log("amountIn ", amountIn[index])
        console.log("amountOut ", amountOut[index])
        console.log("fromToken ", fromToken)
        console.log("swapele1 ", swapele1);

        if (swapele1.payload !== "0x") {

            const curve = web3.eth.abi.decodeParameter(
                {
                    "CurveV2Data:": {
                        "i": "uint256",
                        "j": "int256",
                        "underlyingSwap": "bool"

                    },
                }, swapele1.payload);
            console.log("curve", curve);
        }


    }) */
}