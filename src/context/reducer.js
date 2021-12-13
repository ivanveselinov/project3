export const initialState = {
    appUser: {},
    selectedCategory: "",
    lections: [],
    admin: "Nfv6sifFEkcXAyfjoueuYT4BfdG3",
    teachers: "OCFkFWefwRY0vyfPYc851clqac13",

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

                 case "admin":
                  return {
                    ...state,
                     admin: action.payload,
                       };

                  case "teacher":
                    return {
                      ...state,
                      teachers: action.payload,
                       };


            default:
                return;

    }
};
