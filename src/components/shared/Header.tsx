import { Link, useNavigate } from "react-router-dom";
import "../../styles/Components/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { handleLogOut } from "../../redux/slices/user-slice";

function Header() {
  const { isUserLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    dispatch(handleLogOut());
    navigate("");
  };
  return (
    <div>
      <nav className="nav_bar">
        <div className="navbar_logo">
          <a href="/">aDvik's Blog</a>
        </div>
        <ul className="navbar-menu-container">
          {isUserLoggedIn && (
            <li>
              <Link to="qna/add">Add QnA</Link>
              <Link to="" onClick={handleSignOut}>
                Sign Out
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
