/* eslint-disable react/prop-types */
const FormRow = ({
  className,
  type,
  name,
  defaultValue,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type={type}
      name={name}
      className={className}
      defaultValue={defaultValue || ""}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  );
};
export default FormRow;
