import React, { useMemo } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';
import { getUserDataFromToken } from '../../../utilities';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = getUserDataFromToken();

  const Likes = useMemo(() => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.likes, user?.id]);

  const isPostedByLoggedInUser = useMemo(() => {
    return (user?.id === post.creatorId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.creatorId, user?.id]);
  
  return (
    <Card className={classes.card}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.creatorName}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(isPostedByLoggedInUser) && <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize='medium' />
          </Button>
        </div>}
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
        </CardContent>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CardActions className={classes.cardActions}>
          <Button size="small" color='primary' onClick={() => dispatch(likePost(post._id))} disabled={!user?.id}>
            { Likes }
          </Button>
          {(isPostedByLoggedInUser) && <Button size="small" color='secondary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small' /> Delete
          </Button>}
        </CardActions>
      </div>
    </Card>
  );
};

export default Post;
