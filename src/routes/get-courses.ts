import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import z from 'zod'
import { and, asc, ilike, SQL } from 'drizzle-orm'

export const  getCousesRoute :FastifyPluginAsyncZod = async (server ) => {
    server.get('/courses', 
        {
            schema:{
                tags:['courses'] ,
                summary:"Get all courses",
                querystring: z.object({
                    search: z.string().optional(),
                    orderBy: z.enum(['title','id']).optional().default('title'),
                    page: z.coerce.number().optional().default(1)
                }),
                response:{
                    200: z.object({
                        courses: z.array( 
                             z.object({
                                id: z.uuid(),
                                title: z.string()
                            }),
                       ),
                            total: z.number()
                    })
                }
            }
        }
        ,async  ( request, reply )=>{
            
            const { search, orderBy, page } = request.query

            const conditions:SQL[] = []
            if( search ){
                conditions.push( ilike(courses.title, `%${search}%` ) )
            }
            
               const [ result, total] = await Promise.all([
                db.select( { 
                    id: courses.id,
                    title: courses.title
                })
                .from(courses)
                .where( 
                   and(...conditions)  
                )
                .limit(10)
                .offset( ( page -1 ) * 2 )
                .orderBy(asc(courses[orderBy])),

                    db.$count(courses, and(...conditions) ) 
                ])
           
       

            return  reply.send({ courses:result, total:total  }) 
    })
}