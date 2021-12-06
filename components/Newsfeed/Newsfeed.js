import PostInformation from "./PostInformation";
import {useState,useContext,useEffect}from 'react';

const Newsfeed = (props) => {


  let flag=false;
    return (
        <div>
          { !props.postData && <div className="_card _mar_b20">
                  <div className="_card_shimmer">
                    <div className="_card_shimmer_profilePic _shim_animate"></div>
                    <div className="_card_shimmer_details">
                      <div className="_card_shimmer_name _shim_animate"></div>
                      <div className="_card_shimmer_text _shim_animate"></div>
                    </div>
                  </div>

                  <div className="_card_shimmer_status">
                    <div className="_card_shimmer_status_text _shim_animate _shim_w90"></div>
                    <div className="_card_shimmer_status_text _shim_animate _shim_w60"></div>
                  </div>

                  <div className="_card_shimmer_bottom">
                    <div className="_card_shimmer_like like _shim_animate"></div>
                    <div className="_card_shimmer_like comment _shim_animate"></div>
                    <div className="_card_shimmer_like share _shim_animate"></div>
                  </div>
                </div>

          }
          {
            props.postData.map((user,index)=>{
               return user.posts.map((post,index2)=>{
                 return <PostInformation socket={props.socket} setSocket={props.setSocket} key={index} prop={props} post={post}user={user} username={user.username}></PostInformation>
               })
              })


          }
          



                

          
          
        </div>
    );
};


export default Newsfeed;