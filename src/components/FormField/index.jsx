import {
  FORM_CONTROL,
  FORM_LABEL_SIZES,
  FORM_ROW_COLUMNS,
} from "../../constants/styles/formField";

const FormInput = (props) => {
  return <input className={FORM_CONTROL} {...props} />;
};

const FormSelect = ({ options, ...props }) => {
  return (
    <select className={FORM_CONTROL} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const FormRow = ({ columns = 2, children }) => {
  return (
    <div className={`grid gap-4 ${FORM_ROW_COLUMNS[columns]}`}>{children}</div>
  );
};

const FormGroup = ({ legend, children }) => {
  return (
    <fieldset>
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
FormField.Row = FormRow;
FormField.Group = FormGroup;

export default FormField;
