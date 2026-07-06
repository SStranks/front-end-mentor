import formatCurrency from '#Utils/formatCurrency';

import styles from './_CheckoutSummaryProductCard.module.scss';

type ElemProps = {
  productImg: string;
  productPrice: number;
  productQuantity: number;
  productTitle: string;
};

function CheckoutSummaryProductCard(props: ElemProps): JSX.Element {
  const { productImg, productTitle, productPrice, productQuantity } = props;

  return (
    <div className={styles['card']} data-testid="checkout_summary_product_card">
      <img className={styles['card__img']} src={productImg} alt={productTitle} />
      <p className={styles['card__title']}>{productTitle}</p>
      <p className={styles['card__price']}>$ {formatCurrency(productPrice)}</p>
      <p className={styles['card__quantity']}>x{productQuantity}</p>
    </div>
  );
}

export default CheckoutSummaryProductCard;
