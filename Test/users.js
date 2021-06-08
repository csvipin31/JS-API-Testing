import request from '../config/Import_common';
import { expect } from 'chai';

const Token = '8cf035a31cbe5b5f601be12a69b2de21acaa58e7bf6cc0657ab09e71f371a166';

describe('Users', ()=> {
    it ('GET /users', (done) => { request.get(`users?access-token=${Token}`).end((_err, res) => { //console.log(res.err); //onsole.log(res.body);
                    expect(res.body.data).to.not.be.empty;
                    done();
                });
    });

    it ('GET /users async', () => {  return request.get(`users?access-token=${Token}`).then((res) => {// console.log(res.body);
                        expect(res.statusCode).to.be.eq(200);
                        expect(res.body.data).to.not.be.empty;                     
                    });
    });   
       
    it ('GET /users/:id', () => { return request.get(`users/1?access-token=${Token}`).then((res) => {//console.log(res.body);
                expect(res.body.data).to.not.be.empty;    
                expect(res.body.data.id).to.be.eql(1);                   
            });
    });  

    it ('GET /users/with query param ', () => { const urlquery =  `users?access-token=${Token}&page=5&gender=Female&status=Active`
            return request.get(urlquery).then((res) => {//console.log(res.body);
                    expect(res.body.data).to.not.be.empty;    
                    res.body.data.forEach((data) => {
                        expect(data.gender).to.eq('Female');
                        expect(data.status).to.eq('Active');
                      });                  
                });
    });  

    it ('POST /users/', () => {
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
          .then((res) => {
              //console.log(res.body);
              //console.log(res.status);
              //console.log(res.statusCode);              
              //expect(res.).to.be.eq(201);
              //expect(res.body.data).email.to.eq(requestBody.email);
            expect(res.body.data).to.deep.include(requestBody);
        });
    });

    it('PUT /users/:id', () => {
        const data = {
          status: 'Active',
          name: `Luffy - ${Math.floor(Math.random() * 9999)}`,
        };
    
        return request
          .put('users/132')
          .set('Authorization', `Bearer ${Token}`)
          .send(data)
          .then((res) => {
            console.log(res.body);
            expect(res.body.data).to.deep.include(data);
        });
    });  

    it('DELETE /users/:id', () => {
        return request
          .delete('users/21')
          .set('Authorization', `Bearer ${Token}`)
          .then((res) => {
            console.log(res.body);
            expect(res.body.data).to.be.eq(null);
        });
    });  
})