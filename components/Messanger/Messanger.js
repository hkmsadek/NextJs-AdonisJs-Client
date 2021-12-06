import React,{useState,useContext,useEffect,useRef} from 'react';
import  Image  from 'next/image';
import  {Dropdown}  from 'react-bootstrap';
import {ivuIconIosSearchOutline,faUserCheck,faVideo,faUserPlus,faCheck,faPhone,faSmile,faMicrophone,faImg,faPaperPlane,faPaperclip} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ConversationLeft from './ConversationLeft';
import Messages from './Messages';
import { UserContext } from './../../pages/_app';
import  Axios  from 'axios';
 import { io } from "socket.io-client"; 


const Messanger = () => {
    const [conversation,setConversation]=useState([]);
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    const [currentChat,setCurrentChat]=useState(null);
    const [messages,setMessages]=useState([]);
    const [newMessages,setNewMessagse]=useState("");
    const [socket,setSocket] = useState(null);
    const [load,setLoad]=useState(false);

   
    useEffect(()=>{
        setSocket(io("http://localhost:3333"))
       
       

    },[])
    useEffect(()=>{
           socket?.on("getMessage", (data) => {
            console.log("geeet msg",data);
            setMessages((prev)=>[...prev, data]);
           
          });

    },[socket])
 
    useEffect(()=>{
        let id=loggedInUser.data.id;
        console.log(id,"UUUUU");
        const getConversation=async()=>{
            try{
                const res=await Axios.get('http://127.0.0.1:3333/conversation/msg/'+id);    
                setConversation(res.data);
       
            }catch(err){
                console.log(err);
            }
           
        }
        getConversation();
       
       
    },[loggedInUser.data])

    useEffect(()=>{
        const getMessages=async()=>{
            try{
                const res =await Axios.get(`http://127.0.0.1:3333/conversation/getmsg/${currentChat.id}`);
                console.log(res);
                setMessages(res.data);
              
              
            }

            catch(err){
              console.log(err);
            }
        }
           
        getMessages();

    },[currentChat,load])
  

   

    const newMessageHandler=async(e)=>{
        e.preventDefault();
        
       
     
        console.log(currentChat,"newMesage");
       
        const message={
           
            conversation_id:currentChat.id,
            sender_id:loggedInUser.data.id,
            
            text_message:newMessages

        }
        socket?.emit("sendMessage", {
            conversation_id:currentChat.id,
            sender_id:loggedInUser.data.id,
            
            text_message:newMessages
          });
   
      
       
      
        try{
          const res=await Axios.post('http://127.0.0.1:3333/conversation/cmsg',{
            conversation_id:currentChat.id,
            sender_id:loggedInUser.data.id,
            
            text_message:newMessages
          })
        
       
          
          console.log("xxxx",res);
 
          setNewMessagse("");
       
         
        }
        catch(err){
            console.log(err);

        }

    }
   


    console.log("Messages",messages);
    console.log("conver",conversation);

   

    return (
        <div>
          <div>
        <div className="_2main_content">
            <div className="_1messenger_all">
                <div className="_1messenger">
                    {/* <!-- Left --> */}
                    <div className="_1messenger_left">
                        {/* <!-- Search --> */}
                        <div className="_1messenger_search_header">
                            <div className="_1messenger_search_all">
                                <div className="_1messenger_search">
                                   
                                    <FontAwesomeIcon className="ivu-icon ivu-icon-ios-search-outline" icon={ivuIconIosSearchOutline}/>
                                    <input type="text" placeholder="Search.." value=""/>
                                    <div className="outline"></div>
                                </div>
                            </div>

                            <ul className="_1messenger_left_option">
                                <li><FontAwesomeIcon icon={faUserCheck}/></li>
                                <li><FontAwesomeIcon icon={faUserPlus}/></li>
                                
                               
                           
                            </ul>
                        </div>
                        {/* <!-- Search --> */}

                        {/* <!-- Chat List --> */}
                        <div className="_1messenger_chat_list_all _1scrollbar">
                            {/* <!-- Items --> */}
                           {conversation.map((c,index)=>{
                               return <div onClick={()=>setCurrentChat(c)}key={index}> <ConversationLeft loggedInUser={loggedInUser} conversation={c} key={index}></ConversationLeft></div>
                            
                           })
                           
                           }
                        
         
                           
                            {/* <!-- Items --> */}
                        </div>
                        {/* <!-- Chat List --> */}
                    </div>
                    {/* <!-- Left --> */}

                    {/* <!-- Right --> */}
                    {/* <!-- Right --> */}
                    
                       
                            <div className="_1messenger_right">
                                {currentChat?(
                                    <>
                                    <div className="_1messenger_right_header">
                                    <div className="_1messenger_right_header_left _active">
                                        <a href="" className="_1messenger_right_pic">
                                            <Image src="https://api.hombolttech.net/img/profile.png" alt="" layout="fill" title="" className="_1messenger_right_img"/>
                                        </a>
                                        <div className="_1messenger_right_heder_details">
                                            <a href="" className="_1messenger_right_name _1text_overflow"> DDAdministratordfgh who</a>
                                        </div>
                                    </div>
                                    <div className="_1messenger_right_header_right">
                                        <ul className="_1messenger_right_list">
                                            <li> <FontAwesomeIcon icon={faVideo}/></li>
                                            <li> <FontAwesomeIcon icon={faPhone}/></li>
                                         
                                        </ul>
                                    </div>
                                </div>
                              
                              
                                <div className="_1messenger_right_chat">
                                    <div className="_1chat_all _1scrollbar">
                                        
        
                                        <div>
                                            <p className="_see_pre"><span>See previous messages</span></p>
        
                                            <p className="_1mess_date">2020-12-06</p>
                                            {messages && messages.map((msg,index)=><Messages loggedInUser={loggedInUser} key={index} msg={msg} load={load}setLoad={setLoad}></Messages>)}
        
                                           
                                        </div>
                                    </div>
        
                                 
                                    <div className="_1mess_textarea">
                                        <div className="_1mess_textarea_top">
                                            <ul className="_1mess_textarea_options">
                                                <li><FontAwesomeIcon icon={faSmile}/></li>
                                                <li><FontAwesomeIcon icon={faImg}/></li>
                                                <li><FontAwesomeIcon icon={faMicrophone}/></li>
                                                <li>
                                                    <svg style={{enableBackground:"new 0 0 512 512",width:"22px",height:"auto"}}
                                                     xmlns="http://www.w3.org/2000/svg" 
                                                     xmlnsXlink="http://www.w3.org/1999/xlink" 
                                                     xmlnsSvgjs="http://svgjs.com/svgjs" 
                                                     version="1.1" width="512" height="512" x="0" y="0" 
                                                     viewBox="0 0 512 512" xmlSpace="preserve"><g><path 
                                                     xmlns="http://www.w3.org/2000/svg" d="m368 0h-309.332031c-32.363281 0-58.667969 26.304688-58.667969 58.667969v394.664062c0 32.363281 26.304688 58.667969 58.667969 58.667969h309.332031c32.363281 0 58.667969-26.304688 58.667969-58.667969v-394.664062c0-32.363281-26.304688-58.667969-58.667969-58.667969zm-266.667969 394.667969h16v-6.253907c-6.226562-2.195312-10.664062-8.125-10.664062-15.082031 0-8.832031 7.167969-16 16-16h10.664062c8.832031 0 16 7.167969 16 16v37.335938c0 8.832031-7.167969 16-16 16h-32c-20.585937 0-37.332031-16.746094-37.332031-37.335938v-53.332031c0-20.585938 16.746094-37.332031 37.332031-37.332031h32c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-32c-2.941406 0-5.332031 2.386719-5.332031 5.332031v53.332031c0 2.945313 2.390625 5.335938 5.332031 5.335938zm117.335938 16c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-96c0-8.832031 7.167969-16 16-16s16 7.167969 16 16zm106.664062-58.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-42.664062v26.667969c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-74.667969c0-20.585938 16.746093-37.332031 37.332031-37.332031h37.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-37.332031c-2.945312 0-5.332031 2.386719-5.332031 5.332031v16zm0 0" fill="#0392f7" data-original="#000000"/></g>
                                                     <i xmlns="http://www.w3.org/1999/xhtml" className="fas fa-paperclip"></i>
                                                     </svg>
                                                </li>
                                                <li>
                                                <FontAwesomeIcon icon={faPaperclip}/></li>
                                            </ul>
                                        </div>
                                        <div className="_1mess_textarea_main">
                                            <div className="_1mess_textarea_input">
                                                <div className="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type"><textarea value={newMessages} onChange={(e)=>setNewMessagse(e.target.value)} wrap="soft" autoComplete="off" spellCheck="false" placeholder="Write a message..." rows="2" className="ivu-input" style={{height: '34px',minHeight: '34px',maxHeight: '130px',overflowY: 'hidden'}}></textarea></div>
                                            </div>
                                            <div  onClick={newMessageHandler}className="_1mess_textarea_send"> <FontAwesomeIcon icon={faPaperPlane}/></div>
                                        </div>
                                    </div>
                                  
                                </div></>
                            
                                ):(<span>Open a conversation to start a chat </span>)}
                                
                         
                
                    
                           </div>
                       
                   
                    {/* <!-- Right --> */}

                    {/* <!-- Profile --> */}
                    <div className="_1mess_pro _1scrollbar">
                       <p className="_1mess_pro_close"><i className="ivu-icon ivu-icon-md-close"></i></p>  
                        <a href="" className="_1mess_pro_pic">
                 {/* <Image src="https://api.hombolttech.net/img/profile.png"  layout="fill"    alt="" title="" className="_1mess_pro_img"/> */}
        
                        </a> 
                        <a href="" className="_1mess_pro_name">{loggedInUser.data.username}</a>
                        <p className="_1mess_pro_pro">Admin</p>
                        <ul className="_1mess_pro_list">
                            <li>9699835765733 </li>
                            <li><a href="">admin@hombolttech.com</a></li>
                            <li>Sreemangal, Sylhet, Bangladesh</li>
                        </ul>

                        <div className="_1mess_pro_drop">
                        <Dropdown placement="bottom-start">
                                           

                                           <Dropdown.Menu>
                                               <Dropdown.Item href="#/action-1">
                                               <p className="_drop_text _drop_pre_icon">Edit</p>
                                               </Dropdown.Item>
                                               <Dropdown.Item href="#/action-1">
                                               <p className="_drop_text _drop_pre_icon">Remove</p>
                                               </Dropdown.Item>
                                           </Dropdown.Menu>
                   
                                               </Dropdown>
                        </div>
                    </div>
                    {/* <!-- Profile --> */}
                </div>
            </div>
        </div>
    </div>
    

            
        </div>
    );
};

export default Messanger;