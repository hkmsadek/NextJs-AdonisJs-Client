import React, { useState,useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const Signup = () => {
  

  const router = useRouter();
  const [register, setRegister] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    gender: "",
    agree: true,
    reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
  });

  const registerHandler = async () => {
    if (!register.agree)
      return this.i("Please accept our temrs and privacy policy");
    if (register.first_name === "") return window.alert("Firstname is requied");
    if (register.last_name === "") return window.alert("Lastname is requied");
    if (register.email === "") return window.alert("Email is requied");
    if (register.email && !register.reg.test(register.email))
      return window.alert("Invalid email format!");
    if (register.password === "") return window.alert("Password is requied");
    if (register.password.trim().length < 6)
      return window.alert("Password must be at least 6 charecters long.");
    if (register.password !== register.password_confirmation)
      return window.alert("Password and confirm password doesn't match");
    if (register.gender === "") return window.alert("Gender is required");
    let lowercaseEmail = register.email.toLowerCase();
    console.log(register.reg, "small", typeof(register.reg));
    setRegister({ ...register, email: lowercaseEmail });

    axios
      .post("http://127.0.0.1:3333/auth/register", {
        register

      })
      .then((response) => {
        console.log(response);
        window.alert("Successfully registration done");

        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <>
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
                <Link href="/login" passHref>
                  <button className="_log_btn _2menu_long" type="button">
                    Login
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
          <h2 className="_log_form_title">Sign Up</h2>

          <div className="_log_form">
            <div className="_log_input_group">
              <input
               
                value={register.first_name}
                onChange={(e) => {
                  setRegister({ ...register, first_name: e.target.value });
                }}
                className="_log_input"
                placeholder="First name"
                type="text"
              />
            </div>
            <div className="_log_input_group">
              <input
                value={register.last_name}
                onChange={(e) =>
                  setRegister({ ...register, last_name: e.target.value })
                }
                className="_log_input"
                placeholder="Last name"
                type="text"
              />
            </div>
            <div className="_log_input_group">
              <input
                value={register.email}
                onChange={(e) => {
                  setRegister({ ...register, email: e.target.value });
                }}
                className="_log_input"
                placeholder="Email address"
                type="text"
              />
            </div>
            <div className="_log_input_group">
              <input
                value={register.password}
                onChange={(e) => {
                  setRegister({ ...register, password: e.target.value });
                }}
                className="_log_input"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="_log_input_group">
              <input
                value={register.password_confirmation}
                onChange={(e) => {
                  setRegister({
                    ...register,
                    password_confirmation: e.target.value,
                  });
                }}
                className="_log_input"
                placeholder="Confirm password"
                type="password"
              />
            </div>
            <div className="_log_input_group">
              <select
                value={register.gender}
                onChange={(e) => {
                  setRegister({ ...register, gender: e.target.value });
                }}
                className="_1select"
              >
                <option selected="true" disabled>
                  Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="_log_input_group">
              <div className="_log_checkBox">
                <input
                  value={register.agree}
                  onChange={(e) => {
                    setRegister({ ...register, agree: e.target.value });
                  }}
                  type="checkbox"
                  id="html"
                />
                <label htmlFor="html">
                  I agree with the <a href="">Terms</a> &<a href="">Privacy</a>
                </label>
              </div>
            </div>
            <div className="_log_button">
              <button onClick={registerHandler} className="_log_btn _btn_long">
                Sign Up
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Form --> */}
      </div>
    </>
  );
};

export default Signup;
