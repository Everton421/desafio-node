import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import z from 'zod'

export const  createCousesRoute :FastifyPluginAsyncZod = async (server ) => {
    server.post('/courses', 
        {  
            schema: {
                    body: z.object(
                            { title: z.string() }
                        ),
                        tags:['courses'] ,
                        summary:'Create a course',
                        description:'Registra um curso ',
                        response:{
                            201: z.object({ courseID: z.uuid()}).describe("Curso criado com sucesso!") 
                        }
                }
    },
    async  ( request, reply ) =>{ 
            const body = request.body   
            const courseTitle = body.title
                    const result = await db.insert(courses).values({ title: courseTitle}).returning()    
                        return reply.status(201).send({ courseID: result[0].id}) 
    
    })
}