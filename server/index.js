'use strict'

import cors from 'cors'
import express from 'express'
import {validateSchema} from "./schemas/validator.js";
import {main as superLinkRouter} from "./routers/calculator.js";
import {requestSchema} from "./schemas/calculateSchema.js";
import {encodeRouter} from "./routers/swapEncoder.js";

const app = express()
const port = process.env.PORT || 3000;;
const host = '0.0.0.0';

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://superlink.ag/']
}));

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/calculate', async (req, res) => {
    // Validate request
    const body = req.body
    const isValid = validateSchema(body, requestSchema)
    let response = {}
    let responseData = []
    if (isValid) {
        await superLinkRouter(body.token0, body.token1, body.amount, body.chain.chainRPC).then((tokenOut) => {
            responseData = tokenOut
        })
        // Return user data if it's valid
    } else {
        // Return a 400 Bad Request error if data is invalid
        res.status(400).json({error: 'Invalid data'});
    };
    response.data = responseData;
    response.total = responseData.reduce((a, b) => a + b.amountOut, 0) / (10 ** 36)

    res.json(response)
});

app.post('/encode', async (req, res) => {
    let data = encodeRouter(req.body);
    res.json({data: data})
});

app.listen(port, () => {
    console.log(`Bird is flying at ${port}`)
})