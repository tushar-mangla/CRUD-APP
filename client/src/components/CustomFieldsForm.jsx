/* eslint-disable react/prop-types */
const CustomFieldsForm = ({
  customFieldsData,
  customFields,
  handleCustomFieldChange,
}) => {
  const handleInputChange = (customFieldId, value, type) => {
    handleCustomFieldChange(customFieldId, value, type);
  };

  return (
    <div>
      {customFieldsData.map((group) => (
        <div key={group.groupname}>
          <h3>{group.groupname}</h3>
          {group.sections.map((section) => (
            <div key={section.section}>
              <h4>{section.section}</h4>
              {section.fields.map((field) => (
                <div key={field._id}>
                  <label>{field.label}:</label>
                  {field.type === "input" && (
                    <input
                      type="text"
                      value={customFields[field._id] || ""}
                      onChange={(e) =>
                        handleInputChange(field._id, e.target.value, field.type)
                      }
                    />
                  )}
                  {field.type === "checkbox" && (
                    <input
                      type="checkbox"
                      checked={customFields[field._id] || false}
                      onChange={(e) =>
                        handleInputChange(
                          field._id,
                          e.target.checked,
                          field.type
                        )
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CustomFieldsForm;
