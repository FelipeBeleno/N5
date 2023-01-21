import { Grid } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../../store/slices/productsSlice"
import { Item } from "./Item"

export const ProductIndex = () => {

  const { products } = useSelector(state => state.products)
  const dispatch = useDispatch()

  async function fnFetch() {

    if (localStorage.getItem('productsOriginalData')) {
      let data = JSON.parse(localStorage.getItem('products'))
      console.log(data)
      dispatch(getProducts(data))
      return
    }
    const response = await fetch('/doc.html');
    const { products } = await response.json()
    localStorage.setItem('productsOriginalData', JSON.stringify(products))

    if (products.length > 0) {
      if (localStorage.getItem('products')) {
        dispatch(getProducts(products))
        return
      }
      localStorage.setItem('productsOriginalData', JSON.stringify(products))
      localStorage.setItem('products', JSON.stringify(products))
      localStorage.setItem('carShopping', JSON.stringify([]))
      localStorage.setItem('total', JSON.stringify(0))

      dispatch(getProducts(products))
    }
    
  }


  useEffect(() => {
    fnFetch()
  }, []);






  return (

    <Grid container spacing={3} className="products_index_container">

      {products.length > 0
        &&
        products.map((p, i) => <Item key={Date.now + i} product={p} fnFetch={fnFetch} />)
      }
    </Grid>

  )
}