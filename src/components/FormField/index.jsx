import {
  FORM_CHECKBOX,
  FORM_CHECKBOX_LABEL,
  FORM_CONTROL,
  FORM_LABEL_SIZES,
  FORM_OPTION,
  FORM_ROW_COLUMNS,
} from "../../constants/styles/formField";

const FormInput = (props) => {
  return <input className={FORM_CONTROL} {...props} />;
};

const FormSelect = ({ options, placeholder, ...props }) => {
  return (
    <select className={FORM_CONTROL} {...props}>
      {placeholder && (
        <option value="" disabled className={FORM_OPTION}>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value} className={FORM_OPTION}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const FormCheckbox = ({ id, label, ...props }) => {
  return (
    <label htmlFor={id} className={FORM_CHECKBOX_LABEL}>
      <input type="checkbox" id={id} className={FORM_CHECKBOX} {...props} />
      {label}
    </label>
  );
};

const FormRow = ({ columns = 2, children }) => {
  return (
    <div className={`grid gap-4 ${FORM_ROW_COLUMNS[columns]}`}>{children}</div>
  );
};

const FormGroup = ({ legend, children }) => {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className={`block ${FORM_LABEL_SIZES.md}`}>{legend}</legend>
      {children}
    </fieldset>
  );
};

const FormField = ({ id, label, size = "md", children }) => {
  return (
    <div>
      <label htmlFor={id} className={`block ${FORM_LABEL_SIZES[size]}`}>
        {label}
      </label>
      {children}
    </div>
  );
};

FormField.Input = FormInput;
FormField.Select = FormSelect;
FormField.Checkbox = FormCheckbox;
FormField.Row = FormRow;
FormField.Group = FormGroup;

export default FormField;
