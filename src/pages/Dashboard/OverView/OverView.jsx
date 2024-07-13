import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const OverView = () => {
  const { user } = useContext(AuthContext);

  
  return (
    <div>
      <h2 className="text-4xl">This is overview</h2>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Name: {user?.displayName}</p>
          <img src={user?.photo} alt="Profile" />
          <p>Role: {user?.role}</p>
          <p>Gender: {user?.gender}</p>
        </div>
      )}
    </div>
  );
};

export default OverView;
