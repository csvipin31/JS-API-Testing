
import request from '../config/Import_common';
import { expect } from 'chai';
import { before } from 'mocha';
const faker=require('faker');
require('dotenv').config();

const Token = process.env.USER_TOKEN;
import { createUser } from '../Common/user_common';

describe('POSTS ', ()=> {
    let postId, userId;
    before (async() =>{
      userId = await createUser();
    });

    describe('POST Test', ()=>{
        it ('/posts', async () => {     
            const reqBody = {
                user_id: userId,
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraph(),
            };
        
            const postres= await request
              .post('posts')
              .set('Authorization', `Bearer ${Token}`)
              .send(reqBody);
               expect(postres.body.data).to.deep.include(reqBody);
               postId= postres.body.data.id;
               console.log(postres.body.data);              
         });
      })

    describe ('POST Test async', ()=>{
        it ('/posts', async () => {
          const reqBody = {
              user_id: userId,
              title: faker.lorem.sentence(),
              body: faker.lorem.paragraph(),
          };
      
          const res= await request
            .post('posts')
            .set('Authorization', `Bearer ${Token}`)
            .send(reqBody);
             expect(res.body.data).to.deep.include(reqBody);
             postId= res.body.data.id;
            
        });
    });
    describe('GET POSTS DATA USING POST ID',() =>{
        it('GET /posts/:id',async()=>{
        const res = await request
                    .get(`posts/${postId}`)
                    .set('Authorization', `Bearer ${Token}`);
                     expect(200);            
        });
    })
   
 }) 