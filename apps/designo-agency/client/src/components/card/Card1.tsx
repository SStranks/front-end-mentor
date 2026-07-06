import { Link } from 'react-router-dom';

import IconArrowRight from '#Svg/desktop/icon-right-arrow.svg';

import styles from './_Card1.module.scss';

type ElemProps = {
  image: string;
  title: string;
  url: string;
};

function Card1(props: ElemProps): JSX.Element {
  const { title, image, url } = props;

  return (
    <Link to={url}>
      <div className={styles['card']} style={{ backgroundImage: `url(${image})` }} data-testid="Card1">
        <h2>{title}</h2>
        <div className={styles['card__view']}>
          <p>view projects</p>
          <img src={IconArrowRight} alt="" />
        </div>
      </div>
    </Link>
  );
}

export default Card1;
