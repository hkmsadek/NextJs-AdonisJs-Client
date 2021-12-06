import  Image  from 'next/image';
import  {Dropdown}  from 'react-bootstrap';
import {ivuIconIosSearchOutline,faUserCheck,faVideo,faUserPlus,faCheck,faPhone,faSmile,faMicrophone,faImg,faPaperPlane,faPaperclip} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {format} from 'timeago.js'
import  axios  from 'axios';
import React,{useEffect} from 'react';
const Messages=(props)=>{
    useEffect(()=>{
        props.setLoad(false);
    },[])
    props.setLoad(false);
    console.log("Message Component ",props);
    const handleDeleteMessage= async(id,senderId,time)=>{
        var datetime = new Date().toLocaleString();
        var d2 = new Date(time);
        var d1 = new Date();
       
       
        var seconds =  Math.floor((d1- d2)/1000);
        console.log(seconds);
        console.log(id);
        const res= await axios.post(`http://127.0.0.1:3333/conversation/DeleteMsg/${id}`,{
            loggedInUSerId:props.loggedInUser.data.id,
            sender_id:senderId,
            time:seconds,
    
        })
        if(res.data)props.setLoad(true);
      
      
           
        
     
        
    }
  
     return (
         <div>
              {/* <!-- Friend message --> */}
              {props.msg.sender_id!==props.loggedInUser.data.id && (props.msg.delete_or_not!==2 && props.msg.delete_or_not!==0) ?<div className="_1fri_mess">
              <div className="_1fri_pic">
                                        <Image src="https://api.hombolttech.net/img/profile.png" width={50}height={50}
                             alt="" title="" className="_1fri_img"/>
                                    </div>
                                        <div className="_1fri_mess_main">
                                            
                                            <div className="_1fri_mess_mess">
                                             <p className="_1fri_mess_text">{props.msg.text_message}</p>
                                              
                                                <p className="_1fri_mess_time">{format(props.msg.created_at)}</p>
                                            </div>
                                            <div className="_chatBox_mess_drop">

                                                
                                           <Dropdown  className="_more">
                                        <Dropdown.Toggle id="dropdown-basic">
 
  
                                  </Dropdown.Toggle>

                             <Dropdown.Menu>
   
    
                              <Dropdown.Item onClick={()=>handleDeleteMessage(props.msg.id,props.msg.sender_id,props.msg.created_at)}
                       ><p  className="_drop_text _drop_pre_icon">
     
      
                              remove
                           </p></Dropdown.Item>
  
  
  
                    </Dropdown.Menu>
                       </Dropdown>
 
                            
                        </div>

                                            
                                        </div>
                                        
                                        
                                    </div>
                                    
                                    
                                        
                                    : props.loggedInUser.data.id===props.msg.sender_id && (props.msg.delete_or_not!==1 && props.msg.delete_or_not!==0)  && <div className="_1own_mess">
                                        <div className="_1own_mess_main">
                                            <div className="_chatBox_mess_drop">
                                                

                                                
<Dropdown  className="_more">
  <Dropdown.Toggle id="dropdown-basic">
 
  
  </Dropdown.Toggle>

  <Dropdown.Menu>
   
    
    <Dropdown.Item onClick={()=>handleDeleteMessage(props.msg.id,props.msg.sender_id,props.msg.created_at)}
    ><p className="_drop_text _drop_pre_icon">
     
      
       remove
    </p></Dropdown.Item>
  
  
  
  </Dropdown.Menu>
</Dropdown>
                      
                                               
                                            </div>
                                            
                                            
                                            <div className="_1own_mess_mess">
                                                <p className="_1own_mess_text">{props.msg.text_message}
                                                </p>
                                                <p className="_1own_mess_time">{format(props.msg.created_at)}</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                   }
              
                            
              </div>
     )
 }
 export default Messages;

 