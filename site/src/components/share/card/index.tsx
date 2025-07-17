import { HTMLProps, ReactNode } from 'react';
import styles from './index.module.scss';

type Props = {
  children: ReactNode;
} & HTMLProps<HTMLDivElement>;

export default function Card({ children, className, ...others }: Props) {
  return (
    <div className={`${styles.card} ${className}`} {...others}>
      {children}
    </div>
  );
}
