import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import plus from "../images/plus.svg";
import edit from "../images/edit.svg";
import actionIcon from "../images/actionIcon.svg";
import "../style/Settings.scss";
import { RiDeleteBin5Line } from "react-icons/Ri";
import EditCustomField from "./EditCustomFields";
import AddCustomField from "./AddCustom";

const GetAllCustoms = () => {
  const [customFields, setCustomFields] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    fetchCustomFields();
  }, []);

  const fetchCustomFields = async () => {
    try {
      const response = await customFetch.get("/custom");
      setCustomFields(response.data);
    } catch (error) {
      console.error("Error fetching custom fields:", error);
    }
  };

  const handleDeleteField = async (fieldId) => {
    try {
      await customFetch.delete(`/custom/${fieldId}`);
      fetchCustomFields();
    } catch (error) {
      console.error("Error deleting custom field:", error);
    }
  };

  return (
    <div className="settingContainer">
      <div className="rightSide">
        <div className="settings">
          <div className="topbar">
            <p className="heading">Student’s Custom Fields</p>
            <Link className="addNew" onClick={() => setShowProfile(true)}>
              <img className="image " src={plus} />
              <p className="para">Add New</p>
            </Link>
          </div>
          <div className="settingList">
            <table className="tableContainer">
              <thead>
                <tr className="tableHeader">
                  <th className="header">Group Name</th>
                  <th className="header">Section</th>
                  <th className="header">Label</th>
                  <th className="header">Type</th>
                  <th className="header">Edit</th>
                  <th className="header">Delete</th>
                </tr>
              </thead>
              <tbody>
                {customFields.map((field) => (
                  <tr className="tableHeader" key={field._id}>
                    <td className="listItems">{field.groupname}</td>
                    <td className="listItems">{field.section}</td>
                    <td className="listItems">{field.label}</td>
                    <td className="listItems">
                      {/* <input type={field.type} /> */}
                      Input {field.type}
                    </td>
                    <td className="listItems">
                      <Link
                        to={`/dashboard/settings/${field._id}`}
                        state={{ fieldDetails: field }}
                      >
                        <img src={actionIcon} />
                      </Link>
                    </td>
                    <td className="listItems">
                      <RiDeleteBin5Line
                        onClick={() => handleDeleteField(field._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showProfile && <AddCustomField setShowProfile={setShowProfile} />}
        </div>
      </div>
    </div>
  );
};

export default GetAllCustoms;
