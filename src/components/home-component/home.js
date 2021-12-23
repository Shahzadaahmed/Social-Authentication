// Note: Home component...!

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Avatar, makeStyles } from '@material-ui/core';
import { logoutUser } from "../../store/action/auth-actions";
import "../ui/style.css";

// Note: handeling Material UI styling here...!
const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginBottom: theme.spacing(2)
    },
}));

const Home = () => {

    // Note: To access Material UI css...!
    const classes = useStyles();

    // Note: Handeling redux here...!
    const dispatch = useDispatch();

    // Note: Function to logout user...!
    const logout = () => {
        dispatch(logoutUser());
    }

    let authenticatedUser = useSelector(({ users }) => { return users.authenticatedUser });
    let { name, userProfileImage } = authenticatedUser;
    // console.log(authenticatedUser);

    return (
        <React.Fragment>
            <div className="container">
                <Avatar alt={name} src={userProfileImage} className={classes.large} />
                <h1 className="heading"> {`Hi ${name}, Welcome to Home!`} </h1>
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={logout}
                    style={{
                        marginTop: '1.3em',
                        textTransform: "capitalize",
                        borderStyle: "solid",
                        borderColor: "white",
                        borderWidth: 1
                    }}
                >
                    Logout
                </Button>
            </div>
        </React.Fragment>
    );
}

export default Home;