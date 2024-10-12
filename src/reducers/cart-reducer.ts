export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            // Check if the item is already in the cart
            const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                // If the item already exists, update its quantity
                const updatedCart = [...state];
                updatedCart[existingItemIndex].quantity += action.payload.quantity;
                return updatedCart;
            }
            // If the item is new, add it to the cart
            return [...state, action.payload];
        case 'REMOVE_ITEM':
            // Remove the item from the cart
            return state.filter(item => item.id !== action.payload);
        case 'UPDATE_QUANTITY':
            // Update the quantity of a specific item in the cart
            const updatedCart = state.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, quantity: action.payload.quantity };
                }
                return item;
            });
            return updatedCart;
        default:
            return state;
    }
};