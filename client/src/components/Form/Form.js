import React, { useEffect, useState } from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ setCurrentId, currentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  useEffect(() => {
    if (post) {
      const p = { ...post };
      p.tags = post?.tags?.join(', ') ?? '';
      setPostData(p);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { ...postData };
    post.tags = postData?.tags?.split(',')?.map(tag => tag.trim())?.filter(tag => tag?.length > 0) ?? [];
    if (currentId) {
      dispatch(updatePost(currentId, post));
    } else {
      dispatch(createPost(post));
    }
    handleClear();
  };

  const handleClear = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };
  
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>
          { currentId ? 'Editing' : 'Creating' } a Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(event) => {
            const creator = event.target.value;
            setPostData((current) => ({
              ...current,
              creator: creator
            }))
          }}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(event) => {
            const title = event.target.value;
            setPostData((current) => ({
              ...current,
              title: title
            }))
          }}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(event) => {
            const message = event.target.value;
            setPostData((current) => ({
              ...current,
              message: message
            }))
          }}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(event) => {
            const tags = event.target.value;
            setPostData((current) => ({
              ...current,
              tags: tags
            }))
          }}
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) => setPostData((current) => ({
              ...current,
              selectedFile: base64
            }))}
          />
        </div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>
          Submit
        </Button>
        <Button variant='contained' color='secondary' size='small' onClick={handleClear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
