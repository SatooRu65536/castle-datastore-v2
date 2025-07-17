import { Edit } from '@/components/icons';
import styles from './index.module.scss';

export default function HowEdit() {
  return (
    <section className={styles.how_edit}>
      <h3>編集方法</h3>

      <ul>
        <li>
          <a href="/edit">編集ページ</a>から編集できます
        </li>
        <li>
          マーカーを選択し、
          <Edit className={styles.icon} /> を押すと選択できます
        </li>
        <li>地図上でダブルクリックすると新規追加します</li>
        <li>位置はマーカーをドラッグドロップすることでも変更できます</li>
      </ul>
    </section>
  );
}
