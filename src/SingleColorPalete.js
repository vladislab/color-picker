import React, { Component } from "react";
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./style/PaletteStyle";

class SingleColorPalete extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShade(this.props.palette, this.props.colorId);
    this.state = { format: "hex" };
  }
  gatherShade = (palette, colorId) => {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorId)
      );
    }
    return shades.slice(1);
  };
  changeFormat = val => {
    this.setState({ format: val });
  };

  render() {
    const { classes } = this.props;
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={`${classes.palette}`}>
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className={`${classes.color}`}>
          {colorBoxes}
          <div className={`${classes.goBack}`}>
            <Link to={`/palette/${id}`}>GO BACK</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
export default withStyles(styles)(SingleColorPalete);
