import React, { useRef, useEffect } from 'react';

export const InputWithLabel = ({
  value,
  onInputChange,
  id,
  children,
  isFocused,
  type = 'text',
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input id={id} type={type} onChange={onInputChange} value={value} ref={inputRef} />
    </>
  );
};
