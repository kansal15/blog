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
      $('.categories-list li').each(function (i) {

        var classname = $(this).attr('class');
        console.log(classname);
        let list = $(".page > div").filter(`.${classname}Artical`).length;
        console.log(list);
        $(`.${classname}value`).html(`(${list})`);

      });

      var activeCat = "";
      function filterGroup(group) {
        if (activeCat != group) {

          $(".page > div").filter("." + group).show().addClass('showCat');
          $(".page > div").filter(":not(." + group + ")").hide().removeClass('showCat');
          activeCat = group;
        }
      }

      // $(".allCat").click(function () {
      //   $(".page > div").show();
      //   activeCat = "all";
      // });

      $(".categories-list a").click(function (event) {
        let categoriesClass = $(this).parent().attr("class");
        event.preventDefault();
        filterGroup(`${categoriesClass}Artical`);
        // $("#page_navigation").hide();
      });
    });



     // js2
  
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

    });



    //Pagination JS

    function previous() {

      new_page = parseInt($('#current_page').val()) - 1;
      // hide the image

      console.log(`pre page ${new_page}`);
      //if there is an item before the current active link run the function
      if ($('.active').prev('.page-link').length == true) {

        go_to_page(new_page);
      }

    }

    function next() {
      new_page = parseInt($('#current_page').val()) + 1;

      console.log(`next page ${new_page}`);
      //if there is an item after the current active link run the function
      if ($('.active').next('.page-link').length == true) {
        go_to_page(new_page);
      }

    }
    function go_to_page(page_num) {
      //get the number of items shown per page
      var show_per_page = parseInt($('#show_per_page').val());
      console.log(`number page ${page_num}`);
      if (page_num != 0) {
        $(".hero-section").hide();
      }
      else {
        $(".hero-section").show();
      }
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


