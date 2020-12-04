import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/session";

// styled components are great. I recommend you looking into them!
const NavWrapper = styled.div`
  a {
    margin: 5px;
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleLogout = () => {
    if (user) dispatch(logout());
  };

  return (
    <NavWrapper>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/signup">Create User</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </NavWrapper>
  );
};

export default Navbar;
