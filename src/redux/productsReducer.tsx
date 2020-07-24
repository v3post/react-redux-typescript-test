import { LOAD_PRODUCTS, ADD_TO_FAVORITE } from './types'

const initialState = {
  products: [
    {
      id: '',
      link: '',
      code: '',
      imgUrl: '',
      availability: '',
      title: '',
      params: '',
      inFav: false,
      inComparsion: false
    }
  ]
}

interface Action {
  type: string,
  payload?: any
}

export const productsReducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case ADD_TO_FAVORITE:
      return {
        ...state,
        products: state.products.map(item => item.id === action.payload.id ?
          {
            ...item,
            inFav: action.payload.inFav
          } : item
				)
      }
    default: return state
  }
}