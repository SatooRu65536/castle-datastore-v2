import { ComponentProps } from 'react';
import styles from './index.module.scss';

export default function Input(props: ComponentProps<'input'>) {
  const { type, className, ...rest } = props;

  return <input type={type} className={`${styles.input} ${className}`} {...rest} />;
}
