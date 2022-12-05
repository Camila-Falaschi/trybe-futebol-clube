import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const result = await this.matchesService.getInProgressMatches(inProgress as string);

      return res.status(200).json(result);
    }

    const result = await this.matchesService.getAllMatches();

    return res.status(200).json(result);
  }
}
