import React from "react";
import { withStyles } from "@material-ui/styles";

import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)"
    }
  },
  boxContent: {
    position: "absolute",
    padding: "10px",
    width: "100%",
    left: "0px",
    bottom: "0px",
    color: "rgba(0,0,0,0.5)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between"
  },
  deleteIcon: {
    transition: "all 0.1s ease-in-out"
  }
};
function DraggableColorBox(props) {
  return (
    <div
      className={props.classes.root}
      style={{ backgroundColor: props.color }}
    >
      <div className={props.classes.boxContent}>
        <span>{props.name}</span>
        <span>
          <DeleteForeverRoundedIcon
            className={props.classes.deleteIcon}
            onClick={props.handleDelete}
          />
        </span>
      </div>
    </div>
  );
}
export default withStyles(styles)(DraggableColorBox);
