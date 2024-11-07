import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { MDEditorWrapper } from "./markdown-editor";
import Select, { SelectItem } from "../ui/select";
import { useState } from "react";

/**
 * Props for the FormRow component.
 *
 * @interface FormRowProps
 * @property {string} children - The label text for the form row and dervie to placeholder.
 * @property {string} name - The name of the form field, used for identification.
 * @property {string} value - The current value of the form field.
 * @property {(value: string, name: string) => void} onChange - Callback function to handle changes in the form field.
 * @property {"MD" | "input" | 'select'} [type] - Optional type of the form row, either 'MD' for Markdown editor or 'input' for a standard input field. Defaults to 'input'.
 * @property {boolean} [required] - Optional flag to indicate if the field is required.
 * @property {string[]} [data] - Optional if type variant is 'select'.
 * @property {boolean} [disabled] - Optional if type variant is disabled for 'input' and 'select'.
 *
 * @example
 * <FormRow
 *   required
 *   type="MD"
 *   name="title"
 *   value={data.title}
 *   onChange={handleChange}
 * >
 *   Project Name
 * </FormRow>
 */

interface BaseFormRowProps {
  children: string;
  name: string;
  value: string;
  onChange: (value: string, name: string) => void;
  required?: boolean;
}

interface InputFormRowProps extends BaseFormRowProps {
  variant?: "input";
  type?: HTMLInputElement["type"];
  disabled?: boolean;
}

interface SelectFormRowProps extends BaseFormRowProps {
  variant: "select";
  data: string[];
  disabled?: boolean;
}

interface MDFormRowProps extends BaseFormRowProps {
  variant: "MD";
}

type FormRowProps = InputFormRowProps | SelectFormRowProps | MDFormRowProps;

const FormRow = (props: FormRowProps) => {
  const {
    children,
    name,
    value,
    onChange,
    required = false,
    variant = "input",
  } = props;

  const [selectValue, setselectValue] = useState<string>("");
  const placeholder = `Please enter ${children.toLowerCase()}`;
  let formElement = null;
  if (variant === "MD") {
    formElement = (
      <MDEditorWrapper
        id={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    );
  } else if (variant === "select") {
    const { data, disabled } = props as SelectFormRowProps;
    formElement = (
      <Select
        value={data[0] ?? selectValue}
        name={name}
        disabled={disabled}
        onValueChange={(newValue) => {
          setselectValue(newValue);
          onChange(newValue, name);
        }}
      >
        {data.map((d) => (
          <SelectItem value={d} key={d}>
            {d}
          </SelectItem>
        ))}
      </Select>
    );
  } else {
    const { type = "text", disabled } = props as InputFormRowProps;
    formElement = (
      <Input
        disabled={disabled}
        type={type}
        id={name}
        required={required}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value, e.target.name)
        }
      />
    );
  }
  return (
    <>
      <Label className="block mb-2" htmlFor={name}>
        {children}
      </Label>
      {formElement}
    </>
  );
};

export default FormRow;
