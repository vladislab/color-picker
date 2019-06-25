import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, newPaletteName: "" };
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
      return this.props.palettes.every(
        palette => palette.paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    const { newPaletteName } = this.state;
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Choose a name for your palette
        </DialogTitle>
        <ValidatorForm
          onSubmit={() => this.props.handleSubmit(newPaletteName)}
          instantValidate={false}
        >
          <DialogContent>
            <DialogContentText>Palette name must be unique!</DialogContentText>

            <TextValidator
              label="Palette Name"
              name="newPaletteName"
              value={this.state.newPaletteName}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Name", "Palette Name Taken"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" type="submit" color="secondary">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}
