'use client';

import Select from 'react-select';
import styles from './Selector.module.scss';
import { useStructures } from '@/hooks/useStructures';

interface Props {
  values: string[];
  onChange: (changed: string[]) => void;
}

export default function StructureSelector({ values, onChange }: Props) {
  const { structures } = useStructures();

  const options = structures?.map((structure) => ({
    value: structure.name,
    label: structure.name,
  }));

  return (
    <Select
      classNames={{ control: () => styles.control, container: () => styles.container }}
      defaultValue={values.map((v) => ({ value: v, label: v }))}
      isMulti
      options={options}
      onChange={(s) => onChange(s.map((o) => o.value))}
    />
  );
}
