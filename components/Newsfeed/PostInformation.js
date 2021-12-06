import React from 'react';
import  {Dropdown}  from 'react-bootstrap';
import  Image  from "next/image";
import  Link  from "next/link";
import { faUsers,faGlobe,faBriefcase,faMapMarker,faCheck,faAngleDown,faBookmark,faFlag,faThumbtack,faPencilAlt,faTrashAlt,faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import male from  '../../public/img/placeholder.png';
import placeholder from '../../public/img/placeholder.png'
import image_1608226845923 from '../../public/img/image_1608226845923.jpeg'
import pic from '../../public/img/pic.jpg'
import  Axios  from 'axios';
import {useState,useContext,useEffect}from 'react';
import { UserContext } from './../../pages/_app';
import {format} from 'timeago.js'


const PostInformation = (props) => {
  
  const {prop,post,load,setLoad,socket,setSocket}=props  
  console.log("propps",props);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [input,setInput]=useState({});
  const [sendData,setSendData]=useState({})
  const [isLiked,setIsLiked]=useState({})
 
  useEffect(()=>{
    setSendData({});
  },[])
useEffect(()=>{
  const username=props.username;
 const postflag= post.likes.find((like)=>{
   return like.like_user===props.username;
   
  })
 
  

  postflag? setIsLiked({...isLiked,postLiked:{[post.id]:true}}):setIsLiked({...isLiked,postLiked:{[post.id]:false}});

  
  //  className={isLiked.postLiked[post.id]?"text-info":"text-secondary"}
 
},[post.id])

const deleteHandler=(id,urlLink)=>{
    Axios
    .delete(`http://127.0.0.1:3333/${urlLink}/${id}`)
    .then((response) => {
    
      console.log("aedf",response)
         
    })
    .catch((error) => {
      console.log(error);
    });
    prop.setLoad(true);
     
  }
  const handleComment=(id,urlLink)=>{
    socket?.emit("sendNotification", {
      comment_id:id,
      notification_sender:loggedInUser.data.username,
      notification_receiver:props.user.id,
    });

    console.log("loggedInUser",loggedInUser);
    console.log("hit this fun",sendData[id]);
    Axios
    .post(`http://127.0.0.1:3333/post/${urlLink}`,{
   
        "post_id":id,
        "comment_text":sendData[id],
        "user_name":loggedInUser.data.username
    })
    .then((response) => {
      setSendData(()=>{});
      prop.setLoad(true);
    })
    .catch((error) => {
      console.log(error);
    });

  }
  const handleReplyComment=(id,urlLink)=>{

    console.log("loggedInUser",loggedInUser);
    console.log("hit this fun",sendData[id]);
    socket?.emit("sendNotification", {
      comment_id:id,
      notification_sender:loggedInUser.data.username,
      notification_receiver:props.user.id,
    });
    Axios
    .post(`http://127.0.0.1:3333/post/${urlLink}`,{
   
      "comments_id":id,
      "comment_reply_text":sendData[id],
      "user_name":loggedInUser.data.username
    })
    .then((response) => {
      setInput({});
      setInput({...input,
        id:id
      })
     
      prop.setLoad(true);
     
    })
    .catch((error) => {
      console.log(error);
    });

  }
  const likeHandler=(urlLink,id)=>{
   
   
    console.log("Like handler",urlLink,id);
    console.log(isLiked);
    if(urlLink==='post') {

      socket?.emit("sendNotification", {
        post_like_id:id,
        notification_sender:loggedInUser.data.username,
        notification_receiver:props.user.id,
      });

      Axios
      .post(`http://127.0.0.1:3333/post/like`,{
        "post_id":id,
        "like_user":loggedInUser.data.username
      })
      .then((response) => {
        console.log("likeee",response.data);
        setIsLiked({...isLiked,postLiked:{[id]:response.data}})
        console.log(isLiked);
        prop.setLoad(true);
        setInput({...input,liked:true});
      })
      .catch((error) => {
        console.log(error);
      });

  
    }
    if(urlLink==='comment') {
      socket?.emit("sendNotification", {
        comment_like_id:id,
        notification_sender:loggedInUser.data.username,
        notification_receiver:props.user.id,
      });


      Axios
      .post(`http://127.0.0.1:3333/post/like`,{
        "comments_id":id,
        "like_user":loggedInUser.data.username
      })
      .then((response) => {
        console.log("likeee",response.data);
        setIsLiked({...isLiked,commentLiked:{[id]:response.data}})
        console.log(isLiked);
        prop.setLoad(true);
        setInput({...input,liked:true});
        
      })
      .catch((error) => {
        console.log(error);
      });

  
    }
    if(urlLink==='morecomment') {
      socket?.emit("sendNotification", {
        comment_like_id:id,
        notification_sender:loggedInUser.data.username,
        notification_receiver:props.user.id,
      });


      Axios
      .post(`http://127.0.0.1:3333/post/like`,{
        "comments_reply_id":id,
        "like_user":loggedInUser.data.username
      })
      .then((response) => {
        console.log("likeee",response.data);
        setIsLiked({...isLiked,replycommentLiked:{[id]:response.data}})
        console.log(isLiked);
        prop.setLoad(true);
        setInput({...input,liked:true});
        
      })
      .catch((error) => {
        console.log(error);
      });

  
    }
    


  }
  
  const replyComment=(id)=>{ 
    let cnt=0;
    console.log("res");
    let res={
      id:id,
      state:cnt++,
    }
    setInput(res);
    console.log("sdf",input);
  }
  const handleInputs=(event)=>{
    event.preventDefault();
    console.log(event.target.value,"   asfd ",event.target.id) ;
    setSendData({[event.target.id]:event.target.value});
    console.log(sendData,"send");
    

  }
  
   console.log(isLiked.postLiked,"isOit Liked");
  return (
    <div>
      <div>
                   <div className="_card _mar_b20">
                <div className="_card_top_all">
                  <div className="_card_top">
                    <a href="" className="_card_pic">
                      <Image
                        alt=""
                        layout="responsive"
                        title=""
                        className="_card_img"
                        
                         src={placeholder}
                      />
                    </a>
                    <div className="_card_details">
                      <div className="_card_name_all">
                        <span className="_card_name_main">
                          <a href="" className="_card_name">
                            {props.username}
                          </a>

                          {/* <!-- Hover Profile info --> */}
                          <div className="_pro_info">
                            <div className="_pro_info_cover">
                              <Image
                                layout="responsive"
                                className="_pro_info_cover_img"
                              //  src="/static/Image/image_1608226845923.jpeg"
                                 src={image_1608226845923}
                                alt=""
                                title=""
                              />
                            </div>

                            <div className="_pro_info_top">
                              <div className="_pro_info_pro">
                                <Image
                                  layout="responsive"
                                  className="_pro_info_pro_img"
                                  //  src="/static/Image/pic.jpg"
                                   src={pic}
                                  alt=""
                                  title=""
                                />
                              </div>

                              <div className="_pro_info_main">
                                <p className="_1text_overflow">
                                  <Link href="" className="_pro_info_title">
                                    <a>Karen River</a>
                                  </Link>
                                </p>
                                <p>
                                  <a href="" className="_pro_info_pre">
                                    3 followers
                                  </a>
                                </p>

                                <ul className="_pro_info_list">
                                  <li>
                                    {/* <i className="fas fa-users"></i> 1 mutual */}
                                    <FontAwesomeIcon icon={faUsers} />
                                    friends
                                  </li>
                                  <li>
                                    {/* <i className="fas fa-briefcase"></i> Whiter */}
                                    <FontAwesomeIcon className="fas fa-briefcase" icon={faBriefcase} />
                                    at
                                    <strong> Home</strong>
                                  </li>
                                  <li>
                                    <i className="fas fa-map-marker"></i> From                                  
                                    <FontAwesomeIcon icon={faMapMarker} />
                                    <strong>Latche</strong>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <ul className="_pro_info_buttons">
                              <li>
                                <button className="_2btn _btn_pre _btn_sm">
                                  {/* <i className="fas fa-check"></i>  */}
                                  <FontAwesomeIcon icon={faCheck} />
                                  Friends

                                </button>
                              </li>
                              <li>
                                <button className="_3btn _btn_pre _btn_sm _pre_img">
                                  <svg
                                    className="_btn_imgg"
                                    style={{ width: "15px", height: "auto" }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    xmlnsSvgjs="http://svgjs.com/svgjs"
                                    version="1.1"
                                    x="0"
                                    y="0"
                                    viewBox="0 0 135.46666 135.46667"
                                    xmlSpace="preserve"
                                  >
                                    <g>
                                      <g
                                        xmlns="http://www.w3.org/2000/svg"
                                        id="layer1"
                                      >
                                        <path
                                          id="rect1437"
                                          d="m11.698046 20.664689c-6.4813896 0-11.69804983 5.21762-11.69804983 11.69843v.3843l58.39118183 40.80741c2.589688 1.80889 5.967679 2.70969 9.347488 2.7095 3.37798 0 6.755961-.900219 9.34565-2.7095l58.382344-40.79838v-.39294c0-6.48091-5.21666-11.69844-11.69815-11.69844zm-11.69804983 21.85919v60.579661c0 6.48091 5.21666023 11.69843 11.69804983 11.69843h112.070464c6.48149 0 11.69815-5.21752 11.69815-11.69843v-60.570441l-58.382344 40.798279c-2.589689 1.808991-5.96767 2.709501-9.34565 2.709501-3.379809 0-6.7578-.900219-9.347488-2.709501z"
                                          paintOrder="fill markers stroke"
                                          fill="#0392f8"
                                          data-original="#000000"
                                        ></path>
                                      </g>
                                    </g>
                                  </svg>
                                  Message
                                </button>
                              </li>
                            </ul>
                          </div>
                          {/* <!-- Hover Profile info --> */}
                        </span>
                        <span className="_card_name_span">
                          updated the profile picture
                        </span>
                      </div>
                      <p className="_card_time">
                        {format(post.created_at)}
                        <span className="_card_time_public">
                          {/* <i className="fas fa-globe"></i> */}
                          <FontAwesomeIcon icon={faGlobe} />
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="_card_top_more">
                   
                    <Dropdown  className="_more">
                      <Dropdown.Toggle id="dropdown-basic">
                     
                      
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                       
                      

                       
                      
                      <Dropdown.Item onClick={()=>deleteHandler(post.id,"posts")}
                        ><p className="_drop_text _drop_pre_icon">
                          {/* <i className="fas fa-trash-alt"></i> */}
                          <FontAwesomeIcon icon={faTrashAlt}/>
                           Delete Post
                        </p></Dropdown.Item>
                      
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                <div className="_card_body">
                  <p className="_card_text">
                    <span>{post.post_status}</span>
                  </p>

                  
                </div>

                <div className="_num_like_all">
                  <div className="_num_like_left">
                    <p className="_num_like_text _num_like_text_like">
                      <span>{post.likes.length} like</span>
                    </p>
                  </div>
                  <div className="_num_like_right">
                    <p className="_num_like_text">{post.comments.length} Comment</p>
                  </div>
                </div>

                <div className="_1card_count">
                  <ul className="_1card_count_list">
                    <li id={post.id} onClick={()=>{likeHandler("post",post.id)}} className="">
                      {/* <!-- React --> */}
                    
                      {/* <!-- React --> */}
                      <div className="_1card_count_pic">
                      
                      <svg
                        className="_1card_count_img"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns-xlink="http://www.w3.org/1999/xlink"
                        xmlns-svgjs="http://svgjs.com/svgjs"
                        version="1.1"
                        x="0"
                        y="0"
                        viewBox="0 0 16 16"
                        style={{enableBackground: "new 0 0 512 512"}}
                        xmlSpace="preserve"
                      >
                        <g
                          transform="matrix(0.9799999999999999,0,0,0.9799999999999999,0.16000000000000103,0.16100000381469837)"
                        >
                          <path
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#65676b"
                            d="M16 7.1c0-1.5-1.4-2.1-2.2-2.1h-2.2c0.4-1 0.7-2.2 0.5-3.1-0.5-1.8-2-1.9-2.5-1.9h-0.1c-0.4 0-0.6 0.2-0.8 0.5l-1 2.8-2.7 2.7h-5v9h5v-1c0.2 0 0.7 0.3 1.2 0.6 1.2 0.6 2.9 1.5 4.5 1.5 2.4 0 3.2-0.3 3.8-1.3 0.3-0.6 0.3-1.1 0.3-1.4 0.2-0.2 0.5-0.5 0.6-1s0.1-0.8 0-1.1c0.2-0.3 0.4-0.7 0.5-1.3 0-0.5-0.1-0.9-0.2-1.2 0.1-0.4 0.3-0.9 0.3-1.7zM2.5 13.5c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1c0 0.6-0.4 1-1 1zM14.7 9.1c0 0 0.2 0.2 0.2 0.7 0 0.6-0.4 0.9-0.4 0.9l-0.3 0.3 0.2 0.3c0 0 0.2 0.3 0 0.7-0.1 0.4-0.5 0.7-0.5 0.7l-0.3 0.3 0.2 0.4c0 0 0.2 0.4-0.1 0.9-0.2 0.4-0.4 0.7-2.9 0.7-1.4 0-3-0.8-4.1-1.4-0.8-0.4-1.3-0.6-1.7-0.6v0-6h0.1c0.2 0 0.4-0.1 0.6-0.2l2.8-2.8c0.1-0.1 0.1-0.2 0.2-0.3l1-2.7c0.5 0 1.2 0.2 1.4 1.1 0.1 0.6-0.1 1.6-0.6 2.8-0.1 0.3-0.1 0.5 0.1 0.8 0.1 0.2 0.4 0.3 0.7 0.3h2.5c0.1 0 1.2 0.2 1.2 1.1 0 0.8-0.3 1.2-0.3 1.2l-0.3 0.4 0.3 0.4z"
                            data-original="#444444"
                          
                        
                          />
                        </g>
                      </svg>
                        
                      </div>
                       <span className={isLiked && isLiked.postLiked && isLiked.postLiked[post.id]?"text-info":"text-secondary"}>Like</span>
                      
                    </li>
                    <li>
                     
                      <div className="_1card_count_pic">
                <svg
                  style={{
                    enableBackground: "new 0 0 512 512",
                    marginBottom: "-5px"

                  }}
                   
                 
                  className="_1card_count_img"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlnsSvgjs="http://svgjs.com/svgjs"
                  version="1.1"
                  x="0"
                  y="0"
                  viewBox="0 0 477.867 477.867"
                  xmlSpace="preserve"
                >
                  <g
                    transform="matrix(0.99,0,0,0.99,2.389335174560557,2.3893354907235675)"
                  >
                    <g xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path
                          d="M426.667,0.002H51.2C22.923,0.002,0,22.925,0,51.202v273.067c0,28.277,22.923,51.2,51.2,51.2h60.587l-9.284,83.456    c-1.035,9.369,5.721,17.802,15.09,18.837c4.838,0.534,9.674-1.023,13.292-4.279l108.919-98.014h186.863    c28.277,0,51.2-22.923,51.2-51.2V51.202C477.867,22.925,454.944,0.002,426.667,0.002z M443.733,324.269  c0,9.426-7.641,17.067-17.067,17.067H233.25c-4.217,0.001-8.284,1.564-11.418,4.386l-80.452,72.414l6.434-57.839    c1.046-9.367-5.699-17.809-15.067-18.856c-0.63-0.07-1.263-0.106-1.897-0.105H51.2c-9.426,0-17.067-7.641-17.067-17.067V51.202    c0-9.426,7.641-17.067,17.067-17.067h375.467c9.426,0,17.067,7.641,17.067,17.067V324.269z"
                          fill="#65676b"
                          data-original="#000000"
                          
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
                       
                   
                      Comment
                    </li>
                    <li>
                      <div className="_1card_count_pic">
                        <svg
                          className="_1card_count_img"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xmlnsSvgjs="http://svgjs.com/svgjs"
                          version="1.1"
                          x="0"
                          y="0"
                          viewBox="0 0 512 512"
                          style={{enableBackground:"new 0 0 512 512"}}
                          xmlSpace="preserve"
                        >
                          <g>
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="m494.533 172.016-115.899-115.899c-9.563-9.563-19.263-14.412-28.829-14.412-13.134 0-28.472 9.99-28.472 38.145v39.458c-84.204 3.67-162.839 38.203-222.815 98.176-63.524 63.519-98.511 147.975-98.518 237.808-.001 6.454 4.128 12.186 10.25 14.229 1.562.521 3.163.773 4.748.773 4.627 0 9.106-2.147 11.995-5.991 70.817-94.265 177.438-149.973 294.34-154.372v38.849c0 28.154 15.337 38.145 28.471 38.146h.001c9.566 0 19.267-4.849 28.829-14.412l115.898-115.9c11.265-11.262 17.468-26.284 17.468-42.298 0-16.015-6.203-31.037-17.467-42.3zm-21.213 63.385-115.899 115.901c-2.223 2.223-4.064 3.627-5.422 4.48-.357-1.563-.666-3.858-.666-7.001v-54.131c0-8.284-6.716-15-15-15-66.647 0-130.332 15.27-189.283 45.384-42.32 21.619-81.006 50.721-113.767 85.379 21.794-147.697 149.396-261.431 303.05-261.431 8.284 0 15-6.716 15-15v-54.132c0-3.143.309-5.438.665-7 1.358.853 3.2 2.257 5.423 4.48l115.899 115.9c5.598 5.597 8.68 13.085 8.68 21.086 0 8-3.082 15.488-8.68 21.085z"
                              fill="#65676b"
                              data-original="#000000"
                            />
                          </g>
                        </svg>
                      </div>
                      Share
                    </li>
                  </ul>
                </div>

                <div className="_1card_comment_box">
                  <div className="_1card_comment_box_pic _load_div">
                    <Image
                       layout="responsive"
                      className="_1card_comment_box_img"
                      // src="/static/Image/male.jpg"
                      src={male}
                      alt=""
                      title=""
                    />
                  </div>
                  <div id="" className="_1card_comment_box_input_icon">
                    <div className="_1card_comment_box_input">
                      <input id={post.id} value={sendData?sendData[post.id]:""} onChange={handleInputs} type="text" placeholder="Write a post comment..."/>
                    </div >
                    <div  onClick={()=>handleComment(post.id,"comment")} className="cursor_pointer_newsfeed pt-2">
                    <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                     
                    </div>
                    
                  </div>
                </div>
                {
                  post.comments.map((newComment,index)=>{
                    return <div key={index} >
                      <div className="_comment_main">
                  <a href="" className="_comment_pic">
                    <Image
                      layout="fill"
                      alt=""
                      title=""
                      className="_comment_img"
                      // src="/static/Image/male.jpg"
                      src={male}
                    />
                  </a>
                  <div className="_comment_details">
                    <div className="_comment_details_top">
                      <div className="_comment_name">
                        <a href="" className="_comment_name_text">
                         {newComment.user_name}
                  
                        </a>
                      </div>

                      <div className="_comment_more">
                        {/*  
                        <Dropdown trigger="click" placement="bottom-end">
                          <a className="_more" href="javascript:void(0)">
                            <i className="fas fa-angle-down"></i>
                          </a>

                          <DropdownMenu slot="list">
                            <DropdownItem>
                              <p className="_drop_text">Edit</p>
                            </DropdownItem>
                            <DropdownItem>
                              <p className="_drop_text">Delete</p>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                        */}
                         <Dropdown  className="_more">
                      <Dropdown.Toggle id="dropdown-basic">
                     
                      
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                      
                        <Dropdown.Item onClick={()=>deleteHandler(newComment.id,"comment")} href="#/action-2">
                        <p className="_drop_text">Delete</p>
                        
                        </Dropdown.Item>
                      
                      </Dropdown.Menu>
                    </Dropdown>
                 
                  
                      </div>
                    </div>
                    <div className="_comment_status">
                      <p className="_comment_status_text">{newComment.comment_text}</p>
                    </div>
                    <div className="_comment_reply">
                      <div className="_comment_reply_num">
                        <ul className="_comment_reply_list">
                         
                          <li  id={newComment.id} onClick={()=>{likeHandler("comment",newComment.id)}} className="">
                            <svg
                              style={{enableBackground: "new 0 0 512 512",
                                marginBottom: "0px"}}
                              
                            
                              className="_1card_count_Image"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              xmlnsSvgjs="http://svgjs.com/svgjs"
                              version="1.1"
                              x="0"
                              y="0"
                              viewBox="0 0 16 16"
                              xmlSpace="preserve"
                            >
                              <g transform="matrix(0.9799999999999999,0,0,0.9799999999999999,0.16000000000000103,0.16100000381469837)">
                                <path
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="#65676b"
                                  d="M16 7.1c0-1.5-1.4-2.1-2.2-2.1h-2.2c0.4-1 0.7-2.2 0.5-3.1-0.5-1.8-2-1.9-2.5-1.9h-0.1c-0.4 0-0.6 0.2-0.8 0.5l-1 2.8-2.7 2.7h-5v9h5v-1c0.2 0 0.7 0.3 1.2 0.6 1.2 0.6 2.9 1.5 4.5 1.5 2.4 0 3.2-0.3 3.8-1.3 0.3-0.6 0.3-1.1 0.3-1.4 0.2-0.2 0.5-0.5 0.6-1s0.1-0.8 0-1.1c0.2-0.3 0.4-0.7 0.5-1.3 0-0.5-0.1-0.9-0.2-1.2 0.1-0.4 0.3-0.9 0.3-1.7zM2.5 13.5c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1c0 0.6-0.4 1-1 1zM14.7 9.1c0 0 0.2 0.2 0.2 0.7 0 0.6-0.4 0.9-0.4 0.9l-0.3 0.3 0.2 0.3c0 0 0.2 0.3 0 0.7-0.1 0.4-0.5 0.7-0.5 0.7l-0.3 0.3 0.2 0.4c0 0 0.2 0.4-0.1 0.9-0.2 0.4-0.4 0.7-2.9 0.7-1.4 0-3-0.8-4.1-1.4-0.8-0.4-1.3-0.6-1.7-0.6v0-6h0.1c0.2 0 0.4-0.1 0.6-0.2l2.8-2.8c0.1-0.1 0.1-0.2 0.2-0.3l1-2.7c0.5 0 1.2 0.2 1.4 1.1 0.1 0.6-0.1 1.6-0.6 2.8-0.1 0.3-0.1 0.5 0.1 0.8 0.1 0.2 0.4 0.3 0.7 0.3h2.5c0.1 0 1.2 0.2 1.2 1.1 0 0.8-0.3 1.2-0.3 1.2l-0.3 0.4 0.3 0.4z"
                                  data-original="#444444"
                                  
                                  className=""
                                />
                              </g>
                            </svg>
                          
                            
                            <span className={isLiked && isLiked.commentLiked && isLiked.commentLiked[newComment.id]?"text-info":"text-secondary"}>{newComment.likes.length>0 && <span className="text-danger">{newComment.likes.length}</span>}Like</span>
                          </li>
                          <li onClick={()=>replyComment(newComment.id)}>
                            <svg
                              style={{ enableBackground: "new 0 0 512 512",
                                marginBottom: "-2px"}}
                             
                            
                              className="_1card_count_img"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              xmlnsSvgjs="http://svgjs.com/svgjs"
                              version="1.1"
                              x="0"
                              y="0"
                              viewBox="0 0 477.867 477.867"
                              xmlSpace="preserve"
                            >
                              <g transform="matrix(0.99,0,0,0.99,2.389335174560557,2.3893354907235675)">
                                <g xmlns="http://www.w3.org/2000/svg">
                                  <g>
                                    <path
                                      d="M426.667,0.002H51.2C22.923,0.002,0,22.925,0,51.202v273.067c0,28.277,22.923,51.2,51.2,51.2h60.587l-9.284,83.456    c-1.035,9.369,5.721,17.802,15.09,18.837c4.838,0.534,9.674-1.023,13.292-4.279l108.919-98.014h186.863    c28.277,0,51.2-22.923,51.2-51.2V51.202C477.867,22.925,454.944,0.002,426.667,0.002z M443.733,324.269  c0,9.426-7.641,17.067-17.067,17.067H233.25c-4.217,0.001-8.284,1.564-11.418,4.386l-80.452,72.414l6.434-57.839    c1.046-9.367-5.699-17.809-15.067-18.856c-0.63-0.07-1.263-0.106-1.897-0.105H51.2c-9.426,0-17.067-7.641-17.067-17.067V51.202    c0-9.426,7.641-17.067,17.067-17.067h375.467c9.426,0,17.067,7.641,17.067,17.067V324.269z"
                                      fill="#65676b"
                                      dataOriginal="#000000"
                                      
                                    />
                                  </g>
                                </g>
                              </g>
                            </svg>
                            Reply
                          </li>
                        
                        </ul>
                      </div>
                      <div className="_comment_reply_time">
                        <p className="_comment_reply_time_text">{format(newComment.created_at)}</p>
                      </div>
                     
                    </div>
                    {/* reply comment */}
                    {
                      input.id===newComment.id && newComment.comments_replies.map((moreComment,index)=>{
                        return <div key={index}>

                    <div className="_reply" keys="rep0">
                      <div className="_reply_main">
                        <a href="" className="_comment_pic">
                          <Image
                          layout="fill"
                            alt=""
                            title=""
                            className="_comment_img"
                            // src="/static/Image/male.jpg"
                            src={male}
                          />
                        </a>
                        <div className="_comment_details">
                          <div className="_comment_details_top">
                            <div className="_comment_name">
                              <a href="" className="_comment_name_text">
                                {" "}
                                {moreComment.user_name}
                              </a>
                            </div>
                            <div className="_comment_more">
                            <Dropdown  className="_more">
                      <Dropdown.Toggle id="dropdown-basic">
                     
                      
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                     
                        <Dropdown.Item onClick={()=>deleteHandler(moreComment.id,"replyComment")} >
                        <p className="_drop_text">Delete</p>
                        
                        </Dropdown.Item>
                      
                      </Dropdown.Menu>
                    </Dropdown>
                             
                            </div>
                          </div>
                          <div className="_comment_status">
                            <p className="_comment_status_text">{moreComment.comment_reply_text}</p>
                          </div>
                          <div className="_comment_reply">
                            <div className="_comment_reply_num">
                              <ul className="_comment_reply_list">
                                <li  id={moreComment.id} onClick={()=>{likeHandler("morecomment",moreComment.id)}} className="">
                                  <svg
                                    style={{
                                      enableBackground: "new 0 0 512 512",
                                      marginBottom: "0px",
                                    }}
                                    className="_1card_count_img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    xmlnsSvgjs="http://svgjs.com/svgjs"
                                    version="1.1"
                                    x="0"
                                    y="0"
                                    viewBox="0 0 16 16"
                                    xmlSpace="preserve"
                                  >
                                    <g transform="matrix(0.9799999999999999,0,0,0.9799999999999999,0.16000000000000103,0.16100000381469837)">
                                      <path
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#65676b"
                                        d="M16 7.1c0-1.5-1.4-2.1-2.2-2.1h-2.2c0.4-1 0.7-2.2 0.5-3.1-0.5-1.8-2-1.9-2.5-1.9h-0.1c-0.4 0-0.6 0.2-0.8 0.5l-1 2.8-2.7 2.7h-5v9h5v-1c0.2 0 0.7 0.3 1.2 0.6 1.2 0.6 2.9 1.5 4.5 1.5 2.4 0 3.2-0.3 3.8-1.3 0.3-0.6 0.3-1.1 0.3-1.4 0.2-0.2 0.5-0.5 0.6-1s0.1-0.8 0-1.1c0.2-0.3 0.4-0.7 0.5-1.3 0-0.5-0.1-0.9-0.2-1.2 0.1-0.4 0.3-0.9 0.3-1.7zM2.5 13.5c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1c0 0.6-0.4 1-1 1zM14.7 9.1c0 0 0.2 0.2 0.2 0.7 0 0.6-0.4 0.9-0.4 0.9l-0.3 0.3 0.2 0.3c0 0 0.2 0.3 0 0.7-0.1 0.4-0.5 0.7-0.5 0.7l-0.3 0.3 0.2 0.4c0 0 0.2 0.4-0.1 0.9-0.2 0.4-0.4 0.7-2.9 0.7-1.4 0-3-0.8-4.1-1.4-0.8-0.4-1.3-0.6-1.7-0.6v0-6h0.1c0.2 0 0.4-0.1 0.6-0.2l2.8-2.8c0.1-0.1 0.1-0.2 0.2-0.3l1-2.7c0.5 0 1.2 0.2 1.4 1.1 0.1 0.6-0.1 1.6-0.6 2.8-0.1 0.3-0.1 0.5 0.1 0.8 0.1 0.2 0.4 0.3 0.7 0.3h2.5c0.1 0 1.2 0.2 1.2 1.1 0 0.8-0.3 1.2-0.3 1.2l-0.3 0.4 0.3 0.4z"
                                        data-original="#444444"
                                      />
                                    </g>
                                  </svg>
                                  <span className={isLiked && isLiked.replycommentLiked && isLiked.replycommentLiked[moreComment.id]?"text-info":"text-secondary"}>{moreComment.likes.length}Like</span>
                                 
                                </li>
                              </ul>
                            </div>
                            <div className="_comment_reply_time">
                              <p className="_comment_reply_time_text">
                               {format(moreComment.created_at)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="_1card_comment_box">
                        
                        
                        
                      </div>
                    </div>

                        </div>

                      })

                    }
                    {input.id===newComment.id &&
                            <div className="_1card_comment_box_input_icon">
                            <div className="_1card_comment_box_input">
                              <input  id={newComment.id} onChange={handleInputs}  type="text" placeholder="Write a reply..." />
                            </div>
                            <div  onClick={()=>handleReplyComment(newComment.id,"reply_comment")} className="cursor_pointer_newsfeed pt-2">
                          <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                       
                      </div>
                          </div>


                        }

                    {/* reply comment complete */}
                    
                  </div>
                  </div>

                    </div>

                  })

                  //  user.find(getUser=>getUser.id===posts.comments.user_id)
                   
                }

                
                
              </div>
               
                 </div>
      
    </div>
  );
};

export default PostInformation;