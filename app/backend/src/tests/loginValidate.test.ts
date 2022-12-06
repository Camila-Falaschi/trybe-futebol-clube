import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import App from "../app";
import { validToken } from "./mocks/token.mock";

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe("Test /login/validate endpoint", () => {
  it("The GET method should return status 200 with the user role", async () => {
    const response = await chai.request(app).get("/login/validate").set('authorization', validToken);

    expect(response.status).to.equal(200);
    expect(response.body.role).to.be.equal("admin");
  });
});
