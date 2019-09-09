import MUIDataTable from "mui-datatables";
import React from "react";
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import InformationColor from '@material-ui/core/colors/grey';
import DebugColor from '@material-ui/core/colors/cyan';
import NoticeColor from '@material-ui/core/colors/green';
import WarningColor from '@material-ui/core/colors/yellow';
import ErrorColor from '@material-ui/core/colors/orange';
import CriticalColor from '@material-ui/core/colors/red';
import AlertColor from '@material-ui/core/colors/deepOrange';

const styles = theme => ({
    InformationButton: {
        margin: theme.spacing(1),
        color: theme.palette.getContrastText(InformationColor[500]),
        backgroundColor: InformationColor[500],
        '&:hover': {
            backgroundColor: InformationColor[700],
        },
    },
    DebugButton: {
        margin: theme.spacing(1),
        color: theme.palette.getContrastText(DebugColor[500]),
        backgroundColor: DebugColor[500],
        '&:hover': {
            backgroundColor: DebugColor[700],
        },
    },
    NoticeButton: {
        margin: theme.spacing(1),
        color: theme.palette.getContrastText(NoticeColor[500]),
        backgroundColor: NoticeColor[500],
        '&:hover': {
            backgroundColor: NoticeColor[700],
        },
    },
    WarningButton: {
        margin: theme.spacing(1),
        color: theme.palette.getContrastText(WarningColor[500]),
        backgroundColor: WarningColor[500],
        '&:hover': {
            backgroundColor: WarningColor[700],
        },
    },
    ErrorButton: {
        margin: theme.spacing(1),
        color: theme.palette.getContrastText(ErrorColor[500]),
        backgroundColor: ErrorColor[500],
        '&:hover': {
            backgroundColor: ErrorColor[700],
        },
    },
    CriticalButton: {
        margin: theme.spacing(1),
        color: theme.palette.getContrastText(CriticalColor[500]),
        backgroundColor: CriticalColor[500],
        '&:hover': {
            backgroundColor: CriticalColor[700],
        },
    },
    AlertButton: {
        margin: theme.spacing(1),
        color: theme.palette.getContrastText(AlertColor[500]),
        backgroundColor: AlertColor[500],
        '&:hover': {
            backgroundColor: AlertColor[700],
        },
    },
    input: {
      display: 'none',
    },
});

class DeviceInformation extends React.Component {
    state = {
        deviceInformation_data: [],
    };

    componentDidMount() {       
        let temporaldata = [];
        temporaldata[0] = ["SEQ_prueba", "HOST_prueba", "INFORMATION", "DATE_prueba", "TIME_prueba",
                                    "MESSAGE_prueba"];
        temporaldata[1] = ["SEQ_prueba", "HOST_prueba", "DEBUG", "DATE_prueba", "TIME_prueba",
                                    "MESSAGE_prueba"];
        temporaldata[2] = ["SEQ_prueba", "HOST_prueba", "NOTICE", "DATE_prueba", "TIME_prueba",
                                    "MESSAGE_prueba"];
        temporaldata[3] = ["SEQ_prueba", "HOST_prueba", "WARNING", "DATE_prueba", "TIME_prueba",
                                    "MESSAGE_prueba"];
        temporaldata[4] = ["SEQ_prueba", "HOST_prueba", "ERROR", "DATE_prueba", "TIME_prueba",
                                    "MESSAGE_prueba"];
        temporaldata[5] = ["SEQ_prueba", "HOST_prueba", "CRITICAL", "DATE_prueba", "TIME_prueba",
                                    "MESSAGE_prueba"];
        temporaldata[6] = ["SEQ_prueba", "HOST_prueba", "ALERT", "DATE_prueba", "TIME_prueba",
                                    "MESSAGE_prueba"];
        temporaldata[7] = ["SEQ_prueba", "HOST_prueba", "ALERT", "DATE_prueba", "TIME_prueba",
                                    "MESSAGE_prueba"];
        temporaldata[8] = ["SEQ_prueba", "HOST_prueba", "ALERT", "DATE_prueba", "TIME_prueba",
                                    "MESSAGE_prueba"];
        temporaldata[9] = ["SEQ_prueba", "HOST_prueba", "ALERT", "DATE_prueba", "TIME_prueba",
                                    "MESSAGE_prueba"];
        temporaldata[10] = ["SEQ_prueba", "HOST_prueba", "ALERT", "DATE_prueba", "TIME_prueba",
                                    "MESSAGE_prueba"];
        temporaldata[11] = ["SEQ_prueba", "HOST_prueba", "ALERT", "DATE_prueba", "TIME_prueba",
                                    "MESSAGE_prueba"];
        temporaldata[12] = ["SEQ_prueba", "HOST_prueba", "ALERT", "DATE_prueba", "TIME_prueba",
                                    "MESSAGE_prueba"];

        this.setState({
            deviceInformation_data: temporaldata
        })
    };


    render() {
        const { classes } = this.props;
        const columns = [
            {
             name: "SEQ",
             options: {
              filter: true,
              sort: true,
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
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                        <div>
                            {value === 'INFORMATION' ? (
                                <div>
                                    <Button variant="contained" color="secondary" className={classes.InformationButton}>
                                        {value}
                                    </Button>
                                </div>
                            ): (
                                <div>

                                </div>
                            )}
                            {value === 'DEBUG' ? (
                                <div>
                                    <Button variant="contained" color="secondary" className={classes.DebugButton}>
                                        {value}
                                    </Button>
                                </div>
                            ): (
                                <div>

                                </div>
                            )}
                            {value === 'NOTICE' ? (
                                <div>
                                    <Button variant="contained" color="secondary" className={classes.NoticeButton}>
                                        {value}
                                    </Button>
                                </div>
                            ): (
                                <div>

                                </div>
                            )}
                            {value === 'WARNING' ? (
                                <div>
                                    <Button variant="contained" color="secondary" className={classes.WarningButton}>
                                        {value}
                                    </Button>
                                </div>
                            ): (
                                <div>

                                </div>
                            )}
                            {value === 'ERROR' ? (
                                <div>
                                    <Button variant="contained" color="secondary" className={classes.ErrorButton}>
                                        {value}
                                    </Button>
                                </div>
                            ): (
                                <div>

                                </div>
                            )}
                            {value === 'CRITICAL' ? (
                                <div>
                                    <Button variant="contained" color="secondary" className={classes.CriticalButton}>
                                        {value}
                                    </Button>
                                </div>
                            ): (
                                <div>

                                </div>
                            )}
                            {value === 'ALERT' ? (
                                <div>
                                    <Button variant="contained" color="secondary" className={classes.AlertButton}>
                                        {value}
                                    </Button>
                                </div>
                            ): (
                                <div>

                                </div>
                            )}
                        </div>
                    );
                }
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
            responsive: "scrollFullHeight",
            selectableRows: 'none',
            rowHover: true,
            rowsPerPage: 8,
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
