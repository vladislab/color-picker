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

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  navBtns: {
    marginRight: "1rem",
    "& a": {
      textDecoration: "none"
    }
  },
  button: {
    margin: "0 0.5rem"
  }
});

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
              className={className(classes.menuButton, open && classes.hide)}
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
          />
        )}
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(PaletteFormNav);
