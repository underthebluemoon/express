import mysql from 'mysql2/promise';
import 'dotenv/config';

//                    ↱ connection pool 생성
export default mysql.createPool({
  host: process.env.DB_MYSQL_HOST,
  //     ↱ env는 문자열이기 때문에 숫자로 변환
  port: parseInt(process.env.DB_MYSQL_PORT),
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DB_NAME,
  //                   ↱ env는 문자열이기 때문에 boolean으로 변환하기 위해 조건식
  waitForConnections: (process.env.DB_MYSQL_WAIT_FOR_CONNECTIONS === 'true'),
  connectionLimit: parseInt(process.env.DB_MYSQL_CONNECTION_LIMIT),
  queueLimit: parseInt(process.env.DB_MYSQL_QUEUE_LIMIT),
})