import './heater-switch.html'
import { HeaterSwitch } from '../api/heater-switch.js'

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('heater-switch');
});

Template.heaterSwitch.events({
    'change .onoffswitch-checkbox' (event, template) {
        const heaterOn = event.target.checked
        const requestedTemperature = Number(template.find('input#target-temp').value)
        persistHeaterSwitch(heaterOn, requestedTemperature)
    }
})

Template.heaterSwitch.events({
    'change #target-temp' (event, template) {
        const heaterOn = template.find('.onoffswitch-checkbox').checked
        const requestedTemperature = Number(event.target.value)
        persistHeaterSwitch(heaterOn, requestedTemperature)
    }
})

Template.heaterSwitch.helpers({
    currentSwitch() {
        return HeaterSwitch.find({}, {
            limit: 1
        }).fetch()[0];
    },

    lastSwitches() {
        return HeaterSwitch.find({}, {
            sort: {
                createdAt: -1
            },
            limit: 20
        });
    },

    formatDate(dateToFormat) {
        return moment(dateToFormat).format('HH:mm:ss MM-DD-YYYY');
    }
});


function persistHeaterSwitch(heaterOn, requestedTemperature) {
    console.log('heater on? = ' + heaterOn)
    console.log('requestedTemperature = ' + requestedTemperature)

    Meteor.call('heater.switch', heaterOn, requestedTemperature);
}