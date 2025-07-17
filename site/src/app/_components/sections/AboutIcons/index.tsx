import Card from '@/components/share/card';
import styles from './index.module.scss';
import { SCALE_MAP } from '@/consts/scales';

export default function AboutIcons() {
  return (
    <Card className={styles.about_icon}>
      <h3>アイコンについて</h3>

      <div className={styles.box}>
        {SCALE_MAP.map((item) => (
          <div className={styles.icon_box} key={item.scale}>
            <img src={item.img.src} alt="城アイコン" />
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
