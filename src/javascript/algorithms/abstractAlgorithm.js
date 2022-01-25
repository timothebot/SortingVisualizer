
class AbstractAlgorithm {
    constructor() {
        this.array = [];
        this.isDone = true;
        this.queue = [];
        this.loop = null;
        this.queueLoop = null;
        this.speed = 100;
    }

    init(array, speed) {
        this.isDone = false;
        this.queue = [];
        this.array = array;
        this.speed = speed;
        this.sort()
        this.sort()
        if (this.isSorted()) {
            this.isDone = true;
            this.runQueueLoop();
            clearInterval(this.loop);
        }
    }

    isRunning() { return !this.isDone }

    runQueueLoop() {
        this.queueLoop = setInterval(() => {
            if (this.queue.length > 0) {
                this.queue.shift()();
            } else {
                this.isDone = true;
                clearInterval(this.queueLoop);
            }
        }, 200 - this.speed);
    }

    isSorted() {
        for (let i = 0; i < this.array.length - 1; i++) {
            if (this.array[i] > this.array[i + 1]) return false;
        }
        return true;
    }

    stop() {
        this.isDone = true;
        clearInterval(this.loop);
        clearInterval(this.queueLoop);
    }

    sort() {}

}