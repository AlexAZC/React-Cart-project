import { CLEAR_CART, REMOVE,INCREASE, DECREASE, LOADING, DISPLAY_ITEMS } from "./actions";



const reducer = (state,action) => {
    switch (action.type){
        case CLEAR_CART:
            return {...state, cart:new Map()};
        case REMOVE:
            const newCart = new Map(state.cart)
            newCart.delete(action.payload.id)
            return {...state,cart:newCart };
        case INCREASE:
            const anotherCart = new Map(state.cart);
            const itemId = action.payload.id
            const item = anotherCart.get(itemId)
            const newItem = {...item, amount: item.amount + 1}
            anotherCart.set(itemId,newItem)
            return {...state, cart: anotherCart }
        case DECREASE:
                const otherCart = new Map(state.cart);
                const otheritemId = action.payload.id
                const otherItem = otherCart.get(otheritemId)
                    if(otherItem.amount === 1){
                        otherCart.delete(otheritemId)
                        return {...state, cart: otherCart}
                    }
                const otherNewItem = {...otherItem, amount: otherItem.amount - 1}
                otherCart.set(otheritemId,otherNewItem)
                return {...state, cart: otherCart };
        case LOADING: 
                return {...state, loading: true};
        case DISPLAY_ITEMS:
                const disCart = new Map(action.payload.cart.map((item) => [item.id, item] ))
                return {...state, loading:false, cart: disCart};
        default:
             throw new Error(`no matching action type : ${action.type}`)
    }
    return state;
};

export default reducer