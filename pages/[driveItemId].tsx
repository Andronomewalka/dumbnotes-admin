import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { getDriveItem } from 'gapi/google-api';
import { DriveItem, DriveItemType } from 'components/DriveItem';

const DriveItemId: NextPage<DriveItemType & { error: string }> = ({
  id,
  name,
  path,
  content,
  error,
}) => {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name='description' content='andrew-dev-blod admin panel' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Wrapper>
        {!!error ? (
          error
        ) : (
          <DriveItem id={id} name={name} path={path} content={content} />
        )}
      </Wrapper>
    </>
  );
};

export default DriveItemId;

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 1.5rem 2rem;
  background: ${(props) => props.theme.palette.background};
`;

export async function getServerSideProps(context: any) {
  console.log('context', context);
  try {
    if (context.query.driveItemId === 'new') {
      return {
        props: {
          id: 'new',
          name: '',
          path: '',
          content: '',
          error: '',
        },
      };
    }

    const result = await getDriveItem(context.query.driveItemId);
    return {
      props: {
        ...result.response,
        error: result.error,
      },
    };
  } catch (e: any) {
    return {
      props: {
        error: e + '',
      },
    };
  }
}
