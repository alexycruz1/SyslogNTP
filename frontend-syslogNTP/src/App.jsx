import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DeviceInformation from './DeviceInformation.jsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
const io = require("socket.io-client");

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
    this.socket = null;
    this.state = { 
      allData: [],
      selectedDevice: '',
      devices: [],
      intervalIsSet: false,
      deviceLogs: [],
    };
  }

  componentDidMount() {

    this.getDevices();
    const socket = io.connect("http://localhost:3001/");
    socket.on("get-devices", (data) => {
      console.log(data);
      this.setState({
        devices: data.devices
      })
    });
    // if (!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getDataFromDb, 1000);
    //   this.setState({ intervalIsSet: interval });
    // }
  };

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  };

  getDevices = () => {
    fetch('http://localhost:3001/api/listDevices')
      .then((data) => data.json())
      .then((res) => this.setState({ devices: res.devices }));
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
    console.log(event.target.value)
    if (this.socket !== null) {
      this.socket.disconnect();
    }

    this.socket = io.connect(`http://localhost:3001/${event.target.value}`)
    this.socket.on("log-data", (data) => {
      console.log(data)
      this.setState({
        selectedDevice: event.target.value,
        deviceLogs: data.map(_log => {
          return [_log.Sequence + "", _log.Host + "", _log.Priority + "",
                  _log.Date + "", _log.Time + "", _log.Message + ""]
        })
      })
    });
    this.socket.on("new-log", _log => {
      console.log(_log)
      this.setState(state => {
        const logs = state.deviceLogs.push([_log.Sequence + "", _log.Host + "", _log.Priority + "",
        _log.Date + "", _log.Time + "", _log.Message + ""]);
        return (logs)
      })
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
                <MenuItem key={option} value={option}>
                  {option}
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
