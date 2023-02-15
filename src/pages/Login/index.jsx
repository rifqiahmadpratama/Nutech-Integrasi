import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { postLogin } from "../../app/redux/Slice/LoginSlice";

import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    // console.log(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (document.getElementById("agree-user").checked) {
      dispatch(postLogin(data))
        .unwrap()

        .then((item) => {
          setTimeout(() => {
            navigate("../home");
          }, 2000);
        });
    } else {
      toast.warning("Please Agree terms and conditions", {
        autoClose: 2000,
        toastId: "warningAgreeUser",
      });
    }
  };

  useEffect(() => {
    document.title = "Login | World Recipes";
  }, []);

  return (
    <Fragment>
      <div className="login-page d-flex justify-content-center align-items-center">
        <div className="container col-12 mt-5">
          <div>
            <div className="card">
              <div className="d-flex col-xl-9 col-lg-9 col-md-12 col-sm-12 container justify-content-center">
                <form onSubmit={handleLogin} className="w-100 form-login">
                  <div className="text-center my-5">
                    <h2 className="text-warning">Welcome</h2>
                    <h6 className="text-muted">
                      Log in into your exiting account
                    </h6>
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      name="email"
                      type="text"
                      className="form-control form-input"
                      id="email"
                      placeholder="Enter Email address"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="form-control form-input"
                      id="password"
                      placeholder="Enter Password"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex justify-content-start my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="agree-user"
                    />
                    <label className="form-check-label" htmlFor="agree-user">
                      &nbsp;I agree to terms & conditions
                    </label>
                  </div>
                  <div className="row d-flex justify-content-center container">
                    <button
                      type="form-input submit"
                      className="btn btn-warning my-2 text-light"
                    >
                      Login
                    </button>
                    {/* <hr className="mt-3" />
                    <button
                      type="button"
                      className="btn btn-outline-warning mt-2"
                    >
                      Google
                    </button> */}
                  </div>

                  <div className="col-12 d-flex justify-content-center my-2">
                    <p className="text-muted">Don’t have an account?</p>
                    <Link
                      className="text-warning text-decoration-none"
                      to={"../register"}
                    >
                      &nbsp;Register Here
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
