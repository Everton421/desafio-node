
    
import fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'

import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { getCousesRoute } from './src/routes/get-courses.ts'
import { getCouseByIdRoute } from './src/routes/get-course-by-id.ts'
import { createCousesRoute } from './src/routes/create-courses.ts'

// configurações do fastify
//  ⚠️ pino-pretty precisa ser instalado como uma dependência de desenvolvimento.
// .withTypeProvider<ZodTypeProvider>() ** usado para habilitar a inferência de tipo estático de esquemas Zod,
// para validação ( body, params, etc ... ), ajuda na tipagem e valida a existencia de determinado parametro/valor
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
}).withTypeProvider<ZodTypeProvider>( )


server.register(fastifySwagger ,{
        openapi:{
            info: { 
                title: 'Desafio Node.js ',
                version:'1.0.0',
            }
        },
     transform: jsonSchemaTransform 
    },
)

server.register(fastifySwaggerUi, { routePrefix:'/docs'})

// transforma dado em outro formato  
server.setSerializerCompiler(serializerCompiler)

// faz a validadcao nos dados de entrada 
server.setValidatorCompiler( validatorCompiler )

server.register( getCousesRoute)
server.register( getCouseByIdRoute)
server.register( createCousesRoute)


const port = 3000 
 
server.listen({ port:port, }).then(()=> console.log(`Servidor rodando porta : ${port}`))
