import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleLogout } from '@react-oauth/google';

import memoriesLogo from '../../images/memoriesLogo.png';
import useStyles from './styles';
import { LOGOUT } from '../../constants/actionTypes';
import { getUserDataFromToken } from '../../utilities';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserDataFromToken());
  }, [location]);

  const logout = () => {
    googleLogout();
    setUser(null);
    dispatch({ type: LOGOUT });
    history.push('/');
  };

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography component={Link} to='/' className={classes.heading} variant="h2" align='center'>
          Memories
        </Typography>
        <img className={classes.image} src={memoriesLogo} alt="memories_logo" height={60} />
      </div>
      <Toolbar className={classes.toolbar}>
        { user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>
              {user.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              { user.name }
            </Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="auth" variant="contained" color="primary">
            Sign In
          </Button>
        ) }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
