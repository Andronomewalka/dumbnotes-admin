import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;

  > label:nth-child(4) {
    flex: 1 0;
  }
`;

export const Label = styled.label`
  margin-bottom: 16px;
`;

const BaseInputStyle = css`
  margin-top: 4px;
  padding-left: 8px;
  padding-right: 8px;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  outline: none;
  transition: all 0.3s ease;

  :focus {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const SingleInput = styled.input`
  display: block;
  width: 100%;
  height: 45px;
  ${BaseInputStyle}
`;

export const ContentInput = styled.textarea`
  width: 100%;
  height: 100%;
  padding-top: 8px;
  tab-size: 2;
  resize: none;
  ${BaseInputStyle};
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
    background: #00b0fc;
  }

  :hover:enabled {
    background: #019ef3;
  }

  :disabled {
    color: #00b0fc;
  }
`;

export const BackButton = styled.button`
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
