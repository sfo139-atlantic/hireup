import {useEffect, useState, useRef} from 'react';
import { useRouter } from 'next/router'
import { io } from 'socket.io-client';
import axios from 'axios';
import MessageBox from '../../components/messages/MessageBox.jsx'


const MessagesList = () =>{
  const [selectedChat, setSelectedChat] = useState(null);
  const router = useRouter();
  const {userid} = router.query;
  const [selected, setSelected] = useState();
  const [selectedUsername, setSelectedUsername] = useState();
  const [allMessages, setAllMessages] = useState();
  const [message, setMessage] = useState();

  const selectHandler = (e) => {
    setSelected(e.target.value)
  }
  useEffect(async ()=> {
    axios.get('http://localhost:3001/messages', {
      params: {uid: userid}
    })
      .then((response)=> {
        console.log(response.data);
        setAllMessages(response.data);
      })
  }, [userid])

  return (
    <div>
      <div>
      <h1>Messages</h1>
      {allMessages ? allMessages.map(message=><MessageDetail message={message} uid={userid} setSelected={setSelected} setSelectedUsername={setSelectedUsername} setMessage={setMessage}/>) : <div>Loading Messages List...</div>}
      </div>
      <input type='text' onChange={selectHandler}></input>
      {userid && selected ? <MessageBox userid={userid} sendTo={selected} message={message} selectedUsername={selectedUsername}/> : <div>Select a message</div>}
    </div>
  )
};

const MessageDetail = ({message, uid, setSelected, setMessage, setSelectedUsername}) => {
  const [user, setUser] = useState('');
  const [sendToID, setSendToID] = useState('');

  useEffect(async ()=>{
    message.users.map(async (id)=> {
      if(id !== parseInt(uid)){
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
      {user ? <p onClick={clickHandler}>{user}</p> : <p>Loading Username...</p>}
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