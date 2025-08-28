
import { test , expect } from 'vitest'
import supertest, {  SuperTest } from 'supertest'

import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeUser } from '../tests/factories/make-user.ts'
 
 test( "Login " , async ()=>{

   await server.ready()
     
   const  { passwordBeforeHash ,user } = await makeUser()

    const response =  await supertest(server.server)
    .post('/sessions')
    .set( 'Conten-type', 'aplication/json')
    .send( {  email: user.email , password: passwordBeforeHash})
 

        expect( response.status).toEqual(200)
         expect(response.body).toEqual({
           message:'ok' 
        })


})

 