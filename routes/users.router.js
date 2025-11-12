import express from 'express';
import { eduUsersTest } from '../app/middlewares/edu/edu.middleware.js';
// import connectionPool from '../db/my-db.js';
import db from '../app/models/index.js'
//                  ↱ db에 담았던 초기화 한 모델들
const { sequelize, Employee } = db;

const usersRouter = express.Router();

// authRouter.get('/login/get/:id', (request, response, next) => {
//   const loginId = request.params.id;
//   response.status(200).send(`${loginId}유저 정보 조회 완료`);
// });

// authRouter.put('/login/edit/:id', (request, response, next) => {
//   const loginId = request.params.id;
//   response.status(200).send(`${loginId}유저 정보 수정 완료`);
// });
                              // ↱ 해당 처리 할 때, 실행 전에 실행할 미들웨어를 인자로 받음
usersRouter.get('/api/users/', eduUsersTest, (request, response, next) => {
  response.status(200).send('전체 유저 정보 조회 완료');
})

//                                ↱ async/awit 로 만들기 위해!
usersRouter.get('/api/users/:id', async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);

    // ------------------------------------
    // mysql2로 DB 연동
    // ------------------------------------
    //                               ↱ SQL 변환: SELECT * FROM employees WHERE emp_id = ? LIMIT 1;
    //                             ↱ Primary Key로 단일 레코드를 SELECT 하는 Sequelize 메서드  
    const result = await Employee.findByPk(id);
    //                           ↱ 데이터를 JSON.stringify() 로 JSON 변환함
    return response.status(200).send(result);
    


    // ------------------------------------
    // mysql2로 DB 연동
    // ------------------------------------

    // // 쿼리 작성1
    // const sql = `
    //   select *
    //   FROM employees
    //   WHERE
    // //           ↱ sql injection 위험성!! 유저가 보낸 값 그대로 사용 위험!!!
    //     emp_id = ${id}
    // `;
    // //                                    ↱ 쿼리 실행 메소드
    // const [result] = await connectionPool.query(sql);

    // // 쿼리 작성2 - prepared statement 이용
    // const id = request.params.id;
    // // Query 작성
    // const sql = `
    //   select *
    //   FROM employees
    //   WHERE
    //     emp_id = ?
    // `;
    // // prepared statement : db 자체에서 제공
    // //                                     ↱ 쿼리 문, id 따로 db 전송 → 좀 더 안전
    // const [result] = await connectionPool.execute(sql, [id, id]);

    // // 쿼리작성 1/2 -> return
    // return response.status(200).send(result);
  } catch(error) {
    // errorHandler로 error가 갈 수 있게, next에 담아서 보냄
    next(error);
  }

})

usersRouter.put('/api/users/:id', (request, response, next) => {
  response.status(200).send('유저 정보 수정 완료');
})

export default usersRouter;