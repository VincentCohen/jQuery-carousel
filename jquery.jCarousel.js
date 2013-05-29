;(function($, window, document, undefined){
    
    /*
    var defaults = {
        width:700,
        height:600,
        nextBtn: '.next',
        prevBtn: '.prev',
        itemsPerSlide: false,
        navigationIdentifier: "#navigationContainer"
    };

    var settings = {};*/

    var methods = {
        "defaults": {
            width:700,
            height:600,
            itemsPerSlide: false,
            navigationIdentifier: "#navigationContainer"
        },
        "settings": {},
        "init": function (options) {
            methods.settings = $.extend({}, methods.defaults, options);

            var options = methods.settings;
            
            // get children
            var elemChildren =  $(this).children();

            // calculate the parent elements width
            var elemParentWidth = $(elemChildren[0]).outerWidth(true) * elemChildren.length;

            // check if the sliders has multiple items per slide & set the width accordingly
            if(options.itemsPerSlide !== false){
                options.width = $(elemChildren[0]).outerWidth(true) * options.itemsPerSlide;
            }
            
            // set amount of slides
            options.amountOfSlides = Math.round(elemChildren.length / options.itemsPerSlide);

            // set panel width
            $(this).width(elemParentWidth);

            options.windowIdentifier = $(this).attr("id") + "Window";
            options.panelIdentifier = "#"+$(this).attr("id");

            // set the window the slider is containing
            $elemWindow = $(this).wrap('<div class="windowWrapper" id="'+options.windowIdentifier+'"/>')
            $elemPanel = $(this).parent().css({
                width: options.width,
                height: options.height,
                position: 'relative',
                overflow: 'hidden',
                background: 'red'
            });

            options.elemWindow = $elemWindow;
            options.elemPanel = $elemPanel;

            // add navigation
            $elemNavigation = $("<ul>", {class:"navigation"});

            for (var i = 0; i < options.amountOfSlides; i++){
                
                if(i == 0){
                    $elemNavItem = $("<li>", {class: "nav_item active panel"+i});
                }else{
                    $elemNavItem = $("<li>", {class: "nav_item panel"+i});
                }

                $elemNavItem.attr("data-slide", i);
                $elemNavItem.text(i);

                $elemNavItem.bind("click", function(event){
                    methods.goToSlide($(this).attr("data-slide"));
                });

                $elemNavigation.append($elemNavItem);
            }

            $(options.navigationIdentifier).append($elemNavigation);

            options.elemNav = $elemNavigation;

            // save options
            options.activeSlide = 0;
            options.currentSlideOffset = 0;
            
            options.maxSlideWidth = options.width * (options.amountOfSlides - 1); // counting starts at 0 not 1
            
            methods.settings = options;
            $(this).data("settings", options);
            
        },
        "goNext": function (options) {
            // get options
            var settings = methods.settings;
            // calculate what slide to go to
            var activeSlide = settings.activeSlide + 1;

            // slide it
            methods.goToSlide(activeSlide);
        },
        "goPrevious": function (options) {
            // get options
            var settings = methods.settings;
            
            // calculate what slide to go to
            var activeSlide = settings.activeSlide - 1;

            // slide it
            methods.goToSlide(activeSlide);
        },
        "goToSlide": function(activeSlide){

            var settings = methods.settings;

            console.log(settings);

            // calculate slideTo
            var slideTo =  activeSlide * settings.width;

            // check if should slide            
            if(slideTo >= 0 && slideTo <= settings.maxSlideWidth){
                // slide!
                settings.elemWindow.animate({
                    "left": "-"+ slideTo
                });

            }else{

                if(slideTo > settings.maxSlideWidth){
                    // start at beginning
                    slideTo = 0;
                    activeSlide = 0;
                }else{
                    // jump to end
                    slideTo = settings.maxSlideWidth;
                    activeSlide = settings.amountOfSlides - 1;
                }

                // slide!
                settings.elemWindow.animate({
                    "left": "-"+ slideTo
                });
            }

            settings.elemNav.find("li").removeClass("active");

            if(activeSlide == 0){
                settings.elemNav.find('li:first-child').addClass("active");
            }else{
                settings.elemNav.find('li:eq('+activeSlide+')').addClass("active");
            }

            settings.currentSlideOffset = slideTo;
            settings.activeSlide = activeSlide;
            
            // save options
            methods.settings = settings;
        }
    };

    $.fn.jCarousel = function(method) { 
        var args = arguments;
        var argss = Array.prototype.slice.call(args, 1);

        return this.each(function() {
            var $this = $(this);  // Might make sense to ignore this and just pass `this` to the following things

            if (methods[method]) {
                methods[method].apply($this, argss);
            }
            else if (typeof method === "object" || !method) {
                methods.init.apply($this, args);
            }
            else {
                $.error("method " + method + " does not exist on jQuery.jCarousel");
            }
        });
    };
})(jQuery, window, document);