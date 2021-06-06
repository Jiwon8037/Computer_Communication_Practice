//소켓서버 모듈

const socketServer = ( (io) => {

  const connectedUser=[];//접속한 전체 룸 개수
  io.sockets.on('connection', (socket)=> {//sockets는 루트네임스페이스

    /* 새로운 유저가 접속했을 경우 다른 소켓에 알리기 */
    socket.on('newUser', (data)=>{
      console.log('USER:"'+data.name+'" 가 "'+data.room +'"에 접속');

      //소켓에 이름 저장해두기
      socket.name = data.name;
      socket.room = data.room;

      socket.join(socket.room);//룸에 넣기
      
      connectedUser.push(socket.room)//배열에 접속한 룸 이름 집어넣음
      let userNum = connectedUser.filter(Element=>socket.room===Element).length;//배열에 저장된 현재룸 이름 개수 세기
      console.log(socket.room+': '+userNum+'명 참여중');
      const notice = socket.name + '님이 접속하였습니다. 현재 '+userNum+'명 참여중';
      //클라이언트에게 전송
      io.to(socket.room).emit('message', {type: 'connection',name:'SERVER',message:notice});
    });
  
    /* 전송한 메세지 받기 */
    socket.on('message', (data)=>{
      //console.log(data.message);
      //보낸 사람빼고 다른 유저에게 메세지 전송
      socket.broadcast.to(socket.room).emit('message', data);
    });
  
    /* 접속 종료 */
    socket.on('disconnect', (data)=>{
      console.log('USER:"'+socket.name+'" 가 "'+socket.room +'"에서 종료');

      connectedUser.pop(socket.room)//배열에 접속한 룸 이름 삭제
      let userNum = connectedUser.filter(Element=>socket.room===Element).length;//배열에 저장된 현재룸 이름 개수 세기
      console.log(socket.room+': '+userNum+'명 참여중');
      const notice = socket.name + '님이 나가셨습니다. 현재 :'+ userNum +'명 참여중';
      //나가는 사람을 빼고 남은 유저들에게 메세지 전송
      socket.broadcast.to(socket.room).emit('message', {type: 'disconnect',name:'SERVER',message:notice});
    });

  });
});
module.exports = socketServer;