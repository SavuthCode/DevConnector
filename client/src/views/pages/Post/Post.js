import React, { Fragment, useEffect } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getPost } from '../../../actions/post';
import Spinner from '../layout/spinner';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './commentForm';
import CommentItem from './commentItem';
const Post = ({getPost, post:{post, loading }, match }) => {
  useEffect(() =>{
    getPost(match.params.id);
  },[getPost]);

  return loading && post===   null ? ( <Spinner/> ):(<Fragment>
    <Link to="/posts" className="btn">
      Back to Post
    </Link>
    <PostItem post={post} showActions={false} />
    <CommentForm postId={post._id}/>

    <div className="comments">
      {post.comments.map(comment =>(
        <CommentItem key={comment.id} comment={comment} postId={post._id} />
      ))}
    </div>
  </Fragment>
  )}

Post.propTypes= {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps,{getPost})(Post);
