import { GetServerSidePropsContext } from 'next';
import { client } from './client';

// https://github.com/vercel/next.js/discussions/10925#discussioncomment-147287
type AsyncReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : any;

export type InferWithAuthServerSideProps<
  T extends (...args: any) => Promise<{ props: any }>
> = AsyncReturnType<T>['props'];

type EmptyProps = {
  props: Record<string, unknown>;
};

export const withAuth = <T extends EmptyProps = EmptyProps>(
  getServerSidePropsFunc?: (ctx: GetServerSidePropsContext) => Promise<T>
) => {
  return async function getMergedServerSideProps(
    ctx: GetServerSidePropsContext
  ): Promise<{ props: T['props'] }> {
    // pass frontend cookies to api,
    // if tokens are okay, do notihing,
    // otherwise set new cookies to frontend (if refresh token is valid),
    // if it's impossible to refresh tokens redirect to auth
    try {
      let reqCookies = Object.keys(ctx.req.cookies)
        .map((key) => `${key}=${ctx.req.cookies[key]}`)
        .join('; ');

      const verifyReponse = await client.get('/auth/verify-tokens', {
        withCredentials: true,
        headers: {
          Cookie: reqCookies,
        },
      });
      const cookies = verifyReponse.headers['set-cookie'];
      if (cookies) {
        const accessToken = cookies.find((cur) =>
          cur.startsWith('X-DumbNotes-Access-Token')
        );
        const refreshToken = cookies.find((cur) =>
          cur.startsWith('X-DumbNotes-Refresh-Token')
        );
        if (accessToken && refreshToken) {
          ctx.res.setHeader('Set-Cookie', [accessToken, refreshToken]);
        } else {
          throw new Error("Can't parse tokens from response");
        }
      }
    } catch (e: any) {
      let destination = '/auth';
      const url = ctx.req.url;
      if (url) {
        if (url.includes('slug')) {
          destination += `?redirect=${url.substring(
            url.indexOf('slug') + 'slug'.length
          )}`;
        } else if (url !== '/') {
          destination += `?redirect=${url}`;
        }
      }

      return {
        redirect: {
          destination,
          permanent: false,
        },
      } as unknown as { props: T['props'] };
    }

    if (getServerSidePropsFunc) {
      return {
        props: {
          ...((await getServerSidePropsFunc(ctx)).props || {}),
        },
      };
    }

    return {
      props: {},
    };
  };
};
