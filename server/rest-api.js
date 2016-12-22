import { HeaterSwitch } from '../imports/api/heater-switch.js'

if (Meteor.isServer) {
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });

  Api.addRoute('switch/', {
    authRequired: false
  }, {
    get: function () {
      var currentSwitchState = HeaterSwitch.find({}, {
        limit: 1,
        sort: {
          createdAt: -1
        },
      }).fetch()[0];

      var response = {};

      // command
      if (currentSwitchState.enabled == true) {
        response.command = 'THON'
      } else {
        response.command = 'THOFF'
      }

      // temp
      response.temp = currentSwitchState.temperature

      return response;
    }
  });

}