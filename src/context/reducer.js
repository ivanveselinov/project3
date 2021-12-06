export const initialState = {
    appUser: {},
    color: "blue",
};

export const reducer = ( state, action ) => {
    switch(action.type) {
        
        case "user":
            return {
                ...state,
                appUser: action.payload,
            };

            case "color":
                return {
                  ...state,
                  color: action.payload,
                };
        


            default:
                return;
            
    }
};

