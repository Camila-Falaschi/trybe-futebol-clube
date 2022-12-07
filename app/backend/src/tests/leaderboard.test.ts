import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import Match from "../database/models/MatchesModel";

import App from "../app";

import { leaderboardHome, matchMockHomeTeam, teamsMockHomeTeam } from "./mocks/leaderboard.mock";
import Team from "../database/models/TeamsModel";

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe("Test /leaderboard endpoint", () => {
  describe("/home", () => {
    beforeEach(() => {
      sinon.stub(Match, "findAll").resolves(matchMockHomeTeam as Match[]);
      sinon.stub(Team, "findAll").resolves(teamsMockHomeTeam as Team[]);
    })
  
    afterEach(() => {
      sinon.restore();
    });
  
    it("The GET method should return the leaderboard list with just the home teams", async () => {
      const response = await chai.request(app).get("/leaderboard/home");
  
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(leaderboardHome);
    });
  });
});
