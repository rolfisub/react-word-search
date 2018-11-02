import * as React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Wordsearch, WordsearchInput } from "../../lib/wordsearch/wordsearch";
import { isRequired } from "../common/ui.field.validators";
import { renderTextField } from "../common/render.fields";

interface GenerateFormProps {
  ws: Wordsearch;
}

class GenerateForm extends React.Component<
  GenerateFormProps & InjectedFormProps<WordsearchInput>
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
            label={"Amount of words to generate"}
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


        </div>
      </form>
    );
  }
}
