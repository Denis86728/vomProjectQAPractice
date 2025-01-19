import ApiUsers from "../api/task 3/apiUsers";
import ApiPosts from "../api/task 3/apiPosts";
import ApiAlbums from "../api/task4/apiAlbums";
const apiUsers = new ApiUsers();
const apiPosts = new ApiPosts();
const apiAlbums = new ApiAlbums();

describe("Task 3", () => {
  const thresholdTimeResponse = 50;
  const username = "Karianne";
  const titlePost = "Test automation";
  const bodyPost = "Test automation is awesome";
  it("Check if user can perform multiple actions of different API end-points", () => {
    //Check that a user exists with the username "Karianne"
    apiUsers.getUserByName(username);

    //Add a new post and specify a title, body and user id
    apiPosts.addPost(4, titlePost, bodyPost);

    //Check if the API end-point will fail if the response time passes the given threshold
    apiPosts.checkApiThresholdForPostComments(thresholdTimeResponse);
  });
});
describe("Task 4", () => {
  it("Check that a new album can be created", () => {
    let numberOfAlbumsBefore;
    const newAlbum = {
      title: "Test automation",
      artist: "Cypress",
      genre: "FE and BE",
      label: "Awesomes",
      songs: 14,
      year: 2018,
    };
    //Get the total number of albums
    apiAlbums.getTotalNumberOfAlbums().then((totalNumberAlbums) => {
      numberOfAlbumsBefore = totalNumberAlbums;
      cy.log(`Total number of albums is ${numberOfAlbumsBefore}.`);
    });

    //Create a new album
    apiAlbums.createAlbum(newAlbum).then((albumId) => {
      //Validate if the album was created
      apiAlbums.getAlbumDetailsById(albumId).then((resAlbulmDetails) => {
        expect(resAlbulmDetails).to.deep.eq(newAlbum);
      });
      //Delete the created album
      apiAlbums.deleteAnAlbumById(albumId);
    });
    //Validate if the total number of albums operation decreased after album was deleted
    apiAlbums.getTotalNumberOfAlbums().then((currentNumberOfAlbums) => {
      expect(numberOfAlbumsBefore).to.eq(currentNumberOfAlbums);
      cy.log(`Total number of albums is still ${currentNumberOfAlbums}.`)
    });
  });
  it("Check that an album can be updated", () => {
    let albumBeforeUpdate;
    const newAlbum = {
      title: "Automation test",
      artist: "Cypress version 14",
      genre: "BE",
      label: "API",
      songs: 10,
      year: 2025,
    };
    const modifiedAlbum = {
      title: "BE test",
      songs: 15,
      year: 2024,
    };
    //Create a new album with full information
    apiAlbums.createAlbum(newAlbum).then((albumId) => {
      //Validate if the album was created
      cy.request({
        method: "GET",
        url: `https://albums-collection-service.herokuapp.com/albums/${albumId}`,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.statusText).to.eq("OK");

        const resAlbum = {
          title: res.body.title,
          artist: res.body.artist,
          genre: res.body.genre,
          label: res.body.label,
          songs: res.body.songs,
          year: res.body.year,
        };
        expect(resAlbum).to.deep.eq(newAlbum);
        albumBeforeUpdate = res.body;
      });

      //Change the album title, songs and year
      cy.request({
        method: "PATCH",
        url: `https://albums-collection-service.herokuapp.com/albums/${albumId}`,
        body: modifiedAlbum,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.statusText).to.eq("OK");
        expect(res.body.modifiedCount).to.eq(1);
      });

      //Validate if the album was updated
      cy.request({
        method: "GET",
        url: `https://albums-collection-service.herokuapp.com/albums/${albumId}`,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.statusText).to.eq("OK");

        const resAlbum = {
          title: res.body.title,
          songs: res.body.songs,
          year: res.body.year,
        };

        expect(resAlbum).to.deep.eq(modifiedAlbum);
        expect(res.body.artist).to.eq(albumBeforeUpdate.artist);
        expect(res.body.genre).to.eq(albumBeforeUpdate.genre);
        expect(res.body.label).to.eq(albumBeforeUpdate.label);
        albumBeforeUpdate = res.body;
      });
      //Delete the genre and year of the album
      cy.request({
        method: "PATCH",
        url: `https://albums-collection-service.herokuapp.com/albums/${albumId}`,
        body: {
          genre: null,
          year: null,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.statusText).to.eq("OK");
        expect(res.body.modifiedCount).to.eq(1);
      });
      //Validate if the album was updated
      cy.request({
        method: "GET",
        url: `https://albums-collection-service.herokuapp.com/albums/${albumId}`,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.statusText).to.eq("OK");
        expect(res.body.genre).to.eq(null);
        expect(res.body.year).to.eq(null);
        expect(res.body.title).to.eq(albumBeforeUpdate.title);
        expect(res.body.artist).to.eq(albumBeforeUpdate.artist);
        expect(res.body.label).to.eq(albumBeforeUpdate.label);
        expect(res.body.songs).to.eq(albumBeforeUpdate.songs);
      });
      //Delete the created album
      cy.request({
        method: "DELETE",
        url: `https://albums-collection-service.herokuapp.com/albums/${albumId}`,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.statusText).to.eq("OK");
        expect(res.body.deletedCount).to.eq(1);
      });
      //Validate if the album was deleted
      cy.request({
        method: "GET",
        url: `https://albums-collection-service.herokuapp.com/albums/${albumId}`,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(404);
        expect(res.statusText).to.eq("Not Found");
        expect(res.body).to.eq(
          "The album with the given album_id was not found."
        );
      });
    });
  });
});
