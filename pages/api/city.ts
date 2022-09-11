import type { NextApiRequest, NextApiResponse } from 'next';
import { debounce } from "debounce";
import { getAll } from "../../services/cityService";
import { City } from '../../models/City';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  let result: City[] | String[] = getAll();
  if ((_req.query.fields as String)?.split(",").includes("name")) {
    result = result.map(i => i.name);
  }

  setTimeout(() => {
    res.status(200).json(result)
  }, 1000);
}