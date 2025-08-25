import { expect,  test } from "vitest";
import { server } from "../app.ts";
import request from 'supertest'
import { makeCourse } from "../tests/factories/make-course.ts";
import { randomUUID } from "node:crypto";
import { string } from "zod";
import { title } from "node:process";

test(' Get courses  ', async ()=> {

    await server.ready() 


    const titleId = randomUUID();

    const course = await makeCourse(titleId)

        const  response = await request(server.server)
        .get(`/courses?search=${titleId}`)

          expect( response.status).toEqual(200)
       //   console.log(response.body)
           expect( response.body).toEqual({
             total:1,
                 courses: [
                     {
                         id: expect.any(String),
                         title: titleId,
                         enrollments:0
                     }
                 ]
           })

})