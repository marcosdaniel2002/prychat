import jwt, { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../lib/prisma.ts';

interface JwtCustomPayload extends JwtPayload {
  id: string;
}

const verifyToken = async function (token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtCustomPayload;
  const user = await prisma.usuario.findUnique({
    where: { id: decoded.id },
  });
  return user;
};

export default verifyToken;
