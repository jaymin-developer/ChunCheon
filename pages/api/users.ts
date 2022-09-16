// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "../../data/users";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === "GET") {
    return res.status(200).json({
      users,
    });
  } else if (method === "POST") {
    const name = req.body.name;
    const newUser = {
      id: Date.now(),
      name: name,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  }
}
