import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { Post } from 'components/Post';
import { client } from 'utils/client';
import { InferWithAuthServerSideProps, withAuth } from 'utils/withAuth';

const PostSlug: NextPage<InferWithAuthServerSideProps<typeof getServerSideProps>> = ({
  data,
  error,
}) => {
  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta name='description' content='andrew-dev-blod admin panel' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Wrapper>{!!error ? error : <Post {...data} />}</Wrapper>
    </>
  );
};

export default PostSlug;

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 1.5rem 2rem;
  background: ${(props) => props.theme.palette.background};
  overflow: auto;
`;

export const getServerSideProps = withAuth(async (ctx) => {
  try {
    if (ctx.query.slug === 'new') {
      return {
        props: {
          data: {
            id: '',
            name: 'New Post',
            path: 'new',
            content: '',
          },
          error: '',
        },
      };
    }

    const response = await client.get(`/posts/${ctx.query.slug}`);
    const payload = response.data;
    return {
      props: {
        data: payload.data,
        error: payload.error,
      },
    };
  } catch (e: any) {
    return {
      props: {
        error: e + '',
      },
    };
  }
});
