import React, { useEffect, useState, Fragment } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { postRegister } from "../../app/redux/Slice/RegisterSlice";

import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    await e.preventDefault();
    if (dataUser.confirm_password.match(dataUser.password)) {
      // console.log("match password")
      if (document.getElementById("agree-user").checked) {
        dispatch(postRegister(dataUser))
          .unwrap()

          .then((item) => {
            setTimeout(() => {
              navigate("../login");
            }, 2000);
          });
      } else {
        toast.warning("Please Agree terms and conditions", {
          autoClose: 2000,
          toastId: "warningAgreeUser",
        });
      }
    } else {
      toast.warning("Password Not Match", {
        autoClose: 2000,
        toastId: "warningNotMatchPassword",
      });
    }
  };

  useEffect(() => {
    document.title = "Register | World Recipes";
  }, []);

  return (
    <Fragment>
      <div className="sign-up-page d-flex justify-content-center align-items-center">
        <div className="container col-12 mt-5">
          <div>
            <div className="card">
              <div className="d-flex col-xl-9 col-lg-9 col-md-12 col-sm-12 container justify-content-center">
                <form onSubmit={handleCreate} className="w-100 form-sign-up">
                  <div className="text-center">
                    <h2 className="text-warning">Register</h2>
                    <h6 className="text-muted">Let's create your account</h6>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-input form-control"
                      id="name"
                      placeholder="Enter Name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email"
                      className="form-input form-control"
                      id="email"
                      placeholder="Enter Email address"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-input form-control"
                      id="password"
                      placeholder="Enter Password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="confirm_password" className="form-label">
                      Confirmation Password
                    </label>
                    <input
                      type="password"
                      name="confirm_password"
                      className="form-control"
                      id="confirm_password"
                      placeholder="Enter Confirmation Password"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex justify-content-start mb-4">
                    <input
                      className="form-input form-check-input"
                      type="checkbox"
                      value=""
                      id="agree-user"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="agree-user">
                      &nbsp; I agree to terms & conditions
                    </label>
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="form-input submit"
                      className="btn btn-warning my-2 text-light"
                    >
                      Register
                    </button>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      className="btn btn-outline-warning my-2"
                    >
                      Google
                    </button>
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    <p className="text-muted">Already have account?</p>

                    <Link
                      className="text-warning text-decoration-none"
                      to={"../sign-in"}
                    >
                      &nbsp;Log in Here
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

export default Register;
