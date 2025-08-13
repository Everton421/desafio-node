
import crypto from 'node:crypto'
    
import fastify from 'fastify'
import { db } from './src/database/client.ts'
import { courses } from './src/database/schema.ts'
import { eq } from 'drizzle-orm'

const   server = fastify({
    logger: {
         transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    }, 
    }
})
const port = 3000 
 
server.get('/courses', async  ( request, reply )=>{
        const result = await db.select( { 
            id: courses.id,
            description: courses.description
        }).from(courses)
        return  reply.send({ courses:result }) 
})
 

server.get('/courses/:id', async ( request, reply )=>{
    type params = {
        id:string
    }
    const params = request.params as params

    const courseId =  params.id 
    const result = await db.select().from(courses).where(  eq(courses.id, courseId))
         
             if( result.length > 0  ){
                  return   reply.send( { course: result[0]}) 
             }
})
 
server.listen({ port:port, }).then(()=> console.log(`Servidor rodando porta : ${port}`))
