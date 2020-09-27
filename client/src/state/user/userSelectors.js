export const selectUser = (state) => (state.user.user);
export const selectUsersFetched = (state) => (state.user.isUserFetched);
export const selectLoggedInStatus = (state) => (state.user.isLoggedIn);
