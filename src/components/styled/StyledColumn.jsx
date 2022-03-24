import styled from 'styled-components';

export const StyledColumn = styled.span`
  overflow: hidden;
  padding: 0 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: ${(props) => props.width};

  a {
    color: inherit;
  }
`;
