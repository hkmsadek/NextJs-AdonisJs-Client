
import { UserContext } from './../../pages/_app';
import { useContext,useEffect,useState} from 'react';
import  {Dropdown}  from 'react-bootstrap';
import  Image  from "next/image";
import  Link  from "next/link";
import Notification from './Notification.js'
const Default = (props) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shownotification,setshowNotification]=useState(false);

  const {socket,setSocket}=props;
  const [notiInfo,setNotiInfo]=useState([]);

  useEffect(()=>{
      socket?.on('getNotification',data=>{
          setNotiInfo((pre)=>[...pre,data]);

      })


  },[socket])

  console.log("notify",notiInfo);


  useEffect(()=>{
    const val=sessionStorage.getItem('userInfo');
    console.log("vvvvv",val,typeof(val));
    if(val) {
      setLoggedInUser(JSON.parse(val));
    }
  
  },[])
  console.log(shownotification);
  const notificationHandler=()=>{
    if(shownotification) {
      setshowNotification(false);
    }
    else {
      setshowNotification(true);
    }

  }

  return (
    <div>
      <div id="app">
        <div >
          {/* <!-- Menu --> */}
          <div
            className="_menu"
          
          >
            <div className="_layout">
              <div className="_layout_row align-items-center">
                <div className="_layout_auto">
                  <div className="_menu_left">
                    <div className="_menu_logo">
                      <router-link to="/">
                        <h3 className="_menu_logo_text">
                          <span className="_menu_logo_symbol">C</span>
                          <span className="_menu_logo_text_main">
                            CONNECTIVER
                          </span>
                        </h3>
                      </router-link>
                    </div>

                    <p className="_menu_left_home">
                      <i className="fas fa-home"></i>{" "}
                      <i className="fal fa-house-day"></i>
                    </p>
                  </div>
                </div>

               

                <div className="_layout_col _only_desktop">
                  <div className="_menu_search">
                    <div className="_menu_search_main">
                      <div className="_menu_search_icon">
                        <i className="fas fa-search"></i>
                      </div>

                      <div className="_menu_search_input">
                        <input type="text" placeholder="Search" />
                      </div>
                    </div>
                  </div>
                </div>


                <div onClick={notificationHandler} className="pr-5 _menu_list_items_icon">
           <svg xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink"
                 xmlnsSvgjs="http://svgjs.com/svgjs" 
                 version="1.1" width="512" 
                 height="512" x="0" y="0" 
                 viewBox="0 0 512 512" 
                 style={{enableBackground:"new 0 0 512 512"}} 
                 xmlSpace="preserve" className=""><g>
             <g xmlns="http://www.w3.org/2000/svg">
               <g>
                 <g>
                   <path d="M191.132,469.361C202.252,494.367,226.91,512,256.012,512c29.102,0,53.76-17.633,64.881-42.639     c-20.521,1.004-41.861,1.679-64.881,1.679C232.993,471.04,211.653,470.364,191.132,469.361z" fill="#ffffff" data-original="#000000"  className=""/>
                   <path d="M481.886,360.96c-26.993-34.038-72.294-100.946-72.294-166.4c0-64.901-41.697-123.29-102.4-144.753     C306.455,22.2,283.763,0,256.012,0c-27.771,0-50.442,22.2-51.18,49.807c-60.723,21.463-102.42,79.852-102.42,144.753     c0,65.475-45.281,132.362-72.294,166.4c-9.011,11.366-11.797,26.378-7.434,40.161c4.26,13.455,14.868,23.88,28.385,27.853     c23.675,6.984,62.484,14.848,121.672,18.862c25.62,1.72,53.166,2.724,83.272,2.724c30.085,0,57.631-1.004,83.251-2.724     c59.208-4.014,97.997-11.878,121.692-18.862c13.517-3.973,24.105-14.397,28.365-27.853     C493.683,387.338,490.877,372.326,481.886,360.96z" fill="#ffffff" dataOriginal="#000000"  className=""/>
                 </g>
               </g>
             </g>
             </g>
           </svg>

          {notiInfo.length>0 && notiInfo[0].notification_sender!==loggedInUser.data.username && 
           <p className="_noti_num _notification">{notiInfo.length}</p> } 
          
         </div>
                <Notification setshowNotification={setshowNotification} shownotification={shownotification}  notiInfo={notiInfo} ></Notification>
                
                

               
              </div>
              
            </div>
            
          </div>
          
          {/* <!-- Menu --> */}

        

          {/* <!-- Footer --> */}
          
          {/* <!-- Footer --> */}
        </div>
      </div>
    </div>
  );
};

export default Default;
