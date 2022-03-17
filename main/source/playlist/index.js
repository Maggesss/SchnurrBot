class Playlist {
    /**
     * @param {Playlist} data
     */
    constructor(data) {
        /**
         * @type {Number}
         */
        this.id = data.id;
        if(!this.id || typeof(this.id) != "number") { throw Error("Invalid ID: Pass a valid ID object") }
        /**
         * @type {String}
         */
        this.name = data.name; if(!this.name) { this.name = "None" }
        /**
         * @type {Array}
         */
         this.songs = data.songs; if(!this.songs) { this.songs = [] }
        
    }
    /**
     * @returns {String}
     */
    toString() {
        return JSON.stringify(this)
    }
}

module.exports = Playlist