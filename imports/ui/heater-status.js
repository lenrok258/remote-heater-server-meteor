import './heater-status.html'
import {
    HeaterStatus
} from '../api/heater-status.js'

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
    },

    formatStatus(statusToFormat) {
        switch (statusToFormat) {
            case 'on':
                return 'włączony';
            case 'off':
                return 'wyłączony';
            default:
                return 'nieznany';

        }
    },

    temperatureChartData() {
        let dataInput = HeaterStatus.find({}, {
            sort: {
                createdAt: -1
            },
            limit: 120
        }).fetch();

        let dataChart = dataInput.map(function (input) {
            return {
                x: input.createdAt,
                y: input.temperature
            }
        })

        return {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Temperatura w biurze'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Temperatura'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                data: dataChart
            }]
        };
    }

});