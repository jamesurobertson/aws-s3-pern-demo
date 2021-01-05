import { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/users";

const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => Object.values(state.users));
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="allusers-container">
      {users.map((user) => {
        const { id, username, profileImageUrl: pic } = user;
        return (
          <div key={id} className="peoplecard__container">
            <div className="peoplecard__picture">
              <img src={pic} alt={username} />
            </div>
            <div className="peoplecard__footer">
              <div className="peoplecard__fullName">{username}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllUsers;
