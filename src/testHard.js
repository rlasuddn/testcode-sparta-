class Sensor {
    constructor(name) {
        this.name = name;
        this.powerStatus = 'off';
        this.status = '';
        this.reportingInterval = 10000;
    }
    turn(status) {
        if (this.powerStatus === 'off') {
            this.powerStatus = status;
        } else if (this.powerStatus === status) {
            throw new Error();
        } else {
            this.powerStatus = status;
        }
        if (this.powerStatus === 'on') {
            this.status = 'idle';
            setTimeout(() => {
                this.status = 'sensingDistance';
                setTimeout(() => {
                    this.status = 'reportingData';
                    setTimeout(() => {
                        this.status = 'idle';
                    }, 1000);
                }, 500);
            }, this.reportingInterval);
        }
    }
}

class IotServer {
    constructor() {
        this.sensor = [];
    }
    start([sensor]) {
        sensor.powerStatus === 'on' ? this.sensor.push(sensor) : null;
    }
    publish(info) {
        const { actionId, payload } = info;
        for (const i of this.sensor) {
            if (actionId === 'CHANGE_REPORTING_INTERVAL') i.reportingInterval = payload;
        }
    }
}

module.exports = {
    Sensor,
    IotServer,
};
