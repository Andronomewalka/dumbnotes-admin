import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { getPosts } from 'blog-app-shared';
import { PostsList } from 'components/PostsList';

const Home: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({
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

      <Wrapper>{!!error ? error : <PostsList posts={posts} />}</Wrapper>
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

export async function getServerSideProps() {
  try {
    const response = await getPosts();
    return {
      props: {
        posts: response.data,
        error: response.error,
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
}
