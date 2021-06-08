import supertest from 'supertest';
import env from './env';
const request = supertest(env.baseUrl);

export default request;