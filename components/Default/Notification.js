import  {Dropdown}  from 'react-bootstrap';
import  Image  from "next/image";
import  Link  from "next/link";
import React,{useEffect,useState} from 'react'; 
import Notify from './Notify.js';

const Notification =(props)=>{
   
   

     
    
    return (
        <div>
         
         {props.shownotification && <div className="_menu_list_items _menu_list_noti">
        

         {/* <!-- Dropdown --> */}
         <div  className="_1dropdown _noti_all">
           <div className="_1dropdown_title">
             <p className="_1dropdown_title_text _3title">Notifications</p>

             <div className="_1dropdown_title_more">
           
             </div>
           </div>

          

           {/* <!-- Notification Data --> */}
           <div >
             <div className="_1dropdown_body _1scrollbar">
                 <ul className="_1dropdown_body_list">
                     {
                         props.notiInfo.map((notiOne,index)=>{return <Notify notiOne={notiOne} key={index}  ></Notify>})
                       
                     }
                  
                  
                  
                 </ul>
             </div>
             {/* <!-- See more --> */}
             <div className="_drop_see">
            <span className="_drop_see_text">See all Notifications</span>
             </div>
             {/* <!-- See more --> */}
           </div>
           {/* <!-- Notification Data --> */}

           {/* <!-- No Notifiaction --> */}
           <div >
             <div className="_drop_no_data">
               <div className="_drop_no_data_icon">
                 <i className="fas fa-bell"></i>
               </div>

               <p className="_drop_no_data_text">No notification left.</p>
             </div>
           </div>
           {/* <!-- No Notifiaction --> */}
         </div>
         {/* <!-- Dropdown --> */}
       </div>
     


         }
       
       </div>
    )
}
export default Notification;