import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import memoriesLogo from './images/memoriesLogo.png';
import useStyles from './styles';

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, currentId]);

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant="h2" align='center'>
          Memories
        </Typography>
        <img className={classes.image} src={memoriesLogo} alt="memories_logo" height={60} />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container className={classes.mainContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={ setCurrentId } />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form setCurrentId={ setCurrentId } currentId={ currentId } />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;