import type { NextApiRequest, NextApiResponse } from 'next';
import { removeDriveItem } from 'gapi/google-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);
  if (!body?.driveId) {
    return res.status(400).json({});
  } else if (req.method === 'POST') {
    const result = await removeDriveItem(body.driveId);
    res.status(200).json(result);
  } else {
    res.status(405).json({});
  }
}
