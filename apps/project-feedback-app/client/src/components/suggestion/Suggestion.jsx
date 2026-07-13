import { Link } from 'react-router-dom';

import Tag from '@Components/custom/tag/Tag';
import Upvote from '@Components/custom/upvote/Upvote';
import IconMessage from '@Svg/shared/icon-comments.svg';

import styles from './_Suggestion.module.scss';

function Suggestion(props) {
  const { id, upvotes, title, description, category, active, comments } = props;

  return (
    <div className={styles.item} key={id}>
      <Upvote upvotes={upvotes} requestId={id} />
      <Link to={`/feedback?requestId=${id}`}>
        <div className={styles.item__suggestion}>
          <h3>{title}</h3>
          <p>{description}</p>
          <Tag title={`${category[0].toUpperCase()}${category.slice(1)}`} active={active} />
        </div>
      </Link>
      <div className={styles.item__comment}>
        <img src={IconMessage} alt="" />
        <span className={comments ? '' : `${styles.noComments}`}>{comments}</span>
      </div>
    </div>
  );
}

export default Suggestion;
