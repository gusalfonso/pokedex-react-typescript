import { Link } from "react-router-dom";
import "./NavBarBtn.css";
import { BtnProps } from "./types";

function NavBarButton({ icon, title, to }: BtnProps) {
  return (
    <button className="standard-btn">
      {icon ? <img src={icon} alt={title} /> : ""}
      <Link to={to} className="title">
        {title}
      </Link>
    </button>
  );
}

export default NavBarButton;
