import React, {Component} from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UserService from "../../services/UserService";
import Grid from "@mui/material/Grid";
import {withStyles} from "@mui/styles";
import {styleSheet} from "../../pages/Registration/styles";
import Button from "@mui/material/Button";

class UserTable extends Component {
    constructor(props) {
        super(props);
        this.state={
            data: [],
            alert: false,
            message: ''
        }
    }


    getAllUsers = async () => {
        let res = await UserService.getAllUsers();
        if (res.status === 200) {
            this.setState({
                data: res.data
            });
        }
    }

    componentDidMount = async () => {
        await this.getAllUsers();
    }

    openDialog = () => {
        this.setState({
            open: true
        });
    };

    deleteById = async () => {
        let res = await UserService.removeUser(this.state.deleteId);
        if (res.status === 200) {
            await this.getAllUsers();
            this.setState({
                open: false
            });
        } else {
            console.log('can not')
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <>
                <div className={classes.container}>
                    <Grid container md={10} sm={11}>
                        <TableContainer component={Paper} sx={{maxHeight: 440}}>
                            <Table stickyHeader sx={{minWidth: 650}} size="small" aria-label="User Details">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Actions</TableCell>
                                        <TableCell align="center">Id</TableCell>
                                        <TableCell align="center">Full name</TableCell>
                                        <TableCell align="center">City</TableCell>
                                        <TableCell align="center">street</TableCell>
                                        <TableCell align="center">number</TableCell>
                                        <TableCell align="center">Zip code</TableCell>
                                        <TableCell align="center">lat</TableCell>
                                        <TableCell align="center">Long</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Username</TableCell>
                                        <TableCell align="center">Password</TableCell>
                                        <TableCell align="center">Phone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.data.map((row) => (
                                            <TableRow
                                            >
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton onClick={() => {
                                                            this.setState({deleteId: row.id})
                                                            this.openDialog()
                                                        }}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell>{`${row.name.firstname}` + ' ' + `${row.name.lastname}`}</TableCell>
                                                <TableCell>{row.address.city}</TableCell>
                                                <TableCell>{row.address.street}</TableCell>
                                                <TableCell>{row.address.number}</TableCell>
                                                <TableCell>{row.address.zipcode}</TableCell>
                                                <TableCell>{row.address.geolocation.lat}</TableCell>
                                                <TableCell>{row.address.geolocation.long}</TableCell>
                                                <TableCell>{row.email}</TableCell>
                                                <TableCell>{row.username}</TableCell>
                                                <TableCell>{row.password}</TableCell>
                                                <TableCell>{row.phone}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={() => {
                        this.setState({open: false})
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to Delete this User?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are You Sure You Want to Delete {this.state.deleteId}..!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({open: false})
                        }}>Cancel
                        </Button>
                        <Button onClick={this.deleteById} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default withStyles(styleSheet)(UserTable)