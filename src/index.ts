import express, { Express, Request, Response } from 'express';
const app: Express = express()
const port = 3000

app.get('/', (request: Request, response: Response) => {
    response.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})