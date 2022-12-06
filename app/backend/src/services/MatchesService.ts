import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamsModel';
import Match from '../database/models/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: ModelStatic<Match> = Match,
  ) {}

  public async getAllMatches(): Promise<string[]> {
    const matches = await this.matchesModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    const matchesList = matches.map((item) => item.dataValues);

    return matchesList;
  }

  public async getInProgressMatches(inProgressStatus: string): Promise<string[]> {
    const inProgress = inProgressStatus === 'true';

    const matches = await this.matchesModel.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    const matchesList = matches.map((item) => item.dataValues);

    return matchesList;
  }
}
