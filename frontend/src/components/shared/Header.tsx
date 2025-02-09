import { Link } from "react-router-dom";
import "../../styles/Header.css";

function Header() {
  return (
    <div>
      <nav className="nav_bar">
        <div className="navbar_logo">
          <a href="/">aDvik's Blog</a>
        </div>
        <ul className="navbar-menu-container">
          <li>
            <Link to="qna/add">
              Add QnA
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
