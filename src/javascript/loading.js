/*****************
 *
 *  Author: Timo
 *  Date: 25.01.22
 *
 *****************/


$(document).ready(function () {
    let isLoading = true;
    for (let i = 0; i <= 100; i++) {
        setTimeout(function () {
            $("#loading > p").text(i + "%");
        }, i * lerp(1, 20, i / 100));
        if (i === 100) {
            $("#content").show();
            setTimeout(function () {
                $("#loading").fadeOut(500);
                isLoading = false;
            }, 2000);
        }
    }
});

function lerp (start, end, amt){
    return (1-amt)*start+amt*end
}

class Quicksort {
    constructor(array) {
        this.array = array;
        this.length = array.length;
    }

    partition(p, r) {
        let x = this.array[r];
        let i = p - 1;
        for (let j = p; j < r; j++) {
            if (this.array[j] <= x) {
                i++;
                this.swap(i, j)
            }
        }
        this.swap(i + 1, r)
        return i + 1;
    }

    sort(p, r) {
        if (p < r) {
            let q = this.partition(p, r);
            this.sort(p, q - 1);
            this.sort(q + 1, r);
        }
    }

    swap(i, j) {
        let temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;
    }

    sortArray() {
        this.sort(0, this.length - 1);
    }

