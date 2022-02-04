import {useEffect, useState, useRef, useContext} from 'react';
import UserContext from '../../src/context.jsx';
import axios from 'axios';

const MessageDetail = ({message, uid, setSelected, setMessage, setSelectedUserProfile, selectedUserProfile}) => {
  const [user, setUser] = useState('');
  const [sendToID, setSendToID] = useState('');
  const {viewProfileID} = useContext(UserContext);

  useEffect(() => {
    message.users.map((id)=> {
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

  useEffect(()=>{
    //Hacky way of doing this, sorry
    if (sendToID === viewProfileID){
      clickHandler();
    }
  }, [sendToID]);

  const clickHandler = () => {
    setSelected(sendToID);
    setSelectedUserProfile(user);
    setMessage(message);
  };

  return (
    <div>
      {user
      ?
      (selectedUserProfile && selectedUserProfile._id === sendToID
        ?
        <p className="text-white shadow bg-green m-1 rounded-lg font-bold p-2" onClick={clickHandler}>
          {user.firstName + ' ' + user.lastName}
        </p>
        :
        <p className="text-black shadow bg-white m-1 rounded-lg font-bold p-2 hover:bg-green hover:text-white" onClick={clickHandler}>
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