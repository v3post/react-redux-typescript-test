import React from 'react'
import { Button } from '../buttons/Button/'
import { FavouriteIcon } from '../icons/FavouriteIcon'
import { ComparsionIcon } from '../icons/ComparsionIcon'
import { CheckIcon } from '../icons/CheckIcon'
import styles from './styles.module.scss'

interface CardProps {
  addToFavorite: Function,
  item: {
    id: number,
    link: string,
    code: number,
    imgUrl: string,
    availability: boolean,
    title: string,
    params: any[],
    inFav: boolean,
    inComparsion: boolean
  }
} 

export const ProductCard: React.FC<CardProps> = ({ item, addToFavorite }) => {
  return (
    <a href={item.link} className={styles.card}>
      <div className={styles.number}>
        Арт. {item.code}
      </div>
      <div className={styles.image}>
        <img src={`/images/${item.imgUrl}`} alt={item.title} />
      </div>
      <div className={styles.availability}>
        {item.imgUrl ? (
          <>
            <CheckIcon />
            В наличии
          </>
        ) : (
          'Нет в наличии'
        )
      }
      </div>
      <div className={styles.title}>
        {item.title}
      </div>
      <div className={styles.params}>
        {item.params.length > 0 && item.params.map((param, index) => (
          <div className={styles.paramElem} key={index}>
            <span className={styles.paramName}>
              {param.name}
            </span>
            <span className={styles.paramValue}>
              {param.value}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <div className={styles.addToCart}>
          <Button title='Купить' showIcon={true} />
        </div>
        <div className={styles.controls}>
          <div
            className={styles[item.inFav ? 'controlActive' : 'control']}
            onClick={(event) => {
              event.preventDefault()
              addToFavorite(item.id)
            }}
          >
            <FavouriteIcon />
          </div>
          <div className={styles.control}>
            <ComparsionIcon />
          </div>
        </div>
      </div>
    </a>
  )
}
