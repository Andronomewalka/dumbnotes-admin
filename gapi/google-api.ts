'use strict';

import path from 'path';
import { google } from 'googleapis';
import mime from 'mime-types';
import { NameObjectType, Response } from './types';
import { DriveItemBaseType, DriveItemType } from 'components/DriveItem';

const googleDriveScope = 'https://www.googleapis.com/auth/drive';
const drive = google.drive('v3');
let authClient: any = null;

export const auth = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.basename('.') + '/' + 'service-account.json',
    scopes: [googleDriveScope],
  });

  authClient = await auth.getClient();
};

const checkAuth = async () => {
  if (!authClient) {
    await auth();
  }
  return !!authClient;
};

export async function getAllDriveItems(): Promise<Response<DriveItemBaseType[]>> {
  if (!(await checkAuth())) {
    return {
      response: [],
      error: 'Auth failed',
    };
  }

  const res = await drive.files.list({
    auth: authClient,
  });

  const formattedFiles = res.data.files?.map((file) => {
    try {
      return {
        ...file,
        name: JSON.parse(file.name + '').name,
      };
    } catch (e: any) {
      return file;
    }
  }) as DriveItemBaseType[];

  return {
    response: formattedFiles,
    error: '',
  };
}

export async function getDriveItem(id: string): Promise<Response<DriveItemType>> {
  if (!(await checkAuth())) {
    return {
      response: {
        id: 'empty',
        name: 'error',
        path: 'error',
        content: '',
      },
      error: 'Auth failed',
    };
  }

  const res = await drive.files.get({
    fileId: id,
    auth: authClient,
  });

  const resContent = await drive.files.get({
    fileId: id,
    auth: authClient,
    alt: 'media',
  });

  const nameObject = JSON.parse(res.data.name + '') as NameObjectType;

  return {
    response: {
      id: res.data.id ?? '',
      name: nameObject.name ?? '',
      path: nameObject.path ?? '',
      content: resContent.data as string,
    },
    error: '',
  };
}

export async function updateDriveItem(
  item: DriveItemType,
  create: boolean
): Promise<Response<string>> {
  try {
    if (!(await checkAuth())) {
      return {
        response: '',
        error: 'Auth failed',
      };
    }

    const mimeType = mime.lookup(item.name);

    let formattedName = item.name;
    if (!item.name.includes('.')) {
      formattedName += '.txt';
    }

    const allItems = (
      await drive.files.list({
        auth: authClient,
      })
    ).data;

    const isPathTaken = allItems.files?.some(
      (cur) => JSON.parse(cur.name + '').path === item.path
    );
    if (isPathTaken) {
      return {
        response: '',
        error: 'Path already taken',
      };
    }

    // setting description is not working for some reason
    // to store name and path in one place,
    // save it in the name prop and then parse to according structure
    const nameObject = {
      name: formattedName,
      path: item.path,
    };

    const requestParams: any = {
      requestBody: {
        name: JSON.stringify(nameObject),
        mimeType: mimeType || 'text/plain',
      },
      media: {
        mimeType: mimeType || 'text/plain',
        body: item.content,
      },
      auth: authClient,
    };

    let res = null;

    if (create) {
      res = await drive.files.create(requestParams);
    } else {
      requestParams.fileId = item.id;
      res = await drive.files.update(requestParams);
    }

    if (res?.data?.id) {
      return {
        response: res.data.id,
        error: '',
      };
    }

    return {
      response: '',
      error: `Error on ${create ? 'creation' : 'update'}`,
    };
  } catch (e: any) {
    console.log(e);
    return {
      response: '',
      error: e.response.statusText,
    };
  }
}

export async function removeDriveItem(id: string): Promise<Response<boolean>> {
  try {
    if (!(await checkAuth())) {
      return {
        response: false,
        error: 'auth failed',
      };
    }

    await drive.files.delete({
      fileId: id,
      auth: authClient,
    });

    return {
      response: true,
      error: '',
    };
  } catch (e: any) {
    return {
      response: false,
      error: e.response.statusText,
    };
  }
}
