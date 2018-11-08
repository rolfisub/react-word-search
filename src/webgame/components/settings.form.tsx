import * as React from "react";
import { Field, FieldArray, InjectedFormProps, reduxForm } from "redux-form";
import { WordsearchInput, WSDirections } from "../../lib/wordsearch/wordsearch";
import { isRequired } from "../common/ui.field.validators";
import { renderTextField } from "../common/render.fields";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { gameActionCreators } from "../redux/game.actions";

interface SettingsFormProps {
  newGame: () => void;
  saveConfig: (config: Partial<WordsearchInput>) => void;
}

class SettingsClass extends React.Component<
  SettingsFormProps & InjectedFormProps<WordsearchInput>
> {
  submit = values => {
    this.props.saveConfig(values);
  };

  render() {
    return (
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
            Save Config
          </Button>
          <Button
            color={"secondary"}
            variant={"contained"}
            onClick={this.props.newGame}
          >
            New Game
          </Button>
        </div>
      </form>
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
    saveConfig: (config: Partial<WordsearchInput>) => {
      dispatch(gameActionCreators.setConfig(config));
    },
    newGame: () => {
      dispatch(gameActionCreators.create());
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
