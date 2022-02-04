import {useEffect, useState, useRef} from 'react';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3002');

const MessageBox = ({sendTo, userid, message, setMessage, selectedUserProfile}) => {
  const messageInput = useRef();

  useEffect(()=>{
    socket.emit('connect-verify-call', 'Checking Connection');
    socket.on('connect-verify-response', data => {
      setConnectionStatus(true);
    });
    if(!userid){
      return
    };
    socket.emit('handshake', userid);
    socket.on('chat-message', data => {
      setMessage((chat)=> {
        return {...chat, messages: [...chat.messages, data]};
      });
    })
  }, []);

  const messageSubmitHandler = (e) =>{
    e.preventDefault();
    const messageObj = {
      sendFrom: userid,
      sendTo: sendTo,
      message: messageInput.current.value
    };
    socket.emit('send-chat-message', messageObj);
    messageInput.current.value = '';
  };

  return (
    <div className="">
      <div className="relative w-[100%] p-6 overflow-y-auto h-[80vh]">
        {message.messages.map(message => {return message.user == sendTo ?
        <div className=" flex justify-start flex-col" >
          <div className="pl-1 pt-1 text-xs text-grey">
            {selectedUserProfile.firstName + ' ' + selectedUserProfile.lastName}
            <br/>
          </div>
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
      <div className="flex flex-col m-1">
        <form onSubmit={messageSubmitHandler} >
          <input
            type='text'
            ref={messageInput}
            className=" w-full m-1 shadow focus:outline-none focus:shadow-grey pl-12 bg-gray-200 rounded-full py-3">

            </input>
          <div className="flex justify-end">
            <button className="text-xs text-grey">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default MessageBox;