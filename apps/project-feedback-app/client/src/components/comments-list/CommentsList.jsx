import { Fragment } from 'react';

import Comment from '@Components/comment/Comment.jsx';
import useComments from '@Hooks/useGetAllComments.js';

import styles from './_CommentsList.module.scss';

function Comments(props) {
  const { request } = props;
  const [comments] = useComments(request);
  const numberOfComments = comments?.results;

  const commentsList = comments?.data.map((el, i, arr) => (
    <Fragment key={el.id}>
      <Comment
        commentId={el.id}
        requestId={request.id}
        name={el.user.name}
        username={el.user.username}
        content={el.content}
        parent
        replyingTo={el.replyingTo}
        replies={el.replies}
      />
      {i === arr.length - 1 ? '' : <div className={styles.list__break} />}
    </Fragment>
  ));

  return (
    <div className={styles.list}>
      <h3>{numberOfComments} Comments</h3>
      {commentsList}
    </div>
  );
}

export default Comments;
