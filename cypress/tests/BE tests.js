import ApiUsers from "../api/task 3/apiUsers";
import ApiPosts from "../api/task 3/apiPosts";
import ApiAlbums from "../api/task4/apiAlbums";
const apiUsers = new ApiUsers();
const apiPosts = new ApiPosts();
const apiAlbums = new ApiAlbums();

describe("Task 3", () => {
  const thresholdTimeResponse = 250;
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
      cy.log(`Total number of albums is still ${currentNumberOfAlbums} after create and delete actions.`);
    });
  });
  it("Check that an album can be updated", () => {
    const newAlbum = {
      title: "Automation test",
      artist: "Cypress version 14",
      genre: "BE",
      label: "API",
      songs: 10,
      year: 2025,
    };
    const updatedAlbum = {
      title: "BE test",
      songs: 15,
      year: 2024,
    };
    const nullValuesAlbum = {
      genre: null,
      year: null,
    };
    //Create a new album with full information
    apiAlbums.createAlbum(newAlbum).then((albumId) => {
      //Validate if the album was created
      apiAlbums.getAlbumDetailsById(albumId).then((resAlbum) => {
        expect(resAlbum).to.deep.eq(newAlbum);
        //Save the updated album attributes as a new alias
        cy.wrap(resAlbum).as("albumInitial");
      });

      //Change the album title, songs and year
      apiAlbums.partialUpdateAlbum(albumId, updatedAlbum);

      //Validate if the album was updated using the alias
      cy.get("@albumInitial").then((albumBeforeUpdate) => {
        apiAlbums.checkTitleSongYearAlbumUpdateAttributes(
          albumId,
          updatedAlbum,
          albumBeforeUpdate
        );
      });
      //Delete the genre and year of the album
      apiAlbums.partialUpdateAlbum(albumId, nullValuesAlbum);

      //Save the updated album as a new alias
      apiAlbums.getAlbumDetailsById(albumId).then((resAlbum) => {
        cy.wrap(resAlbum).as("albumAfterGenreYearRemove");
      });

      //Validate if the album was updated using the alias
      apiAlbums.getAlbumDetailsById(albumId).then((resAlbum) => {
        cy.get("@albumAfterGenreYearRemove").then(
          (albumAfterGenreYearRemove) => {
            expect(resAlbum).to.deep.eq(albumAfterGenreYearRemove);
          }
        );
      });
      //Delete the created album
      apiAlbums.deleteAnAlbumById(albumId);
      //Validate if the album was deleted
      apiAlbums.checkIfAlbumDoesNotExist(albumId);
    });
  });
});
