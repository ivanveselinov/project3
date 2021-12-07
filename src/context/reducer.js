export const initialState = {
    appUser: {},
    selectedCategory: "",
};

export const reducer = ( state, action ) => {
    switch(action.type) {
        
        case "user":
            return {
                ...state,
                appUser: action.payload,
            };

        case "SELECTED_CATEGORY":
            let newFilteredProducts = [];
            if (action.payload !== ""){
                //filter the products
            newFilteredProducts = state.products.filter(
                (product) => product.category === action.payload
             );
            }

            return {
                ...state,
                selectedCategory: action.payload,
                filteredProducts: newFilteredProducts
            };
        

            default:
                return;
            
    }
};

