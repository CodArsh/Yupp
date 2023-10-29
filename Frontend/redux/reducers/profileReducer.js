const initialState = {
  profileData: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROFILEDATA':
      return {
        ...state,
        profileData: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;