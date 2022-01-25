/*****************
 *
 *  Author: Timo
 *  Date: 25.01.22
 *
 *****************/


$(document).ready(function () {
    setTimeout(function () {
        $('#loading').fadeOut(500);
    }, 1100);
});

function lerp (start, end, amt){
    return (1-amt)*start+amt*end
}