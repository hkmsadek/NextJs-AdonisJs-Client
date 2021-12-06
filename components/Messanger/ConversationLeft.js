import React,{useState,useEffect} from 'react';
import  Image  from 'next/image';
import  {Dropdown}  from 'react-bootstrap';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Axios from 'axios'

const ConversationLeft = (props) => {
    const [user,setUser]=useState([]);
    const {conversation,loggedInUser}=props;
    console.log("left",conversation,"aaa",loggedInUser);

    useEffect(()=>{
      
        const getUser= async()=>{
            console.log(conversation,"vvvvvvvv",loggedInUser);
            if(loggedInUser.data.id!==conversation.receiver_id) {
                try{
                    const res= await Axios.get(`http://127.0.0.1:3333/conversation/getUser/${conversation.receiver_id}`)
                    console.log(res,"reswss");
                     setUser(res.data);
                }catch(err){
                    console.log(err);
    
                }

            }
            else {
                try{
                    const res= await Axios.get(`http://127.0.0.1:3333/conversation/getUser/${conversation.sender_id}`)
                    console.log(res,"reswss");
                     setUser(res.data);
                }catch(err){
                    console.log(err);
    
                }

            }
            
        }
        let id=loggedInUser.data.id;
        console.log(id,conversation);
        getUser();
       
    },[conversation])
    console.log("userrr",user);
    return (
        <div className="_1messenger_chat_list">
        <div className="_1messenger_chat_pic">
            <Image src="https://api.hombolttech.net/img/profile.png" layout="fill" alt="" title="" className="_1messenger_chat_img"/>
        </div>
        <div className="_1messenger_chat_details">
            <p className="_1messenger_chat_name"> {user.first_name}{" "}{user.last_name} </p>
            <p className="_1messenger_chat_text">whats up</p>
        </div>
        <div className="_1messenger_chat_time">
            <p className="_1messenger_chat_time_text">12:00PM</p>
            <p className="_1messenger_chat_time_panding">33</p>
            <p className="_1messenger_chat_seen_icon">
               
            <FontAwesomeIcon icon={faCheck}/>
            </p>
        </div>
     </div>
    );
};

export default ConversationLeft;