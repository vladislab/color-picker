import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

export default class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = { stage: "openPaletteName", newPaletteName: "" };
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
  showEmoji = () => {
    this.setState({ stage: "openEmoji" });
  };
  savePalette = emoji => {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    };
    this.props.handleSubmit(newPalette);
    this.setState({ stage: "" });
  };
  render() {
    const { newPaletteName, stage } = this.state;
    const { hideForm } = this.props;
    return (
      <div>
        <Dialog open={stage === "openEmoji"} onClose={hideForm}>
          <DialogTitle id="form-dialog-title">
            Pick an Emoji for your palette
          </DialogTitle>
          <Picker onSelect={this.savePalette} />
        </Dialog>
        <Dialog
          open={stage === "openPaletteName"}
          aria-labelledby="form-dialog-title"
          onClose={hideForm}
        >
          <DialogTitle id="form-dialog-title">
            Choose a name for your palette
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmoji} instantValidate={false}>
            <DialogContent>
              <DialogContentText>
                Palette name must be unique!
              </DialogContentText>
              <TextValidator
                autoFocus
                label="Palette Name"
                name="newPaletteName"
                value={newPaletteName}
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter Name", "Palette Name Taken"]}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" type="submit" color="secondary">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}
