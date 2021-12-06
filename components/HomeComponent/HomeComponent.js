import React from "react";
import LeftSidebar from "./../LeftSidebar/LeftSidebar";
import StatusBox from "./../StatusBox/StatusBox";
import Newsfeed from "./../Newsfeed/Newsfeed";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import Default from "./../Default/Default";
import { UserContext } from "./../../pages/_app";
import { io } from "socket.io-client"; 


const HomeComponent = () => {

  console.log("HomeComponent");
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [postData,setPostData]=useState([]);
  const [load,setLoad]=useState(false);
  const [socket,setSocket] = useState(null);
  useEffect(()=>{
    setSocket(io("http://localhost:3333"))
  },[])

  useEffect(()=>{
       socket?.on("getMessage", (data) => {
        console.log("geeet msg",data);
        // setMessages((prev)=>[...prev, data]);
       
  });

},[socket])
  
  useEffect(()=>{
    
    const val=sessionStorage.getItem('userInfo');
    console.log("vvvvv",val,typeof(val));
    if(val) {
      setLoggedInUser(JSON.parse(val));
    }
  
  },[])
  console.log(loggedInUser,"asfadsf");
  useEffect(()=>{
   const getSpecificUser=async()=>{
     if(loggedInUser.email) {
      const res=await axios.get(`http://127.0.0.1:3333/post/getSpecificUpser/${loggedInUser.email}`)
      setLoggedInUser({...loggedInUser,data:res.data});
      console.log("aedf",res)

     }
  
    }
    getSpecificUser();

  },[loggedInUser.email])


  useEffect(()=>{
    axios.get("http://127.0.0.1:3333/post/getpost").then((response)=>{
      console.log("dataPOst",response.data);
      
      setPostData(response.data);
     
      setLoad(()=>false);
     

    })

    
  },[load])
  console.log("aaaxxxaa",postData);

  return (
    <div>
      <div className="_1main_content">
        <Default socket={socket} setSocket={setSocket}></Default>

        <div className="_layout">
          <div className="_layout_row">
            {/* <!-- Sidebar --> */}
            <div className="_layout_auto _layout_sidebar_left">
              <div className="_sidebar_main">
                <LeftSidebar></LeftSidebar>
              </div>
            </div>
            {/* <!-- Sidebar --> */}

            {/* <!-- Feed and Status box --> */}
            <div className="_layout_col">
              {/* <!-- Status box --> */}
              <div className="_statusBox_layout">
                <StatusBox load={load} setLoad={setLoad} />
              </div>
              {/* <!-- Status box --> */}

              {/* <!-- Feed --> */}
              <div className="_feed_main">
                <Newsfeed socket={socket} setSocket={setSocket} load={load} setLoad={setLoad} postData={postData}></Newsfeed>
              </div>
              {/* <!-- Feed --> */}
            </div>
            {/* <!-- Feed and Status box --> */}

            {/* <!-- Right section --> */}
            <div className="_layout_auto _layout_chatList_right">
              <div className="_rightSec_main">{/* <RightSection/> */}</div>
            </div>
            {/* <!-- Right section --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
