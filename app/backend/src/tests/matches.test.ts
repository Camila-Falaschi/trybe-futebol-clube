import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import Match from "../database/models/MatchesModel";

import App from "../app";
import {
  allMatchesModelMock,
  allMatchesList,
  inProgressMatchesModelMock,
  inProgressMatchesList,
  finishedMatchesModelMock,
  finishedMatchesList,
  newMatchBody,
  newMatchCreated,
  wrongMatchBody,
  matchBodyWithNonexistentId,
  updatedScoreboard,
  mockFindAndCountAll,
  matchGoals,
} from "./mocks/matches.mock";
import { invalidToken, validToken } from "./mocks/token.mock";
import Team from "../database/models/TeamsModel";

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe("Test /matches endpoint", () => {
  describe("Successful answers", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("The GET method should return status 200 with a list of all matches", async () => {
      sinon.stub(Match, "findAll").resolves(allMatchesModelMock as Match[]);

      const response = await chai.request(app).get("/matches");

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(allMatchesList);
    });

    it("The query inProgress=true should be able to filter the matches that are in progress", async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(inProgressMatchesModelMock as Match[]);

      const response = await chai.request(app).get("/matches?inProgress=true");

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(inProgressMatchesList);
    });

    it("The query inProgress=false should be able to filter finished matches", async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(finishedMatchesModelMock as Match[]);

      const response = await chai.request(app).get("/matches?inProgress=flase");

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(finishedMatchesList);
    });

    it("The POST method should create a new match", async () => {
      sinon.stub(Match, "create").resolves({ dataValues: newMatchCreated } as Match);

      const response = await chai.request(app).post("/matches")
        .set("authorization", validToken)
        .send(newMatchBody);

      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(newMatchCreated);
    });

    it("The PATCH method, /:id/finish, should update the match to finished", async () => {
      sinon.stub(Match, "update").resolves();

      const response = await chai.request(app).patch("/matches/:id/finish");

      expect(response.status).to.equal(200);
      expect(response.body.message).to.deep.equal("Finished");
    });

    it("The PATCH method, /:id, should update the ongoing match", async () => {
      sinon.stub(Match, "update").resolves();

      const response = await chai.request(app).patch("/matches/:id").send(matchGoals);;

      expect(response.status).to.equal(200);
      expect(response.body.message).to.deep.equal(updatedScoreboard);
    });
  });

  describe("Client errors", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("Shouldn't create a new match if both teams' ids are the same", async () => {
      const response = await chai.request(app).post("/matches")
        .set("authorization", validToken)
        .send(wrongMatchBody);

      expect(response.status).to.equal(422);
      expect(response.body.message).to.deep.equal("It is not possible to create a match with two equal teams");
    });

    // it("Shouldn't create a new match if one of the teams' ids doesn't exist", async () => {
    //   sinon.stub(Team, "findAndCountAll").resolves(mockFindAndCountAll as Team[]);

    //   const response = await chai.request(app).post("/matches")
    //     .set("authorization", validToken)
    //     .send(matchBodyWithNonexistentId);

    //   expect(response.status).to.equal(404);
    //   expect(response.body.message).to.deep.equal("There is no team with such id!");
    // });

    it("Shouldn't create a new match if the token is invalid", async () => {
      const response = await chai.request(app).post("/matches")
        .set("authorization", invalidToken)
        .send(newMatchBody);

      expect(response.status).to.equal(401);
      expect(response.body.message).to.deep.equal("Token must be a valid token");
    });
  });
});
