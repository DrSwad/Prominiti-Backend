class IO_Factory {
    set io(_io) {
        this._io = _io;
    }
    get io() {
        return this._io;
    }
}

const ioFactoryInstance = new IO_Factory();

module.exports = ioFactoryInstance;