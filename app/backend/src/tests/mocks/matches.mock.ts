const matchId41 = {
  id: 41,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 9,
  awayTeamGoals: 0,
  inProgress: true,
  teamHome: {
    teamName: "São Paulo",
  },
  teamAway: {
    teamName: "Internacional",
  },
};

const matchId42 = {
  id: 42,
  homeTeam: 6,
  homeTeamGoals: 1,
  awayTeam: 1,
  awayTeamGoals: 0,
  inProgress: true,
  teamHome: {
    teamName: "Ferroviária",
  },
  teamAway: {
    teamName: "Avaí/Kindermann",
  },
};

const matchId1 = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
  teamHome: {
    teamName: "São Paulo",
  },
  teamAway: {
    teamName: "Grêmio",
  },
};

const matchId2 = {
  id: 2,
  homeTeam: 9,
  homeTeamGoals: 1,
  awayTeam: 14,
  awayTeamGoals: 1,
  inProgress: false,
  teamHome: {
    teamName: "Internacional",
  },
  teamAway: {
    teamName: "Santos",
  },
};

export const allMatchesModelMock = [
  { dataValues: matchId1 },
  { dataValues: matchId41 },
];

export const allMatchesList = [matchId1, matchId41];

export const inProgressMatchesModelMock = [
  { dataValues: matchId41 },
  { dataValues: matchId42 },
];

export const inProgressMatchesList = [matchId41, matchId42];

export const finishedMatchesModelMock = [
  { dataValues: matchId1 },
  { dataValues: matchId2 },
];

export const finishedMatchesList = [matchId1, matchId2];

export const matchGoals = {
  homeTeamGoals: 3,
  awayTeamGoals: 1,
}

export const updatedScoreboard =
`Updated Scoreboard: Home Team: ${matchGoals.homeTeamGoals} X Away Team: ${matchGoals.awayTeamGoals}`;

export const newMatchBody = {
  homeTeam: 16,
  awayTeam: 8,
  matchGoals,
};

export const newMatchCreated = {
  id: 1,
  ...newMatchBody,
  inProgress: true,
};

export const wrongMatchBody = {
  homeTeam: 8,
  awayTeam: 8,
  matchGoals,
}

export const matchBodyWithNonexistentId = {
  homeTeam: 999999999,
  awayTeam: 8,
  matchGoals,
}

export const mockFindAndCountAll = {
  count: 2,
  rows: [
    { dataValues: { id: 10, teamName: 'Minas Brasília' } },
    { dataValues: { id: 12, teamName: 'Palmeiras' } }
  ]
}