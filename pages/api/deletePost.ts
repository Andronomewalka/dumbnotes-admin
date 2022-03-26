import type { NextApiRequest, NextApiResponse } from 'next';
import { deletePost } from 'blog-app-shared';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);
  if (!body?.postId) {
    return res.status(400).json({});
  } else if (req.method === 'POST') {
    const result = await deletePost(body.postId);
    res.status(200).json(result);
  } else {
    res.status(405).json({});
  }
}
