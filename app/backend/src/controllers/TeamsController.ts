import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public async getAllTeams(_req: Request, res: Response) {
    const result = await this.teamsService.getAllTeams();

    return res.status(200).json(result);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.teamsService.getTeamById(Number(id));

    return res.status(200).json(result);
  }
}
