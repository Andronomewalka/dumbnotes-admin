import styled from 'styled-components';
import { TransitionGroup } from 'react-transition-group';
import { InfoStatus } from './types';

export const infoTransitionName = 'info-transition';

export const TransitionWrapper = styled(TransitionGroup)`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 8px;
  position: fixed;
  list-style: none;
  margin: 0;
  padding: 0;
  bottom: 0.5rem;
  right: 0.5rem;
`;

export const InfoItemStyled = styled.li<{ status: InfoStatus }>`
  max-width: 20rem;
  padding: 0.5rem 1rem;
  color: white;
  box-shadow: 0px 4px 20px 10px rgba(219, 234, 254, 0.3);
  background-color: ${(props) => {
    switch (props.status) {
      case InfoStatus.Bad:
        return 'rgb(248 113 113)';
      case InfoStatus.Pending:
        return 'rgb(250 204 21)';
      case InfoStatus.Good:
        return 'rgb(74 222 128)';
    }
  }};
  border-radius: ${(props) => props.theme.borderRadius};
  outline: none;
  transition: all 0.5s ease;

  :focus,
  :hover {
    box-shadow: 0px 4px 20px 10px rgba(219, 234, 254, 0.5);
  }

  &.${infoTransitionName}-enter {
    opacity: 0;
    transform: translateY(-200%);
  }

  &.${infoTransitionName}-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.3s ease-out;
  }

  &.${infoTransitionName}-enter-done {
    opacity: 1;
    transform: translateY(0);
  }

  &.${infoTransitionName}-exit {
    opacity: 1;
    transform: translateY(0);
  }

  &.${infoTransitionName}-exit-active {
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.3s ease-out;
  }
`;
