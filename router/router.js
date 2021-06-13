//메인파일 라우터 모듈 (미들웨어)

const express = require('express');//설치한 express 모듈 불러오기
const router = express.Router();//express.Router클래스로 모듈식 라우터작성
const fs = require('fs')//Node.js 기본 내장 모듈 불러오기

router.get('/', (req, res, next)=> {
    fs.readFile('./static/index.html',function(err, data) {
      if(err) {
        next(err);
      } 
      else {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data);
        res.end();
      }
    });
  });
module.exports = router; 