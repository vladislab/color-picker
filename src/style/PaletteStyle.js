export default {
  palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  color: {
    height: "90%"
  },
  goBack: {
    width: "20%",
    height: props => (props.showingFullPalette ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
    opacity: "1",
    backgroundColor: "gray",
    "& a": {
      color: "white",
      widows: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      borderRadius: "5px",
      border: "none",
      textDecoration: "none"
    }
  }
};
