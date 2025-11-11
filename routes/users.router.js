import express, { response } from 'express';

const usersRouter = express.Router();

// authRouter.get('/login/get/:id', (request, response, next) => {
//   const loginId = request.params.id;
//   response.status(200).send(`${loginId}유저 정보 조회 완료`);
// });

// authRouter.put('/login/edit/:id', (request, response, next) => {
//   const loginId = request.params.id;
//   response.status(200).send(`${loginId}유저 정보 수정 완료`);
// });

usersRouter.get('/api/users/:id', (request, response, next) => {
  response.status(200).send('유저 정보 조회 완료');
})
usersRouter.put('/api/users/:id', (request, response, next) => {
  response.status(200).send('유저 정보 수정 완료');
})

export default usersRouter;