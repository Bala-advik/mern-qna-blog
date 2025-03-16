import { useEffect, useState } from "react";
import "../styles/login-module/Login.css";
import { handleLogin } from "../redux/slices/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { isUserLoggedIn, userDetails } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<any>();

  const handleUserSessionCreate = async () => {
    await sessionStorage.setItem("token", userDetails.data.token);
    navigate("/qna");
    setUserName("");
    setpassword("");
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      handleUserSessionCreate();
    }
  }, [isUserLoggedIn]);

  const loginHanlder = async (e: any) => {
    e.preventDefault();
    dispatch(handleLogin({ userName, password }));
  };
  return (
    <div className="login-container">
      <label>User Name</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <button className="login-button" onClick={loginHanlder}>
        Login
      </button>
    </div>
  );
};

export default Login;
