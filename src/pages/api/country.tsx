import { adapt } from "@/adapter/country-adapter";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Server Handler for the Country search
 * @returns Promise<void>
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const body = await fetch(`${process.env.COUNTRIES_API_URL}/name/${req.query.search}`, { cache: 'force-cache' })
    const response = await body.json()

    if(response.status && response.status !== 200) {
        res.status(response.status).end()
    } else {
        res.json(adapt(response));
    }
}