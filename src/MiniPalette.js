import React, { PureComponent } from "react";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { withStyles } from "@material-ui/styles";
import styles from "./style/MiniPaletteStyle";

class MiniPalette extends PureComponent {
  deletePalette = e => {
    e.stopPropagation();
    this.props.handleDelete(this.props.id);
  };
  render() {
    const { classes, paletteName, emoji, colors, id } = this.props;
    console.log(paletteName);
    const miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    ));
    return (
      <div className={classes.root} onClick={() => this.props.handleClick(id)}>
        <DeleteForeverRoundedIcon
          className={classes.deleteIcon}
          style={{ transition: "all 0.3s ease-in-out" }}
          onClick={this.deletePalette}
        />

        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
