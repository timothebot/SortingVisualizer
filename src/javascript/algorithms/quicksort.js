
class QuickSort extends AbstractAlgorithm{

    sort() {
        this.quicksort(0, this.array.length - 1);
    }

    quicksort(left, right) {
        if (left < right) {
            let pivot = this.partition(left, right);
            this.quicksort(left, pivot - 1);
            this.quicksort(pivot + 1, right);
        }
    }

    partition(left, right) {
        let pivot = this.array[right];
        let i = left;
        for (let j = left; j < right; j++) {
            if (this.array[j] <= pivot) {
                this.swap(i, j);
                i++;
            }
        }
        this.swap(i, right);
        return i;
    }

    swap(i, j) {
        let temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;

        this.queue.push(() => this.swapVisual(i,j));
    }

    swapVisual(i, j) {
        let view = $("#view");
        view.find("[data-key='" + j + "']").css("order", i);
        view.find("[data-key='" + i + "']").css("order", j);

    }
}