/*! Auxin WordPress Framework - v2.2.8 (2018-07-05)
 *  Scripts for initializing plugins 
 *  http://averta.net
 *  (c) 2014-2018 averta;
 */



/* ================== js/src/functions.js =================== */


/*--------------------------------------------
 *  Functions
 *--------------------------------------------*/

function auxin_is_rtl(){
    return ((typeof auxin !== 'undefined') && (auxin.is_rtl == "1" || auxin.wpml_lang == "fa") )?true:false;
}
;


/* ================== js/src/generals.js =================== */


/* ------------------------------------------------------------------------------ */
// General javascripts
/* ------------------------------------------------------------------------------ */

;(function ( $, window, document, undefined ) {
    "use strict";

    var $window = $(window),
        $siteHeader = $('#site-header'),
        headerStickyHeight = $('#site-header').data('sticky-height') || 0;

    /* ------------------------------------------------------------------------------ */
    // goto top
    var gotoTopBtn = $('.aux-goto-top-btn'), distToFooter, footerHeight;

    $( function() {
        if ( gotoTopBtn.length && jQuery.fn.scrollTo ) {
            footerHeight = $('#sitefooter').outerHeight();

            gotoTopBtn.on( 'click touchstart', function() {
                $window.scrollTo( 0, {duration: gotoTopBtn.data('animate-scroll') ? 1500 : 0,  easing:'easeInOutQuart'});
            } );

            gotoTopBtn.css('display', 'block');
            scrollToTopOnScrollCheck();
            $window.on('scroll', scrollToTopOnScrollCheck);
        }


        function scrollToTopOnScrollCheck() {
            if ( $window.scrollTop() > 200 ) {
                gotoTopBtn[0].style[window._jcsspfx + 'Transform'] = 'translateY(0)';
                distToFooter = document.body.scrollHeight - $window.scrollTop() - window.innerHeight - footerHeight;

                if ( distToFooter < 0 ) {
                    gotoTopBtn[0].style[window._jcsspfx + 'Transform'] = 'translateY('+distToFooter+'px)';
                }
            } else {
                gotoTopBtn[0].style[window._jcsspfx + 'Transform'] = 'translateY(150px)';
            }
        }

        /* ------------------------------------------------------------------------------ */
        // add dom ready helper class
        $('body').addClass( 'aux-dom-ready' )
                 .removeClass( 'aux-dom-unready' );

        /* ------------------------------------------------------------------------------ */
        // animated goto
        if ( $.fn.scrollTo ) {
            $('a[href^="\#"]:not([href="\#"])').click( function(e) {
                e.preventDefault();
                var $this = $(this);
                if ( $this.closest('.woocommerce-tabs').length ) { return; }
                $window.scrollTo( $( $this.attr( 'href' ) ).offset().top - headerStickyHeight, $this.hasClass( 'aux-jump' )  ? 0 : 1500,  {easing:'easeInOutQuart'});
            });
        }

        /* ------------------------------------------------------------------------------ */
        // add space above sticky header if we have the wp admin bar in the page

        var $adminBar            = $('#wpadminbar'),
            marginFrameThickness = $('.aux-side-frames').data('thickness') || 0,
            siteHeaderTopPosition;

        $('#site-header').on( 'sticky', function(){
            if ( $adminBar.hasClass('mobile') || window.innerWidth <= 600 ) {
                return;
            }
            // calculate the top position
            siteHeaderTopPosition = 0;
            if( $adminBar.length ){
                siteHeaderTopPosition += $adminBar.height();
            }
            if( marginFrameThickness && window.innerWidth >= 700 ){
                siteHeaderTopPosition += marginFrameThickness;
            }
            $(this).css( 'top', siteHeaderTopPosition + 'px' );

        }).on( 'unsticky', function(){
            $(this).css( 'top', '' );
        });

        /* ------------------------------------------------------------------------------ */
        // disable search submit if the field is empty

        $('.aux-search-field, #searchform #s').each(function(){
            var $this = $(this);
            $this.parent('form').on( 'submit', function( e ){
                if ( $this.val() === '' ) {
                    e.preventDefault();
                }
            });
        });

        /* ------------------------------------------------------------------------------ */
        // fix megamenu width for middle aligned menu in header
        // var $headerContainer = $siteHeader.find('.aux-header-elements'),
        //     $headerMenu = $('#master-menu-main-header');
        // var calculateMegamenuWidth = function(){
        //     var $mm = $siteHeader.find( '.aux-middle .aux-megamenu' );
        //     if ( $mm.length ) {
        //         $mm.width( $headerContainer.innerWidth() );
        //         $mm.css( 'left', -( $headerMenu.offset().left - $headerContainer.offset().left ) + 'px' );
        //     } else {
        //         $headerMenu.find( '.aux-megamenu' ).css('width', '').css( 'left', '' );
        //     }
        // };

        // $(window).load(function() {
        //     calculateMegamenuWidth();
        // });

        // $window.on( 'resize', calculateMegamenuWidth );

        /* ------------------------------------------------------------------------------ */
        // Get The height of Top bar When Overlay Header Option is enable
        if ( $siteHeader.hasClass('aux-overlay-with-tb') || $siteHeader.hasClass('aux-overlay-header') ){

            if( $siteHeader.hasClass('aux-overlay-with-tb') ){
                var $topBarHeight = $('#top-header').outerHeight();
                $('.aux-overlay-with-tb').css( 'top' , $topBarHeight+'px') ;
            }

        }

    });


    /* ------------------------------------------------------------ */
    // Switch the color of header buttons on sticky
    /* ------------------------------------------------------------ */

    window.auxinSetupLogoSwitcher = function(){

        if( ! $('body').hasClass('aux-top-sticky') ){
            return;
        }

        var $btns = $('#site-header .aux-btns-box .aux-button'), $btn,
            $default_logo   = $('.aux-logo-header .aux-logo-anchor:not(.aux-logo-sticky)'),
            $sticky_logo    = $('.aux-logo-header .aux-logo-anchor.aux-logo-sticky'),
            has_sticky_logo = $sticky_logo.length;

        $('#site-header').on( 'sticky', function(){
            for ( var i = 0, l = $btns.length; i < l; i++ ) {
                $btn = $btns.eq(i);
                $btn.removeClass( "aux-" + $btn.data("colorname-default") ).addClass( "aux-" + $btn.data("colorname-sticky") );
            }
            if( has_sticky_logo ){
                $default_logo.addClass('aux-logo-hidden');
                $sticky_logo.removeClass('aux-logo-hidden');
            }
        }).on( 'unsticky', function(){
            for ( var i = 0, l = $btns.length; i < l; i++ ) {
                $btn = $btns.eq(i);
                $btn.removeClass( "aux-" + $btn.data("colorname-sticky") ).addClass( "aux-" + $btn.data("colorname-default") );
            }
            if( has_sticky_logo ){
                $default_logo.removeClass('aux-logo-hidden');
                $sticky_logo.addClass('aux-logo-hidden');
            }
        });

    };
    window.auxinSetupLogoSwitcher();

})(jQuery, window, document);

/* ------------------------------------------------------------ */
// WP Ulike HearBeat Animation
/* ------------------------------------------------------------ */
var UlikeHeart  = document.querySelectorAll('.wp_ulike_btn');

function auxinUlikeHeartBeat(e){
    e.target.classList.add('aux-icon-heart');
}
function removeAuxinUlikeHeartBeat(e){
    e.target.classList.remove('aux-icon-heart');
}

for ( var i = 0 ; UlikeHeart.length > i; i++){
    UlikeHeart[i].addEventListener('click', auxinUlikeHeartBeat );
    UlikeHeart[i].addEventListener('animationend', removeAuxinUlikeHeartBeat );
}
;


/* ================== js/src/module.carousel-lightbox.js =================== */


/**
 * Init Carousel and Lightbox
 *
 */
(function($, window, document, undefined){
    "use strict";

    $.fn.AuxinCarouselInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find('.aux-lightbox-frame').photoSwipe({
                target: '.aux-lightbox-btn',
                bgOpacity: 0.8,
                shareEl: true
            }
        );

        $scope.find('.aux-lightbox-gallery').photoSwipe({
                target: '.aux-lightbox-btn',
                bgOpacity: 0.97,
                shareEl: true
            }
        );

        $scope.find('.master-carousel-slider').AuxinCarousel({
            autoplay: false,
            columns: 1,
            speed: 15,
            inView: 15,
            autohight: false,
            rtl: $('body').hasClass('rtl')
        }).on( 'auxinCarouselInit', function(){
            // init lightbox on slider after carousel init
            $scope.find('.aux-lightbox-in-slider').photoSwipe({
                    target: '.aux-lightbox-btn',
                    bgOpacity: 0.8,
                    shareEl: true
                }
            );
        } );

        // all other master carousel instances
        $scope.find('.master-carousel').AuxinCarousel({
            speed: 30,
            rtl: $('body').hasClass('rtl')
        });
    };

})(jQuery, window, document);


/* ================== js/src/module.elements.js =================== */


/**
 * General Modules
 */
;(function($, window, document, undefined){

    // Init Tilt
    $.fn.AuxinTiltElementInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find('.aux-tilt-box').tilt({
            maxTilt : $(this).data('max-tilt'),
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
            speed: $(this).data('time'),
            perspective: 2000
        });
    }

    // Init FitVids
    $.fn.AuxinFitVideosInit = function( $scope ){
        $scope = $scope || $(this);
        $scope.find('main').fitVids();
        $scope.find('main').fitVids({ customSelector: 'iframe[src^="http://w.soundcloud.com"], iframe[src^="https://w.soundcloud.com"]'});
    }

    // Init Image box
    $.fn.AuxinImageBoxInit = function( $scope ){
        $scope = $scope || $(this);
        $scope.find('.aux-image-box').AuxinImagebox();
    }

    // Init Before after
    $.fn.AuxinBeforeAfterInit = function( $scope ){
        $scope = $scope || $(this);

        // init before after slider
        $scope.find('.aux-before-after').each( function() {
            var $slider = $(this);
            $slider.twentytwenty({
                default_offset_pct: $slider.data( 'offset' ) || 0.5,
                orientation: 'horizontal'
            });
        });
    }

    // Parallax Box
    $.fn.AuxinParallaxBoxInit = function( $scope ){
        $scope = $scope || $(this);

        // parallax
        $scope.find('.aux-parallax-box').AvertaParallaxBox();
    };

    // Media Element init
    $.fn.AuxinMediaElementInit = function(){
        if ( typeof MediaElementPlayer === 'function' ) {
            var settings        = window._wpmejsSettings || {};
            settings.features   = settings.features || mejs.MepDefaults.features;
            settings.features.push( 'AuxinPlayList' );
            /* ------------------------------------------------------------------------------ */
            MediaElementPlayer.prototype.buildAuxinPlayList = function( player, controls, layers, media ) {
                if ( player.container.closest('.wp-video-playlist').length ) {
                    // Add special elements for once.
                    if ( !player.container.closest('.aux-mejs-container').length ){
                        // Add new custom wrap
                        player.container.wrap( "<div class='aux-mejs-container aux-4-6 aux-tb-1 aux-mb-1'></div>" );
                        // Add auxin classes
                        player.container.closest( '.wp-playlist' ).addClass('aux-row').find('.wp-playlist-tracks').addClass('aux-2-6 aux-tb-1 aux-mb-1');
                        // Run perfect scrollbar
                        new PerfectScrollbar('.wp-playlist-tracks');
                    }
                    player.container.addClass( 'aux-player-light' );
                    player.options.stretching = 'none';
                    player.width              = '100%';
                    var $playlistContainer    = player.container.closest( '.wp-playlist' ).find( '.wp-playlist-tracks' );
                    if( !$playlistContainer.find('.aux-playlist-background').length ) {
                        $playlistContainer.prepend( "<div class='aux-playlist-background'></div>" );
                    }
                    var $postFormatHeight     = $('.aux-primary .content').width();
                    // Set playlist Height
                    if( $postFormatHeight >= 1600 ) {
                        player.height = 720;
                    } else if( $postFormatHeight >= 768 && $postFormatHeight < 1600 ) {
                        player.height = 480;
                    } else if( $postFormatHeight >= 480 && $postFormatHeight < 768 ) {
                        player.height = 360;
                    } else {
                        player.height = 240;
                    }
                    // Set playlist height by player's height
                    $playlistContainer.css('height', player.height);
                }
            };
        }
    }

    // Dynamic image drop shadow
    $.fn.AuxinDynamicDropshadow = function(){

        var imgFrame, clonedImg, img;

        if( this instanceof jQuery ){
            if( this && this[0] ){
                img = this[0];
            } else {
                return;
            }
        } else {
            img = this;
        }

        if ( ! img.classList.contains('aux-img-has-shadow')){
            imgFrame  = document.createElement('div');
            clonedImg = img.cloneNode();

            clonedImg.classList.add('aux-img-dynamic-dropshadow-cloned');
            clonedImg.classList.remove('aux-img-dynamic-dropshadow');
            img.classList.add('aux-img-has-shadow');
            imgFrame.classList.add('aux-img-dynamic-dropshadow-frame');

            img.parentNode.appendChild(imgFrame);
            imgFrame.appendChild(img);
            imgFrame.appendChild(clonedImg);
        }
    };

    // Dynamic image drop shadow init
    $.fn.AuxinDynamicDropshadowInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find('.aux-img-dynamic-dropshadow').each(function() {
            $(this).AuxinDynamicDropshadow();
        });
    };

    // Blur images with scroll
    $.fn.AuxinScrollBlurImage = function( blurValue, startFrom, opacitySpeed ){
        var $this =  $(this),
            prefix = window._jcsspfx || '',
            clonedImage = getImage($this),
            bluredImage = createBluredImage(clonedImage),
            yVisible = startFrom * $this.outerHeight(),
            remainHeight = $this.outerHeight() - yVisible,
            scrollValue,
            opacityValue;

        function getImage($target) {
            var backgroundImage = $target.css('background-image');
            $target.addClass('aux-orginal-blured-img');
            return backgroundImage;
        }

        function createBluredImage (imgUrl){
            var bgImgElement = document.createElement('div');

            $(bgImgElement).appendTo($this);
            $(bgImgElement).addClass('aux-blured-img');

            bgImgElement.style[prefix + 'backgroundImage'] = imgUrl;

            if ( 'auto' != $this.css('background-size') ) {
                bgImgElement.style[prefix + 'backgroundSize'] = $this.css('background-size');
            }

            if ( '0% 0%' != $this.css('background-position') ) {
                bgImgElement.style[prefix + 'backgroundPosition'] = $this.css('background-position');
            }

            if ( 'repeat' != $this.css('background-repeat') ) {
                bgImgElement.style[prefix + 'backgroundRepeat'] = $this.css('background-repeat');
            }

            bgImgElement.style[prefix + 'filter'] = 'blur(' + blurValue + 'px)';

            return $(bgImgElement);
        }

        $(window).on('scroll', function(){
            var winBot = $(window).scrollTop();
            scrollValue = ( winBot - $this.offset().top ) - yVisible;

            if ( scrollValue > 0 ){
                opacityValue = scrollValue / remainHeight;
                opacityValue = Math.min(1, opacityValue * opacitySpeed );

                if( opacityValue < 1 ){
                    bluredImage[0].style[prefix + 'opacity'] = opacityValue;
                } else {
                    bluredImage[0].style[prefix + 'opacity'] = 1;
                }

            } else if ( scrollValue < 0 ){
                bluredImage[0].style[prefix + 'opacity'] = 0;
            }

        });
    }

    // Blur images with scroll - Init
    $.fn.AuxinScrollBlurImageInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find('.aux-blur-fade').each(function() {
            $(this).AuxinScrollBlurImage( 15, 0.3, 4 );
        });
    }

    // Miscellaneous Elements
    $.fn.AuxinOtherElementsInit = function( $scope ){
        $scope = $scope || $(this);
    }

    // Document ready modules ===============================================

    // Tabs
    $.fn.AuxinLiveTabsInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find('.widget-tabs .widget-inner').avertaLiveTabs({
            tabs:            'ul.tabs > li',            // Tabs selector
            tabsActiveClass: 'active',                  // A Class that indicates active tab
            contents:        'ul.tabs-content > li',    // Tabs content selector
            contentsActiveClass: 'active',              // A Class that indicates active tab-content
            transition:      'fade',                    // Animation type white switching tabs
            duration :       '500'                      // Animation duration in milliseconds
        });
    }

    // Accordion Element
    $.fn.AuxinAccordionInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find('.widget-toggle .widget-inner').each( function( index ) {
            $(this).avertaAccordion({
                itemHeader : '.toggle-header',
                itemContent: '.toggle-content',
                oneVisible : $(this).data("toggle") ,
            });
        });
    }

    // Timeline
    $.fn.AuxinTimelineInit = function( $scope ){
        $scope = $scope || $(this);

        // init timeline
        $scope.find('.aux-timeline').each( function(){
            if ( $(this).hasClass('aux-right') ){
                $(this).AuxinTimeline( { responsive : { 760: 'right' } } );
            }else{
                $(this).AuxinTimeline();
            }
        });
    }

    // Code highlighter
    $.fn.AuxinCodeHighlightInit = function( $scope ){
        $scope = $scope || $(this);

        // init highlight js
        if(typeof hljs !== 'undefined') {
            $scope.find('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        }
    }

    // Load More functionality
    $.fn.AuxinLoadMoreInit = function( $scope ){
        $scope = $scope || $(this);

        // init auxin load more functionality
        $scope.find('.widget-container[class*="aux-ajax-type"]').AuxLoadMore();
    }

    // Video Box
    $.fn.AuxinVideoBoxInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find('.aux-video-box').AuxinVideobox();
    }

    // Image interaction
    $.fn.AuxinImageInteractionInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find('.aux-frame-cube').AuxinCubeHover();
        $scope.find('.aux-hover-twoway').AuxTwoWayHover();
    }

    // Toggle-able List
    $.fn.AuxinToggleListInit = function( $scope ){
        $scope = $scope || $(this);

        // togglable lists
        $scope.find('.aux-togglable').AuxinToggleSelected();
    }

    // Masonry Animate
    $.fn.AuxinMasonryAnimateInit = function( $scope ){
        $scope = $scope || $(this);

        // init masonry Animation
        $scope.find('.aux-widget-recent-products-parallax').AuxinMasonryAnimate();
    }

})(jQuery, window, document);


/* ================== js/src/module.isotope.js =================== */


//tile element

;(function($, window, document, undefined){
    "use strict";

    $.fn.AuxinIsotopeInit = function( $scope ){
        $scope = $scope || $(this);

        $.fn.AuxinIsotopeLayoutInit( $scope );
        $.fn.AuxinIsotopeImageLayoutsInit( $scope );;
        $.fn.AuxinIsotopeBigGridInit( $scope );
        $.fn.AuxinIsotopeFAQInit( $scope );;
    };

    $.fn.AuxinIsotopeImageLayoutsInit = function( $scope ){
        $scope = $scope || $(this);

        $.fn.AuxinIsotopeGalleryInit( $scope );
        $.fn.AuxinIsotopeMasonryInit( $scope );
        $.fn.AuxinIsotopeTilesInit( $scope );
    };

    $.fn.AuxinIsotopeLayoutInit = function( $scope ){
        $scope = $scope || $(this);

        // general isotope layout
        $scope.find('.aux-isotope-layout').AuxIsotope({
            itemSelector:'.aux-iso-item',
            revealTransitionDuration  : 600,
            revealBetweenDelay        : 50,
            revealTransitionDelay     : 0,
            hideTransitionDuration    : 300,
            hideBetweenDelay          : 0,
            hideTransitionDelay       : 0,
            updateUponResize          : true,
            transitionHelper          : true
        });
    }

    $.fn.AuxinIsotopeGalleryInit = function( $scope ){
        $scope = $scope || $(this);

        // init gallery
        $scope.find(".aux-gallery .aux-gallery-container").AuxIsotope({
            itemSelector:'.gallery-item',
            justifyRows: {maxHeight: 340, gutter:0},
            masonry: { gutter:0 },
            revealTransitionDuration  : 600,
            hideTransitionDuration    : 600,
            revealBetweenDelay        : 70,
            hideBetweenDelay          : 40,
            revealTransitionDelay     : 0,
            hideTransitionDelay       : 0,
            updateUponResize          : true,
            transitionHelper          : true,
            deeplink                  : false
        });
    }

    $.fn.AuxinIsotopeTilesInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find(".aux-tiles-layout").AuxIsotope({
            itemSelector        :'.aux-post-tile, .aux-iso-item',
            layoutMode          : 'packery',
            revealTransitionDuration  : 600,
            hideTransitionDuration    : 600,
            revealBetweenDelay        : 70,
            hideBetweenDelay          : 40,
            revealTransitionDelay     : 0,
            hideTransitionDelay       : 0,
            updateUponResize          : true,
            transitionHelper          : true,
            packery: {
                gutter      : 0
            }
        }).on( 'auxinIsotopeReveal', function( e, items ){
            items.forEach( function( item, index ) {
                // update image alignment inside the tiles upon pagination
                if ( item.$element.hasClass( 'aux-image-box' ) ) {
                    item.$element.AuxinImagebox('update');
                }
            } );
        });
    }

    $.fn.AuxinIsotopeBigGridInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find(".aux-big-grid-layout").AuxIsotope({
            itemSelector        :'.aux-news-big-grid, .aux-iso-item',
            layoutMode          : 'packery',
            revealTransitionDuration  : 600,
            hideTransitionDuration    : 600,
            revealBetweenDelay        : 70,
            hideBetweenDelay          : 40,
            revealTransitionDelay     : 0,
            hideTransitionDelay       : 0,
            updateUponResize          : true,
            transitionHelper          : true,
            packery: {
                gutter      : 0,
            }
        }).on( 'auxinIsotopeReveal', function( e, items ){
            items.forEach( function( item, index ) {
                // update image alignment inside the tiles upon pagination
                if ( item.$element.hasClass( 'aux-image-box' ) ) {
                    item.$element.AuxinImagebox('update');
                }
            } );
        });
    }

    $.fn.AuxinIsotopeMasonryInit = function( $scope ){
        $scope = $scope || $(this);

        // init masonry
        $scope.find(".aux-masonry-layout").AuxIsotope({
            itemSelector        :'.aux-post-masonry',
            layoutMode          : 'masonry',
            updateUponResize    : true,
            transitionHelper    : false,
            transitionDuration  : 0
        });
    }

    $.fn.AuxinIsotopeFAQInit = function( $scope ){
        $scope = $scope || $(this);

        // faq element isotope
        $scope.find('.aux-isotope-faq').AuxIsotope({
            itemSelector:'.aux-iso-item',
            revealTransitionDuration  : 600,
            hideTransitionDuration    : 600,
            revealBetweenDelay        : 70,
            hideBetweenDelay          : 40,
            revealTransitionDelay     : 0,
            hideTransitionDelay       : 0,
            updateUponResize          : false,
            transitionHelper          : true
        }).on('auxinIsotopeReveal',function(){
            $scope.find('.aux-iso-item').css({
                'position' : ''
            });
        });
    }

})(jQuery, window, document);


/* ================== js/src/module.page-animation.js =================== */


;(function ( $, window, document, undefined ) {
    "use strict";

    // Page preload animation init
    $.fn.AuxinPagePreloadAnimationInit = function( $scope ){
        $scope = $scope || $(this);

        // preload and init page animation
        var $innerBody       = $scope.find('#inner-body'),
            $body            = $scope.find('body'),
            transitionTarget,
            animationConfig;

        if( ! $body.length ){
            return;
        }

        /* ------------------------------------------------------------------------------ */
        // page animation timing config
        var pageAnimationConfig = {
            fade: {
                eventTarget: '.aux-page-animation-overlay',
                propertyWatch: 'opacity',
                hideDelay: 800,
                loadingHideDuration: 810
            },

            circle: {
                eventTarget: '#inner-body',
                propertyWatch: 'transform',
                hideDelay: 1000,
                loadingHideDuration: 810
            },

            cover: {
                eventTarget: '.aux-page-animation-overlay',
                propertyWatch: 'transform',
                hideDelay: 500,
                loadingHideDuration: 810
            },

            slideup: {
                eventTarget: '.aux-page-animation-overlay',
                propertyWatch: 'transform',
                hideDelay: 500,
                loadingHideDuration: 810
            }
        },
        progressbarHideDuration = 700;

        /* ------------------------------------------------------------------------------ */

        if ( $body.hasClass( 'aux-page-preload' ) ) {
            var $pageProgressbar = $scope.find('#pagePreloadProgressbar'),
                pageLoading = document.getElementById( 'pagePreloadLoading' );

            $(window).on( 'load.preload', function( instance ) {

                if ( $body.data( 'page-animation' ) && Modernizr && Modernizr.csstransitions ) {
                    setupPageAnimate();
                } else {
                    if ( pageLoading ) {
                        setTimeout( function() {
                            pageLoading.style.display = 'none';
                        }, 810 );
                    }
                }

                $body.addClass( 'aux-page-preload-done' );

                if ( $pageProgressbar.length ) {
                    var pageProgressbar = $pageProgressbar[0];
                    pageProgressbar.style.width = pageProgressbar.offsetWidth + 'px';
                    $pageProgressbar.removeClass('aux-no-js');
                    pageProgressbar.style[ window._jcsspfx + 'AnimationPlayState' ] = 'paused';

                    setTimeout( function(){
                        pageProgressbar.style.width = '100%';
                        $pageProgressbar.addClass( 'aux-hide' );
                        $body.addClass( 'aux-progressbar-done' );
                    }, 10 );

                    setTimeout( function(){
                        pageProgressbar.style.display = 'none';
                    }, progressbarHideDuration );
                }
            });

            window.onerror = function( e ) {
                $pageProgressbar.addClass( 'aux-hide' );
                $body.addClass( 'aux-page-preload-done' );
                $(window).off( 'load.preload' );
            }

        } else {
            setupPageAnimate();
        }

        function setupPageAnimate() {
            // disable page animation in old browsers
            if ( Modernizr && !Modernizr.csstransitions ) {
                return;
            }

            if ( !$body.hasClass( 'aux-page-animation' ) ) {
                return;
            }

            var animType         = $body.data('page-animation-type');

            animationConfig  = pageAnimationConfig[animType];
            transitionTarget = $(pageAnimationConfig[animType].eventTarget)[0];

            transitionTarget.addEventListener( 'transitionend', pageShowAnimationDone );

            $( 'a:not([href^="\#"]):not([href=""])' ).AuxinAnimateAndRedirect( {
                scrollFixTarget      : '#inner-body',
                delay       : animationConfig.hideDelay,
                //  disableOn   : '.aux-lightbox-frame, ul.tabs, .aux-gallery .aux-pagination',
                animateIn   : 'aux-page-show-' + animType,
                animateOut  : 'aux-page-hide-' + animType,
                beforeAnimateOut  : 'aux-page-before-hide-' + animType
            });
        }

        function pageShowAnimationDone( e ) {
            if ( e.target === transitionTarget && e.propertyName.indexOf( animationConfig.propertyWatch ) !== -1 ) {
                $body.addClass( 'aux-page-animation-done' );
                transitionTarget.removeEventListener( 'transitionend', pageShowAnimationDone );
            }
        }
    }

    // Page cover animation
    $.fn.AuxinPageCoverAnimation = function(){
        var $this      = $(this),
            fired      = false,
            scrollLock = true;

        function movePageCover() {

            if ( ! $('body').hasClass('aux-page-cover-off') ) {
                $('body').addClass('aux-page-cover-off');
            }

        }

        $this.find('.aux-page-cover-footer-text a').on('click', movePageCover );

        $(window).on('scroll', function(e){
            if( scrollLock && ! fired ) {
                $(window).scrollTop(0);
                movePageCover();
            }
        });

        $this.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
            fired      = true;
            scrollLock = false;
        });
    };

    // Page cover animation init
    $.fn.AuxinPageCoverAnimationInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find('.aux-page-cover-wrapper').each( function() {
            $(this).AuxinPageCoverAnimation();
        });
    };

    // Set on appear
    $.fn.AuxinSetOnApearInit = function(){

        if ( $.fn.appearl ) {
            var appearBuffer = 0,
                appearTo;

            $.fn.setOnAppear = function( once, delay ) {
                return $(this).each( function( index, element ) {
                    var $element = $(element);
                    $element.appearl();
                    $element[ once ? 'one' : 'on']( 'appear', function(){
                        if ( delay && !$element.hasClass( 'aux-appeared-once' ) ) {
                            element.style.transitionDelay = (appearBuffer++) * delay + 'ms';
                            appearTo = setTimeout( function() {
                                appearBuffer = 0;
                            }, 10);
                        }

                        $element.addClass( 'aux-appeared-once' );
                        $element.addClass( 'aux-appeared' ).removeClass( 'aux-disappeared' );
                    });

                    if ( !once ){
                        $element.on( 'disappear', function(){
                            $element.removeClass( 'aux-appeared' ).addClass( 'aux-disappeared' );
                        });
                    }

                });
            }
        }
    };

    // InView Animation
    $.fn.AuxinAppearInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find('.aux-check-appear, .aux-appear-watch:not(.aux-appear-repeat)').appearl({
            offset: '150px',
            insetOffset:'0px'
        }).one( 'appear', function(event, data) {
            this.classList.add('aux-appeared');
            this.classList.add('aux-appeared-once');
        });

        $scope.find('.aux-check-appear, .aux-appear-watch.aux-appear-repeat').appearl({
            offset: '150px',
            insetOffset:'0px'
        }).on( 'appear disappear', function(event, data) {
            if( event.type === 'disappear' ){
                this.classList.remove('aux-appeared');
                this.classList.add('aux-disappeared');
            } else {
                this.classList.remove('aux-disappeared');
                this.classList.add('aux-appeared');
            }
        });
    };

})(jQuery, window, document);


/* ================== js/src/module.page.js =================== */


/**
 * Page Modules
 */
;(function($, window, document, undefined){

    // Page Layout
    $.fn.AuxinPageLayoutInit = function( $scope ){
        $scope = $scope || $(this);

        $(function(){
            // general sticky init
            $scope.find('.aux-sticky-side > .entry-side').AuxinStickyPosition();
        });

        // float layout init
        var isResp = $scope.find('body').hasClass( 'aux-resp' );
        $scope.find('.aux-float-layout').AuxinFloatLayout({ autoLocate: isResp });
    };

    // Match heights
    $.fn.AuxinMatchHeightInit = function( $scope ){
        $scope = $scope || $(this);
        // init matchHeight
        $scope.find('.aux-match-height > .aux-col').matchHeight();
    };

    // Page Header Layout
    $.fn.AuxinPageHeaderLayoutInit = function( $scope ){
        $scope = $scope || $(this);

        var $window = $(window),
            $siteHeader = $scope.find('#site-header'),
            headerStickyHeight = $scope.find('#site-header').data('sticky-height') || 0;

        if ( $siteHeader.find( '.secondary-bar' ).length ) {
            headerStickyHeight += 35; // TODO: it should changed to a dynamic way in future
        }

        // header sticky position
        if ( $scope.find('body').hasClass( 'aux-top-sticky' ) ) {
            $scope.find('#site-header').AuxinStickyPosition();
        }

        // fullscreen header
        $scope.find('.page-header.aux-full-height').AuxinFullscreenHero();

        // scroll to bottom in title bar
        if ( jQuery.fn.scrollTo ) {
            var $scrollToTarget = $scope.find('#site-title');
            $scope.find('.aux-title-scroll-down .aux-arrow-nav').click( function(){
                var target = $scrollToTarget.offset().top + $scrollToTarget.height() - headerStickyHeight;
                $window.scrollTo( target , {duration: 1500, easing:'easeInOutQuart'}  );
            });
        }
    };

    // Modern form
    $.fn.AuxinModernForm = function( $scope ){
        $scope = $scope || $(this);

        var groupClass = '.aux-input-group',
            focusClass = 'aux-focused',
            $allFields = $scope.find( groupClass + ' input ,' + groupClass + ' textarea' );

        if ( $allFields.val()){
            $allFields.each( function(){
                if( $scope.val() ) {
                    $scope.parents( groupClass ).addClass( focusClass );
                }
            });
        };


        $allFields.on('focus', function(){
            $(this).parents( groupClass ).addClass( focusClass );
        })
        .on('blur', function(){
            if ( $(this).val() === '' ) {
                $(this).parents( groupClass ).removeClass( focusClass);
            }
        });

        $scope.find('input, textarea').placeholder();
    };

    // Modern form init
    $.fn.AuxinModernFormInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find('.aux-modern-form').each( function(){
            $(this).AuxinModernForm();
        });
    };

    // Dropdown Click/Hover
    $.fn.AuxinDropdownEffect = function( $dropWrapper ){
        $dropWrapper = $dropWrapper || $(this);

        var $dropHover   = $dropWrapper.find( '.aux-action-on-hover' ),
            dropAction   = 'aux-cart-display-dropdown';

        if ( $dropHover.length ) {

            $dropHover.mouseover(
                function () {
                    $dropWrapper.addClass( dropAction );
                }
            );
            $dropWrapper.mouseleave(
                function(){
                    $dropWrapper.removeClass( dropAction );
                }
            );

        } else {

            var $dropClick = $dropWrapper.find( '.aux-action-on-click' );

            $dropClick.unbind('mouseover');
            $dropWrapper.unbind('mouseleave');

            $dropClick.click( function(e){
                e.preventDefault();
                $dropWrapper.addClass( dropAction );
            });
            $(document).click( function(e){
                if ( ! $( e.target ).closest( $dropWrapper ).length ) {
                    $dropWrapper.removeClass( dropAction );
                }
            });

        }
    };

    // Dropdown Click/Hover init
    $.fn.AuxinDropdownEffectInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find('.aux-top-header .aux-cart-wrapper, .site-header-section .aux-cart-wrapper').each(function() {
            $(this).AuxinDropdownEffect();
        });
    };

    // Shopping Cart Canvas Menu
    $.fn.AuxinCartCanvasInit = function( $scope ){
        $scope = $scope || $(this);

        // Cart elements
        var $headerElement = $scope.find('.site-header-section'),
        $cartDropdown      = $headerElement.find('.aux-card-dropdown'),
        $burgerBasket      = $headerElement.find('.aux-shopping-basket'),
        $basketContainer   = $scope.find('#offcart'),
        isClosed           = true;

        // Append cart content to the offcanvas menu
        $cartDropdown.clone().appendTo( $basketContainer.find('.aux-offcart-content') );

        // Add canvas dark class
        if( $cartDropdown.hasClass('aux-card-dropdown-dark') ) {
            $basketContainer.addClass('aux-offcanvas-dark');
        }

        // Remove dropdown hidden class from canvas container
        $basketContainer.find('.aux-card-dropdown').removeClass('aux-phone-off');

        // Toggle canvas open/close classes
        function toggleOffcanvasBasket() {
            $basketContainer.toggleClass( 'aux-open' );
            $scope.toggleClass( 'aux-offcanvas-overlay' );
            isClosed = !isClosed;
        }

        // Display offcanvas on click icon button
        $burgerBasket.click( toggleOffcanvasBasket );

        // Hide offcanvas on click close button
        $basketContainer.find('.aux-close').click( toggleOffcanvasBasket );

        $(window).on( 'resize', function() {
            if ( window.innerWidth > 767 ) {
                $basketContainer.hide();
                if( !isClosed ){
                    $scope.removeClass( 'aux-offcanvas-overlay' );
                }
            } else {
                $basketContainer.show();
                if( !isClosed ){
                    $scope.addClass( 'aux-offcanvas-overlay' );
                }
            }
        });
    }

    // DropDown For Filters
    $.fn.AuxinDropDownSelect = function( $scope ){
        $scope = $scope || $(this);

        var $DropDown   = $scope.find('ul'),
            $FilterBy   = $scope.find('.aux-filter-by'),
            $AllOptions = Array.from($DropDown.children('li'));

        function ClassCheck(){
            if ( ! $DropDown.hasClass('aux-active') ) {
                $DropDown.addClass('aux-active');
            } else{
                $DropDown.removeClass('aux-active');
            }
        }

        $FilterBy.click( function() {
            ClassCheck();
        });

        function InsertText(){
            var $ItemLabel = $(this).text();

            $FilterBy.find('.aux-filter-name').html($ItemLabel);
            ClassCheck();

        }

        for ( var i = 0 ; $AllOptions.length > i ; i++){
            $AllOptions[i].addEventListener('click', InsertText );
        }

        window.addEventListener('click', function(e){

            if ( e.target.className != $FilterBy.attr('class') && e.target.className != $FilterBy.find('.aux-filter-name').attr('class') ) {
                if ( $DropDown.hasClass('aux-active') ){
                    $DropDown.removeClass('aux-active');
                }
            }

        });
    }

    // DropDown For Filters init
    $.fn.AuxinDropDownSelectInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find('.aux-filters.aux-dropdown-filter').each(function() {
            $(this).AuxinDropDownSelect();
        });
    };

    $.fn.AuxinTriggerResize = function( $scope ){
        $scope = $scope || $(window);
        $scope.trigger( 'resize' );
    };

    // Scale Element By Scroll
    $.fn.AuxinScrollScale = function( start, target, startScale, endScale ){
        var $this        = $(this),
            $el          = $(start),
            $target      = $(target),
            $window      = $(window),
            endScale     = endScale || 1 ,
            targetHeight = $target.outerHeight(),
            scrollValue,
            elBot,
            scaleValue;

        $window.on('scroll', function(){
            scrollValue = $window.height() + $window.scrollTop();
            elBot        = $el.offset().top + $el.outerHeight();

            if( scrollValue > elBot ) {
                scrollValue = ( scrollValue - elBot ) / targetHeight ;
                scaleValue  = ( startScale - ( scrollValue   * ( startScale - endScale ) ) );

                if ( scaleValue < endScale ){
                    $target[0].style[window._jcsspfx + 'Transform'] = 'scale(' + scaleValue + ')';
                }
            }

        });
    }

    // Scale Element By Scroll Init
    $.fn.AuxinScrollScaleInit = function( $scope ){
        $scope = $scope || $(this);

        $scope.find('.aux-bs-get-started').each(function() {
            $(this).AuxinScrollScale( '.aux-bs-footer-scale', '.aux-subfooter .aux-wrapper', 0.94, 1 );
        });
    };

    /**
     * Opens or closes the overlay container in page
     *
     * @param  {jQuery Element} $overlay
     * @param  {Boolean}        close              Is it closed right now?
     * @param  {Number}         animDuration
     */
    window.auxinToggleOverlayContainer = function( $overlay, close, animDuration ) {
        var anim = $overlay.data( 'anim' ),
            overlay = $overlay[0],
            animDuration = animDuration || 800;

        if ( anim ) {
            anim.stop( true );
        }

        if ( close ) {
            $overlay.css( {
                opacity: 0,
                display: 'block'
            } );

            overlay.style[ window._jcsspfx + 'Transform' ] = 'perspective(200px) translateZ(30px)';
            anim = CTween.animate($overlay, animDuration, {
                transform: 'none', opacity: 1
            }, {
                ease: 'easeOutQuart'
            });

        } else {
            anim = CTween.animate($overlay, animDuration / 2, {
                transform: 'perspective(200px) translateZ(30px)',
                opacity: 0
            }, {
                ease: 'easeInQuad',
                complete: function() {
                    $overlay.css( 'display', 'none' );
                }
            });
        }

        $overlay.data( 'anim', anim );

    };

    // Offcanvas and overlay menu
    $.fn.AuxinMobileMenuInit = function( $scope ){
        $scope = $scope || $(this);

        // burger mobile menu and search intraction
        // @if TODO
        // Selectors should be more accurate in future
        // @endif
        var $burger         = $scope.find('#nav-burger'),
            $burgerIcon     = $burger.find('>.aux-burger'),
            isClosed        = true,
            animDuration    = 600,
            $window         = $(window),
            $menu           = $scope.find('header .aux-master-menu'),
            anim, $menuContainer;

        /* ------------------------------------------------------------------------------ */
        function toggleExpnadableMenu() {
            $burgerIcon.toggleClass( 'aux-close' );

            if ( anim ) {
                anim.stop( true );
            }

            if ( isClosed ) {
                anim = CTween.animate($menuContainer, animDuration, { height: $menu.outerHeight() + 'px' }, {
                    ease: 'easeInOutQuart',
                    complete: function() {
                        $menuContainer.css( 'height', 'auto' );
                    }
                } );
            } else {
                $menuContainer.css( 'height', $menu.outerHeight() + 'px' );
                anim = CTween.animate($menuContainer, animDuration, { height: 0 }, { ease: 'easeInOutQuart' } );
            }

            isClosed = !isClosed;
        }

        /* ------------------------------------------------------------------------------ */
        function toggleOffcanvasMenu() {
            $burgerIcon.toggleClass( 'aux-close' );
            $menuContainer.toggleClass( 'aux-open' );
            isClosed = !isClosed;
        }

        /* ------------------------------------------------------------------------------ */
        function toggleOverlayMenu() {
            $burgerIcon.toggleClass( 'aux-close' );
            if ( isClosed ) {
                $menuContainer.show();
            }
            auxinToggleOverlayContainer( $menuContainer, isClosed );
            isClosed = !isClosed;
        }
        /* ------------------------------------------------------------------------------ */
        function closeOnEsc( toggleFunction ) {
            $(document).keydown( function(e) {
                if ( e.keyCode == 27 && !isClosed ) {
                    toggleFunction();
                }
            });
        }

        /* ------------------------------------------------------------------------------ */

        switch ( $burger.data( 'target-panel' ) ) {
            case 'toggle-bar':
                $menuContainer  = $scope.find('header .aux-toggle-menu-bar');
                $burger.click( toggleExpnadableMenu );
                break;
            case 'offcanvas':
                $menuContainer  = $scope.find('#offmenu')
                $burger.click( toggleOffcanvasMenu );
                $menuContainer.find('.aux-close').click( toggleOffcanvasMenu );

                // setup swipe
                //var touchSwipe = new averta.TouchSwipe( $scope.find(document) );
                var activeWidth = $menu.data( 'switch-width' ),
                    dir = ( $menuContainer.hasClass( 'aux-pin-right' ) ? 'right' : 'left' );

                if ( activeWidth !== undefined ) {
                    $window.on( 'resize', function() {
                        if ( window.innerWidth > activeWidth ) {

                            $menuContainer.hide();
                        } else {
                            if ( !isClosed ) {

                            }
                            $menuContainer.show();
                        }
                    });
                }

                closeOnEsc( toggleOffcanvasMenu );
                break;

            case 'overlay':
                var activeWidth = $menu.data( 'switch-width' ),
                    oldSkinClassName = $menu.attr( 'class' ).match( /aux-skin-\w+/ )[0];
                $menuContainer = $scope.find('#fs-menu-search');
                $burger.click( toggleOverlayMenu );
                $menuContainer.find( '.aux-panel-close' ).click( toggleOverlayMenu );

                var checkForHide = function() {
                    if ( window.innerWidth > activeWidth ) {
                        $menuContainer.hide();
                        $menu.addClass( oldSkinClassName );
                    } else {
                        if ( !isClosed ) {
                            $menuContainer.show();
                        }
                        $menu.removeClass( oldSkinClassName );
                    }
                }

                if ( activeWidth !== undefined ) {
                    checkForHide();
                    $window.on( 'resize', checkForHide );
                }

                closeOnEsc( toggleOverlayMenu );
        }

    };

    // Overlat Search
    $.fn.AuxinOverlaySearchInit = function( $scope ){
        $scope = $scope || $(this);

        // fullscreen/overlay search
        var overlaySearchIsClosed = true,
            overlaySearchContainer = $scope.find('#fs-search'),
            searchField = overlaySearchContainer.find( 'input[type="text"]' );

        $scope.find('.aux-overlay-search').click( toggleOverlaySearch );
        overlaySearchContainer.find( '.aux-panel-close' ).click( toggleOverlaySearch );

        $(document).keydown( function(e) {
            if ( e.keyCode == 27 && !overlaySearchIsClosed ) {
                toggleOverlaySearch();
            }
        });

        function toggleOverlaySearch() {
            auxinToggleOverlayContainer( overlaySearchContainer, overlaySearchIsClosed );
            overlaySearchIsClosed = !overlaySearchIsClosed;
            if ( !overlaySearchIsClosed ) {
                searchField.focus();
            }
        };
    }

    // Menu Auto Switch
    $.fn.AuxinMenuAutoSwitchInit = function( $scope ){
        $scope = $scope || $(this);

        var isResp = $('body').hasClass( 'aux-resp' );

        // init Master Menu
        if ( !isResp && $scope.find('.aux-master-menu').data( 'switch-width' ) < 7000 ) {
            // disable switch if layout is not responsive
            $scope.find('.aux-master-menu').data( 'switch-width', 0 );
        }

        if ( $scope.find('.aux-fs-popup').hasClass('aux-no-indicator') ){
            $scope.find('.aux-master-menu').mastermenu( { useSubIndicator: false , addSubIndicator: false} );
        } else if ( $('body').hasClass( 'aux-vertical-menu' ) ) {  // Disable CheckSubmenuPosition in Vertical Menu
            $scope.find('.aux-master-menu').mastermenu( { keepSubmenuInView: false } );
        } else{
            $scope.find('.aux-master-menu').mastermenu( /*{openOn:'press'}*/ );
        }
    };

})(jQuery, window, document);


/* ================== js/src/module.resize.js =================== */


/**
 * Page resize scripts
 */
;(function($){

    var $_window                = $(window),
        $body                   = $('body'),
        screenWidth             = $_window.width(),
        $main_content           = $('#main'),
        breakpoint_tablet       = 768,
        breakpoint_desktop      = 1024,
        breakpoint_desktop_plus = 1140,
        original_page_layout    = '',
        layout_class_names      = {
            'right-left-sidebar' : 'right-sidebar',
            'left-right-sidebar' : 'left-sidebar',
            'left2-sidebar'      : 'left-sidebar',
            'right2-sidebar'     : 'right-sidebar'
        };


    function updateSidebarsHeight() {

        screenWidth = window.innerWidth;

        var $content   = $('.aux-primary');
        var $sidebars  = $('.aux-sidebar');

        var max_height = $('.aux-sidebar .sidebar-inner').map(function(){
            return $(this).outerHeight();
        }).get();

        max_height = Math.max.apply(null, max_height);
        max_height = Math.max( $content.outerHeight(), max_height );
        $sidebars.height( screenWidth >= breakpoint_tablet ? max_height : 'auto' );

        // Switching 2 sidebar layouts on mobile and tablet size
        // ------------------------------------------------------------

        // if it was not on desktop size
        if( screenWidth <= breakpoint_desktop_plus ){

            for ( original in layout_class_names) {
                if( $main_content.hasClass( original ) ){
                    original_page_layout =  original;
                    $main_content.removeClass( original ).addClass( layout_class_names[ original ] );
                    return;
                }
            }

        // if it was on desktop size
        } else if( '' !== original_page_layout ) {
            $main_content.removeClass('left-sidebar')
                         .removeClass('right-sidebar')
                         .addClass( original_page_layout );

            original_page_layout = '';
        }
    };


    // overrides instagram feed class and updates sidebar height on instagram images load
    if ( window.instagramfeed ) {
        var _run = instagramfeed.prototype.run;
        instagramfeed.prototype.run = function() {
            var $target = $(this.options.target);
            if ( $target.parents( '.aux-sidebar' ).length > 0 ) {
                var _after = this.options.after;
                this.options.after = function() {
                    _after.apply( this, arguments );
                    $target.find('img').one( 'load', updateSidebarsHeight );
                };
            }
            _run.apply( this, arguments );
        };
    }


    // if site frame is enabled
    if( $body.data('framed') ){

        // disable frame on small screens
        $_window.on( "debouncedresize", function(){
            $body.toggleClass('aux-framed', $_window.width() > 700 );
        });

    }

    if( $body.hasClass("aux-sticky-footer") ){

        // update the
        $_window.on( "debouncedresize", function(){

            var marginFrameThickness = $body.hasClass('aux-framed') ? $('.aux-side-frames').data('thickness') : 0,

                $footer            = $(".aux-site-footer"),
                $subfooter         = $(".aux-subfooter"),
                $subfooterBar      = $(".aux-subfooter-bar"),
                footerHeight       = $footer.is(":visible") ? $footer.outerHeight() : 0;
                subfooterHeight    = $subfooter.is(":visible") ? $subfooter.outerHeight() : 0;
                subfooterBarHeight = $subfooterBar.is(":visible") ? $subfooterBar.outerHeight() : 0;
            
            if( screenWidth <= breakpoint_tablet ){
                $('body').removeClass('aux-sticky-footer');
                $("#main").css( "margin-bottom", "" );
                $footer.css( "bottom");
                $subfooter.css( "bottom", "" );
                $subfooterBar.css( "bottom", "" );
            } else{

                if ( ! $body.hasClass("aux-sticky-footer") ) {
                    $('body').addClass('aux-sticky-footer');
                }

                $("#main").css( "margin-bottom", footerHeight + subfooterHeight + subfooterBarHeight );
                $footer.css( "bottom", marginFrameThickness );
                $subfooter.css( "bottom", footerHeight + marginFrameThickness );
                $subfooterBar.css( "bottom", footerHeight + subfooterHeight + marginFrameThickness );
            } 
            
        });

    }

    $_window.on( "debouncedresize", updateSidebarsHeight ).trigger('debouncedresize');


    $(document).on( 'lazyloaded', function(){
        $_window.trigger('resize');
    });

})(jQuery);

/*--------------------------------------------*/


;


/* ================== js/src/module.socials.js =================== */


/**
 * Socials Modules
 */
;(function($, window, document, undefined){
    "use strict";

    $.fn.AuxinJsSocialsInit = function( $scope ){
        $scope = $scope || $(this);

        var $shareButtons       = $scope.find(".aux-tooltip-socials"),        // share buttons
            mainWrapperClass    = 'aux-tooltip-socials-container',  // class for main container for button and tooltip
            tooltipWrapperClass = 'aux-tooltip-socials-wrapper';    // class for wrapper of tooltip

        if( ! $shareButtons.length ){
            return;
        }

        for ( var i = 0, l = $shareButtons.length; i < l; i++ ) {

            $shareButtons.eq(i).on( "click", function( e ){
                var $this = $(this);
                e.preventDefault();
                e.stopPropagation();

                if( ! $this.parent( '.' + mainWrapperClass ).length ){
                    // wrap the button within a container
                    $this.wrap( "<div class='"+mainWrapperClass+"'></div>" );

                    // append a wrapper for tooltip in main container
                    var $container = $this.parent( '.' + mainWrapperClass );
                        $container.append( "<div class='"+tooltipWrapperClass+"'></div>" );

                    // ini the social links after clicking the main share button
                    $container.children( "." + tooltipWrapperClass ).jsSocials({
                        shares: [
                            {
                                share: "facebook",
                                label: "Facebook",
                                logo : "auxicon-facebook"
                            },
                            {
                                share: "twitter",
                                label: "Tweet",
                                logo : "auxicon-twitter"
                            },
                            {
                                share: "googleplus",
                                label: "Google Plus",
                                logo : "auxicon-googleplus"
                            },
                            {
                                share: "pinterest",
                                label: "Pinterest",
                                logo : "auxicon-pinterest"
                            },
                            {
                                share: "linkedin",
                                label: "LinkedIn",
                                logo : "auxicon-linkedin"
                            },
                            {
                                share: "stumbleupon",
                                label: "Stumbleupon",
                                logo : "auxicon-stumbleupon"
                            },
                            {
                                share: "whatsapp",
                                label: "WhatsApp",
                                logo : "auxicon-whatsapp"
                            },
                            {
                                share: "pocket",
                                label: "Pocket",
                                logo : "auxicon-pocket"
                            },
                            {
                                share: "email",
                                label: "Email",
                                logo : "auxicon-email"
                            },
                            {
                                share: "telegram",
                                label: "Telegram",
                                logo : "auxicon-paperplane"
                            },
                        ],
                        shareIn: 'blank',
                        showLabel: false
                    });
                }

                // toggle the open class by clicking on share button
                $this.parent( "." + mainWrapperClass ).addClass('aux-tip-open').removeClass('aux-tip-close');
            });

        }

        // hide tooltip if outside the element was click
        $(window).on( "click", function() {
            $scope.find( "." + mainWrapperClass ).removeClass('aux-tip-open').addClass('aux-tip-close');
        });

    }

})(jQuery, window, document);


/* ================== js/src/modules.init.js =================== */


/**
 * Initialize All Modules
 */
;(function($, window, document, undefined){

    /**
     * Initializes static modules in page
     */
    window.AuxinInitPageModules = function( $scope ){
        $scope = $scope || $(document);

        // Init set on appear
        $.fn.AuxinSetOnApearInit( $scope );

        // Init Share Btns
        $.fn.AuxinJsSocialsInit( $scope );

        // Page Header Layout
        $.fn.AuxinPageHeaderLayoutInit( $scope );

        // Page preload animation init
        $.fn.AuxinPagePreloadAnimationInit( $scope );

        // Page cover animation init
        $.fn.AuxinPageCoverAnimationInit( $scope );

        // Dropdown Click/Hover init
        $.fn.AuxinDropdownEffectInit( $scope );

        // Shopping Cart Canvas Menu init
        $.fn.AuxinCartCanvasInit( $scope );

        // DropDown For Filters init
        $.fn.AuxinDropDownSelectInit( $scope );

        // Scale Element By Scroll Init
        $.fn.AuxinScrollScaleInit( $scope );

        // Match heights Init
        $.fn.AuxinMatchHeightInit( $scope );

        // Page Layout
        $.fn.AuxinPageLayoutInit( $scope );

        // Offcanvas and overlay menu init
        $.fn.AuxinMobileMenuInit( $scope );

        // Menu Auto Switch Init
        $.fn.AuxinMenuAutoSwitchInit( $scope );

        // Overlat Search Init
        $.fn.AuxinOverlaySearchInit( $scope );
    }

    /**
     * Initializes general modules
     */
    window.AuxinInitElements = function( $scope ){
        $scope = $scope || $(document);

        // Init Tilt
        $.fn.AuxinTiltElementInit( $scope );

        // Init FitVids
        $.fn.AuxinFitVideosInit( $scope );

        // Init Image box
        $.fn.AuxinImageBoxInit( $scope );

        // Init Before After
        $.fn.AuxinBeforeAfterInit( $scope );

        // Init Carousel and Lightbox
        $.fn.AuxinCarouselInit( $scope );

        // Modern form init
        $.fn.AuxinModernFormInit( $scope );

        // Miscellaneous scripts
        $.fn.AuxinOtherElementsInit( $scope );

        // InView Animation init
        $.fn.AuxinAppearInit( $scope );

        // Dynamic image drop shadow init
        $.fn.AuxinDynamicDropshadowInit( $scope );

        // Blur images with scroll - Init
        $.fn.AuxinScrollBlurImageInit( $scope );

    }

    /**
     * Initializes the general modules on doc ready
     */
    window.AuxinInitElementsOnReady = function( $scope ){
        $scope = $scope || $(document);

        // Init Isotope
        $.fn.AuxinIsotopeInit( $scope );

        // Tabs
        $.fn.AuxinLiveTabsInit( $scope );

        // Accordion Element
        $.fn.AuxinAccordionInit( $scope );

        // Timeline
        $.fn.AuxinTimelineInit( $scope );

        // Code highlighter
        $.fn.AuxinCodeHighlightInit( $scope );

        // Load More functionality
        $.fn.AuxinLoadMoreInit( $scope );

        // Video Box
        $.fn.AuxinVideoBoxInit( $scope );

        // Image interaction
        $.fn.AuxinImageInteractionInit( $scope );

        // Toggle-able List
        $.fn.AuxinToggleListInit( $scope );

        // Masonry Animate
        $.fn.AuxinMasonryAnimateInit( $scope );

        // Media Element init
        $.fn.AuxinMediaElementInit( $scope );

        // Parallax Box init
        $.fn.AuxinParallaxBoxInit( $scope );
    }

    /**
     * Initializes all Auxin modules
     */
    window.AuxinInitAllModules = function( $scope ){
        $scope = $scope || $(document);

        AuxinInitPageModules( $scope );
        AuxinInitElements( $scope );
        AuxinInitElementsOnReady( $scope );
    }

    // Init static modules in page
    AuxinInitPageModules();

    // Init general modules
    AuxinInitElements();

    // Init some modules on doc ready
    $(function(){
        AuxinInitElementsOnReady();
    });

})(jQuery, window, document);


/* ================== js/src/modules.init.visual-builders.js =================== */


/**
 * Initialize Modules on Vidual Editors
 */
;(function($, window, document, undefined){

    var $vcWindow, $__window = $(window);

    // Add js callback for customizer partials trigger
    if( typeof wp !== 'undefined' && typeof wp.customize !== 'undefined' ) {
        if( typeof wp.customize.selectiveRefresh !== 'undefined' ){
            wp.customize.selectiveRefresh.bind( 'partial-content-rendered', function() {
                // Init auxin modules
                AuxinInitAllModules( $('body') );
            });
        }
    }

    // Init Visual Composer
    $__window.on('vc_reload', function(){
        // Main selector
        $vcWindow = $('#vc_inline-frame', window.parent.document).contents().find('.vc_element');

        // Init auxin modules
        AuxinInitAllModules( $vcWindow );

        // Init mejs player
        if(typeof MediaElement !== 'undefined') {
            $vcWindow.find('video,audio').mediaelementplayer();
        }

        // Init instagram feed
        if(typeof sbi_js_exists !== 'undefined') {
            sbi_init();
        }

        // Init Flickr Justified Gallery
        if (typeof fjgwpp_galleriesInit_functions !== "undefined") {
            for (var i in fjgwpp_galleriesInit_functions) {
                fjgwpp_galleriesInit_functions[i]();
            }
        }

        $__window.trigger('resize');
    });

    // Init Elementor
    // $__window.on('elementor/frontend/init', function (){

    // });

})(jQuery, window, document);