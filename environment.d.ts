declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      ORIGIN_SELF: string;
      ORIGIN_API: string;
      ORIGIN_MAIN: string;
      NEXT_PUBLIC_REVALIDATE_TOKEN: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
