import { useEffect } from 'react';
import './App.css'
import { io } from 'socket.io-client';

function App() {
  const serverUrl = 'http://localhost:3000';
  const socket = io(serverUrl);

  useEffect(() => {
    socket.on('connect', () => {
      //console.log('client socket is connected')
    });
  }, [])

  // when I try to send a message, I need my friend unique id and when I try to receive a message I need my unique id
  const myId = 'myId123' // suppose, this is my id
  const fid = 'frId123'; // suppose, this is my friend id

  // receive a message when, you got a new message from socket server
  socket.on(myId, (msg) => {
    console.log(msg);
  })

  const sendMessage = (e) => {
    e.preventDefault();
    const message = e.target.txt.value;
    // send a message to server with friendId
    socket.emit('sendMessage', message, fid);
  }

  return (
    <>
      <form onSubmit={sendMessage}>
        <input type="text" name='txt' id='txt' placeholder='type message...' style={{ padding: '9px', borderRadius: 5 }} />
        <button type='submit'>Send</button>
      </form>
    </>
  )
}

export default App
