'use client';

import { useTags } from '@/hooks/useTags';
import Select, { MultiValue } from 'react-select';
import { Uuid } from '~api/index.dto';
import styles from './TagSelector.module.scss';

interface Props {
  onChange?: (
    newValue: MultiValue<{
      value: Uuid;
      label: string;
    }>,
  ) => void;
}

export default function TagSelector({ onChange }: Props) {
  const { tags } = useTags();

  const options = tags?.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  return (
    <Select
      classNames={{ control: () => styles.control, container: () => styles.container }}
      isMulti
      options={options}
      onChange={onChange}
    />
  );
}
