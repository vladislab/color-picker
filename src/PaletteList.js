import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import styles from "./style/PaletteListStyle";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = { openDeleteDialog: false, deletingID: "" };
  }
  gotoPalette = id => {
    this.props.history.push(`/palette/${id}`);
  };
  closeDeleteDialog = () => {
    this.setState({ openDeleteDialog: false });
  };
  openDeleteDialog = id => {
    this.setState({
      openDeleteDialog: !this.state.openDeleteDialog,
      deletingID: id
    });
  };
  handleDelete = () => {
    this.props.deletePalette(this.state.deletingID);
    this.closeDeleteDialog();
  };
  render() {
    const { palettes, classes, paletteName } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>Color Picker</h1>
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
                  handleClick={this.gotoPalette}
                  handleDelete={this.openDeleteDialog}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={this.state.openDeleteDialog}
          aria-labelledby="delete-dialog-title"
          onClose={this.closeDeleteDialog}
        >
          <DialogTitle id="delete-dialog-title">
            Delete this palette?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button onClick={this.closeDeleteDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);
