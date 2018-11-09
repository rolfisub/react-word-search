import * as React from "react";
import { Grid } from "@material-ui/core";
import { Board } from "./board";
import { Controls } from "./controls";
import { Words } from "./words";
import { SettingsReduxForm } from "./settings.form";

export const Layout = () => (
  <Grid container>
    <Grid item xs={12}>
      <Board />
    </Grid>
    <Grid item xs={12}>
      <Controls />
    </Grid>
    <Grid item xs={12}>
      <Words />
    </Grid>
    <Grid item xs={12}>
      <SettingsReduxForm />
    </Grid>
  </Grid>
);
