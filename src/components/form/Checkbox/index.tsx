import React from 'react'
import { CheckIconBold } from '../../icons/CheckIconBold'
import styles from './styles.module.scss'

interface CheckboxProps {
  value: string,
  label: string,
  checked: boolean,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
}

export const Checkbox:React.FC<CheckboxProps> = ({ value, label, checked, onChange }) => (
  <label className={styles.checkbox}>
    <input
      type='checkbox'
      className={styles.input}
      checked={checked}
      value={value}
      onChange={onChange}
    />
    <span className={styles.text}>
      <span className={styles[checked ? 'iconChecked' : 'icon']}>
        {checked && <CheckIconBold />}
      </span>
      {label}
    </span>
  </label>
)