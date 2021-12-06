import { useState, useEffect, useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faFolderOpen,
  faImage,
  faMicrophone,
  faMusic,
  faPalette,
  faPoll,
  faSmile,
  faTimes,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import male from "../../public/img/male.jpg";
import { UserContext } from "./../../pages/_app";
import axios from "axios";

const StatusBox = (props) => {
  const {load,setLoad}=props;
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [statusInfo, setStatusInfo] = useState({
    isStatusbox: false,
    isloaded: false,
    isHide: true,
    post_status: "",
  });
  const isStatusboxHandler = (status) => {
    console.log("loginuser",loggedInUser);
   
    setStatusInfo({ ...statusInfo, isStatusbox: status });
  };
  
  const postHandler = async (post_id) => {
    console.log("status",statusInfo);
     const res = await axios.post("http://127.0.0.1:3333/post/post", {
       user_id: post_id,
      post_status:statusInfo.post_status,
     });
     setStatusInfo({ ...statusInfo, isStatusbox: false,post_status:"" });
     
     setLoad(true);
     console.log(load,"status");
  };
  return (
    <div>
      <div>
        <div
          className={
            statusInfo.isStatusbox === true
              ? "_statusBox_open _statusBox _mar_b20"
              : "_statusBox _mar_b20"
          }
        >
          <div className="_statusBox_top">
            <div className="_statusBox_top_pic">
              <Image
                layout="responsive"
                src={male}
                alt=""
                title=""
                className="_statusBox_top_img"
              />
            </div>
            <div
              className="_statusBox_input"
             
            >
              <input
              
              onClick={() => isStatusboxHandler(true)}
                type="text"
                placeholder="Create a new post..."
              />
            </div>
          </div>
          <div className="_statusBox_bottom">
            <ul className="_statusBox_bottom_ul">
              <li>
                <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
                Photo
              </li>
              <li >
                <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
              </li>
            </ul>
          </div>
          <div className="_statusBox_main_all">
            <div className="_statusBox_main _padd">
              <p
                className="_statusBox_close"
                onClick={()=>isStatusboxHandler(false)}
                
              >
                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
              </p>
              <div className="_statusBox_main_top">
                <div className="_statusBox_main_pic">
                  <Image
                    layout="responsive"
                    src={male}
                    alt=""
                    title=""
                    className="_statusBox_main_img _1border_color"
                  />
                </div>
                <div className="_statusBox_main_details">
                  <p className="_statusBox_main_name">
                    <a href="" className="_3link">
                      {loggedInUser.data &&loggedInUser.data.username}
                    </a>
                  </p>

                  <div className="_statusBox_main_drop">
                    <Dropdown placement="bottom-start">
                      <Dropdown.Toggle id="dropdown-basic">
                        public
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          <p className="_drop_text _drop_pre_icon">
                            {/* <i className="fas fa-bookmark"></i>  */}
                            Save Post
                          </p>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>

              <div className="_statusBox_textarea">
                <textarea
                  value={statusInfo.post_status}
                  onChange={(e) =>
                    setStatusInfo({ ...statusInfo, post_status: e.target.value })
                  }
                  type="text"
                  placeholder={`What's on your mind,${loggedInUser.data?loggedInUser.data.username:" "}`}
                  className="_statusBox_textarea_text"
                ></textarea>
              </div>

              <div className="_statusBox_options">
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="_statusBox_options_items">
                      <div className="_statusBox_options_icon">
                        {/* <i className="fas fa-camera-retro"></i> */}
                        <FontAwesomeIcon icon={faCameraRetro}></FontAwesomeIcon>
                      </div>

                      <p className="_statusBox_options_text">Upload Photos</p>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="_statusBox_options_items">
                      <div className="_statusBox_options_icon">
                        {/* <i className="fas fa-video"></i> */}
                        <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
                      </div>

                      <p className="_statusBox_options_text">Upload Video</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <Button
                  onClick={() => postHandler(loggedInUser.data.id)}
                  variant="primary"
                >
                  POST
                </Button>
              </div>
            </div>
            <div
              onClick={() => isStatusboxHandler(false)}
              className="_statusBox_overlay"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBox;
