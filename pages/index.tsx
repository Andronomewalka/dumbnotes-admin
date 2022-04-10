import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { PostsList } from 'components/PostsList';
import { NavCard } from 'components/Nav';
import { client } from 'utils/client';
import { InferWithAuthServerSideProps, withAuth } from 'utils/withAuth';

const Home: NextPage<InferWithAuthServerSideProps<typeof getServerSideProps>> = ({
  posts,
  error,
}) => {
  return (
    <>
      <Head>
        <title>Admin Panel</title>
        <meta name='description' content='andrew-dev-blod admin panel' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Wrapper>
        {!!error ? (
          error
        ) : (
          <>
            <NavCard />
            <PostsList posts={posts} />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 4rem;
  background: ${(props) => props.theme.palette.background};
  overflow: auto;
`;

export const getServerSideProps = withAuth(async () => {
  try {
    const response = await client.get('/posts');
    const payload = response.data;
    return {
      props: {
        posts: payload.data,
        error: payload.error,
      },
    };
  } catch (e: any) {
    return {
      props: {
        posts: [],
        error: e + '',
      },
    };
  }
});
