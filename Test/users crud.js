import request from '../config/Import_common';
import { expect } from 'chai';
const Token = '8cf035a31cbe5b5f601be12a69b2de21acaa58e7bf6cc0657ab09e71f371a166';

describe('Users crud', ()=> {
    let userId;
    describe('POST Test', ()=>{
      it ('users/', () => {
        const requestBody = {
          email: `test-${Math.floor(Math.random() * 99999)}@mail.au`,
          name: 'Test name',
          gender: 'Male',
          status: 'Inactive',
        };
    
        return request
          .post('users')
          .set('Authorization', `Bearer ${Token}`)
          .send(requestBody)
          .then((res) => { expect(res.body.data).to.deep.include(requestBody);
           userId = res.body.data.id;
           //console.log(res.body.data);
          });
       });
    })
    describe('GET Test', ()=>{
      it ('GET /users/:id', () => { return request.get(`users/${userId}?access-token=${Token}`).then((res) => {//console.log(res.body);
                  expect(res.body.data).to.not.be.empty;    
                  expect(res.body.data.id).to.be.eql(userId);                   
              });
      }); 
    }); 
    describe('PUT Test', ()=>{
      it('PUT /users/:id', () => {
          const data = {
            status: 'Active',
            name: `Luffy - ${Math.floor(Math.random() * 9999)}`,
          };
      
          return request
            .put(`users/${userId}`)
            .set('Authorization', `Bearer ${Token}`)
            .send(data)
            .then((res) => {
              //console.log(res.body);
              expect(res.body.data).to.deep.include(data);
          });
      }); 
    }); 
    describe('Delete Test', ()=>{
      it('DELETE /users/:id', () => {
          return request
            .delete(`users/${userId}`)
            .set('Authorization', `Bearer ${Token}`)
            .then((res) => {
              //console.log(res.body);
              expect(res.body.data).to.be.eq(null);
          });
      });  
    });
})