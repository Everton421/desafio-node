
import { test , expect } from 'vitest'
import supertest, {  SuperTest } from 'supertest'

import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
 
 test( "Cria um curso com sucesso " , async ()=>{

   await server.ready()
     
    const response =  await supertest(server.server)
    .post('/courses')
    .set( 'Conten-type', 'aplication/json')
    .send( { title:  faker.lorem.words(4) })
 
    console.log(response.body)

        expect( response.status).toEqual(201)
         expect(response.body).toEqual({
             courseID: expect.any(String)
         })


})

 