import express, { Express, Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client'
import cors from 'cors'

const app: Express = express()
const port = 3000

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors())

app.get('/', (request: Request, response: Response) => {
    response.send('Hello World!')
})

app.post('/users/new', async (request: Request, response: Response) => {
    console.log(request.body)
    try {
        await prisma.user.create({
            // data: {
            //     name: request.body.name,
            //     email: request.body.email
            // } 
            data: request.body
        })
        response.send("user created")
    } catch (error) {
        console.error(error)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
                response.status(400).send(error);
            }
        } else {
            response.status(500).send(error);
        }
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
