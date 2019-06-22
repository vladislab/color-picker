import React, { Component } from "react";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import "./Palette.css";

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
  }
  changeLevel = level => {
    this.setState({ level: level });
  };
  changeFormat = val => {
    this.setState({ format: val });
  };
  render() {
    const { colors } = this.props.palette;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox background={color[format]} name={color.name} />
    ));
    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />
        {/* NavBar goes here */}
        <div className="Palette-colors">{colorBoxes}</div>
        {/* Footer later */}
      </div>
    );
  }
}
