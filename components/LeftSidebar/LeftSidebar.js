import Link from "next/link";
import Image from "next/image"
import male  from '../../public/img/male.jpg'
import {faUsers,faUserCog,faFlag,faCheckSquare,faChartLine,faGlobeAsia,faCalendarAlt,faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState,useContext } from "react";
import { UserContext } from './../../pages/_app';
import { useRouter } from "next/router";

const LeftSidebar = () => {
 
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [userInfo, setuserInfo] = useState({
    logout: false,
  });
  const loggedOut=(value)=>{
  
 
      sessionStorage.removeItem('userInfo');
      sessionStorage.removeItem('userData');
      setLoggedInUser({});

    console.log("asef")
  setuserInfo({...userInfo,logout: value})
  setLoggedInUser({});
  router.push("/login");
}
console.log("datavalue",loggedInUser);

   
  return (
    <div>
      <div className="_sidebar_main_all _1scrollbar">
        {/* <!-- Shimmer --> */}
        {/*
        <div v-if="isHide">
          <div className="_sidebar_shimmer_all">
            <div className="_sidebar_shimmer">
              <div className="_sidebar_shimmer_pic _2shim_animate din"></div>
              <div className="_sidebar_shimmer_details">
                <div className="_sidebar_shimmer_name _shim_w35 _2shim_animate"></div>
              </div>
            </div>

            <div className="_sidebar_shimmer">
              <div className="_sidebar_shimmer_pic _2shim_animate din"></div>
              <div className="_sidebar_shimmer_details">
                <div className="_sidebar_shimmer_name _shim_w50 _2shim_animate"></div>
              </div>
            </div>

            <div className="_sidebar_shimmer_title _shim_w25 _2shim_animate"></div>

            <div className="_sidebar_shimmer">
              <div className="_sidebar_shimmer_pic _2shim_animate din"></div>
              <div className="_sidebar_shimmer_details">
                <div className="_sidebar_shimmer_name _shim_w60 _2shim_animate"></div>
              </div>
            </div>

            <div className="_sidebar_shimmer">
              <div className="_sidebar_shimmer_pic _2shim_animate din"></div>
              <div className="_sidebar_shimmer_details">
                <div className="_sidebar_shimmer_name _shim_w60 _2shim_animate"></div>
              </div>
            </div>
            <div className="_sidebar_shimmer">
              <div className="_sidebar_shimmer_pic _2shim_animate din"></div>
              <div className="_sidebar_shimmer_details">
                <div className="_sidebar_shimmer_name _shim_w40 _2shim_animate"></div>
              </div>
            </div>
            <div className="_sidebar_shimmer_title _shim_w30 _2shim_animate"></div>
            <div className="_sidebar_shimmer">
              <div className="_sidebar_shimmer_pic _2shim_animate din"></div>
              <div className="_sidebar_shimmer_details">
                <div className="_sidebar_shimmer_name _shim_w25 _2shim_animate"></div>
              </div>
            </div>
            <div className="_sidebar_shimmer">
              <div className="_sidebar_shimmer_pic _2shim_animate din"></div>
              <div className="_sidebar_shimmer_details">
                <div className="_sidebar_shimmer_name _shim_w35 _2shim_animate"></div>
              </div>
            </div>
            <div className="_sidebar_shimmer">
              <div className="_sidebar_shimmer_pic _2shim_animate din"></div>
              <div className="_sidebar_shimmer_details">
                <div className="_sidebar_shimmer_name _shim_w30 _2shim_animate"></div>
              </div>
            </div>
            <div className="_sidebar_shimmer">
              <div className="_sidebar_shimmer_pic _2shim_animate din"></div>
              <div className="_sidebar_shimmer_details">
                <div className="_sidebar_shimmer_name _shim_w35 _2shim_animate"></div>
              </div>
            </div>
            <div className="_sidebar_shimmer_title _shim_w35 _2shim_animate"></div>
            <div className="_sidebar_shimmer">
              <div className="_sidebar_shimmer_pic _2shim_animate din"></div>
              <div className="_sidebar_shimmer_details">
                <div className="_sidebar_shimmer_name _shim_w60 _2shim_animate"></div>
              </div>
            </div>
            <div className="_sidebar_shimmer">
              <div className="_sidebar_shimmer_pic _2shim_animate din"></div>
              <div className="_sidebar_shimmer_details">
                <div className="_sidebar_shimmer_name _shim_w40 _2shim_animate"></div>
              </div>
            </div>
            <div className="_sidebar_shimmer">
              <div className="_sidebar_shimmer_pic _2shim_animate din"></div>
              <div className="_sidebar_shimmer_details">
                <div className="_sidebar_shimmer_name _shim_w35 _2shim_animate"></div>
              </div>
            </div>
          </div>
        </div>
        */}
        {/* <!-- Shimmer --> */}

        <div>
   
          <div className="_sidebar_list_main">
            <ul className="_sidebar_list">
              <li>
                <Link href="/profile">
                  <a>
                    <div className="_sidebar_list_pic">
                      <Image
                        className="_sidebar_list_img"
                        src={male}
                        alt=""
                        title=""
                        layout="responsive"
                      />
                    </div>
                    <p className="_sidebar_list_text">My Profile</p>
                  </a>
                </Link>
               
              </li>
              <li>
                <Link href="/messanger">
                  <a>
                  <p className="_sidebar_list_icon">
                      
                      <FontAwesomeIcon icon={faFacebookMessenger} />
                    </p>
                    
                    <p className="_sidebar_list_text">Messenger</p>
                  </a>
                </Link>
                
              </li>
              <li>
                <Link href="/settingNew">
                  <a>
                    <p className="_sidebar_list_icon">
                      
                      <FontAwesomeIcon icon={faUserCog} />
                    </p>
                    <p className="_sidebar_list_text">Account Setting</p>
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="_sidebar_list_main">
            <p className="_sidebar_list_title">Explore</p>

            <ul className="_sidebar_list">
              <li>
                <Link href="">
                  <a>
                    <p className="_sidebar_list_icon">
                      <i className="fas fa-chart-line"></i>
                      <FontAwesomeIcon icon={faChartLine} />
                    </p>
                    <p className="_sidebar_list_text">Personal Newsfeed</p>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="">
                  <a>
                    <p className="_sidebar_list_icon">
                      <i className="fas fa-check-square"></i>
                      <FontAwesomeIcon icon={faCheckSquare} />
                    </p>
                    <p className="_sidebar_list_text">World Newsfeed</p>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/savedPage">
                  <a>
                    <p className="_sidebar_list_icon">
                      <i className="fas fa-check-square"></i>
                      <FontAwesomeIcon icon={faCheckSquare} />
                    </p>
                    <p className="_sidebar_list_text">Saved Posts</p>
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="_sidebar_list_main">
            <p className="_sidebar_list_title">Discover</p>

            <ul className="_sidebar_list">
              <li>
                <Link href="/peopleList">
                  <a>
                    <p className="_sidebar_list_icon">
                      <i className="fas fa-globe-asia"></i>
                      <FontAwesomeIcon icon={faGlobeAsia} />
                    </p>
                    <p className="_sidebar_list_text">people</p>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/groupList">
                  <a>
                    <p className="_sidebar_list_icon">
                      <i className="fas fa-users"></i>
                      <FontAwesomeIcon icon={faUsers} />
                    </p>
                    <p className="_sidebar_list_text">groups</p>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/pageList">
                  <a>
                    <p className="_sidebar_list_icon">
                      <i className="fas fa-flag"></i>
                      <FontAwesomeIcon icon={faFlag} />
                    </p>
                    <p className="_sidebar_list_text">pages</p>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/eventList">
                  <a>
                    <p className="_sidebar_list_icon">
                      <i className="fas fa-calendar-alt"></i>
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </p>
                    <p className="_sidebar_list_text">events</p>
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="_sidebar_list_main">
            <p className="_sidebar_list_title">Technical</p>

            <ul className="_sidebar_list">
              <li>
                <Link href="/advertise">
                  <a>
                    <p className="_sidebar_list_icon">
                      <i className="fas fa-globe-asia"></i>
                      <FontAwesomeIcon icon={faGlobeAsia} />
                    </p>
                    <p className="_sidebar_list_text">Advertising</p>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="">
                  <a>
                    <p className="_sidebar_list_icon">
                      <i className="fas fa-users"></i>
                      <FontAwesomeIcon icon={faUsers} />
                    </p>
                    <p className="_sidebar_list_text">Support</p>
                  </a>
                </Link>
              </li>
              <li onClick={()=>loggedOut(false)}>
                <Link href="">
                  <a>
                    <p className="_sidebar_list_icon">
                      <i className="fas fa-flag"></i>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                    </p>
                    <p className="_sidebar_list_text">Log Out</p>
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="_fotter">
            <ul className="_fotter_list">
              <li>
                <a href="">Privacy</a>
              </li>
              <li>
                <a href="">Terms</a>
              </li>
              <li>
                <a href="">Advertising</a>
              </li>
              <li>
                <a href="">More </a>
              </li>
              <li>CUMIVATOR@2021</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
