import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DeviceInformation from './DeviceInformation.jsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      selectedDevice: '',
      devices: [{label: "Device example #1", value: "1"}, {label: "Device example #2", value: "2"}],
      intervalIsSet: false,
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
      .then((res) => this.setState({ data: res.data }));
    
      console.log(this.state.data);
  };

  /*putDataToDB = (Sequence, Host, Priority, Date, Time, Message) => {
    axios.post('http://localhost:3001/api/putData', {
      Sequence: Sequence,
      Host: Host,
      Priority: Priority,
      Date: Date,
      Time: Time,
      Message: Message,
    });
  };*/

  refreshComboBox = (name) => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render () {
    return (
      <div>
        <Container>
          <Grid xs={12} sm={12} md={6}>
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
          <DeviceInformation />
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
