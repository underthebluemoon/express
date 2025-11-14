import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Employee';  // 모델명 (JS 내부에서 사용하는 이름)

// 컬럼 정의
const attributes = {
  empId: {  // 카멜 기법으로 컬럼명 : {제약 조건} 정의
    field: 'emp_id',                  // DB의 컬럼 physicalname
    //     ↱ sequelize에서 데이터 타입 지정 가능
    type: DataTypes.BIGINT.UNSIGNED,  // 컬럼의 데이터 타입 지정 
    primaryKey: true,                 // PRIMARY KEY 지정 : 지정하지 않을 경우, sequelize에서 id 컬럼(PK)을 생성할 수도 있음
    allowNull: false,                 // NULL 비허용
    autoIncrement: true,              // AUTO_INCREMENT 지정
    comment: '사원 ID',                // 코멘트 설정
  },
  name: {
    field: 'name',
    //               ↱ VARCHAR
    type: DataTypes.STRING(50),
    allowNull: false, 
    comment: '사원명',
  },
  birth: {
    field: 'birth',
    type: DataTypes.DATE,
    allowNull: false, 
    comment: '사원 생년월일',
    // getter 생성 : DATE 데이터가 원하는 것과 다를 수 있으므로, 가공 필요
    get() {
      //                ↱ sequelize에서 제공하는 모델의 컬럼 정의 메소드
      const val = this.getDataValue('birth');
      if(!val) {
        return null;
      }
      //     ↱ dayjs library 이용, 해당 데이터를 기준으로 포맷팅
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  gender: {
    field: 'gender',
    type: DataTypes.CHAR(1),
    allowNull: false, 
    comment: '성별',
  },
  hireAt: {
    field: 'hire_at',
    type: DataTypes.DATE,
    allowNull: false,
    comment: '입사일',
    get() {
      const val = this.getDataValue('hireAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  fireAt: {
    field: 'fire_at',
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null, 
    comment: '퇴사일',
    get() {
      const val = this.getDataValue('fireAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  supId: {
    field: 'sup_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    defaultValue: null,
    comment: '사수 ID',
  },
  createdAt: {
    field: 'created_at',
    //                 ↱ 레코드 생성 시점의 시간이 자동으로 입력 됨, defaultValue 노필요
    // type: DataTypes.NOW,
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
    comment: '작성일',
    get() {
      const val = this.getDataValue('createdAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
    comment: '수정일',
    get() {
      const val = this.getDataValue('updatedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    comment: '삭제일',
    get() {
      const val = this.getDataValue('deletedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
};


// Options 설정 (테이블 관련 설정)
const options = {
  tableName: 'employees',  // 실제 테이블 명
  timestamps: true,        // createdAt, updatedAt 자동 관리
              // 모델 이용해서 생성/수정 시 `createdAt`,`updatedAt` 컬럼(이름 인식) 자동 업데이트
  // createdAt: 'empCreatedAT', ← createdAt 이름이 다르다면 해당 이름으로 설정 가능
  // updatedAt: false,
  paranoid: true,          // Soft Delete 설정 (deletedAt 자동 관리)
}

// 모델 객체 작성
const Employee = {
  // 모델 초기화 함수
  //     ↱ sequelize 객체를 받아서 
  init: (sequelize) => {
    //                      ↱ seuqelize 객체에 define 메소드 호출, 위에서 정의한 이름+컬럼+옵션으로 모델 정의
    //                               ↱ define() : JS에서 DB 테이블을 객체처럼 다룰 수 있게 해줌, DB 조작 (쿼리 생성 → DB 조회/수정) 가능하게 해줌
    const defineEmployee = sequelize.define(modelName, attributes, options);

    return defineEmployee;
  },
  // 모델 관계를 정의
  associate: (db) => {
    // 1:n 관계에서 부모 모델에 설정하는 방법 (1:n - 1명의 사원은 복수의 직급 정보를 가짐)
    //  ↱ 1 - 부모 모델   ↱ 2 - 연결할 자식 모델
    //           ↱ method
    //                                  ↱ 참조 될 컬럼 (Employee의 empId)
    //                                                      ↱ 참조 해서 fk 컬럼 (TitleEmp의 empId)
    //                                                                           ↱ 관계 별칭
    db.Employee.hasMany(db.TitleEmp, { sourceKey: 'empId', foreignKey: 'empId', as: 'titleEmps'});
  }
}

export default Employee;