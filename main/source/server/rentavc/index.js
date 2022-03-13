class customVC {
    /**
     * @param {customVC} data
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
        this.owner = data.owner; if(!this.owner) { this.owner = "None" }

    }
    /**
     * @returns {String}
     */
    toString() {
        return JSON.stringify(this)
    }
}

module.exports = customVC