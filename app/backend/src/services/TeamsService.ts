import { ModelStatic } from 'sequelize';
import ITeam from '../interfaces/ITeam';
import Team from '../database/models/TeamsModel';

export default class TeamsService {
  constructor(
    private teamsModel: ModelStatic<Team> = Team,
  ) {}

  public async getAllTeams(): Promise<string[]> {
    const teams = await this.teamsModel.findAll();

    const teamsList = teams.map((item) => item.dataValues);

    return teamsList;
  }

  public async getTeamById(id: number): Promise<ITeam> {
    const team = await this.teamsModel.findOne({ where: { id } });

    return team?.dataValues;
  }
}
