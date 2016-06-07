var $ = require('jquery')
window.$ = $
window.jQuery = $

var Waypoint = require('waypoints/lib/jquery.waypoints')

$(function () {
  var $pages = $('.page-section')
  var count = $pages.length
  $('[role~="page-count"]').html(count)
})

$(function () {
  var $pages = $('.page-section')

  $('.page-section').addClass('-mute')
  $('.page-section').waypoint({
    handler: onEnter,
    offset: '50%',
    context: '#body',
    down: 'enter',
    up: 'exited'
  })

  $('.page-section').waypoint({
    handler: onEnter,
    offset: 'bottom-in-view',
    context: '#body',
    down: 'entered',
    up: 'exit'
  })

  function onEnter (direction) {
    $(this.element).trigger('pages:change', {
      index: $pages.index(this.element)
    })
  }

  $(document).trigger('pages:init', {
    count: $pages.length
  })
})

/*
 * Page change
 */

$(document).on('pages:change', '.page-section', function (e, options) {
  var $this = $(this)

  $('.page-section.-active').addClass('-mute').removeClass('-active')
  $this.removeClass('-mute').addClass('-active')

  var $number = $('[role~="page-number"]')
  $number.html(options.index + 1)
})

/*
 * Page dots
 */

$(document).on('pages:init', function (e, options) {
  var $pagedots = $('<div class="page-dots">')
  for (var i = 0; i < options.count; i++) {
    $('<a class="dot">').appendTo($pagedots)
  }
  $pagedots.appendTo('body')
})

$(document).on('pages:change', '.page-section', function (e, options) {
  var $pagedots = $('.page-dots')
  var $dots = $pagedots.children()
  $dots.removeClass('-active')
  $dots.eq(options.index).addClass('-active')
})
