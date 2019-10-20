import {expect} from 'chai';

import {providersList} from "../../src";

describe('providersList', function() {

   it('should have at least one element', function () {

      // use providersList from import

      expect(providersList).to.be.an('array');
      expect(providersList).to.have.lengthOf.above(0);
   });
});
