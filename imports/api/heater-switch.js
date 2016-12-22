import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const HeaterSwitch = new Mongo.Collection('heater-switch');

if (Meteor.isServer) {
    Meteor.publish('heater-switch', function heaterSwitch() {
        
        // Only for logged in user
        if (!this.userId) {
            return this.ready()
        }

        return HeaterSwitch
            .find({}, {
                sort: {
                    createdAt: -1
                },
                limit: 20
            })
    });
}

Meteor.methods({
    'heater.switch' (enabled, temperature) {
        check(enabled, Boolean);
        check(temperature, Number)

        // Only for logged in user
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        HeaterSwitch.insert({
            enabled: enabled,
            temperature: temperature,
            createdAt: new Date(),
            user: Meteor.user().username,
            // username: Meteor.users.findOne(this.userId).username,
        });
    }
});