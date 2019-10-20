import nock = require('nock');

before( function disableNetConnect() {
    nock.disableNetConnect();
});
