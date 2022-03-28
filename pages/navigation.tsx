import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { getNavItems } from 'blog-app-shared';
import { Nav } from 'components/Nav';

const NavigationPage: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({
  navItemsContent,
  error,
}) => {
  return (
    <>
      <Head>
        <title>Admin Panel</title>
        <meta name='description' content='andrew-dev-blod admin panel' />
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

export async function getServerSideProps() {
  try {
    const response = await getNavItems();
    return {
      props: {
        navItemsContent: JSON.stringify(response.data, null, 2),
        error: response.error,
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
}
