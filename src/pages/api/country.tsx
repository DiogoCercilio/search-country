import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { search } = req.query
    const body = await fetch(`${process.env.COUNTRIES_API_URL}/name/${search}`, { cache: 'force-cache' })

    return res.json(await body.json());
}