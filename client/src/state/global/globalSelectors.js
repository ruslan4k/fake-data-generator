export const selectSnackbarMessage = (state) => ({
  message: state.global.snackbarMessage,
  type: state.global.snackbarMessageType,
});
