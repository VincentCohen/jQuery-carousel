/** the plugin **/
;(function($, window, document, undefined){
    
    var methods = {
        "defaults": {
            width:700,
            height:600,
            itemsPerSlide: false,
            navigationIdentifier: "#navigationContainer"
        },
        "settings": {},
        "init": function (options) {            
            var opts = $.extend({}, methods.defaults, options)

            $(this).data("jCarousel",opts);
            
            // get children
            var elemChildren =  $(this).children();

            // calculate the parent elements width
            var elemParentWidth = $(elemChildren[0]).outerWidth(true) * elemChildren.length;

            // check if the sliders has multiple items per slide & set the width accordingly
            if(opts.itemsPerSlide !== false){
                opts.width = $(elemChildren[0]).outerWidth(true) * opts.itemsPerSlide;
            }
            
            // set amount of slides
            opts.amountOfSlides = Math.round(elemChildren.length / opts.itemsPerSlide);

            // set panel width
            $(this).width(elemParentWidth);

            opts.windowIdentifier = $(this).attr("id") + "Window";
            opts.panelIdentifier = "#"+$(this).attr("id");

            // set the window the slider is containing
            $elemWindow = $(this).wrap('<div class="windowWrapper" id="'+options.windowIdentifier+'"/>')
            $elemPanel = $(this).parent().css({
                width: opts.width,
                height: opts.height,
                position: 'relative',
                overflow: 'hidden',
                background: 'red'
            });

            opts.elemWindow = $elemWindow;
            opts.elemPanel = $elemPanel;

            // add navigation
            $elemNavigation = $("<ul>", {class:"navigation"});

            for (var i = 0; i < opts.amountOfSlides; i++){
                
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

            $(opts.navigationIdentifier).append($elemNavigation);

            opts.elemNav = $elemNavigation;

            // save options
            opts.activeSlide = 0;
            opts.currentSlideOffset = 0;
            
            opts.maxSlideWidth = opts.width * (opts.amountOfSlides - 1); // counting starts at 0 not 1
            
            this.settings = opts;
            $(this).data("settings",opts);
        },
        "goNext": function (options) {
            // get options
            var settings = $(this).data("settings");

            // calculate what slide to go to
            var activeSlide = settings.activeSlide + 1;
            
            // reset active slide
            settings.activeSlide = activeSlide;

            $(this).data("settings", settings);

            // slide it
            methods.goToSlide.apply(this,[options]);
            //methods.goToSlide(activeSlide);
        },
        "goPrevious": function (options) {
            // get options
            var settings = $(this).data("settings");
            
            // calculate what slide to go to
            var activeSlide = settings.activeSlide - 1;

            // reset active slide
            settings.activeSlide = activeSlide;

            $(this).data("settings", settings);

            // slide it
            methods.goToSlide.apply(this,[options]);
            //methods.goToSlide(activeSlide);
        },
        "goToSlide": function(options){

            var settings = $(this).data("settings");
            var activeSlide = settings.activeSlide;

            // calculate slideTo
            var slideTo = activeSlide * settings.width;

            // check if should slide            
            if(slideTo >= 0 && slideTo <= settings.maxSlideWidth){
                // slide!
                settings.elemWindow.animate({
                    "left": "-"+ slideTo
                });

            }else{
                
                if(activeSlide >= settings.amountOfSlides){
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

            if(settings.activeSlide == 0){
                settings.elemNav.find('li:first-child').addClass("active");
            }else{
                settings.elemNav.find('li:eq(' + activeSlide + ')').addClass("active");
            }

            settings.currentSlideOffset = slideTo;
            settings.activeSlide = activeSlide;
            
            // save options
            $(this).data("settings",settings);
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
/*;(function($, window, document, undefined){
    
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
            
            $(this).data("settings", options);
        },
        "goNext": function (options) {           
            // get settings
            var settings = (this).data("settings");

            // calculate what slide to go to
            var activeSlide = settings.activeSlide + 1;
       
            // slide it
            methods.goToSlide(this,activeSlide);
        },
        "goPrevious": function (options) {
            // get settings
            var settings = (this).data("settings");
            
            // calculate what slide to go to
            var activeSlide = settings.activeSlide - 1;

            // slide it
            methods.goToSlide(activeSlide);
        },
        "goToSlide": function(activeSlide){
            // get settings
            var settings = $(this).data("settings");

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
                settings.elemNav.find('li:eq(' + activeSlide + ')').addClass("active");
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
})(jQuery, window, document);*/