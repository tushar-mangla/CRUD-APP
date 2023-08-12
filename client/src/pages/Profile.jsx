import { useDashboardContext } from "../pages/Dashboard";
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const { user } = useDashboardContext();

  return (
    <div>
      <h2>Profile</h2>
      <div>
        {user?.user?.avatar ? (
          <img
            src={user.user.avatar}
            alt={`${user.user.name} `}
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        ) : (
          <FaUser size={150} style={{ color: "#ccc" }} />
        )}
        <p>First Name: {user?.user?.name}</p>
        <h5>Email : {user?.user?.email}</h5>
      </div>
    </div>
  );
};

export default Profile;
