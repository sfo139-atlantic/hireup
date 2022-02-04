import {useEffect, useState, useRef} from 'react';
import axios from 'axios';

const MessageDetail = ({message, uid, setSelected, setMessage, setSelectedUserProfile, selectedUserProfile}) => {
  const [user, setUser] = useState('');
  const [sendToID, setSendToID] = useState('');

  useEffect(() => {
    message.users.map((id)=> {
      console.log(typeof id)
      if(id !== uid) {
        const sendToProfile = axios.get('http://localhost:3001/profiles/findOne', {
          params: {
            uid: id
          }
        })
          .then((res)=>{
            setUser(res.data);
            setSendToID(res.data._id);
          });
      }
    })
  }, []);

  const clickHandler = () => {
    setSelected(sendToID);
    setSelectedUserProfile(user);
    setMessage(message);
  };

  return (
    <div>
      {user
      ?
      (selectedUserProfile && selectedUserProfile.uid === sendToID
        ?
        <p className="text-white border-2 bg-green rounded-lg font-bold p-2" onClick={clickHandler}>
          {user.firstName + ' ' + user.lastName}
        </p>
        :
        <p className="text-black shadow bg-white rounded-lg font-bold p-2 hover:bg-green hover:text-white" onClick={clickHandler}>
          {user.firstName + ' ' + user.lastName}
        </p>)
      :
      <p>
      Loading Username...
      </p>}
    </div>
  )
};

export default MessageDetail;