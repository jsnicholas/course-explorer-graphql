const { RESTDataSource } = require("@apollo/datasource-rest");

class TrackAPI extends RESTDataSource {
    baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
    // get a list of available tracks to display on homepage
    getTracksForHome() {
        return this.get("tracks");
    }
    // get author by ID
    getAuthor(authorId) {
        return this.get(`author/${authorId}`);
    }
    // get a single track by ID
    getTrack(trackId) {
        return this.get(`track/${trackId}`);
    }
    getTrackModules(trackId) {
        return this.get(`track/${trackId}/modules`)
    }

    // increment track views
    // makes an HTTP patch req to spacecat API
    incrementTrackViews(trackId) {
        return this.patch(`track/${trackId}/numberOfViews`)
    }

}

module.exports = TrackAPI;