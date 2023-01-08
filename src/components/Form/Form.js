import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const initialData = {
  creator: '',
  title: '',
  message: '',
  tags: '',
  selectedFile: '',
};

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState(initialData);
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleCreatorChange = (evt) => {
    const newCreator = evt.target.value;
    setPostData((prevData) => {
      return {
        ...prevData,
        creator: newCreator,
      };
    });
  };

  const handleTitleChange = (evt) => {
    const newTitle = evt.target.value;
    setPostData((prevData) => {
      return {
        ...prevData,
        title: newTitle,
      };
    });
  };

  const handleMessageChange = (evt) => {
    const newMessage = evt.target.value;
    setPostData((prevData) => {
      return {
        ...prevData,
        message: newMessage,
      };
    });
  };

  const handleTagsChange = (evt) => {
    const newTags = evt.target.value.split(',');
    setPostData((prevData) => {
      return {
        ...prevData,
        tags: newTags,
      };
    });
  };

  const handleOnDone = ({ base64 }) => {
    setPostData((prevData) => {
      return {
        ...prevData,
        selectedFile: base64,
      };
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }

    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData(initialData);
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? 'Editint' : 'Creating'} a Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={handleCreatorChange}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleTitleChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={handleMessageChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={handleTagsChange}
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={handleOnDone} />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
