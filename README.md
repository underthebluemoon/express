# 유효성 체크를 위한 준비

## validator 라이브러리 설치
``` 
npm install express-validator
```
- 미들웨어

**라이브러리를 설치하지 않는 경우**
- if로 분기를 나누어 직접 체크해야 함

## 유효성 체크 처리 디렉토리 구조
```
middlewares/
└─ validations/
    ├─ fields/
    │   ↳ 각 요소들의 유효성 체크 처리 로직이 있는 디렉토리
    ├─ validators/
    │   ↳ 필요한 field를 모아서 한 기능에서 사용하는 데이터들을 검증하는 로직이 들어가 있는 디렉토리
    └─ validationHandler.js
        ↳ 유효성 검사 통과 여부에 따른 공통 처리 미들웨어
```

# DB 연동
## 설치
```
npm install mysql2
```


# 기본 RESPONSE 양식

## 예시

### 정상
```
{
    code: '00',
    message: '정상 처리',
    data: [] | {}
}
```

### 에러
```
{
    code: 'E01',
    message: '아이디나 비밀번호가 틀렸습니다.',
    data: null | []
}
```