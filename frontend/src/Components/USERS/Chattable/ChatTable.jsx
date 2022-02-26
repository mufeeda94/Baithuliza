import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { DataContext } from '../../../Context/Context'

function ChatTable() {
  const {AdminTrue} = useContext(DataContext)
  const [adminTrue,setadminTrue]=AdminTrue
  const [arr,setarr]=useState([]);
  const[send,setsend]=useState([])
    const getMessages=()=>{

axios.get(`http://localhost:8008/messages`).then((result)=>{
  console.log(result.data)
  setarr(result.data)
  
  
     
  
  

})
    }
//     const uniq=()=>{
//       arr.map((i)=>{
//         setsend(...send,i.sender)
//         })
//         const res=  getUnique(send);
//         console.log("sor",res)
//     }

// function getUnique(item){
//   var uniqueArray = [];
  
//   // Loop through array values
//   for(var value of item){
//       if(uniqueArray.indexOf(value) === -1){
//           uniqueArray.push(value);
//       }
//   }
//   return uniqueArray;
  
// }

    
    useEffect(() => {
      setadminTrue(false)
        getMessages()
        
          }, [])

  return (
    
     arr.map((i)=>{
      
     return (<>
          <Link to={`/chat/${i.sender}`}><br/>{i.sender}</Link>
          </>
        )})
      
    
  )
}

export default ChatTable