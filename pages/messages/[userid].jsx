import {useEffect, useState, useRef} from 'react';
import { useRouter } from 'next/router'
import { io } from 'socket.io-client';
import axios from 'axios';
import MessageBox from '../../components/messages/MessageBox.jsx';
import Navbar from '../../components/Navbar.jsx';
import { auth } from "../../src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


const MessagesList = () =>{
  const [selectedChat, setSelectedChat] = useState(null);
  // const router = useRouter();
  // const {userid} = router.query;
  const [selected, setSelected] = useState();
  const [selectedUsername, setSelectedUsername] = useState();
  const [allMessages, setAllMessages] = useState();
  const [message, setMessage] = useState();
  const [user] = useAuthState(auth);

  useEffect(async ()=> {
    if(!user){
      return;
    }
    console.log(user.uid)
    axios.get('http://localhost:3001/messages', {
      params: {uid: user.uid}
    })
      .then((response)=> {
        console.log(response.data);
        setAllMessages(response.data);
      })
  }, [user]);

  return (
    <div class="grid grid-cols-5 gap-4">
    <div class="col-span-5 text-center"><Navbar /></div>
    <div class="row-span-3">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col h-screen">
        <div class="text-xl pt-5 pb-1 mb-4 font-bold border-b-2">
          <h1>Messages</h1>
        </div>
        {allMessages ? allMessages.map(message =>
        <MessageDetail
        message={message}
        uid={user.uid}
        setSelected={setSelected}
        setSelectedUsername={setSelectedUsername}
        setMessage={setMessage}
        />)
        :
        <div>
          Loading Messages List...
        </div>}
        </div>
    </div>
    <div class="col-span-3">
      {user && selected
      ?
      <MessageBox
      userid={user.uid}
      sendTo={selected}
      message={message}
      selectedUsername={selectedUsername}
      />
      :
      <div>
        Select a message
      </div>}
    </div>
  </div>

  )
};

const MessageDetail = ({message, uid, setSelected, setMessage, setSelectedUsername}) => {
  const [user, setUser] = useState('');
  const [sendToID, setSendToID] = useState('');

  useEffect(async ()=>{
    message.users.map(async (id)=> {
      if(id !== uid){
        const sendToProfile = axios.get('http://localhost:3001/profiles/findOne', {
          params: {
            uid: id
          }
        })
          .then((res)=>{
            setUser(res.data.firstName + ' ' + res.data.lastName)
            setSendToID(res.data._id)
          })
      }
    })
  }, []);

  const clickHandler = () => {
    setSelected(sendToID);
    setSelectedUsername(user);
    setMessage(message)
  }
  return (
    <div>
      {user
      ?
      (<p className="text-white border-2 bg-green rounded-lg font-bold" onClick={clickHandler}>
        {user}
      </p>)
      :
      <p>
        Loading Username...
      </p>}
    </div>
  )
}

// const ChatBox = ({userid, sendTo, message}) => {
//   const [connectionStatus, setConnectionStatus] = useState('')
//   const messageInput = useRef();
//   const [sendToState, setSendToState] = useState();
//   const [messages, setMessages] = useState([]);
//   const [username, setUsername] = useState('');
//   const [sendToName, setSendToName] = useState('');
//   const socket = io('http://localhost:3002')

//   useEffect(()=>{
//     socket.on('connect-verify', data => {
//       setConnectionStatus(true);
//     })
//     if(!userid){
//       return
//     }
//     socket.emit('handshake', userid);
//     socket.on('chat-message', data => {
//       console.log(data)
//       setMessages([...messages,data])
//     })
//   }, [userid])



//   const messageSubmitHandler = (e) =>{
//     e.preventDefault();
//     const messageObj = {
//       sendFrom: userid,
//       sendTo: sendTo,
//       text: messageInput.current.value
//     }
//     socket.emit('send-chat-message', messageObj);
//     messageInput.current.value = '';
//   }
//   return (
//     <div>
//       {connectionStatus ? <div>Status: Connected</div> : <div> Status: Disconnected</div>}

//       <form onSubmit={messageSubmitHandler}>
//         <input type='text' ref={messageInput}></input>
//         <button>Send</button>
//       </form>
//       {messages.map(message => <div>{message.message}</div> )}
//     </div>
//   )
// }

export default MessagesList