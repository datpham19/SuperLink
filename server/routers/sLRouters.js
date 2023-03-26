import {tokenTrungGian} from "./constants.js"
import {getAddressPoolCurveV1, getDataPoolCurveV1} from "./DEXs/curveV1.js"
import {getAddressPoolCurveV2, getAddressPoolCurveV2noFac, getDataPoolCurveV2} from "./DEXs/curveV2.js"
import {getAddressPoolUniV2} from "./DEXs/uniV2.js"

const getListAddressPool = async (addressTokenA, addressTokenB, chain, listPoolCurveV1, listDataPool) => {


    const arrAddressPoolUniV2 = await getAddressPoolUniV2(addressTokenA, addressTokenB, chain)
    console.log("🚀 ~ file: router.js:11 ~ getListAddressPool ~ arrAddressPoolUniV2:", arrAddressPoolUniV2, addressTokenA, addressTokenB)


    const arrAddressPoolCurveV1 = await getAddressPoolCurveV1(addressTokenA, addressTokenB, listDataPool, chain)
    // console.log("🚀 ~ file: router.js:11 ~ getListAddressPool ~ arrAddressPoolCurveV1:", arrAddressPoolCurveV1, addressTokenA, addressTokenB, listDataPool)

    const arrAddressPoolCurveV2noFac = await getAddressPoolCurveV2noFac(addressTokenA, addressTokenB, listDataPool, chain)


    const arrAddressPoolCurveV2 = await getAddressPoolCurveV2(addressTokenA, addressTokenB, chain)


    const arrAddressPoolUniV3 = []// await getAddressPoolUniv3(addressTokenA, addressTokenB,chain)

    listPoolCurveV1.push(...arrAddressPoolCurveV1, ...arrAddressPoolCurveV2noFac)
    const resultArr = [...arrAddressPoolUniV2, ...arrAddressPoolUniV3, ...arrAddressPoolCurveV2]//,...arrAddressPoolCurveV2]
    return resultArr
}

const getPoolApi = async () => {
    const listPoolCurveV1okla = await getDataPoolCurveV1()
    const listPoolCurveV2 = await getDataPoolCurveV2()

    return [...listPoolCurveV1okla, ...listPoolCurveV2]
}

export const findAllRoute = async (tokenA, tokenB, chain, listPoolCurveV1) => {

    let listDataPool = []// await getPoolApi()
    let allRoute = []

    const AtoB = await getListAddressPool(tokenA, tokenB, chain, listPoolCurveV1, listDataPool)
    allRoute.push({
        route: [
            {
                subRoute: AtoB,
                namePair: `${tokenA.symbol} ---> ${tokenB.symbol}`,
                coins: [tokenA, tokenB]
            },
        ]
    })

    await Promise.all(tokenTrungGian.map(async item => {

        if (item.address === tokenA.address || item.address === tokenB.address) return {}
        const AtoC = await getListAddressPool(tokenA, item, chain, listPoolCurveV1, listDataPool)
        if (AtoC.length === 0) return {}
        const CtoB = await getListAddressPool(item, tokenB, chain, listPoolCurveV1, listDataPool)
        if (CtoB.length === 0) return {}

        allRoute.push({
            route: [
                {
                    subRoute: AtoC,
                    namePair: `${tokenA.symbol} ---> ${item.symbol}`,
                    coins: [tokenA, item]
                },
                {
                    subRoute: CtoB,
                    namePair: `${item.symbol} ---> ${tokenB.symbol}`,
                    coins: [item, tokenB]
                },

            ],

        })
        return {}
    }))

    return allRoute
}