import { Component } from "react";
import { Box, Typography, withStyles } from "@material-ui/core";
import logo from "../src/images/covid-19.jpg";
import Cards from "./components/Cards";
import Countries from "./components/Countries";
import Chart from "./components/Chart";
import { fetchData } from "./service/api";

const style = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  header: {
    background: "#F5F5F5",
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    padding: 10,
    color: "#777",
    marginBottom: 20,
  },
  lastUpdated: {
    color: "#777",
    fontSize: 20,
    fontWeight: 100,
    marginBottom: 20,
  },
  ImageContainer: {
    width: 500,
    boxShadow: "0 3px 5px rgba(0, 0, 0, 0.)",
    borderRadius: 10,
  },
};

class App extends Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
    console.log(fetchedData);
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
    console.log(fetchedData);
  };

  render() {
    const { data } = this.state;
    return (
      <Box className={this.props.classes.container}>
        <Box className={this.props.classes.header}>Covid-19 Dashboard</Box>
        <Typography className={this.props.classes.lastUpdated}>
          Last Updated:
          {data.lastUpdate && new Date(data.lastUpdate).toDateString()}
        </Typography>
        <img
          className={this.props.classes.ImageContainer}
          src={logo}
          alt="covid"
        />
        <Cards data={data} />
        <Countries handleCountryChange={this.handleCountryChange} />
        <Chart data={data} />
      </Box>
    );
  }
}

export default withStyles(style)(App);
