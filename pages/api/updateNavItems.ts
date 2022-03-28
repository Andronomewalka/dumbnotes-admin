import type { NextApiRequest, NextApiResponse } from 'next';
import { NavNodeBaseType, updateNavItems } from 'blog-app-shared';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);
  if (!body) {
    return res.status(400).json({});
  }

  if (typeof body.navItemsContent !== 'string') {
    return res.status(400).json({});
  } else if (req.method === 'PUT') {
    const navItems = JSON.parse(body.navItemsContent) as NavNodeBaseType[];
    const result = await updateNavItems(navItems);
    res.status(200).json(result);
  } else {
    res.status(405).json({});
  }
}
