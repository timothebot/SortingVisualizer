
class AbstractAlgorithm {
    constructor() {
        this.array = [];
        this.isDone = true;
        this.queue = [];
        this.loop = null;
        this.queueLoop = null;
        this.speed = 100;
        this.interactions = 0;
    }

    init(array, speed) {
        this.isDone = false;
        this.queue = [];
        this.array = array;
        this.unsortedArray = array.slice();
        this.speed = speed;
        this.interactions = 0;
        this.highlightNone()
    }

    start() {
        $("#view").addClass("running");
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
                $("#view").removeClass("running");
                sortingIsOver()
                this.highlightAll()
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

    highlightAll() {
        $("#view > div.bar").removeClass("highlight");
        let index = 0;
        let i = setInterval(() => {
            $("#view").find("[data-key='" + index + "']").addClass("highlight");
            index++;
            if (index >= this.array.length) {
                clearInterval(i);
            }
        }, 400/this.array.length)
    }

    highlightNone() {
        let index = 0;
        let i = setInterval(() => {
            $("#view > [data-baseorder="+(index)+"]").removeClass("highlight");
            index++;
            if (index >= this.array.length) {
                this.start()
                clearInterval(i);
            }
        }, 30)

    }

    swap(i, j) {
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        this.queue.push(() => this.highlight(i,j));
        this.queue.push(() => this.swapVisual(i,j));
    }

    highlight(i, j) {
        let view = $("#view");
        $("#view > div").removeClass("highlight");
        view.find("[data-key='" + i + "']").addClass("highlight");
        view.find("[data-key='" + j + "']").addClass("highlight");
    }

    swapVisual(i, j) {
        [this.unsortedArray[i], this.unsortedArray[j]] = [this.unsortedArray[j], this.unsortedArray[i]];
        let view = $("#view");
        let temp = view.find("[data-key='" + j + "']").css("order");
        view.find("[data-key='" + j + "']").css("order", view.find("[data-key='" + i + "']").css("order"));
        view.find("[data-key='" + i + "']").css("order", temp);
    }
}