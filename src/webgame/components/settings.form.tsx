import * as React from "react";
import { Field, FieldArray, InjectedFormProps, reduxForm } from "redux-form";
import {
  Wordsearch,
  WordsearchInput,
  WSDirections
} from "../../lib/wordsearch/wordsearch";
import { isRequired } from "../common/ui.field.validators";
import { renderTextField } from "../common/render.fields";

interface SettingsFormProps {
  ws: Wordsearch;
}

class SettingsForm extends React.Component<
  SettingsFormProps & InjectedFormProps<WordsearchInput>
> {
  submit = values => {
    console.log(values);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.submit)}>
        <div>
          <Field
            name={"size"}
            label={"Game Size"}
            required={true}
            validate={[isRequired]}
            component={renderTextField as any}
          />
          <Field
            name={"wordsConfig.amount"}
            label={"Amount of words to Settings"}
            required={true}
            validate={[isRequired]}
            component={renderTextField as any}
          />
          <Field
            name={"wordsConfig.minLength"}
            label={"Minimum word length"}
            required={true}
            validate={[isRequired]}
            component={renderTextField as any}
          />
          <Field
            name={"wordsConfig.maxLength"}
            label={"Maximum word length"}
            required={true}
            validate={[isRequired]}
            component={renderTextField as any}
          />
          <FieldArray
            name={"allowedDirections"}
            props={{ options: WSDirections }}
            component={props => {
              console.log(props);
              return null;
            }}
          />
        </div>
      </form>
    );
  }
}
/*
const mapStateToProps = (state, props) => {

};*/

export const SettingsReduxForm = reduxForm({
  form:'SettingsForm',
  enableReinitialize: true
})(SettingsForm);
