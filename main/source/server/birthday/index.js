class Birthday {
    /**
     * @param {Birthday} data
     */
    constructor(data) {
        /**
         * @type {String}
         */
        this.userid = data.id;
        /**
         * @type {String}
         */
        this.name = data.name; if(!this.name) { this.name = "None" }
        /**
         * @type {String}
         */
        this.day = data.day; if(!this.day) { this.day = "None" }
        /**
         * @type {String}
         */
        this.month = data.month; if(!this.month) { this.month = "None"}
    }
    /**
     * @returns {String}
     */
    toString() {
        return JSON.stringify(this)
    }
}

module.exports = Birthday