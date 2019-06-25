import React, { Component } from "react";
import PaletteMetaForm from "./PaletteMetaForm";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import className from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import styles from "./style/PaletteFormNavStyle";

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = { formShowing: false };
  }
  showForm = () => {
    this.setState({ formShowing: true });
  };
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  hideForm = () => {
    this.setState({ formShowing: false });
  };

  render() {
    const { classes, open, palettes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={className(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerOpen}
              edge="start"
              className={className(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" colors="inherit" noWrap>
              Create New Palette
            </Typography>
          </Toolbar>

          <div className={classes.navBtns}>
            <Link to="/">
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Go Back
              </Button>
            </Link>
            <Button
              variant="contained"
              color="default"
              onClick={this.showForm}
              className={classes.button}
            >
              Save Palette
            </Button>
          </div>
        </AppBar>
        {this.state.formShowing && (
          <PaletteMetaForm
            handleSubmit={this.props.handleSubmit}
            palettes={palettes}
            hideForm={this.hideForm}
          />
        )}
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(PaletteFormNav);
