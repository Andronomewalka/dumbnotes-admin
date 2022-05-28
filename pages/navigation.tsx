import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { Nav } from 'components/Nav';
import { client } from 'utils/client';
import { InferWithAuthServerSideProps, withAuth } from 'utils/withAuth';

const NavigationPage: NextPage<
  InferWithAuthServerSideProps<typeof getServerSideProps>
> = ({ navItemsContent, error }) => {
  return (
    <>
      <Head>
        <title>Admin Panel</title>
        <meta name='description' content='dumbnotes admin panel' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Wrapper>{!!error ? error : <Nav navItemsContent={navItemsContent} />}</Wrapper>
    </>
  );
};

export default NavigationPage;

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 1.5rem 2rem;
  background: ${(props) => props.theme.palette.background};
  overflow: auto;
`;

export const getServerSideProps = withAuth(async () => {
  try {
    const response = await client.get('/navigation');
    const payload = response.data;
    return {
      props: {
        navItemsContent: JSON.stringify(payload.data, null, 2),
        error: payload.error,
      },
    };
  } catch (e: any) {
    return {
      props: {
        navItemsContent: '',
        error: e + '',
      },
    };
  }
});
