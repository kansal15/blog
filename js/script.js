/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

(function ($) {
    'use strict';

    // Preloader js    
    $(window).on('load', function () {
     
        $('.preloader').fadeOut(700);
    });

    // headroom js
    $('.navigation').headroom();

    // Background-images
    $('[data-background]').each(function () {
        $(this).css({
            'background-image': 'url(' + $(this).data('background') + ')'
        });
    });

    $('.featured-post-slider').slick({
        dots: false,
        speed: 300,
        autoplay: true,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    // Masonry
    $(document).ready(function () {
        $('.masonry-container').masonry({
            itemSelector: '.masonry-container > div',
            columnWidth: 1
        });
    });


    // instafeed
    if (($('#instafeed').length) !== 0) {
        var userId = $('#instafeed').attr('data-userId');
        var accessToken = $('#instafeed').attr('data-accessToken');
        var userFeed = new Instafeed({
            get: 'user',
            userId: userId,
            resolution: 'low_resolution',
            accessToken: accessToken,
            template: '<div class="instagram-post"><img class="img-fluid w-100" src="{{image}}" alt="instagram-image"><ul class="list-inline text-center"><li class="list-inline-item"><a href="{{link}}" target="_blank" class="text-white"><i class="ti-heart mr-2"></i>{{likes}}</a></li><li class="list-inline-item"><a href="{{link}}" target="_blank" class="text-white"><i class="ti-comments mr-2"></i>{{comments}}</a></li></ul></div>'
        });
        userFeed.run();
    }

    setTimeout(function () {
        $('.instagram-slider').slick({
            dots: false,
            speed: 300,
            autoplay: true,
            arrows: false,
            slidesToShow: 6,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
    }, 2000);

    // article reading time
    // $('article').each(function () {

    //     let _this = $(this);
    //     _this.readingTime({

    //         readingTimeTarget: _this.find('.eta'),

    //     });
    // });


})(jQuery);



// Pagination in index page js

// js 1


// $('.page').paginathing({
//   perPage: 4,
//   insertAfter: '.page',
//   pageNumbers: true,
//   ulClass: 'profile-pagination-wrap align-center mt-4'
// });


$(document).ready(function () {



    var elements = $('.page').find($('.mb-60'));
    paginateChildren($('.page'), elements);


    function paginateChildren(parentElement, elements) {
        $('#page_navigation').show();
        $('#cat_page_navigation').hide();
    
        let page = 1;
        let currentElements;
        let offsetStart;
        let offsetEnd;
        let currentPage = 1;
        let elementsPerPage = 4;
 
        var nmbrOfPages = Math.ceil(elements.length / elementsPerPage);


        var displayNav = function () {
            htmlNav = '<div class="paginationNav pull-right">';
            htmlNav += '<a href="#" title="Previous" rel="" class="prev"><i class="fa fa-angle-left fa-lg"></i></a>';
            htmlNav += '<span>' + currentPage + ' / ' + nmbrOfPages + '</span><br />';
            htmlNav += '<a href="#" title="Next" rel="" class="next active"><i class="fa fa-angle-right fa-lg"></i></a>';
            htmlNav += '</div>';
           
            $('#page_navigation .paginationNav').show();
            if (!$('#page_navigation').find('.paginationNav').length) {
                let testing = $('#page_navigation').find('.paginationNav').length;
                $('#page_navigation').append(htmlNav);
            }

        };


        $('#page_navigation').on('click', '.paginationNav a.prev', function (e) {
            e.preventDefault();
            page = currentPage > 1 ? parseInt(currentPage) - 1 : 1;
            displayPage(page);
        });
        $('#page_navigation').on('click', '.paginationNav a.next', function (e) {
            e.preventDefault();
            page = currentPage < nmbrOfPages ? parseInt(currentPage) + 1 : nmbrOfPages;
            displayPage(page);
        });




        var displayPage = function (page) {
            if (currentPage != page || page == 1) {
                currentPage = parseInt(page);
                if (nmbrOfPages > 1) {
                    $('#page_navigation .paginationNav').show();
                    $('#page_navigation .paginationNav span').html(currentPage + ' / ' + nmbrOfPages);
                }
                else {
                    $('#page_navigation .paginationNav').hide();
                }

                var $prevButton = $('#page_navigation .paginationNav a.prev');
                var $nextButton = $('#page_navigation .paginationNav a.next');
                if (currentPage == 1 && nmbrOfPages > 1) {
                    if ($prevButton.hasClass('active')) {
                        $prevButton.removeClass('active');
                    }
                    $nextButton.addClass('active');

                } else if (currentPage > 1 && currentPage < nmbrOfPages) {
                    $prevButton.addClass('active');
                    $nextButton.addClass('active');

                } else if (nmbrOfPages > 1 && currentPage == nmbrOfPages) {
                    $prevButton.addClass('active');
                    if ($nextButton.hasClass('active')) {
                        $nextButton.removeClass('active');
                    }


                }
                offsetStart = (page - 1) * elementsPerPage;
                offsetEnd = page * elementsPerPage;
                if (currentElements) {
                    let getlength = currentElements.length;
                    currentElements.hide();
                } else {
                    elements.hide();
                }
                currentElements = elements.slice(offsetStart, offsetEnd);
                currentElements.fadeIn();
            }
        };
        if (page.length <= 0 || page < 1 || page > nmbrOfPages) {
            page = 1;
        }

        displayPage(page);

        if (nmbrOfPages > 1) {
            displayNav();
        }
    }

    $('.categories-list li').each(function (i) {

        var classname = $(this).attr('class');
        var list = $(".page .mb-60").filter(`.${classname}Artical`).length;
        $(`.${classname}value`).html(`(${list})`);

    });



    var activeCat = "";
    function filterGroup(group) {
        if (activeCat != group) {

            $(".page .mb-60").filter("." + group).show().addClass("catlist");
            $(".page .mb-60").filter(":not(." + group + ")").hide().removeClass("catlist");
            activeCat = group;
        }
    }


    function paginateChildrentwo(parentElement, elementtwo) {
        var page = 1;
        var currentElements;
        var offsetStart;
        var offsetEnd;
        var currentPage = 1;
        var elementsPerPage = 4;

        var nmbrOfPages = Math.ceil(elementtwo.length / elementsPerPage);


        var displayNavtwo = function () {
            htmlNav = '<div class="paginationNav pull-right">';
            htmlNav += '<a href="#" title="Previous" rel="" class="prev"><i class="fa fa-angle-left fa-lg"></i></a>';
            htmlNav += '<span>' + currentPage + ' / ' + nmbrOfPages + '</span><br />';
            htmlNav += '<a href="#" title="Next" rel="" class="next active"><i class="fa fa-angle-right fa-lg"></i></a>';
            htmlNav += '</div>';

            $('#cat_page_navigation .paginationNav').show();
            if (!$('#cat_page_navigation').find('.paginationNav').length) {
                let testing = $('#cat_page_navigation').find('.paginationNav').length;
                $('#cat_page_navigation').append(htmlNav);
            }
        };

                      

        $('#cat_page_navigation').on('click', '.paginationNav a.prev', function (e) {
            e.preventDefault();
            elementtwo = $('.page').find('.catlist');
            page = currentPage > 1 ? parseInt(currentPage) - 1 : 1;  
            // console.log(`prev ${page}`);                  
            displayPagetwo(page, elementtwo);
        });
        $('#cat_page_navigation').on('click', '.paginationNav a.next', function (e) {
            e.preventDefault();
            elementtwo = $('.page').find('.catlist');
            page = currentPage < nmbrOfPages ? parseInt(currentPage) + 1 : nmbrOfPages;
            // console.log(`next ${page}`);
            displayPagetwo(page, elementtwo);
        });


        var displayPagetwo = function (page, elementtwo) {
            if (currentPage != page || page == 1) {
                currentPage = parseInt(page);
                if (nmbrOfPages > 1) {
                    $('#cat_page_navigation .paginationNav').show();
                    $('#cat_page_navigation .paginationNav span').html(currentPage + ' / ' + nmbrOfPages);
                }
                else {
                    $('#cat_page_navigation .paginationNav').hide();
                }

                var $prevButton = $('#cat_page_navigation .paginationNav a.prev');
                var $nextButton = $('#cat_page_navigation .paginationNav a.next');
                if (currentPage == 1 && nmbrOfPages > 1) {
                    if ($prevButton.hasClass('active')) {
                        $prevButton.removeClass('active');
                    }
                    $nextButton.addClass('active');
                } else if (currentPage > 1 && currentPage < nmbrOfPages) {
                    $prevButton.addClass('active');
                    $nextButton.addClass('active');
                } else if (nmbrOfPages > 1 && currentPage == nmbrOfPages) {
                    $prevButton.addClass('active');
                    if ($nextButton.hasClass('active')) {
                        $nextButton.removeClass('active');
                    }
                }
                
                offsetStart = (page - 1) * elementsPerPage;
                offsetEnd = page * elementsPerPage;
                if (currentElements) {
                   let getlength = currentElements.length;
                    // currentElements.css('display', 'none');
                    elementtwo.css('display', 'none');
                } else {
                    elementtwo.css('display', 'none');
                }
                currentElements = elementtwo.slice(offsetStart, offsetEnd);
                currentElements.css('display', 'block');
            }
        };
        if (page.length <= 0 || page < 1 || page > nmbrOfPages) {
            page = 1;
        }
        elementtwo = $('.page').find('.catlist');
        displayPagetwo(page, elementtwo);

        if (nmbrOfPages > 1 && nmbrOfPages !="") {
            displayNavtwo();
        }
    }


    $(".categories-list a").click(function (event) {
        $('#page_navigation').hide();
        $('#cat_page_navigation').show();
        let categoriesClass = $(this).parent().attr("class");
        event.preventDefault();
        filterGroup(`${categoriesClass}Artical`);
        const elementtwo = $('.page').find('.catlist');
        // console.log(elementtwo);
        paginateChildrentwo($('.page'), elementtwo);
    });


});



//Show hide Banner

function bannerShowHide(page_num) {
    if (page_num != 0) {
        $(".hero-section").hide();
    } else {
        $(".hero-section").show();
    }
}





// aboutUs js
jQuery(document).ready(function ($) {
    //set animation timing
    var animationDelay = 2500,
            //loading bar effect
            barAnimationDelay = 3800,
            barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
            //letters effect
            lettersDelay = 50,
            //type effect
            typeLettersDelay = 150,
            selectionDuration = 500,
            typeAnimationDelay = selectionDuration + 800,
            //clip effect 
            revealDuration = 600,
            revealAnimationDelay = 1500;

    initHeadline();

    function initHeadline() {
        //insert <i> element for each letter of a changing word
        singleLetters($('.cd-headline.letters').find('b'));
        //initialise headline animation
        animateHeadline($('.cd-headline'));
    }

    function singleLetters($words) {
        $words.each(function () {
            var word = $(this),
                    letters = word.text().split(''),
                    selected = word.hasClass('is-visible');
            for (i in letters) {
                if (word.parents('.rotate-2').length > 0)
                    letters[i] = '<em>' + letters[i] + '</em>';
                letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
            }
            var newLetters = letters.join('');
            word.html(newLetters);
        });
    }

    function animateHeadline($headlines) {
        var duration = animationDelay;
        $headlines.each(function () {
            var headline = $(this);

            if (headline.hasClass('loading-bar')) {
                duration = barAnimationDelay;
                setTimeout(function () {
                    headline.find('.cd-words-wrapper').addClass('is-loading')
                }, barWaiting);
            } else if (headline.hasClass('clip')) {
                var spanWrapper = headline.find('.cd-words-wrapper'),
                        newWidth = spanWrapper.width() + 10
                spanWrapper.css('width', newWidth);
            } else if (!headline.hasClass('type')) {
                //assign to .cd-words-wrapper the width of its longest word
                var words = headline.find('.cd-words-wrapper b'),
                        width = 0;
                words.each(function () {
                    var wordWidth = $(this).width();
                    if (wordWidth > width)
                        width = wordWidth;
                });
                headline.find('.cd-words-wrapper').css('width', width);
            }
            ;

            //trigger animation
            setTimeout(function () {
                hideWord(headline.find('.is-visible').eq(0))
            }, duration);
        });
    }

    function hideWord($word) {
        var nextWord = takeNext($word);

        if ($word.parents('.cd-headline').hasClass('type')) {
            var parentSpan = $word.parent('.cd-words-wrapper');
            parentSpan.addClass('selected').removeClass('waiting');
            setTimeout(function () {
                parentSpan.removeClass('selected');
                $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
            }, selectionDuration);
            setTimeout(function () {
                showWord(nextWord, typeLettersDelay)
            }, typeAnimationDelay);

        } else if ($word.parents('.cd-headline').hasClass('letters')) {
            var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
            hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
            showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

        } else if ($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({
                width: '2px'
            }, revealDuration, function () {
                switchWord($word, nextWord);
                showWord(nextWord);
            });

        } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
            $word.parents('.cd-words-wrapper').removeClass('is-loading');
            switchWord($word, nextWord);
            setTimeout(function () {
                hideWord(nextWord)
            }, barAnimationDelay);
            setTimeout(function () {
                $word.parents('.cd-words-wrapper').addClass('is-loading')
            }, barWaiting);

        } else {
            switchWord($word, nextWord);
            setTimeout(function () {
                hideWord(nextWord)
            }, animationDelay);
        }
    }

    function showWord($word, $duration) {
        if ($word.parents('.cd-headline').hasClass('type')) {
            showLetter($word.find('i').eq(0), $word, false, $duration);
            $word.addClass('is-visible').removeClass('is-hidden');

        } else if ($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({
                'width': $word.width() + 10
            }, revealDuration, function () {
                setTimeout(function () {
                    hideWord($word)
                }, revealAnimationDelay);
            });
        }
    }

    function hideLetter($letter, $word, $bool, $duration) {
        $letter.removeClass('in').addClass('out');

        if (!$letter.is(':last-child')) {
            setTimeout(function () {
                hideLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
        } else if ($bool) {
            setTimeout(function () {
                hideWord(takeNext($word))
            }, animationDelay);
        }

        if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
            var nextWord = takeNext($word);
            switchWord($word, nextWord);
        }
    }

    function showLetter($letter, $word, $bool, $duration) {
        $letter.addClass('in').removeClass('out');

        if (!$letter.is(':last-child')) {
            setTimeout(function () {
                showLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
        } else {
            if ($word.parents('.cd-headline').hasClass('type')) {
                setTimeout(function () {
                    $word.parents('.cd-words-wrapper').addClass('waiting');
                }, 200);
            }
            if (!$bool) {
                setTimeout(function () {
                    hideWord($word)
                }, animationDelay)
            }
        }
    }

    function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function takePrev($word) {
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
    }
});



// side toggle js


//The only necessary piece of code lol
function toggleSidebar() {


    $("#sidebar").addClass("move-to-left");
    $("#sidebar-tab").addClass("move-to-left disable");
    // $(".sidemovehidden").removeClass("sidemovehidden");

    $("main").addClass("move-to-left-partly");


}
function mouseleave() {
    // alert("df");
    $("#sidebar").removeClass("move-to-left");
    $("#sidebar-tab").removeClass("move-to-left disable");
    $(".sidemovehidden").addClass("sidemovehidden");
    $("main").removeClass("move-to-left-partly");

}


//new one


(function ($) {
    "use strict";


    $(document).ready(function () {
        "use strict";

        //Scroll back to top

        var progressPath = document.querySelector('.progress-wrap path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 500;
        jQuery(window).on('scroll', function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.progress-wrap').addClass('active-progress');
            } else {
                jQuery('.progress-wrap').removeClass('active-progress');
            }
        });
        jQuery('.progress-wrap').on('click', function (event) {
            event.preventDefault();
            jQuery('html, body').animate({scrollTop: 0}, duration);
            return false;
        })


    });

})(jQuery);

// link-files js 
function linkfiles(link) {
    $("a").attr("href", "#" + link + "");
    $('.refLi li.active').removeClass("active");
    $('#' + link + '').addClass("active");
}

function linkOpen(lin) {
    window.open(lin, '_blank');
}

function uselinks(lin) {
    parent.location = lin;
}


//Reading Time show

function readingTime(result, artiacalUrl, getindexhref, getindexa){
    let aboutdata = $(result).find(".card .card-block").text().trim();
          // console.log(aboutdata);
          let wordsArray = aboutdata.split(/\s+/);
          let wordCount = wordsArray.length;
          let wordsPerMinute = 225;
          let readingTime = Math.ceil(wordCount / wordsPerMinute);
          //    console.log(`${artiacalUrl}-${readingTime}`);
          if (artiacalUrl == getindexhref) {
              var getclassnew=$(getindexa).siblings('ul').find('.eta');
             $(getclassnew).text(`${readingTime} Minute to read`);
          }
  }
  
  $(document).ready(function () {
    $("#pagingBox>div .article-full-width a.btn").each(function () {
      let getindexa= $(this).siblings("h4");
      let getindexhref = $(getindexa).find("a").attr("href");
      var artiacalUrl = $(this).attr("href").trim();
  
      $.ajax({
        type: "GET",
        url: artiacalUrl,
        data: "{articlurl: " + artiacalUrl + "}",
        dataType: "html",
        success: function (result) {
          readingTime(result, artiacalUrl, getindexhref, getindexa);
        },
      });
    });
  });
  