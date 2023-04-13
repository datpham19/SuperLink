import { DATA_POOL_CURVE_TESTNET_BSC, POOL_TYPE } from './constants.js'
import { calcAmountOutCurvev1, calcRateCurveV1, calculateAmountTradedCurveV1, getReservePoolCurveV1, getReservePoolCurveV1Meta } from './DEXs/curveV1.js'
import { calcAmountOutCurvev2, calcRateCurveV2, calculateAmountTradedCurveV2, getReservePoolCurveV2, getReservePoolCurveV2Fac } from './DEXs/curveV2.js'

import { calcAmountOutUniV2, calculateAmountTradedUniV2, getReservePoolUniV2 } from './DEXs/uniV2.js'
import { calcAmountOutUniV3, getReservePoolUniV3 } from './DEXs/uniV3.js'


import lodash from 'lodash'
import { findAllRoute } from "./sLRouters.js";
import { genWeb3Route, web3 } from './web3.js'


import fs from "fs"


const { uniqBy, add, xorBy, intersection, intersectionBy } = lodash

const listPoolCurveV1 = []



const getDetailPool = async (address, type, coins) => {
    try {
        switch (type) {
            case POOL_TYPE.uniV2:
                return await getReservePoolUniV2(address, coins)
            case POOL_TYPE.curveV1:
                return await getReservePoolCurveV1(address, coins)
            case POOL_TYPE.curveV1_Crv:
                return await getReservePoolCurveV1Meta(address, coins)
            case POOL_TYPE.curveV2:
                return await getReservePoolCurveV2(address, coins)
            case POOL_TYPE.curveV2Fac:
                return await getReservePoolCurveV2Fac(address, coins)
            case POOL_TYPE.uniV3:
                return await getReservePoolUniV3(address, coins)
            default:
                return []
        }
    }
    catch (err) {
        console.log(err)
        //console.log(address, type, coins)
    }
}


const calculateAmountTraded = (priceImpactEst, dataPool) => {
    switch (dataPool.type) {
        case POOL_TYPE.uniV2:
            return calculateAmountTradedUniV2(priceImpactEst, dataPool)
        case POOL_TYPE.curveV1:
            return calculateAmountTradedCurveV1(priceImpactEst / 2, dataPool)
        case POOL_TYPE.uniV3:
            return 0
        case POOL_TYPE.curveV2:
            return calculateAmountTradedCurveV2(priceImpactEst / 2, dataPool)
        default:
            return 0
    }
}

const calcRateCurve = (info, i, j) => {
    switch (info.type) {
        case POOL_TYPE.curveV1:
            return calcRateCurveV1(info, i, j)
        case POOL_TYPE.curveV2:
            return calcRateCurveV2(info, i, j)
        default:
            return 0
    }
}

const getIndexTokenCurve = (coins, address) => {
    const index = coins.findIndex(item => item.address.toUpperCase() === address.toUpperCase())
    return index
}

const calculateAmountOut = (amountIn, type, reserve, otherParam) => {
    switch (type) {
        case POOL_TYPE.uniV2:
            return calcAmountOutUniV2(amountIn, reserve[0], reserve[1])
        case POOL_TYPE.curveV1:
            return calcAmountOutCurvev1(amountIn, reserve, otherParam)
        /* case POOL_TYPE.uniV3:
            return calcAmountOutUniV3(amountIn, reserve, otherParam) */
        case POOL_TYPE.curveV2:
            return calcAmountOutCurvev2(amountIn, reserve, otherParam)
        default:
            return 0
    }
}

const spliceAndCalculateOutput = (amountIn, route) => {


    const okla = route.map(item => {
        const amountInPerPool = item.splicePercent * amountIn


        const otherParam = {
            i: item?.i,
            j: item?.j,
            A: item?.A,
            fee: item?.fee,
            coins: item.coins,
            D: item?.D,
            priceScale: item?.priceScale,
            gamma: item?.gamma,
            decimals: item?.decimals
        }

        // if (item.type === POOL_TYPE.curveV1) localStorage.setItem('okla', JSON.stringify(item));


        const amountOutPerPool = calculateAmountOut(amountInPerPool, item.type, item.reserve, otherParam)

        return {
            ...item,
            amountIn: amountInPerPool,
            amountOut: amountOutPerPool

        }
    })

    const totalAmountOut = okla.reduce((total, item) => total + (item.amountOut ? item.amountOut : 0), 0)


    return [totalAmountOut, okla]
}


const getIndexPoolCurve = (coins, coinsRoute) => {
    const addressCoins = coins.map(item => item.address.toUpperCase())
    const addressCoinsRoute = coinsRoute.map(item => item.address.toUpperCase())
    const i = addressCoins.indexOf(addressCoinsRoute[0].toUpperCase())
    const j = addressCoins.indexOf(addressCoinsRoute[1].toUpperCase())
    return {
        i, j
    }
}

const getDataRoute = async (routeInput) => {
    const routeOutput = await Promise.all(routeInput.map(async item => {
        const route = await Promise.all(item.route.map(async routeItem => {
            const subRoute1 = await Promise.all(routeItem.subRoute.map(async it => {
                const coins = it.coins ? it.coins : routeItem.coins
                const { i, j } = getIndexPoolCurve(coins, routeItem.coins)
                const detail = await getDetailPool(it.address, it.type, coins)
                return {
                    ...it,
                    ...detail,
                    i: i,
                    j: j,
                    coins: coins
                }
            }))
            return {
                subRoute: subRoute1,
                namePair: routeItem.namePair,
                coins: routeItem.coins,
            }
        }))

        return {
            route: route
        }
    }))

    return routeOutput
}

const addPoolMultiToken = (routeInput, queuePoolCurveV1) => {
    const queuePoolCurveV1Fake = [...queuePoolCurveV1]
    const routeOutput = routeInput.map(item => {
        const addCurveV1 = item.route.map(routeItem => {
            const okla = queuePoolCurveV1Fake.filter(item => {
                // if (item.type === POOL_TYPE.curveV1) console.log(item)

                const addressCoins = item.coinsAddresses.map(item => item.toUpperCase())
                const addressCoinsRoute = routeItem.coins.map(item => item.address.toUpperCase())
                const okla = intersection(addressCoins, addressCoinsRoute)

                const isSwapStableCoin = okla.length === 2
                return isSwapStableCoin
            }).map(item => {
                const coins = item.coins ? item.coins : routeItem.coins
                const { i, j } = getIndexPoolCurve(coins, routeItem.coins)
                const rate = calcRateCurve(item, i, j)
                const amountTradedEst = calculateAmountTraded(0.01, { ...item, i, j, rate })
                return {
                    ...item,
                    i: i,
                    j: j,
                    rate,
                    amountTradedEst
                }
            })
            return okla

        })

        //console.log(addCurveV1)


        const routeHaveCurveV1 = item.route.map((routeItem, index) => {




            let poolCurveV1 = []
            if (true) {
                poolCurveV1 = intersectionBy(addCurveV1[index], queuePoolCurveV1, 'id')
                const listId = poolCurveV1.map(item => {
                    return {
                        id: item.id
                    }
                })
                queuePoolCurveV1 = xorBy(listId, queuePoolCurveV1, 'id')
            }

            const newSubRoute = [
                ...routeItem.subRoute,
                ...poolCurveV1
            ]
            return {
                ...routeItem,
                subRoute: newSubRoute,
            }
        })
        return {
            route: routeHaveCurveV1,
        }
    })

    return routeOutput
}

const setAmountTradedEst = (routeInput, priceImpactEst) => {
    const routeOutput = routeInput.map(item => {

        const priceImpact = item.route.length === 1 ? priceImpactEst : 1 - Math.sqrt(1 - priceImpactEst)


        const route = item.route.map(routeItem => {
            const newSubRoute = routeItem.subRoute.map(it => {
                const amountTradedEst = calculateAmountTraded(priceImpact, it)

                return {
                    ...it,
                    amountTradedEst: amountTradedEst,
                    priceImpact
                }
            })

            return {
                ...routeItem,
                subRoute: newSubRoute,
            }
        })
        return {
            ...item,
            route: route,
        }
    })
    return routeOutput
}

const splicePercent = (routeInput) => {
    const routeOutput0 = routeInput.map(item => {
        const route = item.route.map(routeItem => {
            const totalAmountTradedEst = routeItem.subRoute.reduce((a, b) => a + b.amountTradedEst, 0)

            const totalRate = routeItem.subRoute.reduce((a, b) => a + b.amountTradedEst * (b.rate ? b.rate : 0), 0)

            const newSubRoute = routeItem.subRoute.map(it => {
                return {
                    ...it,
                    splicePercent: it.amountTradedEst / totalAmountTradedEst,
                }
            })

            return {
                ...routeItem,
                subRoute: newSubRoute,
                totalAmountTradedEst,
                totalRate: totalRate / totalAmountTradedEst
            }
        })

        const arrayAmountTradedEst = route.map((item, index) => {
            if (index === 0) return item.totalAmountTradedEst
            return item.totalAmountTradedEst / route[index - 1].totalRate
        })

        const amountTradedEst = arrayAmountTradedEst.reduce((a, b) => a < b ? a : b, arrayAmountTradedEst[0])



        //const amountTradedEst = route.reduce((a, b) => a < b.totalAmountTradedEst ? a : b.totalAmountTradedEst, route[0].totalAmountTradedEst)

        return {
            ...item,
            route: route,
            amountTradedEst
        }
    })

    const totalAmountTradedEst = routeOutput0.reduce((a, b) => a + b.amountTradedEst, 0)

    const routeOutput = routeOutput0.map(item => {

        return {
            ...item,
            splicePercent: item.amountTradedEst / totalAmountTradedEst
        }
    })

    return routeOutput
}


const filterSmallPool = (routeInput, minPercent) => {
    const filterPath = routeInput.filter(item => item.splicePercent > minPercent)

    const routeOutput = filterPath.map(item => {
        const route = item.route.map(routeItem => {

            const newSubRoute = routeItem.subRoute.filter(item => item.splicePercent > minPercent)
            return {
                ...routeItem,
                subRoute: newSubRoute
            }
        })
        return {
            ...item,
            route: route
        }
    })
    return routeOutput
}

const calcAmountOutRoute = (routeInput, amountIn) => {
    const resultRoute = routeInput.map(item => {
        let amountIn1 = item.splicePercent * amountIn

        let okla
        const routeItem = item.route

        for (let index = 0; index < routeItem.length; index++) {
            if (index !== 0) okla = routeItem[index - 1].amountOut
            else okla = amountIn1

            const [amountOut, route] = spliceAndCalculateOutput(okla, routeItem[index].subRoute)
            routeItem[index].subRoute = route
            routeItem[index].amountIn = okla
            routeItem[index].amountOut = amountOut
        }

        const amountOut = routeItem[routeItem.length - 1].amountOut
        return {
            ...item,
            route: routeItem,
            amountIn: amountIn1,
            amountOut: amountOut
        }
    })

    return resultRoute
}

const sortRoute = (routeInput) => {
    const sortLogic = (a, b) => {
        const lengthRouteA = a.route.length
        const lengthRouteB = b.route.length

        const splicePercentA = a.splicePercent
        const splicePercentB = b.splicePercent

        return ((10 - lengthRouteB) * 100 + splicePercentB) - ((10 - lengthRouteA) * 100 + splicePercentA)

    }

    const routeOutput = routeInput.sort(sortLogic)
    return routeOutput
}

const convertBigInttoNumberRoute = (routeInput) => {
    const routeOutput = routeInput.map(item => {
        const route = item.route.map(routeItem => {
            const newSubRoute = routeItem.subRoute.map(it => {

                const newA = it.A ? Number(it.A) : 0
                const newD = it.D ? Number(it.D) : 0
                const newGamma = it.gamma ? Number(it.gamma) : 0

                return {
                    ...it,
                    A: newA,
                    D: newD,
                    gamma: newGamma
                }
            })

            return {
                ...routeItem,
                subRoute: newSubRoute,
            }
        })
        return {
            ...item,
            route: route,
        }
    })
    return routeOutput
}


const convertNumbertoBigIntRoute = (routeInput) => {
    const routeOutput = routeInput.map(item => {
        const route = item.route.map(routeItem => {
            const newSubRoute = routeItem.subRoute.map(it => {

                if (it.type === POOL_TYPE.curveV2) {
                    const newA = it.A ? BigInt(it.A) : 0
                    const newD = it.D ? BigInt(it.D) : 0
                    const newGamma = it.gamma ? BigInt(it.gamma) : 0
                    return {
                        ...it,
                        A: newA,
                        D: newD,
                        gamma: newGamma
                    }
                }
                else return {
                    ...it
                }
            })

            return {
                ...routeItem,
                subRoute: newSubRoute,
            }
        })
        return {
            ...item,
            route: route,
        }
    })
    return routeOutput
}


const readInputRoute = async () => {
    return new Promise((resolve, reject) => {
        fs.readFile('input.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                const obj = JSON.parse(data)
                resolve(obj)
            }
        });
    });
}


const writeInputRoute = (data) => {
    const JsonRoute = JSON.stringify(data)
    fs.writeFile("input.json", JsonRoute, function (err) {
        if (err) throw err;
        console.log('complete');
    }
    );
}


export const main = async (tokenA, tokenB, amount = 10000000, chain, callback) => {

    genWeb3Route(chain.chainRPC)

    const dataRoute = await readInputRoute()

    const dataBigInt= convertNumbertoBigIntRoute(dataRoute)

    const mid = Date.now();
        let maxOut = [0, 0, 0]

    for (let i = 1; i < 200; i++) {

        const routeHaveTradeEst = setAmountTradedEst(dataBigInt, 0.005 * i)

        const routeHavePercent1 = splicePercent(routeHaveTradeEst)
        //console.log("🚀 ~ file: index.js:411 ~ main ~ routeHavePercent1:", routeHavePercent1)

        const filterRoute1 = filterSmallPool(routeHavePercent1, 0.01)

        const ecec1 = splicePercent(filterRoute1)

        const okla = calcAmountOutRoute(ecec1, amount * 10 ** 36)
        const out = okla.reduce((a, b) => a + b.amountOut, 0) / (10 ** 36)
        const amountIn = okla.reduce((a, b) => a + b.amountIn, 0) / (10 ** 36)

        if (maxOut[0] < out) {
            maxOut[0] = out
            maxOut[1] = 0.005 * i
            maxOut[2] = okla
        }

        //console.log(okla,out , amountIn,0.01 * i)
    }

    //console.log(maxOut[2])
    const resultRoute = convertBigInttoNumberRoute(maxOut[2])

    const end = Date.now();
    console.log(`Execution time calAmoutOut: ${end - mid} ms`);

    return resultRoute

}


