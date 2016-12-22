import './heater-status.html'
import {HeaterStatus} from '../api/heater-status.js'

Template.heaterStatus.onCreated(function bodyOnCreated() {
    Meteor.subscribe('heater-status');
});

Template.heaterStatus.helpers({
    currentStatus() {
        return HeaterStatus.find({}, {
            sort: {
                createdAt: -1
            },
            limit: 1
        }).fetch()[0];
    },

    lastStatuses() {
        return HeaterStatus.find({}, {
            sort: {
                createdAt: -1
            },
            limit: 20
        });
    },

    formatDate(dateToFormat) {
        return moment(dateToFormat).format('HH:mm:ss MM-DD-YYYY');
    },

    formatBoolean(boolToFormat) {
        return boolToFormat ? '&#x2612;' : '&#x2610;';
    },

    formatTemperature(tempToFormat) {
        return `${tempToFormat}&#x2103;`;
    }

});