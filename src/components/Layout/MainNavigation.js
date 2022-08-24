import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import classes from "./MainNavigation.module.css";
import { logoutHandler } from "../../store";

const MainNavigation = () => {
  const isLoggedIn = useSelector((state) => state.cartReducer.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={()=>{
                dispatch(logoutHandler())
                navigate("/auth")
              }}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
