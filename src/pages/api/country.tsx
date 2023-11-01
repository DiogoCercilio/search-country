import { adapt } from "@/adapter/country-adapter";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Server Handler for the Country search
 * @returns Promise<void>
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body = await fetch(`${process.env.COUNTRIES_API_URL}/name/${req.query.search}`, { cache: 'force-cache' })
    return res.json(adapt(await body.json()));
}