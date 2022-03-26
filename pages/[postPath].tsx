import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { defaultPost, getPost } from 'blog-app-shared';
import { Post } from 'components/Post';

const DriveItemId: NextPage<InferGetStaticPropsType<typeof getServerSideProps>> = ({
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

export default DriveItemId;

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 1.5rem 2rem;
  background: ${(props) => props.theme.palette.background};
  overflow: auto;
`;

export async function getServerSideProps(context: any) {
  try {
    if (context.query.postPath === 'new') {
      return {
        props: {
          data: {
            id: '',
            name: '',
            path: 'new',
            content: '',
          },
          error: '',
        },
      };
    }

    const result = await getPost(context.query.postPath);
    return {
      props: {
        data: result.data,
        error: result.error,
      },
    };
  } catch (e: any) {
    return {
      props: {
        data: defaultPost,
        error: e + '',
      },
    };
  }
}
