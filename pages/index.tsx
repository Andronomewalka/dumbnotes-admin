import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { Drive } from 'components/Drive';
import { DriveType } from 'components/Drive/types';
import { getAllDriveItems } from 'blog-app-shared/src/gapi/requests/getAllDriveItems';

const Home: NextPage<DriveType & { error: string }> = ({ driveItems, error }) => {
  return (
    <>
      <Head>
        <title>Admin Panel</title>
        <meta name='description' content='andrew-dev-blod admin panel' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Wrapper>{!!error ? error : <Drive driveItems={driveItems} />}</Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 4rem;
  background: ${(props) => props.theme.palette.background};
`;

export async function getServerSideProps() {
  try {
    const response = await getAllDriveItems();
    return {
      props: {
        driveItems: response.data,
        error: response.error,
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
