import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import User from "../database/models/UsersModel";

import App from "../app";

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe("Test /login endpoint", () => {
  describe("Successful answers", () => {
    beforeEach(async () => {
      sinon.stub(User, "findOne").resolves({
        dataValues: {
          id: 1,
          username: "Admin",
          role: "admin",
          email: "email@test.com",
          password:
            "$2a$12$L1YqVHk.DvVw722Ooo48wu6RF//RcWVmfqO20TrxOeoHDynS0qksm",
        }
      } as User);
    });

    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it("The POST method should return status 200 with a token", async () => {
      const response = await chai.request(app).post("/login").send({
        email: "email@test.com",
        password: "123456",
      });

      expect(response.status).to.equal(200);
      expect(response.body.token).to.exist;
    });
  });

  describe("Client errors", () => {
    beforeEach(async () => {
      sinon.stub(User, "findOne").resolves(null);
    });

    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it(`shouldn't work if the email field is missing`, async () => {
      const response = await chai.request(app).post("/login").send({
        password: "123456",
      });

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal("All fields must be filled");
    });

    it(`shouldn't work if the password field is missing`, async () => {
      const response = await chai.request(app).post("/login").send({
        email: "email@test.com",
      });

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal("All fields must be filled");
    });

    it(`shouldn't work if the email is invalid`, async () => {
      const response = await chai.request(app).post("/login").send({
        email: "invalid_email@test.com",
        password: "123456",
      });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal("Incorrect email or password");
    });

    it(`shouldn't work if the password is invalid`, async () => {
      const response = await chai.request(app).post("/login").send({
        email: "email@test.com",
        password: "invalid_password",
      });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal("Incorrect email or password");
    });
  });
});
