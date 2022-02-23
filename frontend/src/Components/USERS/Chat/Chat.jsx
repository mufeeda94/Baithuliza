import React, { useState,useEffect } from 'react'
import './Chat.css'
import {useParams} from 'react-router-dom'
import axios from 'axios';
function Chat() {
  const [message, setmessage] = useState([])
 const {id} = useParams()
 const [chat,setchat]=useState([])
 const[reply,setreply]=useState([])
 const[ab,setab]=useState([])

 const getAllChats=async()=>{
   console.log(id);
    await axios.get(`http://localhost:8008/chat/${id}`).then((response)=>{
     console.log('response message',response);
     setchat(response.data.message);
    


   })
 }
 const getAllChats1 =async()=>{
  console.log(id);
   await axios.get(`http://localhost:8008/chat1/${id}`).then((response)=>{
    console.log('reply',response);
    setreply(response.data.message);
   
// const arr= [...chat,...reply]
// console.log("hai",arr)

  })
}
const msg=()=>{
  setab(ab=>[...chat,...reply])
  console.log("hello",ab)
//   console.log("timr",ab.time)
//   ab.sort((function (a, b) {
//     return a.time.localeCompare(b.time);
   
// }))
// console.log(ab)
}


 console.log('id',id);
 
 const sendChat=()=>{
   axios.post('http://localhost:8008/chat',{reciver:id,message:message}).then((response)=>{

   })
 }


 
 
 useEffect(() => {
  getAllChats()
  getAllChats1()
  
  


}, [])
    return (
        <div>
            ;<div id="container">
  <aside>
    <header>
      <input type="text" placeholder="search" />
    </header>
    <ul>
      <li>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
          alt
        />
        <div>
          <h2>Prénom Nom</h2>
          <h3>
            <span className="status orange" />
            offline
          </h3>
        </div>
      </li>
      
      
      
        
     
     
      <li>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_08.jpg"
          alt
        />
        <div>
          <h2>Prénom Nom</h2>
          <h3>
            <span className="status green" />
            online
          </h3>
        </div>
      </li>
      <li>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_09.jpg"
          alt
        />
        <div>
          <h2>Prénom Nom</h2>
          <h3>
            <span className="status green" />
            online
          </h3>
        </div>
      </li>
      <li>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_10.jpg"
          alt
        />
        <div>
          <h2>Prénom Nom</h2>
          <h3>
            <span className="status orange" />
            offline
          </h3>
        </div>
      </li>
    </ul>
  </aside>
  <main>
    <header>
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
        alt
      />
      <div>
        <h2>Chat with Vincent Porter</h2>
        <h3>already 1902 messages</h3>
      </div>
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png"
        alt
      />
    </header>
    <button onClick={msg}>load</button>
    <ul id="chat">
      {
        ab.map((i)=>{
          return(
            <li className="you">
            <div className="entete">
              <span className="status green" />
              <h2>Vincent</h2>
              <h3>10:12AM, Today</h3>
            </div>
            <div className="triangle" />
            <div className="message">
          
      {i.text}
              
            </div>
            
          </li>
          )
        })
      }
     
      {/* <li className="me">
        <div className="entete">
          <h3>10:12AM, Today</h3>
          <h2>Vincent</h2>
          <span className="status blue" />
        </div>
        <div className="triangle" />
        <div className="message">
          {
 chat.map((i)=>{
  return(
<h5>  {i.text}</h5>
  )
})
          }
        </div>
      </li> */}
      
      
      
     
    </ul>
    <footer>
      
      <textarea onChange={(e)=>setmessage(e.target.value)} placeholder="Type your message" defaultValue={""} />
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png"
        alt
      />
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png"
        alt
      />
      <button onClick={sendChat}>Send</button>
    </footer>
  </main>
</div>

        </div>
    )
}

export default Chat
