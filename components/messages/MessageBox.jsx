import {useEffect, useState, useRef} from 'react';
import { useRouter } from 'next/router'
import { io } from 'socket.io-client';
const socket = io('http://localhost:3002')
const MessageBox = ({sendTo, userid, message, selectedUsername}) => {

  const [connectionStatus, setConnectionStatus] = useState('')
  const messageInput = useRef();
  const [messages, setMessages] = useState(message.messages)

  // const messageHandler = (message) => {
  //   console.log(messages)
  //   setMessages([...messages, message])
  // }

  useEffect(()=>{
    socket.emit('connect-verify-call', 'Checking Connection')
    socket.on('connect-verify-response', data => {
      setConnectionStatus(true);
    })
    if(!userid){
      return
    }
    socket.emit('handshake', userid);
    socket.on('chat-message', data => {
      console.log(data)
      console.log(messages)
      setMessages((prev)=>[...prev, data])
    })
    // return(socket.off('chat-message'))
  }, [])



  const messageSubmitHandler = (e) =>{
    e.preventDefault();
    const messageObj = {
      sendFrom: userid,
      sendTo: sendTo,
      message: messageInput.current.value
    }
    socket.emit('send-chat-message', messageObj);
    messageInput.current.value = '';
  }
  return (
    <div>
      {connectionStatus ? <div>Status: Connected</div> : <div> Status: Disconnected</div>}
      <form onSubmit={messageSubmitHandler}>
        <input type='text' ref={messageInput}></input>
        <button>Send</button>
      </form>
      {messages.map(message => {return message.user == sendTo ? <div style={{ border: "2px solid black", margin: "15px"}}>{selectedUsername}: {message.message}</div> : <div style={{ border: "2px solid black", margin: "15px"}}>Me: {message.message}</div>
        })}
    </div>
  )
}

export default MessageBox