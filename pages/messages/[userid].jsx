import {useEffect, useState, useRef} from 'react';
import { useRouter } from 'next/router'
import { io } from 'socket.io-client';
const socket = io('http://localhost:3002')

const MessagesList = () =>{
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  return (
    <div>
      <div>
      <h1>Messages</h1>
      {chats.map(chat=><div>{chat}</div>)}
      </div>
      <ChatBox/>
    </div>
  )
};

const ChatBox = () => {
  const [connectionStatus, setConnectionStatus] = useState('')
  const router = useRouter();
  const {userid} = router.query;
  const messageInput = useRef();
  const sendTo = useRef();
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    socket.on('connect-verify', data => {
      setConnectionStatus(true);
    })
    if(!userid){
      return
    }
    socket.emit('handshake', router.query.userid);
  }, [userid])

  socket.on('chat-message', data => {
    console.log(data)
    setMessages(messages.concat(data))
  })

  const messageSubmitHandler = (e) =>{
    e.preventDefault();
    const messageObj = {
      sendFrom: userid,
      sendTo: sendTo.current.value,
      text: messageInput.current.value
    }
    socket.emit('send-chat-message', messageObj);
    messageInput.current.value = '';
  }
  return (
    <div>
      {connectionStatus ? <div>Status: Connected</div> : <div> Status: Disconnected</div>}
      <input type='text' ref={sendTo}></input>
      <form onSubmit={messageSubmitHandler}>
        <input type='text' ref={messageInput}></input>
        <button>Send</button>
      </form>
      {messages.map(message => <div>{message.text}</div> )}
    </div>
  )
}

export default MessagesList