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

  public async createNewMatch(req: Request, res: Response) {
    const result = await this.matchesService.createNewMatch({ ...req.body });
    return res.status(201).json(result);
  }

  public async updateMatchToFinished(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.matchesService.updateMatchToFinished(Number(id));
    return res.status(200).json({ message: result });
  }

  public async updateMatchGoals(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.matchesService.updateMatchGoals(Number(id), req.body);
    return res.status(200).json({ message: result });
  }
}
