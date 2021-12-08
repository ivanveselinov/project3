export const initialState = {
    appUser: {},
    selectedCategory: "",
    lections: [],
};

export const reducer = ( state, action ) => {
    switch(action.type) {
        
        case "user":
            return {
                ...state,
                appUser: action.payload,
            };

            case "SELECT_CATEGORY":
                let newFilteredProducts = [];
                console.log(state)
                if (action.payload !== "") {
                  //fiter the products for the selected category
                  newFilteredProducts = state.lections.filter(
                    (lec) => lec.category === action.payload
                  );
                }
                return {
                  ...state,
                  selectedCategory: action.payload,
                  filteredLections: newFilteredProducts,
                };
        
                case "ADD_PRODUCTS":
                 return {
                   ...state,
                   lections: action.payload,
      };

            default:
                return;
            
    }
};

