/*****************
 *
 *  Author: timo
 *  Date: 24.01.22
 *
 *****************/

console.log("%cWelcome to the console land!", "color: #ff0000; font-size: 20px;");

$ = jQuery;

// Settings
let speed = 150;
let length = 25;
let useRainbowColor = true;
let customColor = "#00ddff";
let selectedAlgorithm = "quicksort";

// Variables
let array = [];
let isSorting = false;

let isShuffled = true;

// Algorithms
let qs = new QuickSort();
let bs = new BubbleSort();
let ss = new SelectionSort();

$(document).ready(() => {
    $("#speed-slider").rangeslider({
        min: 1,
        max: 200,
        value: speed,
        onSlideEnd: (event, ui) => {
            speed = ui;
        },
        polyfill: false,
        handleClass: 'range-slider-thumb',
        rangeClass: 'range-slider',
        horizontalClass: 'range-slider-horizontal',
        fillClass: 'range-slider-fill',
    });
    $("#length-slider").rangeslider({
        min: 1,
        max: 50,
        value: length,
        onSlide: (event, ui) => {
            length = ui;
            generateArray()
            renderArray();
        },
        polyfill: false,
        handleClass: 'range-slider-thumb',
        rangeClass: 'range-slider',
        horizontalClass: 'range-slider-horizontal',
        fillClass: 'range-slider-fill'
    });
    generateArray();
    renderArray();
});

function startSort() {
    if (!isShuffled) {
        isShuffled = true;
        generateArray();
        renderArray();
        toggleButton("Sort")
        return;
    }
    if (isSorting) {
        qs.stop();
        bs.stop();
        ss.stop();
        generateArray()
    } else {
        switch (selectedAlgorithm) {
            case "quicksort":
                qs.init(array, speed);
                break;
            case "bubblesort":
                bs.init(array, speed);
                break;
            case "selectionsort":
                ss.init(array, speed);
                break;
            default:
                qs.init(array, speed);
                break;
        }
    }

    isSorting = !isSorting;

    toggleSlider()
    toggleButton()
}

function generateArray() {
    array = [];
    for (let i = 0; i < length; i++) {
        array[i] = i;
    }
    array = shuffle(array);
}

// <editor-fold desc="Setter Functions">

function setAlgorithm(algorithm) {
    selectedAlgorithm = algorithm;
    $(".select-section.algorithm > button").each(function () {
        $(this).removeClass("selected");
    });
    $("#" + algorithm).addClass("selected");
}

function setInfo(info) {
    $("[id*='info-']").removeClass("active");
    $("[id*='info-navigation-']").removeClass("selected");
    $("#info-" + info).addClass("active");
    $("#info-navigation-" + info).addClass("selected");
}
// </editor-fold>

// <editor-fold desc="Other Functions">

function toggleSlider() {
    $(".select-section").toggleClass("disabled");
}

function toggleButton(text="") {
    let btn = $("#btn-go");
    btn.text(isSorting ? "Stop" : "Sort");
    btn.toggleClass("stop-btn")
    if (text!=="") {
        btn.text(text);
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    if (!isShuffled) {
        isShuffled = true;
        toggleButton("Sort");
    }
    return array;
}

// </editor-fold>


function renderArray() {
    let html = "";
    let randomColor = Math.random() * 360
    for (let i = 0; i < array.length; i++) {
        let color = (i* 360 + randomColor)/array.length
        while (color > 360) {
            color -= 360;
        }
        color = "hsl(" + color + ",90%,70%)";
        html += `<div class="bar highlight" style="height: ${i * 3 * 55/array.length + 5}px; order: ${array[i]}; box-shadow: ${color} 0px 0px 10px; background-color: ${color};" data-key="${i}" data-baseorder="${array[i]}"></div>`;
    }
    $("#view").empty();
    $("#view").html(html);
}

function sortingIsOver() {
    isSorting = false;
    isShuffled = false;
    toggleSlider();
    toggleButton("Shuffle");
}