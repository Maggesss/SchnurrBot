class User {
    /**
     * @param {User} data 
     */
    constructor(data) {
        /**
         * @type {String}
         */
        this.id = data.id
        if(!this.id || typeof(this.id) != "string") { throw Error("Invalid ID: Pass a valid ID object") }
        /**
         * @type {Boolean}
         */
        this.afk = data.afk; if(!this.afk) { this.afk = false }
        /**
         * @type {String}
         */
        this.reason = data.reason; if(!this.reason) { this.reason = "None" }
        /**
         * @type {String}
         */
        this.name = data.name
        if(!this.name || typeof(this.name) != "string") { throw Error("Invalid name: Pass a valid name object") }
    }
    /**
     * @returns {String}
     */
    toString() {
        return JSON.stringify(this)
    }
}

module.exports = User