class BubbleSort extends AbstractAlgorithm {
    sort() {
        this.bubblesort();
    }

    bubblesort() {
        if (this.array.length <= 1) return;

        let isSwapped = false;
        for (let i = 0; i < this.array.length - 1; i++) {
            isSwapped = false;
            for (let j = 0; j < this.array.length; j++) {
                if (this.array[j] > this.array[j + 1]) {
                    this.swap(j, j + 1);
                    isSwapped = true;
                }
            }
            if (!isSwapped) break;
        }
    }
}