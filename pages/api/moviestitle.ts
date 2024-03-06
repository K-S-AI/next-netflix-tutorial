import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    await serverAuth(req, res);
    const movieTitle = req.query.title as string; // Cast the query parameter to string

    if (!movieTitle) {
      return res.status(400).json({ message: 'Movie title is required.' });
    }
    const moviesTitlesearch = await prismadb.movie.findMany({
      where: {
        title: {
          contains: movieTitle,// 根据输入的电影类型来筛选电影
          mode: 'insensitive'
        }
      }
    });

    return res.status(200).json(moviesTitlesearch);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
