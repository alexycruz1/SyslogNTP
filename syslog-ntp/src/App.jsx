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
      selectedDevice: '',
      devices: [{label: "Device example #1", value: "1"}, {label: "Device example #2", value: "2"}],
    };
  }

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
