import { HeaterSwitch } from '../imports/api/heater-switch.js'
import { saveStatus } from '../imports/api/heater-status.js'


if (Meteor.isServer) {
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });

  Api.addRoute('switch/', {
    authRequired: false
  }, {
    get: function () {
      let currentSwitchState = HeaterSwitch.find({}, {
        limit: 1,
        sort: {
          createdAt: -1
        },
      }).fetch()[0];

      let response = {};

      // command
      if (currentSwitchState.enabled == true) {
        response.command = 'THON'
      } else {
        response.command = 'THOFF'
      }

      // temp
      response.temp = currentSwitchState.temperature;

      // save heater status
      try {
        let currentTemp = this.queryParams.current_temp;
        let currentStatus = this.queryParams.current_state;
        saveStatus(parseFloat(currentTemp), currentStatus);
      } catch(err) {
        console.err(err)
      }

      return response;
    }
  });

}