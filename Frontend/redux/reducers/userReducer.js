const initialState = {
    userData: '',
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USERDATA':
        return {
          ...state,
          userData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  