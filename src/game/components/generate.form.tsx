import * as React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Wordsearch, WordsearchInput } from "../wordsearch/wordsearch";

interface GenerateFormProps {
  ws: Wordsearch;
}

class GenerateForm extends React.Component<
  GenerateFormProps & InjectedFormProps<WordsearchInput>
> {
  
}
