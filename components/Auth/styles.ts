import { BaseInputStyle } from 'utils';
import styled from 'styled-components';

export const AuthForm = styled.form`
  display: flex;
  gap: 15px;
`;

export const SingleInputStyle = styled.input`
  ${BaseInputStyle}
  width: 60px;
  height: 70px;
  font-size: 30pt;
  text-align: center;

  :selection {
    background: #d3d3d3;
  }

  :disabled {
    background: #d3d3d3;
  }
`;
