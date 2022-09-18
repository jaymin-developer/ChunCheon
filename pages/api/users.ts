// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const users = await client.user.findMany();

  if (method == "GET") {
    return res.status(200).json({
      users,
    });
  } else if (method === "POST") {
    const name = req.body.name;
    const newUser = {
      name: name,
    };
    await client.user.create({ data: newUser });
    res.status(201).json(newUser);
  }
}
