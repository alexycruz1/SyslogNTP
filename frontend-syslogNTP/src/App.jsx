import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DeviceInformation from './DeviceInformation.jsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
  },
  divider: {
    height: theme.spacing(2),
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      allData: [],
      selectedDevice: '',
      devices: [],
      intervalIsSet: false,
      deviceLogs: [],
    };
  }

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  };

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  };

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ allData: res.data }));
    
      let temporalDevices = [];
      for(let i = 0; i < this.state.allData.length; i++) {
        temporalDevices.push(this.state.allData[i].Host);
      };
      let uniqueDevices = [...new Set(temporalDevices)];

      for(let i = 0; i < uniqueDevices.length; i++) {
        uniqueDevices[i] = {label: uniqueDevices[i], value: i};
      };

      this.setState({
        devices: uniqueDevices,
      });
  };

  refreshComboBox = (name) => event => {
    this.setState({
      [name]: event.target.value,
    });

    let host = this.state.devices[event.target.value].label;
    let temporalLogs = [];
    let index = 0;
    for(let i = 0; i < this.state.allData.length; i++) {
      if(this.state.allData[i].Host === host) {
        temporalLogs[index] = [this.state.allData[i].Sequence + "", this.state.allData[i].Host + "", this.state.allData[i].Priority + "",
                                this.state.allData[i].Date + "", this.state.allData[i].Time + "", this.state.allData[i].Message + ""];
        index++;
      }
    }

    this.setState({
      deviceLogs: temporalLogs,
    });
  };

  render () {
    return (
      <div>
        <Container>
          <Grid>
            <TextField
              id="outlined-select-country"
              label="Select a Device:"
              fullWidth
              select
              value={this.state.selectedDevice}
              onChange={this.refreshComboBox('selectedDevice')}
            >
              {this.state.devices.map((option, index) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Container>
              
        <Container>
          <DeviceInformation deviceInformation = {this.state.deviceLogs}/>
        </Container>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
