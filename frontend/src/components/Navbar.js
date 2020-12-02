import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/session";

const NavWrapper = styled.div`
  a {
    margin: 5px;
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  return (
    <NavWrapper>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/signup">Create User</NavLink>
      <button
        onClick={() =>
          user ? dispatch(logout()) : console.log("you are not logged in :)")
        }
      >
        Logout
      </button>
    </NavWrapper>
  );
};

export default Navbar;
