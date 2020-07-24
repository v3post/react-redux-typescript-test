import api from '../api/'
import { LOAD_PRODUCTS, ADD_TO_FAVORITE } from './types'
import { Dispatch } from 'redux'

export function loadProducts(products:any[]) {
  return {
    type: LOAD_PRODUCTS,
    payload: products
  }
}

export function setToFavorite(item:Object) {
  return {
    type: ADD_TO_FAVORITE,
    payload: item
  }
}

export const getProducts = () => {
  return async (dispatch:Dispatch) => {
    const response = await api.get('/PRODUCTS_SUCCESS')
    const result = await response.data

    if (result.status === 'PRODUCTS_SUCCESS') {
      dispatch(loadProducts(result.data.products))
    } else {
      console.log('Ошибка загрузки списка товаров.')
    }
  }
}

export const filterProducts = (params:any[]) => {
  return async (dispatch:Dispatch) => {
    const query = params.length > 0 ? `?${params.map(param => `filter[]=${param}`).join('&')}` : ''
    const response = await api.get(`/FILTER_SUCCESS${query}`)
    const result = await response.data

    if (result.status === 'FILTER_SUCCESS') {
      dispatch(loadProducts(result.data.products))
    } else if (result.status === 'FILTER_FAIL') {
      console.log(result.data.message)
    }
  }
}

export const addToFavorite = (id:Number) => {
  return async (dispatch:Dispatch) => {
    const query = `?id=${id}`
    const response = await api.get(`/FAVORITE_SUCCESS${query}`)
    const result = await response.data

    if (result.status === 'FAVORITE_SUCCESS') {
      dispatch(setToFavorite({
        id,
        inFav: result.data.inFav
      }))
    }
  }
}