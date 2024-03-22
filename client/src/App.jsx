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

  // receive message depand on your uniq id
  const myId = 'myId123'
  const fid = 'hriday1';

  socket.on(fid, (msg) => {
    console.log(msg);
  })

  const sendMessage = (e) => {
    e.preventDefault();
    const message = e.target.txt.value;
    // send a message to server
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
