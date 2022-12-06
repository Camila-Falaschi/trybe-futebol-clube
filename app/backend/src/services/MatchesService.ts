import { ModelStatic, Op } from 'sequelize';
import IMatchGoals from '../interfaces/IMatchGoals';
import AppErrors from '../utils/AppErrors';
import Team from '../database/models/TeamsModel';
import Match from '../database/models/MatchesModel';
import IMatch from '../interfaces/IMatch';

export default class MatchesService {
  constructor(
    private matchesModel: ModelStatic<Match> = Match,
    private teamsModel: ModelStatic<Team> = Team,
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

  public async createNewMatch(match: IMatch): Promise<IMatch> {
    const { homeTeam, awayTeam } = match;

    if (homeTeam === awayTeam) {
      throw new AppErrors(422, 'It is not possible to create a match with two equal teams');
    }

    const { count } = await this.teamsModel.findAndCountAll({
      where: { [Op.or]: [{ id: homeTeam }, { id: awayTeam }] },
    });

    if (count !== 2) throw new AppErrors(404, 'There is no team with such id!');

    const createdMatch = await this.matchesModel.create({ ...match, inProgress: true });
    return createdMatch.dataValues;
  }

  public async updateMatchToFinished(id: number): Promise<string> {
    await this.matchesModel.update(
      { inProgress: false },
      { where: { id } },
    );

    return 'Finished';
  }

  public async updateMatchGoals(id: number, matchGoals: IMatchGoals): Promise<string> {
    const { homeTeamGoals, awayTeamGoals } = matchGoals;

    await this.matchesModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    return `Updated Scoreboard: Home Team: ${homeTeamGoals} X Away Team: ${awayTeamGoals}`;
  }
}
