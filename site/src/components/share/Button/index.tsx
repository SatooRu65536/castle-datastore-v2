import { ComponentProps } from 'react';
import styles from './index.module.scss';

interface Props extends ComponentProps<'button'> {
  outline?: boolean;
  danger?: boolean;
}

export default function Button(props: Props) {
  const { children, className, outline, danger, ...rest } = props;

  return (
    <button
      className={`
        ${className}
        ${styles.button}
        ${outline && styles.outline}
        ${danger && styles.danger}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}
