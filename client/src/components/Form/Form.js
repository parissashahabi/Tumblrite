import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import tumblrite from "../../images/tumblriteAbbr.png";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <div className={classes.brandContainer}>
          <img src={tumblrite} alt="icon" height="80" />
        </div>
        <Typography variant="h6" align="center" className={classes.welcomeText}>
          اینجا هر کسی می‌تونه بنویسه! همین حالا حساب کاربری خودت را بساز و
          اولین پست خودت رو بذار.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" className={classes.title}>
          {currentId ? `ویرایش "${post.title}"` : "نوشتن پست جدید"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="عنوان را اینجا وارد کنید"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="هرچی دوست داری بنویس..."
          fullWidth
          multiline
          minRows={4}
          inputProps={{ maxLength: 240 }}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="افزودن تگ..."
          placeholder="تگ‌ها را با ویرگول (,) از هم جدا کنید."
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <Typography variant="body2" className={classes.imageTypography}>
            برای پست خود یک تصویر انتخاب کنید
          </Typography>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {currentId ? "ویرایش پست" : "انتشار پست"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          انصراف
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
