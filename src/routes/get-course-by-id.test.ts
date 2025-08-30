import { expect,  test } from "vitest";
import { server } from "../app.ts";
import request from 'supertest'
import { makeCourse } from "../tests/factories/make-course.ts";
import { makeAuthenticatedUser } from "../tests/factories/make-user.ts";

test(' Get course by id', async ()=> {

    await server.ready() 

    const { token } = await makeAuthenticatedUser('student')

     const course  = await makeCourse()

        const  response = await request(server.server)
         .get(`/courses/${course.id}`)

        .set('Authorization', token)

         expect( response.status).toEqual(200)
         expect( response.body).toEqual({
             course:{
                 id: expect.any(String),
                 title: expect.any(String),
                 description:  null 
             }
         })
})
/*
test('return 404 for non existing courses ', async ()=> {

    await server.ready() 

    const { token } = await makeAuthenticatedUser('student')

        const  response = await request(server.server)
        .get(`/courses/e35096a3-5414-4055-9706-d49f147047d5`)
        .set('Authorization', token)



         expect( response.status).toEqual(404)
       
})
 */