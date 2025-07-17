import Warn from '@/components/share/Info';
import styles from './index.module.scss';

export default function About() {
  return (
    <section className={styles.about}>
      <h3>Castle Datastore</h3>
      <div>
        <p>Castle Datastore は日本の城の情報をまとめたサイトです。</p>
        <p>城をマップから探すこともできます。</p>
        <p>※ 全ての城が掲載されているわけではありません。</p>

        <Warn>
          現在制作中のため、変更内容はリリース前にリセットされます。
          <br />
          いくらでも変更して頂いて構いません。
        </Warn>
      </div>
    </section>
  );
}
