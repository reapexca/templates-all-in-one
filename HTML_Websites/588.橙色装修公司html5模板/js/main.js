$(window).load(function() {
    $('#slider').nivoSlider({
        effect:'random',
        slices:15,
        boxCols:8,
        boxRows:8,
        animSpeed:500,
        pauseTime:4000,
        directionNav:false,
        directionNavHide:false,
        controlNav:false,
        captionOpacity:1
    });
});


$(document).ready(function() {
    $("#acc dt").click(function(){
        $(this).next("#acc dd")
            .slideToggle("slow")
            .siblings("#acc dd:visible")
            .slideUp("slow");
        $(this).toggleClass("active");
        $(this).siblings("#acc dt").removeClass("active");
        return false
    })
});