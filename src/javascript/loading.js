/*****************
 *
 *  Author: Timo
 *  Date: 25.01.22
 *
 *****************/


$(document).ready(function () {
    setTimeout(function () {
        $("#content").css("display", "block");
        $("#footer").show()
        $('#loading').fadeOut(500);
        window.dispatchEvent(new Event('resize'));
    }, 1100);
});

function lerp (start, end, amt){
    return (1-amt)*start+amt*end
}