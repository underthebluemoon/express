import express from 'express';
import { eduUsersTest } from '../app/middlewares/edu/edu.middleware.js';

const usersRouter = express.Router();

// authRouter.get('/login/get/:id', (request, response, next) => {
//   const loginId = request.params.id;
//   response.status(200).send(`${loginId}유저 정보 조회 완료`);
// });

// authRouter.put('/login/edit/:id', (request, response, next) => {
//   const loginId = request.params.id;
//   response.status(200).send(`${loginId}유저 정보 수정 완료`);
// });
                              // ↓ 해당 처리 할 때, 실행 전에 실행할 미들웨어를 인자로 받음
usersRouter.get('/api/users/', eduUsersTest, (request, response, next) => {
  response.status(200).send('전체 유저 정보 조회 완료');
})

usersRouter.get('/api/users/:id', (request, response, next) => {
  response.status(200).send('유저 정보 조회 완료');
})

usersRouter.put('/api/users/:id', (request, response, next) => {
  response.status(200).send('유저 정보 수정 완료');
})

export default usersRouter;