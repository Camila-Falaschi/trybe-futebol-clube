import { ModelStatic } from 'sequelize';
import TeamMatchesData from '../database/entities/TeamMatchesData';
import ILeaderboard from '../interfaces/ILeaderboard';
import Match from '../database/models/MatchesModel';
import Team from '../database/models/TeamsModel';
import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';

export default class LeaderboardService {
  private _matchesList: IMatch[];
  private _teamMatches: IMatch[];
  private _teamsBoard: ILeaderboard[];

  constructor(
    private matchesModel: ModelStatic<Match> = Match,
    private teamsModel: ModelStatic<Team> = Team,
  ) {
    this._matchesList = [];
    this._teamMatches = [];
    this._teamsBoard = [];
  }

  private homeTeam(id: number) {
    const homeTeamMatches: IMatch[] = this._matchesList.filter((match) => id === match.homeTeam);

    this._teamMatches = homeTeamMatches;
  }

  private awayTeam(id: number) {
    const awayTeamMatches: IMatch[] = this._matchesList.filter((match) => id === match.awayTeam);

    this._teamMatches = awayTeamMatches;
  }

  private teamData(teamName: string) {
    const teamMatchesData = new TeamMatchesData();
    teamMatchesData.generate(teamName, this._teamMatches);

    const data = {
      name: teamMatchesData._name,
      totalPoints: teamMatchesData._totalPoints,
      totalGames: teamMatchesData._totalGames,
      totalVictories: teamMatchesData._totalVictories,
      totalDraws: teamMatchesData._totalDraws,
      totalLosses: teamMatchesData._totalLosses,
      goalsFavor: teamMatchesData._goalsFavor,
      goalsOwn: teamMatchesData._goalsOwn,
      goalsBalance: teamMatchesData._goalsBalance,
      efficiency: teamMatchesData._efficiency,
    };

    return data;
  }

  private orderBoardList() {
    const sortByVictories = [...this._teamsBoard].sort((a, b) =>
      a.totalVictories - b.totalVictories);
    const sortByBalance = [...sortByVictories].sort((a, b) =>
      a.goalsBalance - b.goalsBalance);
    const sortByFavor = [...sortByBalance].sort((a, b) =>
      a.goalsFavor - b.goalsFavor);
    const sortByOwn = [...sortByFavor].sort((a, b) =>
      a.goalsOwn - b.goalsOwn);

    return sortByOwn;
  }

  public async getLeaderboard(teamType: string): Promise<ILeaderboard[]> {
    const matchesList = await this.matchesModel.findAll({
      where: { inProgress: false },
    });

    this._matchesList = matchesList.map((item) => item.dataValues);

    const teams = await this.teamsModel.findAll();
    const teamsList: ITeam[] = teams.map((item) => item.dataValues);

    const teamsBoard = teamsList.map((team) => {
      if (teamType === 'homeTeam') { this.homeTeam(team.id); } else { this.awayTeam(team.id); }
      const data = this.teamData(team.teamName);
      return data;
    });

    this._teamsBoard = teamsBoard;

    const leaderboard = this.orderBoardList();
    return leaderboard;
  }
}
