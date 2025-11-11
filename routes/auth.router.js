import express from 'express';

const authRouter = express.Router(); // 라우터 객체 인스턴스를 반환

authRouter.post('/login', (request, response, next) => {
  response.status(200).send('로그인 성공');
});


export default authRouter;