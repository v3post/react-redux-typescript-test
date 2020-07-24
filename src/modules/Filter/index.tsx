import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { getProducts, filterProducts, addToFavorite } from '../../redux/actions'
import { ProductList } from '../../components/ProductList/'
import { Button } from '../../components/buttons/Button/'
import { Checkbox } from '../../components/form/Checkbox/'
import { checkboxBrands } from './checkbox.mock'
import styles from './styles.module.scss'

interface PropsType {
  products: any[],
  getProducts: Function,
  filterProducts: Function,
  addToFavorite: Function,
}

const Filter: React.FC<PropsType> = (props) => {
  const [filterCheckbox, setFilterCheckbox] = useState<any[]>(checkboxBrands)
  const [filterChecked, setFilterChecked] = useState<any[]>([])

  useEffect(() => {
    props.getProducts()
  }, [])

  useEffect(() => {
    setFilterChecked(
      filterCheckbox
        .filter(item => item.checked === true)
        .map(item => item.value)
    )
  }, [filterCheckbox])

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    setFilterCheckbox(
      filterCheckbox.map(item => ({
        ...item,
        checked: value === item.value 
          ? !item.checked 
          : item.checked,
      }))
    )
  }

  const resetFilter = () => {
    setFilterCheckbox(
      filterCheckbox.map((item) => ({
        ...item,
        checked: false,
      }))
    )
    props.getProducts()
  }

  const applyFilter = () => {
    props.filterProducts(filterChecked)
  }

  const hasProducts = props.products.some((el) => el.id)

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filterSection}>
        {props.products.length > 0 && hasProducts && (
          <ProductList
            items={props.products}
            addToFavorite={props.addToFavorite}
          />
        )}
      </div>
      <div className={styles.filterAside}>
        <div className={styles.filterBox}>
          <div className={styles.filterButton}>
            <Button
              onClick={applyFilter}
              title='Показать результат'
            />
          </div>
          <div className={styles.filterButton}>
            <Button
              onClick={resetFilter}
              title='Очистить фильтр'
              themeClass='theme_grey'
            />
          </div>
          <div className={styles.filterGroup}>
            <div className={styles.filterTitle}>Производитель</div>
            <div className={styles.filterCheckboxs}>
              {filterCheckbox.length > 0 && filterCheckbox.map((item, index) => (
                <div
                  className={styles.filterCheckbox}
                  key={index}
                >
                  <Checkbox
                    key={item.value}
                    value={item.value}
                    label={item.label}
                    checked={item.checked}
                    onChange={onChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    products: state.products.products,
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  getProducts,
  filterProducts,
  addToFavorite,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Filter)