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
            $(this).toggleClass('active').next('ul').slideToggle(300);
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
                            items: 2
                        },
                        480:{
                            items: 3
                        },
                        767:{
                            items: 4
                        },
                        991:{
                            items: 5
                        },
                        1200: {
                            items: 6
                        }
                    }
                });
            }
        });
    };

    var menuSidebar = function(){
        var element_a = $('.widget-menu > li > ul'),    
        element_ul = $('.widget-menu > li > a');

        element_a.hide();

        element_ul.click(function(e) {
            e.preventDefault();
            if(!$(this).hasClass('active')) {
                element_ul.removeClass('active');
                element_a.filter(':visible').slideUp(300);
                $(this).addClass('active').next().stop(true,true).slideDown(300);
            } else {
                $(this).removeClass('active');
                $(this).next().stop(true,true).slideUp(300);
            }
        });
    }
    

	$(function() { 
        if ( matchMedia( 'only screen and (min-width: 991px)' ).matches ) {
            headerFixed();
        }
        goTop();
        dreamSliderpages();
        inspiredDreamslider();
        menuSidebar();
        responsiveMenu();
        flatSearch();
        $('.button-close').click(function() {
            $(this).parent().parent().addClass('hidden');
        });
   	});

})(jQuery);