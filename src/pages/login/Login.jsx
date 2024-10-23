/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CButton from "../../utils/CButton/CButton";
import CInput from "../../utils/CInput/CInput";
import { useLoginMutation } from "../../redux/features/auth/authApiSlice";
import Swal from "sweetalert2";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hide, setHide] = useState(true);

  const navigate = useNavigate();

  const [login, response] = useLoginMutation();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    setIsLoading(true);
    setError("");
    e.preventDefault();

    if (!data.email) {
      setError("Email Is Required");
      setIsLoading(false);
      return;
    }
    if (data.email) {
      const regXEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regXEmail.test(data.email)) {
        setError("Please Enter Valid Email");
        setIsLoading(false);
        return;
      }
    }

    if (!data.password) {
      setError("Password Is Required");
      setIsLoading(false);
      return;
    }
    if (data.password) {
      if (data.password.length < 6) {
        setError("Password must contain at least 6 characters");
        setIsLoading(false);
        return;
      }
      const regXPass =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{6,}$/;
      if (!regXPass.test(data.password)) {
        setError(
          "Password Must Contain: Capital Latter, Small Latter, Number and Special Character"
        );
        setIsLoading(false);
        return;
      }
    }

    try {
      const res = await login(data)?.unwrap();
      console.log(res);

      if (res) {
        localStorage.setItem("ODL-LLM-USER", JSON.stringify(res?.user));
        Swal.fire("Successfully Logged In!", "Success!", "success");
        e.target.reset();
        navigate("/");
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <div className="absolute top-5 left-5 text-white z-20">
        <Link to="/" className="text-orange-500 text-2xl">
          <FaHome />
        </Link>
      </div>
      <section className="flex flex-col lg:flex-row min-h-screen">
        <div className="hidden lg:flex bg-black min-h-screen w-full lg:w-1/2  justify-center items-center relative">
          <div className="w-full lg:w-3/5">
            <img
              src="https://img.freepik.com/premium-photo/white-robot-sits-front-computer-screen_1104726-14675.jpg?w=740"
              alt="login image"
              className="w-96 rounded"
            />
          </div>
        </div>

        <div className="bg-gray-200 min-h-screen w-full lg:w-1/2 mx-auto grid grid-cols-1 items-center p-2">
          <div className="border rounded border-white p-4 w-4/5 mx-auto">
            <form onSubmit={handleSubmit} className="card-body ">
              <h2 className="text-xl lg:text-xl font-bold text-center">
                Welcome To <span className="text-orange-500">ODL</span> AI
              </h2>

              <p className="text-xs text-red-600 text-center">{error}</p>

              <div className="">
                <CInput
                  onChange={(e) => {
                    if (e.target.value) {
                      setError("");
                    }
                    setData({ ...data, email: e.target.value });
                  }}
                  id="email"
                  type="email"
                  label="Email*"
                  placeholder="Email"
                />
              </div>

              <div className="">
                <CInput
                  onChange={(e) => {
                    if (e.target.value) {
                      setError("");
                    }

                    setData({
                      ...data,
                      password: e.target.value,
                    });
                  }}
                  id="password"
                  type={`${hide ? "password" : "text"}`}
                  label="Password*"
                  placeholder="Password*"
                  className={`${
                    error.password ? "error-input" : "normal-input"
                  }`}
                  endIcon={
                    <span onClick={() => setHide(!hide)}>
                      {" "}
                      {hide ? <FaEye /> : <FaEyeSlash />}{" "}
                    </span>
                  }
                />
              </div>

              <div className="mt-2">
                <CButton
                  variant={"outline"}
                  type={"submit"}
                  loading={isLoading}
                >
                  Login
                </CButton>
              </div>
            </form>
            <p className="text-center my-2 text-sm">
              Don&apos;t Have an Account ?{" "}
              <Link to="/register" className="text-orange-500 font-semibold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
