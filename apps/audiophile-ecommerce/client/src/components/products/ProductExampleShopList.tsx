import ProductExampleShopCard from './ProductExampleShopCard';

import styles from './_ProductExampleShopList.module.scss';

const productsList = [
  {
    id: 1,
    image: '/img/shared/desktop/image-category-thumbnail-headphones.png',
    name: 'headphones',
    productShopURL: '/headphones',
  },
  {
    id: 2,
    image: '/img/shared/desktop/image-category-thumbnail-speakers.png',
    name: 'speakers',
    productShopURL: '/speakers',
  },
  {
    id: 3,
    image: '/img/shared/desktop/image-category-thumbnail-earphones.png',
    name: 'earphones',
    productShopURL: '/earphones',
  },
];

type ElemProps = {
  appendClass?: string;
};

function ProductExampleShopList(props: ElemProps): JSX.Element {
  const { appendClass } = props;

  const productItems = productsList.map((el) => {
    return (
      <ProductExampleShopCard
        key={el.id}
        productName={el.name}
        productImg={el.image}
        productShopURL={el.productShopURL}
      />
    );
  });

  return (
    <div className={`${styles['list']} ${appendClass}`} data-testid="product_example_shop_list">
      {productItems}
    </div>
  );
}

export default ProductExampleShopList;
