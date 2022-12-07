import IMatch from '../../interfaces/IMatch';

export default class TeamMatchesData {
  _name: string;
  _totalPoints: number;
  _totalGames: number;
  _totalVictories: number;
  _totalDraws: number;
  _totalLosses: number;
  _goalsFavor: number;
  _goalsOwn: number;
  _goalsBalance: number;
  _efficiency: number;

  constructor() {
    this._name = '';
    this._totalPoints = 0;
    this._totalGames = 0;
    this._totalVictories = 0;
    this._totalDraws = 0;
    this._totalLosses = 0;
    this._goalsFavor = 0;
    this._goalsOwn = 0;
    this._goalsBalance = 0;
    this._efficiency = 0;
  }

  private win() {
    this._totalPoints += 3;
    this._totalVictories += 1;
  }

  private loss() {
    this._totalLosses += 1;
  }

  private draw() {
    this._totalPoints += 1;
    this._totalDraws += 1;
  }

  private gols(homeTeamGoals: number, awayTeamGoals: number) {
    this._goalsFavor += homeTeamGoals;
    this._goalsOwn += awayTeamGoals;
  }

  private goalsBalance() {
    this._goalsBalance = (this._goalsFavor - this._goalsOwn);
  }

  private efficiency() {
    this._efficiency = Number(((this._totalPoints / (this._totalGames * 3)) * 100).toFixed(2));
  }

  private handleGols(matches: IMatch[]) {
    matches.forEach((match) => {
      const { homeTeamGoals, awayTeamGoals } = match;
      if (homeTeamGoals > awayTeamGoals) {
        this.win();
        this.gols(homeTeamGoals, awayTeamGoals);
      }
      if (homeTeamGoals === awayTeamGoals) {
        this.draw();
        this.gols(homeTeamGoals, awayTeamGoals);
      }
      if (homeTeamGoals < awayTeamGoals) {
        this.loss();
        this.gols(homeTeamGoals, awayTeamGoals);
      }
    });
  }

  public async generate(teamName: string, matches: IMatch[]) {
    this._name = teamName;
    this._totalGames = matches.length;

    this.handleGols(matches);

    this.goalsBalance();
    this.efficiency();
  }
}
