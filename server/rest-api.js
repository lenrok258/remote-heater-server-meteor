import {
  HeaterSwitch
} from '../imports/api/heater-switch.js'

if (Meteor.isServer) {
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });

  Api.addRoute('switch/', {
    authRequired: false
  }, {
    get: function () {
      return HeaterSwitch.find({}, {
        limit: 1,
        sort: {
          createdAt: -1
        },
      }).fetch()[0];
    }
  });

}