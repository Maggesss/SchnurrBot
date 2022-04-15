class Server {
    /**
     * @param {Server} data
     */
    constructor(data) {
        /**
         * @type {String}
         */
        this.id = data.id;
        if(!this.id || typeof(this.id) != "string") { throw Error("Invalid ID: Pass a valid ID object") }
        /**
         * @type {String}
         */
        this.suggestionChannelID = data.suggestionChannelID; if(!this.suggestionChannelID) { this.suggestionChannelID = "None" }
        /**
         * @type {String}
         */
        this.rentavcChannelID = data.rentavcChannelID; if(!this.rentavcChannelID) { this.rentavcChannelID = "None" }
        /**
         * @type {String}
         */
        this.name = data.name; if(!this.name) { this.name = "None" }
        /**
         * @type {String}
         */
        this.ticketchannel = data.ticketchannel; if(!this.ticketchannel) { this.ticketchannel = "None" }
        /**
         * @type {String}
         */
        this.ticketmessage = data.ticketmessage; if(!this.ticketmessage) { this.ticketmessage = "None"}
    }
    /**
     * @returns {String}
     */
    toString() {
        return JSON.stringify(this)
    }
}

module.exports = Server