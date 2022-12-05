import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import Team from "../database/models/TeamsModel";

import App from "../app";
import { team, teamsList, teamsModelMock } from "./mocks/teams.mock";

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe("Test /teams endpoint", () => {
    beforeEach(async () => {
      sinon.stub(Team, "findAll").resolves(teamsModelMock as Team[]);
      sinon.stub(Team, "findOne").resolves({
        dataValues: team,
      } as Team);
    });

    afterEach(() => {
      (Team.findAll as sinon.SinonStub).restore();
      (Team.findOne as sinon.SinonStub).restore();
    });

    it("The GET method should return status 200 with a list of all teams", async () => {
      const response = await chai.request(app).get("/teams");

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(teamsList);
    });

    it("/:id should return status 200 with the team from the same id", async () => {
      const response = await chai.request(app).get("/teams/:id");

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(team);
    });
  });
