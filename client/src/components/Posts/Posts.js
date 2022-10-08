import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { isLoading, posts } = useSelector((state) => state.postsData);
  
  return (
    isLoading
      ? (<Grid container justifyContent='center'>
        <CircularProgress />
      </Grid>)
      : (<Grid container className={classes.container} alignItems='stretch' spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>)
  );
};

export default Posts;
