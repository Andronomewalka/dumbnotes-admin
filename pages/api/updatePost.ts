import type { NextApiRequest, NextApiResponse } from 'next';
import { updatePost } from 'blog-app-shared';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);
  if (!body) {
    return res.status(400).json({});
  }

  if (!body.id || !body.name || typeof body.content !== 'string') {
    return res.status(400).json({});
  } else if (req.method === 'POST') {
    const result = await updatePost(body);
    res.status(200).json(result);
  } else {
    res.status(405).json({});
  }
}
