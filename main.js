//메인

/* 모듈선언부 */
const express = require('express')//설치한 express 모듈 불러오기
const socket = require('socket.io')//설치한 socket.io 모듈 불러오기
const http = require('http')//노드 기본 내장 모듈 불러오기
const router = require('./router/router');//라우터 모듈 불러오기
const socketServer = require('./socket/socketServer')//소켓서버 모듈 불러오기

const app = express()//express 객체 생성
const server = http.createServer(app)//express http 서버 생성
const io = socket(server)//생성된 서버를 socket.io에 바인딩
const port = 8080;//포트번호

socketServer(io);//소켓서버 생성

app.use(express.static('./static'));//static폴더의 정적 파일 제공
app.use('/', router);//라우터 호출

/* 에러처리파트*/
app.use((req,res,next)=>{//404필터링
  const err = new Error('파일 경로 오류 : 해당 파일을 찾지 못했습니다.');//에러선언이라 한번 호출됨
  err.status = 404;
  next(err);
});
app.use((err, req, res, next)=>{//에러처리핸들러(미들웨어)
  res.status(err.status || 500);
  if(err.status==404){
  }
  else{
    console.log(err.message)
  }
  res.send(err.message);
});

/* 서버 가동  localhost:(port)/ */
server.listen(port, ()=> {
  console.log(port+'포트로 서버 실행');
});

/*서버 구동 밖의 에러*/
process.on('uncaughtException',(err)=>{
  console.error('Error! = ',err);
});
