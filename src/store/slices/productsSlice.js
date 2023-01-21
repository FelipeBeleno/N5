import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    products: [],
    car: [],
    total: 0,
    carActivate: false
}
export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getCarShopping: (state) => {

            let car = JSON.parse(localStorage.getItem('carShopping'))
            let total = JSON.parse(localStorage.getItem('total'))

            state.car = car ? car : []

            state.total = total ? total : 0

            return state
        },
        resizeCar: (state) => {
            state.carActivate = !state.carActivate
            return state
        },
        clean: (state) => {
            state = {
                ...state,
                car: [],
                total: 0
            }

            localStorage.removeItem('carShopping')
            localStorage.removeItem('total')
            return state
        },
        getProducts: (state, action) => {
            state.products = action.payload
        },
        addProduct: (state, action) => {

            /*descontar productos*/

            const inf = state.products.map(p => {

                if (p.id === action.payload.id) {
                    return {
                        ...p,
                        amount: p.amount - action.payload.cant
                    }
                }
                return { ...p }
            })


            let ctr = [...state.car, { id: action.payload.id, cant: action.payload.cant, value: action.payload.value, name: action.payload.name }];


            let arrIds = []
            let arrFl = []

            ctr.forEach(element => {

                if (arrIds.includes(element.id)) {

                    arrFl[arrIds.indexOf(element.id)] = {
                        ...arrFl[arrIds.indexOf(element.id)],
                        cant: element.cant + arrFl[arrIds.indexOf(element.id)].cant
                    }

                } else {
                    arrIds.push(element.id)
                    arrFl.push(element)
                }

            });


            arrFl = arrFl.map(a => {
                return { ...a, valorTotal: a.cant * a.value }
            })


            state = {
                ...state,
                car: arrFl,
                products: inf
            }

            state.total = state.car.reduce((ac, cv) => ac + cv.valorTotal, 0)

            let addLocal = JSON.stringify(arrFl)
            let addTotal = JSON.stringify(state.total)
            let addProducts = JSON.stringify(state.products)
            localStorage.setItem('products', addProducts)
            localStorage.setItem('carShopping', addLocal)
            localStorage.setItem('total', addTotal)


            return state

        },
        removeOneCant: (state, action) => {

            let data = action.payload

            let updateProd = state.car.map(c => {

                if (c.id === data.id) {


                    let cantCurrent = c.cant - 1

                    return {
                        ...c,
                        valorTotal: cantCurrent * c.value,
                        cant: c.cant - 1,
                    }
                }
                return {
                    ...c
                }
            })

            let updateStock = state.products.map(p => {
                if (p.id === data.id) {
                    return {
                        ...p,
                        amount: p.amount + 1
                    }
                }
                return {
                    ...p
                }
            })

            state.products = updateStock
            updateProd = updateProd.filter(f => {
                return f.cant !== 0
            })
            state.car = updateProd.length > 0 ? updateProd : []

            state.total = state.car.reduce((ac, cv) => ac + cv.valorTotal, 0)
            localStorage.setItem('products', JSON.stringify(updateStock))
            localStorage.setItem('carShopping', JSON.stringify(updateProd))
            localStorage.setItem('total', state.total)

            return state
        },
        addOneCant: (state, action) => {

            let data = action.payload

            let [item] = JSON.parse(localStorage.getItem('productsOriginalData')).filter(p => p.id === data.id)

            if (item.amount === data.cant) {
                return state
            }


            let updateProd = state.car.map(c => {
                if (c.id === data.id) {
                    let cantCurrent = c.cant + 1
                    return {
                        ...c,
                        valorTotal: cantCurrent * c.value,
                        cant: c.cant + 1,
                    }
                }
                return {
                    ...c
                }
            })

            let updateStock = state.products.map(p => {
                if (p.id === data.id) {
                    return {
                        ...p,
                        amount: p.amount - 1
                    }
                }
                return {
                    ...p
                }
            })
            state.car = updateProd
            state.products = updateStock
            state.total = state.car.reduce((ac, cv) => ac + cv.valorTotal, 0)

            localStorage.setItem('products', JSON.stringify(updateStock))
            localStorage.setItem('carShopping', JSON.stringify(updateProd))
            localStorage.setItem('total', state.total)

            return state
        },
        restoreProducts: (state, action) => {
            state = {
                ...initialState,
                products: JSON.parse(localStorage.getItem('productsOriginalData'))
            }

            localStorage.setItem('carShopping', JSON.stringify([]))
            localStorage.setItem('total', JSON.stringify(0))
            return state
        },
        addProductList: (state, action) => {
            console.log(action.payload)
            state.products = [...state.products, action.payload]
            return state
        }
    },
})

// Action creators are generated for each case reducer function
export const { clean, getProducts, addProduct, removeOneCant, addOneCant, restoreProducts, resizeCar, addProductList, getCarShopping } = productsSlice.actions




