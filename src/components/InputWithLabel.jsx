import React, { useRef, useEffect } from 'react';

import { StyledLabel } from './styled/StyledLabel';
import { StyledInput } from './styled/StyledInput';

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
      <StyledLabel htmlFor={id}>{children}</StyledLabel>
      &nbsp;
      <StyledInput id={id} type={type} onChange={onInputChange} value={value} ref={inputRef} />
    </>
  );
};
