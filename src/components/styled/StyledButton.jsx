import styled from 'styled-components';

export const StyledButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: 1px solid #171212;
  padding: 5px;
  transition: all 0.1s ease-in;

  &:hover {
    background: #171212;
    color: #ffffff;
  }
`;
