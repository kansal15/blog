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
  $('article').each(function () {

    let _this = $(this);
    _this.readingTime({
      
      readingTimeTarget: _this.find('.eta'),

    });
  });


})(jQuery);



// index page js

    // js 1


    // $('.page').paginathing({
    //   perPage: 4,
    //   insertAfter: '.page',
    //   pageNumbers: true,
    //   ulClass: 'profile-pagination-wrap align-center mt-4'
    // });

    $(document).ready(function () {

      //Pagination JS
      //how much items per page to show
      var show_per_page = 4;
      //getting the amount of elements inside pagingBox div
      var number_of_items = $('#pagingBox').children().length;
      //calculate the number of pages we are going to have
      var number_of_pages = Math.ceil(number_of_items / show_per_page);



      //set the value of our hidden input fields
      $('#current_page').val(0);
      $('#show_per_page').val(show_per_page);

      //now when we got all we need for the navigation let's make it '

      /* 
      what are we going to have in the navigation?
        - link to previous page
        - links to specific pages
        - link to next page
      */

      function creatLink() {
        var navigation_html = '<a class=" previous_link" href="javascript:previous();"><< Previous</a>';
        var current_link = 0;
        while (number_of_pages > current_link) {
          // console.log(current_link);
          navigation_html += '<a class="page-link" href="javascript:go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
          current_link++;
        }
        navigation_html += '<a class="next_link" href="javascript:next();">Next >></a>';

        $('#page_navigation').html(navigation_html);

        //add active class to the first page link
        $('#page_navigation .page-link:first').addClass('active');

        //hide all the elements inside pagingBox div
        $('#pagingBox').children().css('display', 'none');

        //and show the first n (show_per_page) elements
        $('#pagingBox').children().slice(0, show_per_page).css('display', 'block');


      };
      creatLink();

      // list view


      $('.categories-list li').each(function (i) {

        var classname = $(this).attr('class');
        let list = $(".page > div").filter(`.${classname}Artical`).length;
        $(`.${classname}value`).html(`(${list})`);

      });



      var activeCat = "";
      function filterGroup(group) {
        if (activeCat != group) {

          $(".page > div").filter("." + group).show().addClass("catlist");
          $(".page > div").filter(":not(." + group + ")").hide().removeClass("catlist");
          activeCat = group;
        }
      }


      function getMachine() {

        $(".categories-list a").click(function (event) {
          $('#page_navigation').hide();
          $('#page_navigations').show();
          let categoriesClass = $(this).parent().attr("class");
          event.preventDefault();
          filterGroup(`${categoriesClass}Artical`);

          $('#current_page').val(0);


          list_of_cat = $('#pagingBox').children(".catlist").length;
          // console.log(`list of ${list_of_cat}`);

          // $("#page_navigation").hide();

          var number_of_pages = Math.ceil(list_of_cat / show_per_page);

          var navigation_htmls = '<a class=" previous_link" href="javascript:previouspage();"><< Previous</a>';
          var current_links = 0;
          while (number_of_pages > current_links) {
            // console.log(current_links);
            navigation_htmls += '<a class="page-link" href="javascript:go_to_pages(' + current_links + ')" longdesc="' + current_links + '">' + (current_links + 1) + '</a>';
            current_links++;
          }
          navigation_htmls += '<a class="next_link" href="javascript:nextpage();">Next >></a>';

          $('#page_navigations').html(navigation_htmls);

          //add active class to the first page link
          $('#page_navigations .page-link:first').addClass('active');

          // //hide all the elements inside pagingBox div
          $('#pagingBox').children('.catlist').css('display', 'none');

          //and show the first n (show_per_page) elements
          $('#pagingBox').children('.catlist').slice(0, show_per_page).css('display', 'block');

        });
        return number_of_pages;
      }
      var list = getMachine();

    });


    //Pagination JS

    function previous() {

      new_page = parseInt($('#current_page').val()) - 1;
      // hide the image

      //if there is an item before the current active link run the function
      if ($('.active').prev('.page-link').length == true) {

        go_to_page(new_page);
      }

    }

    function next() {
      new_page = parseInt($('#current_page').val()) + 1;

      //if there is an item after the current active link run the function
      if ($('.active').next('.page-link').length == true) {
        go_to_page(new_page);

      }

    }
    function go_to_page(page_num) {
      //get the number of items shown per page
      var show_per_page = parseInt($('#show_per_page').val());

      bannerShowHide(page_num);
      //get the element number where to start the slice from
      start_from = page_num * show_per_page;

      //get the element number where to end the slice
      end_on = start_from + show_per_page;

      //hide all children elements of pagingBox div, get specific items and show them
      $('#pagingBox').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');

      /*get the page link that has longdesc attribute of the current page and add active class to it
      and remove that class from previously active page link*/
      $('.page-link[longdesc=' + page_num + ']').addClass('active').siblings('.active').removeClass('active');

      //update the current page input field
      $('#current_page').val(page_num);
    }

    function previouspage() {

      new_page = parseInt($('#current_page').val()) - 1;
      // hide the image

      //if there is an item before the current active link run the function
      if ($('#page_navigations .active').prev('.page-link').length == true) {

        go_to_pages(new_page);

      }

    }

    function nextpage() {
      new_pages = parseInt($('#current_page').val()) + 1;


      //if there is an item after the current active link run the function
      var truee = $('.active').next('.page-link').length;
      if ($('#page_navigations .active').next('.page-link').length == true) {

        go_to_pages(new_pages);
      }

    }

    function go_to_pages(page_num) {
      //get the number of items shown per page
      var show_per_page = parseInt($('#show_per_page').val());

      bannerShowHide(page_num);
      //get the element number where to start the slice from
      start_from = page_num * show_per_page;

      //get the element number where to end the slice
      end_on = start_from + show_per_page;

      //hide all children elements of pagingBox div, get specific items and show them
      $('#pagingBox').children('.catlist').css('display', 'none').slice(start_from, end_on).css('display', 'block');

      /*get the page link that has longdesc attribute of the current page and add active class to it
      and remove that class from previously active page link*/
      $('.page-link[longdesc=' + page_num + ']').addClass('active').siblings('.active').removeClass('active');

      //update the current page input field
      $('#current_page').val(page_num);
    }

    
    //Show hide Banner

    function bannerShowHide(page_num) {
      if (page_num != 0) {
        $(".hero-section").hide();
      }
      else {
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
              if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
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
                  if (wordWidth > width) width = wordWidth;
              });
              headline.find('.cd-words-wrapper').css('width', width);
          };

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
