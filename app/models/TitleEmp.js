import dayjs from "dayjs";
import { DataTypes, DATEONLY } from "sequelize";
import { toDefaultValue } from "sequelize/lib/utils";

// 모델명
const modelName = 'TitleEmp';

// 컬럼 정의
const attributes = {
  titleEmpId: {
    field: 'title_emp_id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '사원 직급 ID',
  },
  empId: {
    field: 'emp_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '사원 ID',
  },
  titleCode: {
    field: 'title_code',
    type: DataTypes.CHAR(4),
    allowNull: false,
    comment: '직급 코드',
  },
  startAt: {
    field: 'start_at',
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: '시작일',
    get() {
      const val = this.getDataValue('startAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-DDMM');
    }
  },
  endAt: {
    field: 'end_at',
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: null,
    comment: '종료일',
    get() {
      const val = this.getDataValue('startAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-DDMM');
    }
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
}

// Options 설정
const options = {
  tableName: 'title_emps',
  timestamp: true,
  paramoid: true,
}

// 모델 객체 생성
const TitleEmp = {
  init: (sequelize) => {
    const defineTitleEmp = sequelize.define(modelName, attributes, options);
    
    return defineTitleEmp;
  },
  // 모델 관계를 정의
  associate: (db) => {
    // 1:n 관계에서 자식 모델에 설정하는 방법 (1:n - 1명의 사원은 복수의 직급 정보를 가짐)
    //  ↱ 1 - 자식 모델     ↱ 2 - 참조할 부모 모델
    //           ↱ method
    //                                    ↱ 참조 할 부모 컬럼 (Employee의 empId)
    //                                                         ↱ 참조 해서 fk 컬럼 (TitleEmp의 empId)
    //                                                                              ↱ 관계 별칭
    db.TitleEmp.belongsTo(db.Employee, { targetKey: 'empId', foreignKey: 'empId', as: 'employee' });
    db.TitleEmp.belongsTo(db.Title, { targetKey: 'titleCode', foreignKey: 'titleCode', as: 'title' });
  }
}

export default TitleEmp;