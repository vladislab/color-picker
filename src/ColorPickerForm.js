import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default class ColorPickerForm extends Component {
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
    const { isPaletteFull } = this.props;

    return (
      <div>
        <ChromePicker color={currentColor} onChange={this.updateCurrentColor} />
        <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
          <TextValidator
            label="New Color Name"
            name="newColorName"
            value={newColorName}
            onChange={this.handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Enter a color name",
              "Name already exists",
              "Color is already used"
            ]}
          />
          <Button
            variant="contained"
            type="submit"
            style={{
              backgroundColor: isPaletteFull ? "grey" : currentColor
            }}
            disabled={isPaletteFull}
          >
            {isPaletteFull ? `Palette Full` : `Add Color`}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}
