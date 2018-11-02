import * as React from "react";
import {
  TextField,
  Chip,
  Select,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Switch,
  RadioGroup
} from "@material-ui/core";


export const renderRadioGroup = ({ input, ...rest }) => {
  return (
    <RadioGroup
      {...input}
      {...rest}
      value={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  );
};

export const renderSwitch = ({ input, label, meta: { error }, ...custom }) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={input.value}
            onChange={input.onChange}
            value={input.value.toString()}
            {...custom}
            color={"primary"}
          />
        }
        label={label}
      />
      <br />
      <span style={{ color: "red" }}>{error}</span>
    </div>
  );
};

export const renderCheckBox = ({
  input: { value, onChange },
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            style={{
              border: touched && error ? "1px solid red" : "none"
            }}
            {...input}
            {...custom}
            value={value.toString()}
            checked={value}
          />
        }
        label={label}
      />
    </div>
  );
};

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <div>
      <TextField
        label={label}
        {...input}
        {...custom}
        style={{ margin: 10 }}
        autoComplete={"off"}
      />

      {touched && (error && <p style={{ color: "red" }}>{error}</p>)}
    </div>
  );
};

export const renderSelectField = props => {
  return (
    <div>
      <InputLabel style={{ marginLeft: 10, fontSize: "13px" }}>
        {props.label}
      </InputLabel>
      <br />
      <Select
        error={!!props.error && props.touched}
        {...props.input}
        {...props.custom}
        onChange={event => props.input.onChange(event.target.value)}
        style={{ margin: 10, minWidth: 191 }}
      >
        {props.children}
      </Select>
    </div>
  );
};

export const renderChipField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <div>
      <Chip label={label} {...input} {...custom} />
    </div>
  );
};

/*export const renderDropzoneInput = field => {
  const files = field.input.value;

  const style = {
    dropzone: {
      margin: "10px",
      width: "100% !important"
    },
    text: {
      padding: "20px"
    }
  };

  return (
    <div style={style.dropzone}>
      <Dropzone
        accept="application/zip"
        name={field.name}
        onDrop={filesToUpload => field.input.onChange(filesToUpload)}
      >
        <div style={style.text}>
          Drop '.zip' file here, or click to select files to upload.
        </div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error && <span className="error">{field.meta.error}</span>}
      {files &&
        Array.isArray(files) && (
          <ul>
            {files.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        )}
    </div>
  );
};
*/