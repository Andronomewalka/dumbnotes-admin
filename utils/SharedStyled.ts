import styled, { css } from 'styled-components';

export const BaseCardCss = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 230px;
  background: white;
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;
  transition: all 0.3s ease;

  :hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 38px -22px rgba(0, 0, 0, 0.17);
  }
`;

export const BaseInputStyle = css`
  width: 100%;
  margin-top: 4px;
  padding-left: 8px;
  padding-right: 8px;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  outline: none;
  transition: all 0.3s ease;

  :focus {
    box-shadow: ${(props) => props.theme.shadow.focus};
  }
`;

export const BaseLabel = css`
  margin-bottom: 16px;
`;

export const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Label = styled.label`
  ${BaseLabel};
`;

export const ValidationError = styled.div`
  color: rgb(248 113 113);
  margin-top: 8px;

  p {
    margin: 0;
  }
`;

export const SubmitButton = styled.input`
  align-self: start;
  margin-top: 16px;
  width: 100px;
  height: 32px;
  background: ${(props) => props.theme.palette.lightGray};
  color: white;
  border-radius: ${(props) => props.theme.borderRadius};
  border-color: transparent;
  transition: all 0.3s ease;

  :enabled {
    background: ${(props) => props.theme.palette.primary};
  }

  :hover:enabled {
    background: #019ef3;
  }

  :disabled {
    color: #00b0fc;
  }
`;

export const BackA = styled.a`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 6px;
  padding: 0;
  font-size: 14pt;
  border: none;
  color: #d5d5d5;
  background: transparent;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    fill: #d5d5d5;
    transition: all 0.3s ease;
  }

  :hover {
    color: #33334d;
    svg {
      fill: #33334d;
    }
  }
`;
