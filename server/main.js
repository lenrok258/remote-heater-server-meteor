import { Meteor } from 'meteor/meteor';
import '../imports/api/heater-status.js'
import '../imports/api/heater-switch.js'
import '../imports/startup/accounts-config.js';
import './rest-api.js'

Meteor.startup(() => {
  // On server startup
});
