import express from 'express';
import db from '../app/models/index.js';
//            ↱ 상수용
import { Op, Sequelize } from 'sequelize';
import dayjs from 'dayjs';
//       ↱ connection pool, 내가 만든 것
const { sequelize, Employee, TitleEmp, Title } = db;
//                  ↳ db 에서 가져와야 함. model 정의 파일에서 가져오면 안 됨!

const eduRouter = express.Router();

eduRouter.get('/api/edu', async(request, response, next) => {
  try {
    const fireDate = request.query.date;

    let result = null;
    // ---------------------------------
    // 평문으로 실행하고 싶을 경우
    // const sql = `
    //   SELECT *
    //   FROM employees
    //   WHERE fire_at >= ?
    //   LIMIT 50
    // `; //              ↳ sql injection 대비 : prepared statement `?`
    // result = await sequelize.query(
    //   sql, 
    //   // prepared statement
    //   {
    //   replacements: [fireDate],
    //   //    ↳ fireDate 에 들어갈 값, 쿼리와 별개로 db로 전달됨
    //   type: Sequelize.QueryTypes.SELECT,
    //   //    ↳ Sequelize 에게 쿼리 타입이 'SELECT'인 걸 알려주는 부분 : INSERT/UPDATE/DELETE/...
    //   }
    // );

    // ---------------------------------
    // Model 메소드
    // ---------------------------------

    // // 1. 전체 조회 (조건 설정 가능) : 배열 반환
    // // ===== findAll() =====
    // // SELECT * FROM employees
    // //                         ↱ findAll parameter로 option 설정 가능
    // result = await Employee.findAll({
    //   attributes: ['empId', 'name', 'birth'],  // 조회할 컬럼 지정(SELECT 절)
    //   where: {
    //     // ↱ emp_id = 1
    //     // empID: 1
    //     // ↱ emp_id <= 100
    //     empId: {
    //       //  ↱ Op : operator(연산자) 비교 연산자 등을 Sequelize에서 사용하기 위한 객체
    //       //      ↱ less than or equal 작거나 같다
    //       // [Op.lte] : 100
    //       //               ↱ BETWEEN 50 AND 100
    //       [Op. between] : [50, 100]
    //     }
    //   }
    // });

    // // 2. 조건에 맞는 첫번째 레코드 조회 : 객체 반환
    // // ===== findOne() =====
    // result = await Employee.findOne({
    //   attributes: ['empId', 'name', 'birth'],  // 조회할 컬럼 지정(SELECT 절)
    //   where: {
    //     empId: {
    //       //               ↱ BETWEEN 50 AND 100
    //       [Op. between] : [50, 100]
    //     }
    //   }
    // });

    // // 3. PK 값으로 단일 레코드 조회 : 객체 반환
    // // ===== findByPk(id, options) =====
    // //                       ↱ WHERE emp_id = '50000'
    // result = await Employee.findByPk(50000, {
    //   attributes: ['empId', 'name'],
    // })

    // // 4. count, sum, max, min, avg - GROUP BY 아님!
    // // count(options), sum(field, options), max(field, options), min(field, options), avg(field, options)
    // // SELECT COUNT(*) FROM employees WHERE deleted_at IS NULL
    // // result = await Employee.count();
    // // result = await Employee.count({
    // // //  ↱ soft delete 옵션 비활성화  
    // //   paranoid: false,
    // // });
    // result = await Employee.max('empId')

    // // 5. 새 레코드 생성 : 생성된 레코드 반환
    // // ===== create(values, options) =====
    // result = await Employee.create({
    //   name: '테스트',
    //   birth: '2000-01-01',
    //   hireAt: dayjs().format('YYYY-MM-DD',),
    //   gender: 'F',
    // })

    // // 6. 기존 레코드 수정 - 영향받은 레코드의 개수 반환
    // // ===== update(value, option) =====
    // // UPDATE INTO employees SET name = '벼리' WHERE emp_id = 100010
    // result = await Employee.update(
    //   {  // 바꿀 내용
    //     name: '벼리'
    //   }, {  // 바꿀 레코드 조건
    //     where: {
    //       empId: 100010
    //     }
    //   }
    // );

    // // 7. 기존 레코드 수정 - 업데이트 된 정보 반환
    // // ===== save() =====
    // // ((1)) 트랜잭션 시작
    // //     ↱ (2) 가져온 모델 인스턴스 담음
    // //                               ↱ (1) 모델 인스턴스 가져옴
    // const employee = await Employee.findByPk(100010);
    // // previous model - 기존 값 유지 → changed model 생성 - 변경한 값 들어감
    // employee.name = '별';
    // employee.birth = '1900-12-12';
    // // ((2)) 로그 저장 처리
    // result = await employee.save();
    // // ((3)) 커밋 처리

    // // 8. 새 레코드 추가 - 업데이트 된 정보 반환
    // // ===== build + save =====
    // // `5. create` 와 유사
    // const employee = await Employee.build(); // 빈 모델 객체 인스턴스
    // employee.name = '또치';
    // employee.birth = '1980-01-01';
    // employee.gender = 'F';
    // employee.hireAt = dayjs().format('YYYY-MM-DD');
    // // const employee = await Employee.build({
    // //   name: '또치',
    // //   birth: '1980-01-01',
    // //   gender: 'F',
    // //   hireAt: dayjs().format('YYYY-MM-DD')
    // // }); // 빌드할 때 채워서 생성
    // result = await employee.save();

    // // 9. 삭제 - 영향받은 레코드 수 반환
    // // ===== destroy(options) ======
    // // paranoid(Soft delete) : true 일 경우, deleted_at가 추가 되고 소프트 삭제 됨
    // //                                  ↳ force: true 로 hard delete 가능
    // result = await Employee.destroy({
    //   where: {
    //     empId: 100011
    //   }, 
    //   // force: true,  // 물리적 삭제
    // });

    // // 10. 복구 - soft delete 된 레코드 복원
    // // ===== restore(option) =====
    // result = await Employee.restore({
    //   where: {
    //     empId: 100010
    //   }
    // });

    // // 11. 조건의 연결 
    // result = await Employee.findAll({
    //   attributes: ['empId', 'name', 'gender'],
    //   // ===== case1. 이름이 '강가람'이고 성별이 '여자'인 사원 정보 조회
    //   //  ↱ default : AND
    //   // where : {
    //   //   name: '강가람',
    //   //   gender: 'F',
    //   // }
    //   // ===== case2. 이름이 '강가람' 또는 '신서연'인 사원 조회
    //   // where : {
    //   //   //   ↱ OR 로 연결할 것들을 배열로 작성 / Op.and 도 가능
    //   //   [Op.or] : [
    //   //     {name: '강가람'},
    //   //     {name: '신서연'},
    //   //   ]
    //   // }
    //   // ===== case3. 성별이 여성이고 이름이 강가람/신서연 사원 조회
    //   // == A1. 공식 작성법
    //   // where: {
    //   //   [Op.and] : [
    //   //     {gender: 'F'},
    //   //     {
    //   //       [Op.or] : [
    //   //       {name: '강가람'},
    //   //       {name: '신서연'},
    //   //     ]
    //   //     }
    //   //   ]
    //   // }
    //   // == A2. default가 AND 이니 괄호 생략
    //   // where: {
    //   //   gender: 'F',
    //   //   [Op.or] : [
    //   //     {name: '강가람'},
    //   //     {name: '신서연'},
    //   //   ]
    //   // }
    //   // == A3.
    //   // where : {
    //   //   [Op.or] : [
    //   //     {
    //   //       name: '강가람',
    //   //       gender: 'F',
    //   //     },
    //   //     {
    //   //       name: '신서연',
    //   //       gender: 'F',
    //   //     },
    //   //   ]
    //   // }
    //   // ===== case4. 그 외 다양한 조건
    //   where: {
    //     // empId: {
    //     //   //     ↱ BETWEEN 1 AND 100
    //     //   // [Op.between] : [1, 100]
    //     //   //     ↱ NOT BETWEEN 1 AND 100
    //     //   // [Op.notBetween] : [1, 100]
    //     //   //     ↱ IN(1, 2, 3)
    //     //   // [Op.in] : [1, 2, 3]
    //     //   //     ↱ NOT IN(1, 2, 3)
    //     //   // [Op.notIn] : [1, 2, 3]
    //     // },
    //     name: {
    //       //     ↱ LIKE '%가람'
    //       [Op.like] : '%가람'
    //       //     ↱ LIKE '%가람' + 대/소문자 무시
    //       // [Op.iLike] : '%가람'
    //     },
    //     fireAt: {
    //       // //   ↱`[Op.not]: null` : IS NOT NULL
    //       // [Op.not]: null
    //       //   ↱ `[Op.is]: null` : IS NULL
    //       [Op.is] : null
    //     },
    //   },
    //   // // ORDER BY
    //   // order: [
    //   //   ['name', 'ASC'],
    //   //   ['birth', 'DESC'],
    //   // ],
    //   // // LIMIT / OFFSET
    //   // limit: 10,
    //   // offset: 10,
    // })

    // // 12. GROUP BY
    // result = await Employee.findAll({
    //   //           ↱ GROUP BY → 표준 문법대로 SELECT 컬럼은 GROUP화 된 컬럼만 사용 가능
    //   attributes: [
    //     'gender',
    //     //          ↱ sequelize 함수 호출, COUNT(*)    ↱ 별칭을 줘야 컬럼이 출력 됨
    //     [sequelize.fn('COUNT', sequelize.col('*')), 'count'] 
    //   ],
    //   group: ['gender'],
    //   //                 ↱ 함수
    //   having: sequelize.literal('count >= 40000'),
    // })

    // 13. JOIN
    result = await Employee.findOne({
      // ORM 특징 : {첫 테이블 데이터의 프로퍼티(AS명)로 {조인 테이블 데이터}}
      //  ↱ 기준 테이블에서 출력할 데이터
      attributes: ['empId', 'name'],
      where: {
        empId: 1
      },
      //  ↱ JOIN
      include: [
        {
          model: TitleEmp,  // 내가 연결할 모델
          as: 'titleEmps',  // 내가 사용할 관계
          required: true,   // `true`: INNER JOIN/ `false`: LEFT OUTER JOIN
          //  ↱ JOIN한 테이블에서 출력할 데이터
          attributes: ['titleCode'],
          where: {
            endAt: {
              [Op.is]: null,
            }
          },
          //  ↱ JOIN 2 : TitleEmp를 기준으로 Title을 JOIN
          include: [
            {
              // ↱ model + AS → association 프로퍼티로 연결 가능
              association: 'title', 
              required: true,
              attributes: ['title'],
            }
          ]
        }
      ],
    })


    return response.status(200).send({
      msg: '정상 처리',
      data: result
    })
  } catch(error) {
    next(error);
  }
});

export default eduRouter;