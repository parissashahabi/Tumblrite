import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import ShareIcon from "@mui/icons-material/Share";
import { RWebShare } from "react-web-share";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Menu from "@mui/material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";

import { likePost, deletePost } from "../../../actions/posts";
import useStyles from "./styles";
import FromNow from "../FromNow";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <FavoriteIcon fontSize="small" />
          &nbsp;
          {post.likes.length}
        </>
      ) : (
        <>
          <FavoriteBorderOutlinedIcon fontSize="small" />
          &nbsp;{post.likes.length}
        </>
      );
    }

    return (
      <>
        <FavoriteBorderOutlinedIcon fontSize="small" />
        &nbsp;{post.likes.length}
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button style={{ color: "white" }} size="small" onClick={handleClick}>
            <MoreVertIcon fontSize="medium" />
          </Button>
        )}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => setCurrentId(post._id)}>
            <EditIcon fontSize="small" className={classes.svg} />
            &nbsp; ویرایش
          </MenuItem>
          <MenuItem onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" className={classes.svg} />
            &nbsp; حذف پست
          </MenuItem>
        </Menu>
      </div>
      <div className={classes.overlay2}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="subtitle2">{FromNow(post.createdAt)}</Typography>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
          disabled={!user?.result}
        >
          {/* <FavoriteIcon fontSize="small" />
          &nbsp;{post.likes.length}{" "} */}
          <Likes />
        </Button>
        <RWebShare
          data={{
            text: `${post.message}`,
            url: `http://localhost:3000/${post._id}`,
            title: `${post.title}`,
          }}
        >
          <Button size="small" color="primary">
            <ShareIcon fontSize="small" />
            &nbsp;اشتراک‌گذاری
          </Button>
        </RWebShare>
      </CardActions>
    </Card>
  );
};

export default Post;
