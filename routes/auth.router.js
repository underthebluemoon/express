import express from 'express';
import loginValidator from '../app/middlewares/validations/validators/login.validator.js';
import validatorHandler from '../app/middlewares/validations/validators/validations-handler.js';
import registrationValidator from '../app/middlewares/validations/validators/registration.validator.js';

const authRouter = express.Router(); // 라우터 객체 인스턴스를 반환

//                         ↱ 유저 입력값이 제대로 되었는지 확인
//                                        ↱ validator 가 제대로 작동했는지 확인
authRouter.post('/login', loginValidator, validatorHandler, (request, response, next) => {
  response.status(200).send('로그인 성공');
});

authRouter.post('/registration', registrationValidator, validatorHandler, (request, response, next) => {
  response.status(200).send('회원 가입 성공');
});



export default authRouter;