import ProductData from '@Data/Data.json';

import ProductExampleSeeCard from './ProductExampleSeeCard';

import styles from './_ProductExampleSeeCardList.module.scss';

type ElemProps = {
  currentProductId: number;
  appendClass?: string;
};

function ProductExampleSeeCardList(props: ElemProps): JSX.Element {
  const { appendClass, currentProductId } = props;

  const currentProduct = ProductData.find((product) => {
    return product.id === currentProductId;
  });

  const productItems = currentProduct?.others.map((others) => {
    const product = ProductData.find((products) => {
      return products.slug === others.slug;
    });

    if (!product) return false;

    return (
      <ProductExampleSeeCard
        key={product.productName}
        productImages={others.image}
        productTitle={others.productName}
        productCategory={product.category}
        productId={product.id}
      />
    );
  });

  return (
    <div className={`${styles['list']} ${appendClass}`} data-testid="product_example_see_card_list">
      {productItems}
    </div>
  );
}

export default ProductExampleSeeCardList;
