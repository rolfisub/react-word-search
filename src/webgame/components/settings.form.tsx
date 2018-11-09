import * as React from "react";
import { Field, FieldArray, InjectedFormProps, reduxForm } from "redux-form";
import { WordsearchInput, WSDirections } from "../../lib/wordsearch/wordsearch";
import { isRequired } from "../common/ui.field.validators";
import { renderTextField } from "../common/render.fields";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { gameActionCreators } from "../redux/game.actions";

interface SettingsFormProps {
  newGame: (config: Partial<WordsearchInput>) => void;
}

class SettingsClass extends React.Component<
  SettingsFormProps & InjectedFormProps<WordsearchInput>
> {
  submit = values => {
    this.props.newGame(values);
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <form onSubmit={this.props.handleSubmit(this.submit)}>
          <div>
            <h2>Game Settings</h2>
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
                return null;
              }}
            />
            <Button color={"primary"} variant={"contained"} type={"submit"}>
              New Game
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    initialValues: state.reducers.GameReducer.current.config
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    ...props,
    newGame: async (config: Partial<WordsearchInput>) => {
      await dispatch(gameActionCreators.setConfig(config));
      await dispatch(gameActionCreators.create());
    }
  };
};

const SettingsForm = reduxForm({
  form: "SettingsForm",
  enableReinitialize: true
})(SettingsClass);

export const SettingsReduxForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsForm);
