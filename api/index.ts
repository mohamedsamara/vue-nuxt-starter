import express from 'express';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import { auth } from './auth';
import { AuthRequest } from './types/context.types';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(auth);

app.get('/test', async (_, res) => {
  res.json({
    name: 'test'
  });
});

// signup api
app.post('/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  const accessToken = jwt.sign({ email }, 'dummy');

  res.json({ token: accessToken });
});

// signin api
app.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  const user: any = await prisma.user.findUnique({
    where: {
      email
    }
  });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.json({ token: null });
  }

  const accessToken = jwt.sign({ email }, 'dummy');

  res.json({ token: accessToken });
});

// get user api
app.get('/auth/user', auth, async (req: AuthRequest, res: express.Response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.user.email
    }
  });

  res.json({ user });
});

export default {
  path: '/api',
  handler: app
};
