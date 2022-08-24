import { useReducer, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import classes from "./AuthForm.module.css";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../store";

const AuthForm = () => {
  const tokenDispatch = useDispatch();
  const tokenSelector = useSelector(state => state.cartReducer.token);


  const formReducer = (state, action) => {
    switch (action.type) {
      case "email-change": {
        return { ...state, email: action.email };
      }
      case "password-change": {
        return { ...state, password: action.password };
      }
      case "reset": {
        return {
          type: "",
          email: "",
          password: "",
        };
      }
      default: {
        return state;
      }
    }
  };
  const [isLogin, setIsLogin] = useState(true);
  
  const [formState, dispatch] = useReducer(formReducer, {
    type: "",
    email: "",
    password: "",
  });
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onEmailChangeHandler = (event) => {
    dispatch({
      type: "email-change",
      email: event.target.value,
    });
  };
  const onPasswordChangeHandler = (event) => {
    dispatch({
      type: "password-change",
      password: event.target.value,
    });
  };

  const buttonClickHandler = (e) => {
    e.preventDefault();
    let url;
    if (!isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC38-d1H73DYbTX_bITfFsjZH0qYV1IXjM";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC38-d1H73DYbTX_bITfFsjZH0qYV1IXjM";
    }
    console.log("daaasdfgasgarewg")
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: formState.email,
        password: formState.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          
          response.json().then((data) => {
            tokenDispatch(addToken(data.idToken));
            localStorage.setItem(data.email,data.idToken);
          }
          );
          toast.success("Authentication Successfull", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        } else {
          response.json().then(
            (data) =>
              data.error &&
              data.error.message &&
              toast.error("OOPS " + data.error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
          );
        }
      })
      .catch((err) => console.log(err));

    dispatch({ type: "reset" });
  };
  
  return (
    <section className={classes.auth}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={formState.email}
            onChange={onEmailChangeHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={formState.password}
            onChange={onPasswordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <button onClick={buttonClickHandler}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
