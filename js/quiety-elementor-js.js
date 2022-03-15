(function ($, elementor) {
    "use strict";

    var Quiety = {

        init: function () {

            var widgets = {
                'tt-hero-static.default': Quiety.Banner,
                'tt-portfolio-slider.default': Quiety.Slider,
                'tt-blog-slider.default': Quiety.BlogSlider,
                'tt-tab.default': Quiety.Tabs,
                'tt-tab-two.default': Quiety.Tabs,
                'tt-content-tabs.default': Quiety.TabsHistory,
                'tt-google-map.default': Quiety.GoogleMap,
                'tt-testimonial.default': Quiety.Testimonial,
                'tt-testimonial-two.default': Quiety.TestimonialTwo,
                'tt-logo-carousel.default': Quiety.Logo,
                'tt-pricing-table-two.default': Quiety.Pricing,
                'tt-coming-soon.default': Quiety.Counting,

            };
            $.each(widgets, function (widget, callback) {
                elementor.hooks.addAction('frontend/element_ready/' + widget, callback);
            });
        },

        Banner: function ($scope) {
            var element = $scope.find('.animate-element');

            var $scene = element.parallax({
                scalarX: 100,
                scalarY: 100,
            });
        },


        Tabs: function ($scope) {
            var tabnav = $scope.find('#tt-tabs-nav li');

            $('#tt-tabs-nav li:nth-child(1)').addClass('active');
            $('#tt-tabs-content .content').hide();
            $('#tt-tabs-content .content:nth-child(1)').show();

            // Tab Click function
            tabnav.on('click', function () {
                $('#tt-tabs-nav li').removeClass('active');
                $(this).addClass('active');
                $('#tt-tabs-content .content').hide();

                var activeTab = $(this).find('a').attr('href');
                $(activeTab).fadeIn(600);
                return false;
            });
        },

        TabsHistory: function ($scope) {

            var tabnav = $scope.find('#content-tabs-nav li');

            $('#content-tabs-nav li:nth-child(1)').addClass('active');
            $('#tt-content-tabs-content .content').hide();
            $('#tt-content-tabs-content .content:nth-child(1)').show();

            // Tab Click function
            tabnav.on('click', function () {
                $('#content-tabs-nav li').removeClass('active');
                $(this).addClass('active');
                $('#tt-content-tabs-content .content').hide();

                var activeTab = $(this).find('a').attr('href');
                $(activeTab).fadeIn(400);
                return false;
            });
        },

        Pricing: function ($scope) {
            var pricing = $scope.find('.pricing_wrapper');

            if ($(".pricing_wrapper").length > 0) {
                pricing.each(function () {
                    if ($(window).width() < 991) {
                        return;
                    }

                    $(this).find(".row").append('<div class="indicator"></div>');

                    var leftPos = $(this)
                            .find(".grid")
                            .eq(1)
                            .position().left,
                        column = $(this).find(".grid"),
                        indicator = ".indicator";

                    column.siblings(indicator).css("width", column.outerWidth());
                    column.siblings(indicator).css("left", leftPos);

                    column.on("mouseenter mouseleave", function (event) {
                        if (event.type === "mouseenter") {
                            $(this)
                                .siblings(indicator)
                                .css("left", $(this).position().left);
                        }
                        if (event.type === "mouseleave") {
                            $(this)
                                .siblings(indicator)
                                .css("left", leftPos);
                        }
                    });
                });
            }
        },

        GoogleMap: function ($scope) {
            var map = $scope.find('.gmap3-area');


            map.each(function () {
                var $this = $(this),
                    key = $this.data('key'),
                    lat = $this.data('lat'),
                    lng = $this.data('lng'),
                    mrkr = $this.data('mrkr'),
                    zoom = $this.data('zoom'),
                    scrollwheel = $this.data('scrollwheel') || false;

                $this.gmap3({
                    center: [lat, lng],
                    zoom: zoom,
                    scrollwheel: scrollwheel,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    styles: [{
                        "featureType": "administrative.country",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "visibility": "on"
                        }]
                    }]
                })
                // .marker(function (map) {
                //     return {
                //         position: map.getCenter(),
                //         icon: mrkr
                //     };
                // })

            });

        },



        Counting: function ($scope) {

            var counting = $scope.find('.countdown');

            counting.each(function (index, value) {
                var count_year = $(this).attr("data-count-year");
                var count_month = $(this).attr("data-count-month");
                var count_day = $(this).attr("data-count-day");
                var count_date = count_year + '/' + count_month + '/' + count_day;
                $(this).countdown(count_date, function (event) {
                    $(this).html(
                        event.strftime('<div class="counting"><span class="minus">-</span><span class="CountdownContent">%D<span class="CountdownLabel">Days</span></span><span class="CountdownSeparator">:</span></div><div class="counting"><span class="CountdownContent">%H <span class="CountdownLabel">Hours</span></span><span class="CountdownSeparator">:</span></div><div class="counting"><span class="CountdownContent">%M <span class="CountdownLabel">Minutes</span></span><span class="CountdownSeparator">:</span></div><div class="counting"><span class="CountdownContent">%S <span class="CountdownLabel">Seconds</span></span></div>')
                    );
                });
            });

        },

        Slider: function ($scope) {
            var slideInit = $scope.find('[data-swiper]');

            slideInit.each(function () {
                var swps = document.querySelectorAll('[data-swiper]');

                if (swps.length > 0) {
                    swps.forEach(function (swp) {
                        var config = JSON.parse(swp.getAttribute('data-swiper'));
                        var mySwiper = new Swiper(swp, config);

                        $('.swiper-slide').on('mouseover', function () {
                            mySwiper.autoplay.stop();
                        });

                        $('.swiper-slide').on('mouseout', function () {
                            mySwiper.autoplay.start();
                        });
                    });

                }


            });
        },

        BlogSlider: function ($scope) {
            var slideInit = $scope.find('[data-blog]');

            slideInit.each(function () {
                var swps = document.querySelectorAll('[data-blog]');

                if (swps.length > 0) {
                    swps.forEach(function (swp) {
                        var config = JSON.parse(swp.getAttribute('data-blog'));
                        var mySwiper = new Swiper(swp, config);

                        $('.swiper-slide').on('mouseover', function () {
                            mySwiper.autoplay.stop();
                        });

                        $('.swiper-slide').on('mouseout', function () {
                            mySwiper.autoplay.start();
                        });
                    });
                }
            });
        },

        Testimonial: function ($scope) {

            var slideInit = $scope.find('[data-testi]');

            slideInit.each(function () {
                var swps = document.querySelectorAll('[data-testi]');

                if (swps.length > 0) {
                    swps.forEach(function (swp) {
                        var config = JSON.parse(swp.getAttribute('data-testi'));
                        var mySwiper = new Swiper(swp, config);

                        $('.swiper-slide').on('mouseover', function () {
                            mySwiper.autoplay.stop();
                        });

                        $('.swiper-slide').on('mouseout', function () {
                            mySwiper.autoplay.start();
                        });
                    });

                }
            });
        },

        TestimonialTwo: function ($scope) {

            var slideInit = $scope.find('.slider-thumbs');

            var swiper = new Swiper( slideInit, {
                spaceBetween: 20,
                slidesPerView: 3,
                freeMode: true,
                loop: true,
                speed: 700,
            });

            var swiper2 = new Swiper(".slider-top", {
                loop: true,
                speed: 700,
                spaceBetween: 0,
                navigation: {
                    nextEl: ".testi-button-next",
                },
                thumbs: {
                    swiper: swiper,
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
            });

        },

        Logo: function ($scope) {

            var slideInit = $scope.find('[data-logo]');

            slideInit.each(function () {
                var swps = document.querySelectorAll('[data-logo]');

                if (swps.length > 0) {
                    swps.forEach(function (swp) {
                        var config = JSON.parse(swp.getAttribute('data-logo'));
                        var mySwiper = new Swiper(swp, config);

                        $('.swiper-slide').on('mouseover', function () {
                            mySwiper.autoplay.stop();
                        });

                        $('.swiper-slide').on('mouseout', function () {
                            mySwiper.autoplay.start();
                        });
                    });

                }


            });
        },

    };
    $(window).on('elementor/frontend/init', Quiety.init);
}(jQuery, window.elementorFrontend));