import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import User from "../database/models/UsersModel";

import App from "../app";

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe("Test /login/validate endpoint", () => {
  it("POST method should returns status 200", async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiZW1haWxAdGVzdC5jb20ifQ.PDMngKoHDFWwwF-Qr9YNzKRkc3PUa-r02YBp63SCvZA";

    const response = await chai.request(app).get("/login/validate").set('authorization', token);

    expect(response.status).to.equal(200);
    expect(response.body.role).to.be.equal("admin");
  });
});
