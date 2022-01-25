/*****************
 *
 *  Author: timo
 *  Date: 24.01.22
 *
 *****************/

console.log("%cWelcome to the console land!", "color: #ff0000; font-size: 20px;");

$ = jQuery;

// Settings
let speed = 100;
let length = 14;

// Variables
let array = [];
let isSorting = false;

// Algorithms
let qs = new QuickSort();

$(document).ready(() => {
    $("#speed-slider").rangeslider({
        min: 1,
        max: 200,
        value: speed,
        onSlideEnd: (event, ui) => {
            speed = ui;
            console.log(speed);
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
    toggleSlider()
    toggleButton()

    if(!qs.isRunning()) {
        qs.init(array, speed);
    }else {
        qs.stop()
    }
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
    $(".select-section.algorithm > button").each(function () {
        $(this).removeClass("selected");
    });
    $("#" + algorithm).addClass("selected");
}

// </editor-fold>

// <editor-fold desc="Other Functions">

function toggleSlider() {
    isSorting = !isSorting;
    if (isSorting) {
        $("#speed-slider").attr("disabled", true);
        $("#length-slider").attr("disabled", true);
    } else {
        $("#speed-slider").removeAttr("disabled");
        $("#length-slider").removeAttr("disabled");
    }
}

function toggleButton() {
    $("#btn-go").text(isSorting ? "Stop" : "Sort");
    $("#btn-go").toggleClass("stop-btn")
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

// </editor-fold>


function renderArray() {
    let html = "";
    for (let i = 0; i < array.length; i++) {
        color = array[i] * 10
        while (color > 255) {
            color -= 255;
        }
        color = "hsl(" + color + ",90%,70%)";
        html += `<div class="bar" style="height: ${array[i] * 3 + 5}px; order: ${i}; box-shadow: ${color} 0px 0px 10px; background-color: ${color};" data-key="${array[i]}"></div>`;
    }
    $("#view").empty();
    $("#view").html(html);
}