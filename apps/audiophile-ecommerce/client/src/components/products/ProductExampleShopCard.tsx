import { Link } from 'react-router-dom';

import IconArrowRight from '@Svg/desktop/icon-arrow-right.svg';

import styles from './_ProductExampleShopCard.module.scss';

type ElemProps = {
  productImg: string;
  productName: string;
  productShopURL: string;
};

function ProductExampleShopCard(props: ElemProps): JSX.Element {
  const { productName, productImg, productShopURL } = props;

  return (
    <Link to={productShopURL} className={styles['card__shop__text']}>
      <div className={styles['card']} aria-label={`see all ${productName} shop`}>
        <div className={styles['card__bg']} />
        <img className={styles['card__img']} src={productImg} alt="" width="438px" height="380px" />
        <p className={styles['card__name']}>{productName}</p>
        <div className={styles['card__shop']}>
          <p className={styles['card__shop__text']}>shop</p>
          <img className={styles['card__shop__img']} src={IconArrowRight} alt="" width="8px" height="12px" />
        </div>
      </div>
    </Link>
  );
}

export default ProductExampleShopCard;
