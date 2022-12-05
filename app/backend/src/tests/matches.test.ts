import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import Match from "../database/models/MatchesModel";

import App from "../app";
import { allMatchesModelMock, 
  allMatchesList, 
  inProgressMatchesModelMock,
  inProgressMatchesList,
  finishedMatchesModelMock,
  finishedMatchesList } from "./mocks/matches.mock";

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe("Test /matches endpoint", () => {
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
      sinon.stub(Match, "findAll").resolves(inProgressMatchesModelMock as Match[]);

      const response = await chai.request(app).get("/matches?inProgress=true");

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(inProgressMatchesList);
    });

    it("The query inProgress=false should be able to filter finished matches", async () => {
      sinon.stub(Match, "findAll").resolves(finishedMatchesModelMock as Match[]);

      const response = await chai.request(app).get("/matches?inProgress=flase");

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(finishedMatchesList);
    });
  });
