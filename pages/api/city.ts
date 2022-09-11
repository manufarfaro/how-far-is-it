import type { NextApiRequest, NextApiResponse } from 'next'
import { getAll } from "../../services/cityService";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {

  res.status(200).json(getAll())
}