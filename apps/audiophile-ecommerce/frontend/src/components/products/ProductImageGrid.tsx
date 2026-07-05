import styles from './_ProductImageGrid.module.scss';

type ElemProps = {
  productImagesGallery: Record<string, { desktop: string; mobile: string; tablet: string }>;
  productTitle: string;
  appendClass?: string;
};

function ProductImageGrid(props: ElemProps): JSX.Element {
  const { appendClass, productImagesGallery, productTitle } = props;

  const images = Object.values(productImagesGallery);

  const productImages = images.map((img, i) => {
    return (
      <picture className={styles[`gridArea${i + 1}`]} key={img.desktop}>
        <source srcSet={img.desktop} media="(min-width: 1024px)" />
        <source srcSet={img.tablet} media="(min-width: 481px)" />
        <source srcSet={img.mobile} media="(max-width: 480px)" />
        <img className={styles['grid__img']} src={img.desktop} alt={`${productTitle} being used`} />
      </picture>
    );
  });

  return (
    <div className={`${styles['grid']} ${appendClass}`} data-testid="product_image_grid">
      {productImages}
    </div>
  );
}

export default ProductImageGrid;
