import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: [], shippingAddress:{}, paymentMethod:''}
// localStorage.clear();
// console.log(initialState);

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart : (state, action) => {
            const existItem = state.cartItems.find((x) => (x._id === action.payload._id))            
            
            if (existItem) {
                state.cartItems = state.cartItems.map((x) => (

                    x._id === existItem._id ? action.payload : x
                    ))
                    // console.log(action.payload.qty);
            } else {
                state.cartItems = [...state.cartItems, action.payload]
            }

            //item price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

            //shipping price
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

            //tax price
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))

            //total price
            state.totalPrice = (Number(state.itemsPrice)+ Number(state.shippingPrice)+Number(state.taxPrice)).toFixed(2)

            localStorage.setItem('cart', JSON.stringify(state))
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id)
            //item price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

            //shipping price
            // state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)
            state.shippingPrice = addDecimals(state.itemsPrice = 0)

            //tax price
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))

            //total price
            state.totalPrice = (Number(state.itemsPrice)+ Number(state.shippingPrice)+Number(state.taxPrice)).toFixed(2)

            localStorage.setItem('cart', JSON.stringify(state))
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('cart', JSON.stringify(state))
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('cart', JSON.stringify(state))
        },

        clearCartItems: (state) => {
            state.cartItems = []
            localStorage.setItem('cart', JSON.stringify(state))
        },

        resetCart: (state) => (state = initialState)
    }
})

export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems, resetCart} = cartSlice.actions

export default cartSlice.reducer