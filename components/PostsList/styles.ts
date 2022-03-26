import styled from 'styled-components';

export const PostUlWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const PostLiWrapper = styled.li<{ isCreate: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 230px;
  background: white;
  border-radius: ${(props) => props.theme.borderRadius};
  border-style: ${(props) => (props.isCreate ? 'dashed' : 'none')};
  border-color: ${(props) =>
    props.isCreate ? props.theme.palette.whiteSemiTransparent : 'unset'};
  cursor: pointer;
  transition: all 0.3s ease;

  :hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 38px -22px rgba(0, 0, 0, 0.17);
  }
`;

export const PostLiA = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const PostLiDeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0;
  border: none;
  background: transparent;

  svg {
    fill: #d5d5d5;
    transition: all 0.3s ease;

    :hover {
      fill: #33334d;
    }
  }
`;

export const DeleteModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-width: 300px;
`;

export const DeleteButtonModal = styled.button`
  width: 100px;
  height: 32px;
  background-color: rgb(248 113 113);
  color: white;
  border-radius: ${(props) => props.theme.borderRadius};
  border-color: transparent;
  transition: all 0.3s ease;

  :hover {
    background-color: rgb(220 38 38);
  }
`;

export const CancelButtonModal = styled.button`
  width: 100px;
  height: 32px;
  background: transparent;
  color: black;
  border: 1px solid #d5d5d5;
  border-radius: ${(props) => props.theme.borderRadius};
  transition: all 0.3s ease;

  :hover {
    background: #d5d5d5;
  }
`;
