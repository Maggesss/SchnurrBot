class Bothelper {
    /**
     * @param {Bothelper} data
     */
    constructor(data) {
        /**
         * @type {Array}
         */
         this.helper = data.helper; if(!this.helper) { this.helper = ["444460699025014784", "954526122836623370"] }
        
    }
    /**
     * @returns {String}
     */
    toString() {
        return JSON.stringify(this)
    }
}

module.exports = Bothelper