import request from '../config/Import_common';
import { expect } from 'chai';

const Token = '8cf035a31cbe5b5f601be12a69b2de21acaa58e7bf6cc0657ab09e71f371a166';
const faker=require('faker');

describe('POSTS ', ()=> {
    let postId, userId;
    describe('POST Test', ()=>{
        it ('/posts', async () => {
          const requestBody = {
            email: faker.internet.email(),
            name: faker.name.firstName(),
            gender: 'Male',
            status: 'Inactive',
          };
      
          await request
            .post('users')
            .set('Authorization', `Bearer ${Token}`)
            .send(requestBody)
            .then(async(res) => { expect(res.body.data).to.deep.include(requestBody);
            userId = res.body.data.id;    
            console.log(userId);         
            });

           const reqBody = {
                user_id: userId,
                title: "Title",
                body: "My API Test SC Reposs",
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
              title: "Title",
              body: "My API Test SC Reposs",
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

    /* describe('POST Test', ()=>{
        it ('/posts', () => {
          const reqBody = {
              user_id: userid,
              title: "Title",
              body: "My API Test SC Reposs",
          };
      
          return request
            .post('posts')
            .set('Authorization', `Bearer ${Token}`)
            .send(reqBody)
            .then((res) => { expect(res.body.data).to.deep.include(reqBody);
             //console.log(res.body.data);
            });
         });
      })*/
 }) 