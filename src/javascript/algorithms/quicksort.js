
class QuickSort extends AbstractAlgorithm{

    sort() {
        this.quicksort(0, this.array.length - 1);
    }

    quicksort(left, right) {
        let index = this.partition(left, right);
        if (left < index - 1) {
            this.quicksort(left, index - 1);
        }
        if (index < right) {
            this.quicksort(index, right);
        }
    }

    partition(left, right) {
        let pivot = this.array[right];
        let index = left;
        for (let j = left; j < right; j++) {
            if (this.array[j] < pivot) {
                this.swap(index, j);
                index++;
            }
        }
        this.swap(index, right);
        return index;
    }

    swap(i, j) {
        this.interactions++;
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];

        this.queue.push(() => this.highlight(i,j));
        this.queue.push(() => this.swapVisual(i,j));
    }

    swapVisual(i, j) {
        let view = $("#view");
        view.find("[data-key='" + j + "']").css("order", i);
        view.find("[data-key='" + i + "']").css("order", j);
    }

    highlight(i, j) {
        let view = $("#view");
        $("#view > div").removeClass("highlight");
        view.find("[data-key='" + i + "']").addClass("highlight");
        view.find("[data-key='" + j + "']").addClass("highlight");
    }
}