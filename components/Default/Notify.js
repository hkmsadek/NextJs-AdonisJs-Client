import  {Dropdown}  from 'react-bootstrap';
import  Image  from "next/image";
import  Link  from "next/link";
const Notify=({notiOne})=>{
    console.log(notiOne);

    let object=Object.keys(notiOne);
    console.log("object",object);
    let ob=object.find((obj)=>{
      if(obj==='comment_id')return 'comment_id';
      else if(obj==='comment_like_id')return 'comment_like_id'
      else if(obj==='post_like_id') return 'post_like_id';

    })

    console.log("obje",typeof(ob));


    return (
        <div>
    <li className="_active">
                         <div className="_noti_items">
                           <div className="_noti_main">
                             <div className="_noti_pic">
                               <Image className="_noti_img" layout= "fill"src="/static/img/pic.jpg" alt="" title=""/>
                             </div>
    
                             <div className="_noti_details">
                             {ob==='post_like_id'?<p className="_noti_details_title">
                                  
                                  <strong className="_noti_details_title_name">{notiOne.notification_sender}{" "}</strong>
                                   Likes in your post.
                                </p> :ob==='comment_like_id'?<p className="_noti_details_title">
                                  
                                  <strong className="_noti_details_title_name">{notiOne.notification_sender}{" "}</strong>
                                   Likes in your comment.
                                </p>:<p className="_noti_details_title">
                                  
                                  <strong className="_noti_details_title_name">{notiOne.notification_sender}{" "}</strong>
                                   Comment in your post.
                                </p>}
                               
    
                               <p className="_noti_details_time">Just now</p>
                             </div>
                           </div>
    
                           <div className="_noti_more">
                          
                            
                           </div>
                         </div>
                       </li>

    </div>
    ) 
}
export default Notify;