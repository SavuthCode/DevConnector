import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLike,removeLike, deletePost } from '../../actions/post';
import { Link } from "react-router-dom";
const PostItem = ({addLike, removeLike, deletePost, auth,post:{ _id,text,name,avatar,user,like,comments,date}, showActions}) => {
  return (

        <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                Posted on {date}
            </p>

            {showActions && (
            <Fragment>
              <button onClick={e=>addLike(_id)} type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i>
              {like.length > 0 &&(
                <span>{like.length}</span>
              )} 
            </button>
            <button  onClick={e=>removeLike(_id)} type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} class="btn btn-primary">
              Discussion {comments.length > 0 &&(
               <span class='comment-count'>{comments.length}</span>
              )}
              
            </Link>
            {!auth.loading && user=== auth.user._id &&(
              <button      
                type="button"
                onClick={e =>deletePost(_id)}
                class="btn btn-danger"
                >
                <i class="fas fa-times"></i>
              </button>
            )}
            </Fragment>)}
          </div>
        </div>
  )
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  auth: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state =>({
  auth: state.auth
})

export default connect(mapStateToProps,{addLike, removeLike, deletePost, deletePost})(PostItem);
