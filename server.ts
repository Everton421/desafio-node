
import crypto from 'node:crypto'
    
import fastify from 'fastify'
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

const teste = [
    {id:"1", description: 'SftE123'},
    {id:"2", description: 'SftE124'}

]

server.get('/teste', () =>{
    return teste
})  

 server.post('/teste',( req, rep )=>{
        let obj =  {id: crypto.randomUUID(), description:'teste1213'}  
     teste.push(  obj )
     return obj
 })

server.listen({ port:port, }).then(()=> console.log(`Servidor rodando porta : ${port}`))

