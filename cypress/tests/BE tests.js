describe("Task 3", () => {
  const thresholdTimeResponse = 100;
  it("Check if user can perform multiple actions of different end-points", () => {
    //Check that a user exists with the username "Karianne"
    cy.request({
      method: "GET",
      url: `https://jsonplaceholder.typicode.com/users?username=Karianne`,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.statusText).to.eq("OK");
      expect(res.body[0].username).to.eq("Karianne");
    });

    //Add a new post and specify a title, body and user id
    cy.request({
      method: "POST",
      url: `https://jsonplaceholder.typicode.com/posts`,
      body: {
        userId: 4,
        title: "Test automation",
        body: "Test automation is awesome",
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.statusText).to.eq("Created");
    });

    //Check if the API end-point will fail if the response time passes the given threshold
    cy.request({
      method: "GET",
      url: `https://jsonplaceholder.typicode.com/posts/4/comments`,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.statusText).to.eq("OK");
      expect(res.duration).to.be.lessThan(
        thresholdTimeResponse,
        `The response time exceeded the threshold of ${thresholdTimeResponse}`
      );
    });
  });
});
describe("Task 4", () => {
  it("Check that a new album can be created", () => {
    let numberOfAlbums;
    let albumId;
    const newAlbum = {
      title: "Test automation",
      artist: "Cypress",
      genre: "FE and BE",
      label: "Awesomes",
      songs: 14,
      year: 2018,
    };
    //Get the total number of albums
    cy.request({
      method: "GET",
      url: `https://albums-collection-service.herokuapp.com/albums`,
    }).then((res) => {
      numberOfAlbums = res.body.length;
      expect(res.status).to.eq(200);
      expect(res.statusText).to.eq("OK");
      expect(numberOfAlbums).to.be.greaterThan(0);
    });

    //Create a new album
    cy.request({
      method: "POST",
      url: `https://albums-collection-service.herokuapp.com/albums`,
      body: newAlbum,
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.statusText).to.eq("Created");
      albumId = res.body.album_id;

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
    });
    //Validate if the total number of albums operation decreased after album was deleted
    cy.request({
      method: "GET",
      url: `https://albums-collection-service.herokuapp.com/albums`,
    }).then((res) => {
      const actualNumberOfAlbums = res.body.length;
      expect(res.status).to.eq(200);
      expect(res.statusText).to.eq("OK");
      expect(numberOfAlbums).to.eq(actualNumberOfAlbums);
    });
  });
  it("Check that an album can be updated", () => {
    let albumId;
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
    cy.request({
      method: "POST",
      url: `https://albums-collection-service.herokuapp.com/albums`,
      body: newAlbum,
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.statusText).to.eq("Created");
      albumId = res.body.album_id;

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
        url: `https://albums-collection-service.herokuapp.com/albums/${albumId}`
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.statusText).to.eq("OK");
        expect(res.body.deletedCount).to.eq(1);
      })
      //Validate if the album was deleted
      cy.request({
        method: "GET",
        url: `https://albums-collection-service.herokuapp.com/albums/${albumId}`,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(404);
        expect(res.statusText).to.eq("Not Found");
        expect(res.body).to.eq("The album with the given album_id was not found.")
      })
    });
  });
});
