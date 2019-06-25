import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem"
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem"
  },
  colorNameInput: {
    width: "100%",
    height: "70px"
  }
};
class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { newColorName: "", currentColor: "pink" };
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorUnique", value => {
      return this.props.colors.every(
        ({ color }) => color !== this.state.currentColor
      );
    });
    ValidatorForm.addValidationRule("isColorNameUnique", value => {
      return this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  updateCurrentColor = newColor => {
    this.setState({ currentColor: newColor.hex });
  };
  handleSubmit = () => {
    this.props.addNewColor(this.state.currentColor, this.state.newColorName);
    this.setState({ newColorName: "" });
  };
  render() {
    const { newColorName, currentColor } = this.state;
    const { isPaletteFull, classes } = this.props;

    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChange={this.updateCurrentColor}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
          <TextValidator
            label="New Color Name"
            name="newColorName"
            value={newColorName}
            variant="filled"
            margin="normal"
            onChange={this.handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Enter a color name",
              "Name already exists",
              "Color is already used"
            ]}
            className={classes.colorNameInput}
          />
          <Button
            variant="contained"
            type="submit"
            style={{
              backgroundColor: isPaletteFull ? "grey" : currentColor
            }}
            disabled={isPaletteFull}
            className={classes.addColor}
          >
            {isPaletteFull ? `Palette Full` : `Add Color`}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}
export default withStyles(styles)(ColorPickerForm);
