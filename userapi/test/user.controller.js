const { expect } = require("chai");
const userController = require("../src/controllers/user");
const db = require("../src/dbClient");

describe("User", () => {
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb();
  });

  describe("Create", () => {
    it("create a new user", (done) => {
      const user = {
        username: "aymoon",
        firstname: "Rémy",
        lastname: "Jovanovic",
      };
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result).to.be.equal("OK");
        done();
      });
    });

    it("passing wrong user parameters", (done) => {
      const user = {
        firstname: "Rémy",
        lastname: "Jovanovic",
      };
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });

    it("avoid creating an existing user", (done) => {
      const user = {
        username: "aymoon",
        firstname: "Rémy",
        lastname: "Jovanovic",
      };
      // Create a user
      userController.create(user, () => {
        // Create the same user again
        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null);
          expect(result).to.be.equal(null);
          done();
        });
      });
    });
  });

  describe("Get", () => {
    it("get a user by username", (done) => {
      const user = {
        username: "aymoon",
        firstname: "Rémy",
        lastname: "Jovanovic",
      };
      // Create a user
      userController.create(user, () => {
        // Get an existing user
        userController.get(user.username, (err, result) => {
          expect(err).to.be.equal(null);
          expect(result).to.be.deep.equal({
            firstname: "Rémy",
            lastname: "Jovanovic",
          });
          done();
        });
      });
    });

    it("can not get a user when it does not exist", (done) => {
      const user = {
        username: "aymoon",
        firstname: "Rémy",
        lastname: "Jovanovic",
      };

      userController.get(user.username, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });
  });

  //delete user
  describe("Delete", () => {
    it(
      ("delete a user",
      (done) => {
        const user = {
          username: "aymoon",
          firstname: "Rémy",
          lastname: "Jovanovic",
        };
        userController.create(user, () => {
          userController.delete(user.username, (err, result) => {
            expect(err).to.be.equal(null);
            expect(result).not.to.be.equal(null);
            userController.get(user.username, (err, result) => {
              expect(err).to.not.be.equal(null);
              expect(result).to.be.eql(null);
              done();
            });
          });
        });
        it("can't delete a user that doesn't exist", (done) => {
      const user = {
        username: "aymoon",
        firstname: "Rémy",
        lastname: "Jovanovic",
      };
          userController.get(user.username, (err, result) => {
            expect(err).to.be.not.equal(null);
            expect(result).to.be.equal(null);
            done();
          });
        });
      })
    );
  });
});
