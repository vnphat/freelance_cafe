;(function($) {

   'use strict'

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

	var responsiveMenu = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';

            if ( matchMedia( 'only screen and (max-width:767px)' ).matches ) {
                currMenuType = 'mobile';
            }


            if ( matchMedia( 'only screen and (min-width:767px)' ).matches ) {
                /*Process menu mega*/
                $("#mainnav > ul >  li").hover(function () { //When trigger is hovered...
                    $(this).children(".sub-menu").slideDown('slow').show();
                    $(this).addClass('active');
                }, function () {
                    $(this).children(".sub-menu").slideUp('fast');
                    $(this).removeClass('active');
                });
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                    $('#header').after($mobileMenu);
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');
                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');

                    $desktopMenu.find('.submenu').removeAttr('style');
                    $('#header').find('.nav-wrap').append($desktopMenu);
                    $('.btn-submenu').remove();


                }
            }
        });

        $('.btn-menu').on('click', function() {        	
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });

        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('.sub-menu').slideToggle(300);
            e.stopImmediatePropagation()
        });
    }

    var headerFixed = function() {        
        if ( $('body').hasClass('header-sticky') ) {
            var hd_height = $('#header').height();           
            $(window).on('load scroll', function(){                
                if ( $(window).scrollTop() > hd_height) {
                    $('#header').addClass('downscrolled');                      
                } else {
                    $('#header').removeClass('downscrolled');                   
                }
                if( $(window).scrollTop() > 100) {
                    $('#header').addClass('upscrolled');                    
                } else {
                    $('#header').removeClass('upscrolled');                    
                }
            })            
        }   
    } 
    

    var goTop = function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 800 ) {
                $('.go-top').addClass('show');
            } else {
                $('.go-top').removeClass('show');
            }
        }); 

        $('.go-top').on('click', function() {            
            $("html, body").animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
        });
    };

    var flatClientCarousel = function() {
        $('.flat-carousel').each(function(){
            if ( $().owlCarousel ) {
                $(this).find('.owl-carousel-client').owlCarousel({
                    loop: true,
                    margin:10,
                    auto: true,
                    dots: false,
                    responsive:{
                        0:{
                            items: 1
                        },
                        480:{
                            items: 2
                        },
                        767:{
                            items: 3
                        },
                        991:{
                            items: 3
                        }, 
                        1200:{
                            items: 5
                        }               
                    }
                });
            }
        });
    };

    var flatClientCompany = function() {
        $('.flat-carousel').each(function(){
            if ( $().owlCarousel ) {
                $(this).find('.owl-carousel-company').owlCarousel({
                    loop: true,
                    margin:10,
                    auto: true,
                    nav:true,
                    dots: false,
                    responsive:{
                        0:{
                            items: 1
                        },
                        480:{
                            items: 2
                        },
                        767:{
                            items: 3
                        },
                        991:{
                            items: 3
                        }, 
                        1200:{
                            items: 6
                        }               
                    }
                });
            }
        });
    };

    var flatTabs = function () {
        $('.flat-tabs').each(function() {
            $(this).children('.content-tab').children().hide();
            $(this).children('.content-tab').children().first().show();

            $(this).find('.menu-tabs').children('li').on('click', function(e) {
                var liActive = $(this).index(),
                    contentActive = $(this).siblings().removeClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive);

                contentActive.addClass('active').fadeIn('slow');
                contentActive.siblings().removeClass('active');
                $(this).addClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive).siblings().hide();
                e.preventDefault();
            });
        });
    };

    var responsiveSlider = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';
            if ( matchMedia( 'only screen and (max-width:1199px)' ).matches ) {
                currMenuType = 'tablet';
            }

            if ( matchMedia( 'only screen and (max-width:767px)' ).matches ) {
                currMenuType = 'mobile';
            }

            if ( matchMedia( 'only screen and (max-width:320px)' ).matches ) {
                currMenuType = 'iphone';
            }



            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'tablet' ) {
                     $(".title-slider").attr('data-x','100');
                     $(".sub-title-slider").attr('data-x','100');
                     $(".button-slider").attr('data-x','100');
                } 
                else {
                    $(".title-slider").attr('data-x','15');
                     $(".sub-title-slider").attr('data-x','15');
                     $(".button-slider").attr('data-x','15');

                    if ( currMenuType === 'mobile' ) {
                        $(".title-slider").attr('data-y','155');
                        $(".sub-title-slider").attr('data-y','233');
                        $(".button-slider").attr('data-y','370');
                    }
                    else
                        if ( currMenuType === 'iphone' ) {
                            $(".title-slider").attr('data-y','80');
                            $(".sub-title-slider").attr('data-y','150');
                            $(".button-slider").attr('data-y','390');
                        }
                        else {
                            $(".title-slider").attr('data-y','255');
                            $(".sub-title-slider").attr('data-y','333');
                            $(".button-slider").attr('data-y','450');
                        }
                 }
            }
        });

    }

    var flatSearch = function () {
        $(document).on('click', function(e) {   
            var clickID = e.target.id;   
            if ( ( clickID != 's' ) ) {
                $('.top-search').removeClass('show');                
            } 
        });

        $('.search-box').on('click', function(event){
            event.stopPropagation();
        });

        $('.search-form').on('click', function(event){
            event.stopPropagation();
        });        

        $('.search-box').on('click', function () {
            if(!$('.top-search').hasClass( "show" ))
                $('.top-search').addClass('show');
            else
                $('.top-search').removeClass('show');
        });
    } 

    var dreamSliderpages = function() {
        $('.flat-row').each(function() {               
            if ( $().owlCarousel ) {
                $(this).find('.dreampages-slider').owlCarousel({
                    loop: false,
                    margin: 0,
                    nav: false,
                    dots: false,                     
                    autoplay: false,                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        767:{
                            items: 1
                        },
                        991:{
                            items: 1
                        },
                        1200: {
                            items: 1
                        }
                    }
                });
            }
        });
    };

    var inspiredDreamslider = function() {
        $('.flat-row').each(function() {               
            if ( $().owlCarousel ) {
                $(this).find('.inspired-dreams-slider').owlCarousel({
                    loop: false,
                    margin: 15,
                    nav: true,
                    dots: false,                     
                    autoplay: false,                    
                    responsive:{
                        0:{
                            items: 1
                        },
                        480:{
                            items: 2
                        },
                        767:{
                            items: 4
                        },
                        991:{
                            items: 6
                        },
                        1200: {
                            items: 6
                        }
                    }
                });
            }
        });
    };
    

	$(function() { 
        if ( matchMedia( 'only screen and (min-width: 991px)' ).matches ) {
            headerFixed();
        }
        goTop();
        dreamSliderpages();
        inspiredDreamslider();
        responsiveSlider();
        responsiveMenu();
        flatClientCarousel();
        flatClientCompany();
        flatSearch();
        flatTabs();
        //removePreloader();
   	});

})(jQuery);