import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const HeaterStatus = new Mongo.Collection('heater-status');

if (Meteor.isServer) {
    Meteor.publish('heater-status', function heaterSwitch() {
        
        // Only for logged in user
        if (!this.userId) {
            return this.ready()
        }

        return HeaterStatus
            .find({}, {
                sort: {
                    createdAt: -1
                },
                limit: 60 * 12
            })
    });
}

export function saveStatus(temperature, status) {
    check(temperature, Number)
    check(status, String);

     HeaterStatus.insert({
            temperature: temperature,
            createdAt: new Date(),
            status: status
        });
}