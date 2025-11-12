export function errorHandler(error, request, response, next) {
  console.log(error.message);

  return response.status(500).send('예외 발생 : 에러 핸들러');
  // express.app에서 발생한 모든 에러의 정보를 모아서 유저에게 반환
}