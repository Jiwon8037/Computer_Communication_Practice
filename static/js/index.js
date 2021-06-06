//클라이언트
const socket= io()

/*접속 되었을 때 실행*/
socket.on('connect', ()=> {
  //이름을 입력받고
  let name = prompt('반갑습니다!', '');//빈칸이면 name값이 ''에서 '익명'으로 바뀜 -> let사용
  //이름이 빈칸인 경우
  if(!name) {
    name = '익명';
  };

  //룸설정
  const room = document.getElementById('roomName').innerHTML//popup html에서 id값 가져옴
  socket.name = name;
  socket.room = room;
  console.log(socket.name, socket.room);
  const data = {//이름이랑 룸 데이터
    name : socket.name,
    room : socket.room
  };
  console.log(data.room);

  //서버에 신규 유저가 왔을 때
  socket.emit('newUser', data);
});

/* 서버로부터 데이터 받은 경우 */
socket.on('message', (data)=> {
  const chat = document.getElementById('chat');
  const message = document.createElement('div');
  const node = document.createTextNode(`${data.name}: ${data.message}`);
 
  message.classList.add("message");
  message.appendChild(node);
  chat.appendChild(message);
});

/* 메시지 전송 함수 */
function send() {
  // 입력된 데이터 가져오기
  const message = document.getElementById('test').value;
  
  // 가져왔으니 데이터칸 비움
  document.getElementById('test').value = '';

  // 내가 전송할 메시지 클라이언트에게 표시
  const chat = document.getElementById('chat');
  const msg = document.createElement('div');
  const node = document.createTextNode(message);
  msg.classList.add('me');
  msg.appendChild(node);
  chat.appendChild(msg);

  const data = {//데이터에 name,room속성 추가
    name : socket.name,
    room : socket.room,
    message : message
  };
  // 서버로 데이터 보냄
  socket.emit('message', data);
}