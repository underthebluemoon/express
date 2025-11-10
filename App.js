import express from 'express'; // express 모듈 가져오기

  // app에 express 객체를 담아둠
const app = express()
          // express 객체를 반환하는 함수

// 클라이언트가 '/api/hi' 경로로 GET 요청을 보낼 때 실행되는 Router
// 유저가 http메소드 get('') 요청한 것을 지정
// http://localhost:3000/api/hi
app.get('/api/hi', (request, response, next) => {
  // request : 유저가 요청을 보냈을 때, 모든 정보가 담김 - path, query, data, 등
  //            express가 만들어줌
  // response : 유저에게 보낼 정보를 여기에 셋팅해서 보냄 - data, http status 등
  // next (next function) : middleware의 처리를 다음으로 넘길 때 사용
  response.status(200).send('안녕 익스프레스!');
                      // send 가장 마지막에 실행되는 메소드. 유저한테 응답을 보냄
});

// 클라이언드가 '/api/hi' 경로로 POST 요청을 보낼 때 실행되는 Router
app.post('/api/hi', (request, response, next) => {
  response.status(200).send('포스트 익스프레스!');
})

// 클라이언드가 '/api/hi' 경로로 PUT 요청을 보낼 때 실행되는 Router
app.put('/api/hi', (request, response, next) => {
  response.status(200).send('풋 익스프레스!');
})

// 클라이언드가 '/api/hi' 경로로 DELETE 요청을 보낼 때 실행되는 Router
app.delete('/api/hi', (request, response, next) => {
  response.status(200).send('딜리트 익스프레스!');
})

// -------------------------------------------------------------
// Query Parameter 제어
// 도메인?key=value로  이루어진 파라미터
// Request.query 프로퍼티를 통해서 접근 가능
// 모든 값을 string으로 받기 때문에 주의 필요 (true/false 안 씀, flg는 0, 1로 세팅)
app.get('/api/posts', (request, response, next) => {
  const params = request.query;
                      // query : 유저가 보낸 query parameter object
  const name = request.query.name;
  const age = request.query.age;
  console.log(name, age);
  response.status(200).send(params); 
});

// Segment Parameter - RESTful
// 도메인/param/...
// resource(path)의 일부분을 parameter로 사용 -> 이 때, parameter를 segment parameter라 함
// Request.params 프로퍼티를 통해서 접근 가능
// 모든 값을 string으로 받기 때문에 주의 필요 (true/false 안 씀, flg는 0, 1로 세팅)
app.get('/api/posts/:id', (request, response, next) => {
  const postId = request.params.id;
  response.status(200).send(postId);
});


// -------------------------------------------------------------
// 대체 라우트 (모든 라우터 중에 가장 마지막에 작성)
// 라우트를 위에 모두 정의 한 뒤 (위 -> 아래 방향으로 실행)
// use : get, put, post, ... 모든 경로를 다 받음
//       path 필요 없음
// 코드와 메세지를 객체로 send 가능 : json으로 자동 parsing
app.use((request, response, next) => {
  response.status(404).send({
    code: 'E01',
    msg: '찾을 수 없는 페이지입니다.'
  })
});


// 서버를 주어진 포트에서 시작하게 만듦
        // port
// app.listen(3000, () => {
//   console.log(`3000 포트에서 리스닝`)
    // console.log는 유저에게 보이지 않음. 일반적으로 사용하지 않음.
// });
app.listen(3000);