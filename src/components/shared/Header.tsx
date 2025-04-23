import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/Components/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { handleLogOut } from "../../redux/slices/user-slice";

function Header() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  const { isUserLoggedIn, userDetails } = useSelector(
    (state: RootState) => state.user
  );

  const handleSignOut = async () => {
    dispatch(handleLogOut());
    navigate("");
  };

  return (
    <div>
      <nav className="nav_bar">
        <div className="navbar_logo">
          <a href="/">{`${
            !isUserLoggedIn
              ? "aDvik's Blog"
              : `Hello, ${userDetails?.data?.user?.userName}`
          } `}</a>
        </div>
        <ul className="navbar-menu-container">
          {isUserLoggedIn && (
            <li>
              {pathname !== "/qna/add" && <Link to="qna/add">Add QnA</Link>}
              {pathname === "/qna/add" && <Link to="qna/">Back to QnA</Link>}
              <button className="sign-out-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
