import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import styles from "./style/PaletteListStyle";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class PaletteList extends Component {
  gotoPalette = id => {
    this.props.history.push(`/palette/${id}`);
  };
  render() {
    const { palettes, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Color</h1>
            <Link to="/palette/new">
              <Button variant="contained" color="primary">
                Create New Palette
              </Button>
            </Link>
          </nav>

          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                <MiniPalette
                  id={palette.id}
                  key={palette.id}
                  {...palette}
                  handleClick={() => this.gotoPalette(palette.id)}
                  handleDelete={this.props.deletePalette}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);
