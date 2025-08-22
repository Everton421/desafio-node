import { server } from "./app.ts"

 
const port = 3000 
 
server.listen({ port:port, }).then(()=> console.log(`Servidor rodando porta : ${port}`))
