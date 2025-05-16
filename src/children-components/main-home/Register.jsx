import React, { useState } from "react";
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router";
import {
  createUser,
  googleSignIn,
  setProfile,
} from "../../js/firebase-operation";
import { toastError, toastSuccess } from "../../js/utils";
import { imageUpload } from "../../js/imageupload";

const Register = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from.pathname || "/";
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function register(e) {
    e.preventDefault();
    setLoading(true);
    const target = e.target;
    const email = target.email.value;
    const password = target.password.value;
    const name = target.name.value;
    const imageFile = target.image.files[0];

    // Password validation
    if (password.length < 6) {
      setLoading(false);
      return toastError("Password must be at least 6 characters.");
    }
    if (!/[A-Z]/.test(password)) {
      setLoading(false);
      return toastError("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      setLoading(false);
      return toastError("Password must contain at least one lowercase letter.");
    }
    try {
      const image = await imageUpload(imageFile);
      if (!image) {
        setLoading(false);
        return toastError("Image upload failed.");
      }
      await createUser(email, password);
      await setProfile(name, image);
      toastSuccess("Registered Successfully");
      navigate(redirectPath);
    } catch (error) {
      toastError("Registration Failed");
    } finally {
      setLoading(false);
    }
  }
  const googleLogin = () => {
    setGoogleLoading(true);
    googleSignIn()
      .then((res) => {
        setGoogleLoading(false);
        toastSuccess("Login Successful");
        navigate(redirectPath);
      })
      .catch((error) => {
        setGoogleLoading(false);
        toastError("Failed to login");
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={register} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Name</label>
              <input
                required
                type="text"
                name="name"
                className="input"
                placeholder="Enter Name"
              />
              <label className="fieldset-label">Email</label>
              <input
                required
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              <label className="fieldset-label">Password</label>
              <div className="relative">
                <input
                  required
                  type={toggle ? "text" : "password"}
                  name="password"
                  className="input"
                  placeholder="Password"
                />
                <div
                  onClick={() => setToggle(!toggle)}
                  className="absolute  top-[8px] md:right-4 right-3 lg:right-8"
                >
                  {toggle ? (
                    <RiEyeCloseLine className="h-[25px] w-[25px]" />
                  ) : (
                    <RiEye2Line className="h-[25px] w-[25px]" />
                  )}
                </div>
              </div>
              <label className="fieldset-label">image URL</label>
              <input type="file" required className="file-input" name="image" />
              <div className=" w-full flex justify-between items-center lg:pr-4 md:pr-0 pr-0">
                <p className="link link-hover">Forgot password?</p>
                <Link to={"/login"}>
                  {" "}
                  <p className="link link-hover">login</p>{" "}
                </Link>
              </div>
              <button className="btn text-white bg-linear-to-bl from-violet-500 to-fuchsia-500 mt-4">
                {loading ? (
                  <span className="loading text-white loading-dots loading-sm"></span>
                ) : (
                  "Register"
                )}
              </button>
            </fieldset>
          </form>
          <button
            onClick={googleLogin}
            className="btn text-white bg-linear-to-bl from-violet-500 to-fuchsia-500 mx-6 mb-6"
          >
            {googleLoading ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Google"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
