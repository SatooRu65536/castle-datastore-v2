import { ComponentProps } from 'react';
import styles from './index.module.scss';

type Props = ComponentProps<'textarea'>;

export default function TextArea(props: Props) {
  return <textarea className={styles.textarea} {...props} />;
}
