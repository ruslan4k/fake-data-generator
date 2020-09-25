import { useState } from 'react';

function useHandleTextInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };
  return { value, setValue, handleChangeValue };
}

export default useHandleTextInput;
