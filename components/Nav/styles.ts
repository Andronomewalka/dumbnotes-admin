import { BaseCardCss, BaseInputStyle, BaseLabel } from 'utils/SharedStyled';
import styled from 'styled-components';

export const NavCardWrapper = styled.div`
  ${BaseCardCss};
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
  background: ${(props) => props.theme.palette.primary};
  color: white;
`;

export const NavCardA = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
`;

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const ContentLabel = styled.label`
  ${BaseLabel};
  margin-bottom: 16px;
  flex: 1 0;
`;

export const ContentInput = styled.textarea`
  ${BaseInputStyle};
  height: 100%;
  padding: 20px;
  tab-size: 2;
  resize: none;
`;

export const ValidationError = styled.div`
  color: rgb(248 113 113);
  margin-top: 16px;
  height: 20px;
  align-content: center;
`;
