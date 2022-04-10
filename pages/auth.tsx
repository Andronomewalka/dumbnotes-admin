import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { Auth } from 'components/Auth';

const AuthPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin Panel</title>
        <meta name='description' content='andrew-dev-blod admin panel' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Wrapper>
        <Auth />
      </Wrapper>
    </>
  );
};

export default AuthPage;

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.palette.background};
  overflow: auto;
`;
