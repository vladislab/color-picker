import React from "react";
import { withStyles } from "@material-ui/styles";
import { SortableElement } from "react-sortable-hoc";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import styles from "./style/DraggableColorBoxStyle";

const DraggableColorBox = SortableElement(props => {
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
});
export default withStyles(styles)(DraggableColorBox);
