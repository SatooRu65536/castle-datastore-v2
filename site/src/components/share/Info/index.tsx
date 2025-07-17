import { Warn as WarnIcon } from '@/components/icons';
import { HTMLProps } from 'react';
import styles from './index.module.scss';

type Props = HTMLProps<HTMLDivElement>;

export default function Warn(props: Props) {
  const { children } = props;

  return (
    <div className={styles.info}>
      <WarnIcon className={styles.icon} />
      <p>{children}</p>
    </div>
  );
}
