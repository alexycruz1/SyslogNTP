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
    constructor(props) {
        super(props);
        this.state = { 
          
        };
      }


    render() {
        const { classes } = this.props;
        const columns = [
            {
             name: "SEQUENCE",
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
                            {value === '6' ? (
                                <div>
                                    <Button variant="contained" color="secondary" className={classes.InformationButton}>
                                        INFORMATION
                                    </Button>
                                </div>
                            ): (
                                <div>

                                </div>
                            )}
                            {value === '7' ? (
                                <div>
                                    <Button variant="contained" color="secondary" className={classes.DebugButton}>
                                        DEBUG
                                    </Button>
                                </div>
                            ): (
                                <div>

                                </div>
                            )}
                            {value === '5' ? (
                                <div>
                                    <Button variant="contained" color="secondary" className={classes.NoticeButton}>
                                        NOTICE
                                    </Button>
                                </div>
                            ): (
                                <div>

                                </div>
                            )}
                            {value === '4' ? (
                                <div>
                                    <Button variant="contained" color="secondary" className={classes.WarningButton}>
                                        WARNING
                                    </Button>
                                </div>
                            ): (
                                <div>

                                </div>
                            )}
                            {value === '3' ? (
                                <div>
                                    <Button variant="contained" color="secondary" className={classes.ErrorButton}>
                                        ERROR
                                    </Button>
                                </div>
                            ): (
                                <div>

                                </div>
                            )}
                            {value === '2' ? (
                                <div>
                                    <Button variant="contained" color="secondary" className={classes.CriticalButton}>
                                        CRITICAL
                                    </Button>
                                </div>
                            ): (
                                <div>

                                </div>
                            )}
                            {value === '1' ? (
                                <div>
                                    <Button variant="contained" color="secondary" className={classes.AlertButton}>
                                        ALERT
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
            rowsPerPage: 20,
            rowsPerPageOptions: [],
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
                data={this.props.deviceInformation}
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
