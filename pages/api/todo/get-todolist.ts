import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';
import {
  getSession,
  withApiAuthRequired,
  UserProfile,
} from '@auth0/nextjs-auth0';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    user: { sub },
  }: { user: UserProfile } = getSession(req, res);

  const todoList = await prisma.todolists.findUnique({
    where: {
      id: req.query.todolistId.toString(),
    },
    include: {
      todos: {
        orderBy: {
          priority: 'asc',
        },
      },
    },
  });
  res.json(todoList);
};

export default withApiAuthRequired(handler);
