import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
const Token = '8cf035a31cbe5b5f601be12a69b2de21acaa58e7bf6cc0657ab09e71f371a166';

export const createUser = async() =>{
    const requestBody = {
        email: `test-${Math.floor(Math.random() * 99999)}@mail.au`,
        name: 'Test name',
        gender: 'Male',
        status: 'Inactive',
      };

     const res = await request
          .post('users')
          .set('Authorization', `Bearer ${Token}`)
          .send(requestBody)
           return res.body.data.id;                
      };
