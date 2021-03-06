import React, { Component } from "react";
import className from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import styles from "./style/NewPaletteFormStyle";
import seedColors from "./seedColors";

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colors: seedColors[0].colors
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = (color, name) => {
    const newColor = {
      color: color,
      name: name
    };
    this.setState({ colors: [...this.state.colors, newColor], newName: "" });
  };
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = newPalette => {
    newPalette.id = newPalette.paletteName
      .toLocaleLowerCase()
      .replace(/ /g, "-");
    newPalette.colors = this.state.colors;

    this.props.savePalette(newPalette);
    this.props.history.push("/");
  };
  handleDelete = colorName => {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    });
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };

  clearColors = () => {
    this.setState({ colors: [] });
  };
  addRandomColor = () => {
    let allColors = this.props.palettes.map(p => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicate = true;
    while (isDuplicate) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicate = this.state.colors.some(
        color => color.name === randomColor.name
      );
    }
    this.setState({ colors: [...this.state.colors, randomColor] });
  };
  render() {
    const { classes, theme, maxColors, palettes } = this.props;
    const { open, colors } = this.state;

    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>

          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearColors}
                className={classes.button}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.addRandomColor}
                disabled={colors.length >= maxColors}
                className={classes.button}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              addNewColor={this.addNewColor}
              isPaletteFull={colors.length >= maxColors}
              colors={colors}
            />
          </div>
        </Drawer>
        <main
          className={className(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            removeColor={this.handleDelete}
            axis="xy"
            onSortEnd={this.onSortEnd}
            distance={20}
          />
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
