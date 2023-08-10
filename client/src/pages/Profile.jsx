import { useDashboardContext } from "../pages/Dashboard";
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const { user } = useDashboardContext();
  // const [profile, setProfile] = useState({});

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const { data } = await customFetch.get(`/students/current-user`);
  //       console.log(data);
  //       setProfile(data.student);
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };

  //   fetchProfile();
  // }, [user.studentId]);

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
        {/* {user.user.customFields &&
          Object.entries(user.user.customFields).map(([group, sections]) => (
            <div key={group}>
              <h3>{group}</h3>
              {sections.map((section, index) => (
                <div key={index}>
                  {Object.entries(section).map(([label, type]) => (
                    <p key={label}>
                      {label}:{" "}
                      {type === 1 ? "Text" : type === 3 ? "Checkbox" : "Other"}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ))} */}
        <h5>Email : {user?.user?.email}</h5>
      </div>
    </div>
  );
};

export default Profile;
