export default class ApiAlbums {
  getTotalNumberOfAlbums() {
    return cy
      .request({
        method: "GET",
        url: `${Cypress.env("urls").task4}/albums`,
      })
      .then((res) => {
        const numberOfAlbums = res.body.length;
        expect(res.status).to.eq(200);
        expect(res.statusText).to.eq("OK");
        expect(numberOfAlbums).to.be.greaterThan(0);
        return numberOfAlbums;
      });
  }
  createAlbum(album) {
    return cy
      .request({
        method: "POST",
        url: `https://albums-collection-service.herokuapp.com/albums`,
        body: album,
      })
      .then((res) => {
        const albumId = res.body.album_id;
        cy.log("Successfully created 1 album.");
        expect(res.status).to.eq(201);
        expect(res.statusText).to.eq("Created");
        return cy.wrap(albumId);
      });
  }
  getAlbumDetailsById(albumId) {
    return cy
      .request({
        method: "GET",
        url: `https://albums-collection-service.herokuapp.com/albums/${albumId}`,
      })
      .then((res) => {
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
        return resAlbum;
      });
  }
  deleteAnAlbumById(albumId) {
    cy.request({
      method: "DELETE",
      url: `https://albums-collection-service.herokuapp.com/albums/${albumId}`,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.statusText).to.eq("OK");
      cy.log(`Successfully deleted ${res.body.deletedCount} album.`);
    });
  }
  partialUpdateAlbum(albumId, updatedAlbum) {
    cy.request({
      method: "PATCH",
      url: `https://albums-collection-service.herokuapp.com/albums/${albumId}`,
      body: updatedAlbum,
    }).then((res) => {
      cy.log("Successfully updated 1 album.");
      expect(res.status).to.eq(200);
      expect(res.statusText).to.eq("OK");
      expect(res.body.modifiedCount).to.eq(1);
    });
  }
  checkTitleSongYearAlbumUpdateAttributes(
    albumId,
    updatedAlbum,
    albumBeforeUpdate
  ) {
    this.getAlbumDetailsById(albumId).then((resAlbum) => {
      //Check the updated attributes
      const partialUpdatedAlbum = {
        title: resAlbum.title,
        songs: resAlbum.songs,
        year: resAlbum.year,
      };

      expect(partialUpdatedAlbum).to.deep.eq(updatedAlbum);

      //Check that the unchanged attributes are the same as before the update
      expect(resAlbum.artist).to.eq(albumBeforeUpdate.artist);
      expect(resAlbum.genre).to.eq(albumBeforeUpdate.genre);
      expect(resAlbum.label).to.eq(albumBeforeUpdate.label);
    });
  }
  checkIfAlbumDoesNotExist(albumId) {
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
  }
}
