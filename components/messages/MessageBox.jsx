import {useEffect, useState, useRef} from 'react';
import { useRouter } from 'next/router'
import { io } from 'socket.io-client';
const socket = io('http://localhost:3002')
const MessageBox = ({sendTo, userid, message, selectedUsername}) => {

  const [connectionStatus, setConnectionStatus] = useState('')
  const messageInput = useRef();
  const [messages, setMessages] = useState(message.messages)

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
      setMessages((prev)=>[...prev, data])
    })
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
    <div className="">
      <div className="relative w-[100%] p-6 overflow-y-auto h-[80vh]">
        {/* {connectionStatus ? <div>Status: Connected</div> : <div> Status: Disconnected</div>} */}
        {messages.map(message => {return message.user == sendTo ?
        <div className=" flex justify-start " >
          <div className="relative max-w-xl text-white bg-green rounded-lg shadow p-1 m-1 w-auto">
          {message.message}
          </div>
        </div>
        :
        <div className="flex justify-end">
          <div className="relative max-w-xl text-black bg-white rounded-lg shadow p-1 m-1 w-auto">
            {message.message}
          </div>
        </div>
          })}
      </div>
      <form onSubmit={messageSubmitHandler} >
        <input type='text' ref={messageInput} className="w-{90%}"></input>
        <button>
          Send
        </button>
      </form>
    </div>
  )
}

export default MessageBox