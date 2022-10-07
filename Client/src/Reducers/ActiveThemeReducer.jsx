const activeThemeReducer = (state = 'System', action) => {
  if (!action.payload) return state;

  let newState = state;

  switch (action.type) {
    case "CHANGE_ACTIVE_THEME":
      newState = action.payload.theme;
      break;
    default:
  }
  return (newState);
};

export default activeThemeReducer;
