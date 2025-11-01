import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  let authToken: string | undefined;

  if (authHeader) {
    const parts = authHeader.split('"');

    if (parts.length >= 2) {
      authToken = parts[1];
      authToken = authToken!.trim();
    }
  }

  const apiKey = process.env.API_KEY;

  if (!authToken) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(authToken,
    apiKey!,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }

      req.userId = decoded.id;
      next();
    });
};

export default verifyToken;
