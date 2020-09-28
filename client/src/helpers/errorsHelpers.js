export const formatErrorMessage = (error) => {
  let message;
  if (error.response) {
    message = error.response?.data?.errors?.[0].message || 'Something Went Wrong';
  } else {
    message = error.message;
  }
  return message;
};
