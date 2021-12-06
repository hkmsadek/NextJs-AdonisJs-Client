import Link from "next/link";
import { useContext, useState } from "react";
import  axios  from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../pages/_app";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
 
  const router=useRouter();
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const loginHandle =  () => {
    if (loginUser.email === "") return window.alert("Email is required");
    if (loginUser.password === "") return window.alert("Password is requied");
    console.log(loginUser);
    // setLoginUser((cuEmail) => cuEmail.toLowerCase());
     
   
  axios
  .post("http://127.0.0.1:3333/auth/login", {
    email:loginUser.email,
    password:loginUser.password
  })
  .then((response) => {
  
    console.log(response);
    window.alert("Successfully loggedin");
    sessionStorage.setItem("userInfo",JSON.stringify(loginUser));
      
   
    router.push('/home');
   
  })
  .catch((error) => {
    console.log(error);
  });
  console.log(loginUser.email);
 
}
const  logoutHandle=()=>{
  axios
  .get("http://127.0.0.1:3333/logout")
  .then((response) => {
    console.log(response);

  })
  .catch((error) => {
    console.log(error);
  });

}


  return (
    <div>
      <div>
        <div className="_2menu">
          <div className="_2menu_con">
            <div className="row align-items-center">
              <div className="col">
                <Link href="/login">
                  <a>
                    <h3 className="_menu_logo_text">
                      <span className="_menu_logo_symbol">C</span>
                      <span className="_menu_logo_text_main">CONNECTIVER</span>
                    </h3>
                  </a>
                </Link>
              </div>

              <div className="col-auto">
                <Link href="/signup" passHref>
                  <button className="_log_btn _2menu_long" type="button">
                    Signup
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Banner --> */}
        <div className="_4banner">
          <div className="_4banner_main">
            <h1 className="_4banner_title">Connectiver</h1>
            <p className="_4banner_text">
              Creating a conscious and safe community where human
              <br />
              connection and new ideas can thrive
            </p>
          </div>
        </div>
        {/* <!-- Banner --> */}

        {/* <!-- Form --> */}
        <div className="_log_form_main">
          <h2 className="_log_form_title">Login</h2>

          <div className="_log_form">
            <div className="_log_input_group">
              <input
                className="_log_input"
                placeholder="Email"
                value={loginUser.email}
                onChange={(e) =>
                  setLoginUser({ ...loginUser, email: e.target.value })
                }
                type="text"
              />
            </div>
            <div className="_log_input_group">
              <input
                value={loginUser.password}
                onChange={(e) =>
                  setLoginUser({ ...loginUser, password: e.target.value })
                }
                className="_log_input"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="_log_button">
              <button onClick={loginHandle} className="_log_btn _btn_long">
                Login
              </button>
            </div>
            <div className="_log_button">
              <button onClick={logoutHandle} className="_log_btn _btn_long">
                LogOut
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Form --> */}
      </div>
    </div>
  );
};

export default Login;
