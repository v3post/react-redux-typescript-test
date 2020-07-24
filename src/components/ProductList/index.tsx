import React from 'react'
import { ProductCard } from '../ProductCard'
import styles from './styles.module.scss'

interface CardListProps {
  items: any[],
  addToFavorite: Function,
}

export const ProductList: React.FC<CardListProps> = ({ items, addToFavorite }) => {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div className={styles.col} key={item.id}>
          <ProductCard item={item} addToFavorite={addToFavorite} />
        </div>
      ))}
    </div>
  )
}