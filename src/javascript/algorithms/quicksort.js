
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
}