class SelectionSort extends AbstractAlgorithm {
    sort() {
        this.selectionsort()
        console.log(this.array)
    }

    selectionsort() {
        for (let i = 0; i < this.array.length-1; i++) {
            let min = i
            for (let j = i + 1; j < this.array.length; j++) {
                if (this.array[j] < this.array[min]) {
                    min = j
                    this.queue.push(() => this.highlight(j))
                }
            }
            this.swap(min, i)
        }
    }
}