import styles from './_Location.module.scss';

type ElemProps = {
  bgRotation: string;
  illustration: string;
  title: string;
};

function Location(props: ElemProps): JSX.Element {
  const { title, illustration, bgRotation } = props;

  return (
    <div className={styles['quality']} data-testid="location">
      <div className={styles['image']}>
        <img src={illustration} alt="" />
        <div
          className={styles['bgCircle']}
          style={{ transform: `rotate(${bgRotation})` }}
          data-testid="background circle"
        />
      </div>
      <p className={styles['quality__title']}>{title}</p>
      <button type="button">see location</button>
    </div>
  );
}

export default Location;
