import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import IconMessage from '../../assets/svg/shared/icon-comments.svg';
import Tag from '../custom/tag/Tag';
import Upvote from '../custom/upvote/Upvote';

import styles from './_Roadmap.module.scss';

function Roadmap(props) {
  const { id, status, title, description, category, upvotes, comments } = props;

  return (
    <div className={`${styles.outerCard} ${styles[`outerCard--${status}`]}`}>
      <div className={styles.innerCard}>
        <div className={styles.innerCard__status}>
          <div className={`${styles.innerCard__bullet} ${styles[`innerCard__bullet--${status}`]}`} />
          <p>{`${status[0].toUpperCase()}${status.slice(1)}`}</p>
        </div>
        <Link to={`/feedback?requestId=${id}`} className={styles.innerCard__linkA}>
          <h3 className={styles.innerCard__title}>{title}</h3>
          <p className={styles.innerCard__content}>{description}</p>
        </Link>
        <Tag title={`${category[0].toUpperCase()}${category.slice(1)}`} disabled />
        <div className={styles.innerCard__UI}>
          <Upvote flexRow upvotes={upvotes} requestId={id} />
          <div className={styles.innerCard__comment}>
            <img src={IconMessage} alt="" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Roadmap.propTypes = {
  id: PropTypes.string,
  category: PropTypes.string,
  comments: PropTypes.number,
  description: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string,
  upvotes: PropTypes.number,
};

Roadmap.defaultProps = {
  id: undefined,
  category: undefined,
  comments: undefined,
  description: undefined,
  status: undefined,
  title: undefined,
  upvotes: undefined,
};

export default Roadmap;
