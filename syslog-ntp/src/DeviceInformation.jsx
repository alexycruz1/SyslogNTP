import MUIDataTable from "mui-datatables";
import React from "react";
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({

});

class DeviceInformation extends React.Component {
    state = {
        deviceInformation_data: [],
    };

    componentDidMount() {       
        let temporaldata = [];
        temporaldata[0] = ["SEQ_prueba", "HOST_prueba", "PRIORITY_prueba", "DATE_prueba", "TIME_prueba",
                                    "MESSAGE_prueba"];

        this.setState({
            deviceInformation_data: temporaldata
        })
    };


    render() {
        const columns = [
            {
             name: "SEQ",
             options: {
              filter: true,
              sort: true,
              //display: false,
              //hint: "",
             }
            },
            {
             name: "HOST",
             options: {
              filter: true,
              sort: true,
             }
            },
            {
             name: "PRIORITY",
             options: {
              filter: true,
              sort: true,
             }
            },
            {
             name: "DATE",
             options: {
              filter: true,
              sort: true,
             }
            },
            {
             name: "TIME",
             options: {
              filter: true,
              sort: true,
             }
            },
            {
             name: "MESSAGE",
             options: {
              filter: true,
              sort: true,
             }
            },
           ];

        let options = {
            filterType: "dropdown",
            responsive: "scroll",
            rowHover: true,
            downloadOptions: {filename: 'DeviceInformation.csv', separator: ','},
            onRowsSelect: (rowsSelected, allRowsSelected) => {
              
            },
            onRowsDelete: (rowsDeleted, data) => {

            }, 
            onRowClick: (rowData, rowMeta, rowIndex) => {

            },
            onCellClick: (colData, cellMeta) => {

            },
        };

        return (
            <div>
            <MUIDataTable
                data={this.state.deviceInformation_data}
                columns={columns}
                options={options}
            />
            </div>
        );
    }
}


DeviceInformation.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DeviceInformation);
