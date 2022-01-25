let qs_isRunning = false;

let qs_useTemp = false;
let qs_temp_left = 0;
let qs_temp_right = 0;

function quicksort_old(arr, speed) {
    qs_isRunning = true;
    if (arr.length <= 1) return;

    let doneArr = [...arr];
    doneArr = qs_sort_full(doneArr, 0, doneArr.length - 1);
    qs_loop(arr, doneArr, speed);
}

function qs_loop(arr, doneArr, speed) {
    setTimeout(() => {
        arr = qs_sort(arr, 0, arr.length - 1)
        console.log("go")
        if (arr !== doneArr && qs_isRunning) {
            if (qs_useTemp) {

            }
            qs_loop(arr, doneArr, speed);
        }
    }, 1000 - speed);
}

function qs_sort(arr, left, right) {
    let index;
    if (arr.length > 1) {
        index = qs_partition(arr, left, right);
    }
    if (left < index - 1) {
        qs_sort_full(arr, left, index - 1);
    }
    if (index < right) {
        qs_sort_full(arr, index, right);
    }
    return arr;
}

function qs_sort_full(arr, left, right) {
    let index;
    if (arr.length > 1) {
        index = qs_partition(arr, left, right);
        if (left < index - 1) {
            qs_sort_full(arr, left, index - 1);
        }
        if (index < right) {
            qs_sort_full(arr, index, right);
        }
    }
    return arr;
}

function qs_partition(arr, left, right) {
    // find pivot that is the median of the left, right and center elements
    let pivot = arr[Math.floor((left + right) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
        // loop through until we find the left item and right item
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            // swap the items
            qs_swap(arr, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function qs_swap(arr, left, right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;



}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
