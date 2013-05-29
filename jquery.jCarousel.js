;(function($, window, document, undefined){

    var optionss = {
        "defaults":{
            width:700,
            height:600,
            nextBtn: '.next',
            prevBtn: '.prev',
            itemsPerSlide: false,
        },
        "options": {},
        "init": function (options) {
            options = $.extend({}, this.defaults, options);
            
            // get children
            var elemChildren =  $(this).children();

            // calculate the parent elements width
            var elemParentWidth = $(elemChildren[0]).outerWidth(true) * elemChildren.length;

            // check if the sliders has multiple items per slide & set the width accordingly
            if(options.itemsPerSlide !== false){
                options.width = $(elemChildren[0]).outerWidth(true) * options.itemsPerSlide;
            }
            
            // set panel width
            $(this).width(elemParentWidth);

            options.windowIdentifier = $(this).attr("id") + "Window";
            options.panelIdentifier = "#"+$(this).attr("id");

            // set the window the slider is containing
            $(this).wrap('<div class="windowWrapper" id="'+options.windowIdentifier+'"/>')
            $(this).parent().css({
                width: options.width,
                height: options.height,
                position: 'relative',
                overflow: 'hidden',
                background: 'red'
            });

            // save options
            options.activeSlide = 1;
            options.currentSlideOffset = 0;
            options.amountOfSlides = Math.round(elemChildren.length / options.itemsPerSlide);
            options.maxSlideWidth = options.width * (options.amountOfSlides - 1); // counting starts at 0 not 1
            optionss.options = options;
        },
        "goNext": function (options) {
            // get options
            var options = $.extend({}, optionss.options, options);  
            // calculate slideTo 
            var slideTo =  options.width * options.activeSlide;

            // check if should slide or not
            if(slideTo <= options.maxSlideWidth){               
                // slide!
                $(options.panelIdentifier).animate({
                    "left": "-"+ slideTo
                });

                options.currentSlideOffset = slideTo;
                options.activeSlide = options.activeSlide + 1;
            }

            //var childClones = $(this).find('li:lt('+opions.itemsPerSlide+')');

            // save options         
            optionss.options = options;
        },
        "goPrevious": function (options) {
            // get options
            var options = $.extend({}, optionss.options, options);  
            // calculate slideTo
            var slideTo =  options.currentSlideOffset - options.width;
            // check if should slide            
            if(slideTo >= 0){
                // slide!
                $(options.panelIdentifier).animate({
                    "left": "-"+ slideTo
                });

                options.currentSlideOffset = slideTo;
                options.activeSlide = options.activeSlide - 1;
            }

            // save options
            optionss.options = options;
        }
    };

    $.fn.jCarousel = function(options) { 
        var args = arguments;
        var argss = Array.prototype.slice.call(args, 1);

        return this.each(function() {
            var $this = $(this);  // Might make sense to ignore this and just pass `this` to the following things
            if (optionss[options]) {
                optionss[options].apply($this, argss);
            }
            else if (typeof options === "object" || !options) {
                optionss.init.apply($this, args);
            }
            else {
                $.error("options " + options + " does not exist on jQuery.jCarousel");
            }
        });
    };
})(jQuery, window, document);