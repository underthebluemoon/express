import { validationResult } from "express-validator";

// validator에서 오류 여부 확인 → error반환 / 다음 처리
export default function validatorHandler(request, response, next) {
  // valigationResult(request) : request에 담긴 유효성 검사 결과 중, 에러를 모아서 배열로 반환
  const errors = validationResult(request);
  //              ↳ request를 validator로 체크한 뒤, 오류들을 배열로 반환

  // error 메세지가 비어있지 않음 = 오류 존재
  // if(!errors.isEmpty()) {
  //   return response.status(400).send(errors.array())
  //                                  ↳ error에 담겨있는 것들을 배열로 반환
  // }

  if(!errors.isEmpty()) {
    const customErrors = errors.formatWith(error => `${error.path} : ${error.msg}`);
    //                           ↳ map과 비슷한 동작. validator method
    //                    ↳ errors : 객체 -> map 사용 불가
    return response.status(400).send(customErrors.array())
  //                                  ↳ customErrors로 만든 것을 배열로 반환
  }

  // error 메세지가 비어있음 = 오류 없음
  // 다음 처리
  next()
}