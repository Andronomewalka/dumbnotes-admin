import { BaseInputStyle, BaseLabel } from 'shared';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const PostId = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 10pt;
  color: ${(props) => props.theme.palette.semiGray};
`;

export const ContentLabel = styled.label`
  ${BaseLabel};
  flex: 1 0;
`;

export const SingleInput = styled.input`
  ${BaseInputStyle}
  display: block;
  height: 45px;
`;

export const ContentInput = styled.textarea`
  ${BaseInputStyle};
  height: 100%;
  padding-top: 8px;
  tab-size: 2;
  resize: none;
`;
