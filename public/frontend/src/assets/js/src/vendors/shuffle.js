
/**
 * Load required plugins.
 */
window.imagesLoaded = require('imagesloaded/imagesloaded.pkgd');
window.Shuffle = require('shufflejs');


/**
 * Configure the plugin.
 */

+function($){
  page.registerVendor('Shuffle');

  page.initShuffle = function() {
    if ( undefined === window['Shuffle'] || 0 === $('[data-provide="shuffle"]').length ) {
      return;
    }

    var Shuffle = window.Shuffle;

    Shuffle.options.itemSelector = '[data-shuffle="item"]';
    Shuffle.options.sizer = '[data-shuffle="sizer"]';
    Shuffle.options.delimeter = ',';
    Shuffle.options.speed = 500;


    $('[data-provide="shuffle"]').each(function(){

      var list = $(this).find('[data-shuffle="list"]');
      var filter = $(this).find('[data-shuffle="filter"]');
      var search = $(this).find('[data-shuffle="search"]');
      var shuffleInstance = new Shuffle(list);

      if ( filter.length ) {

        $(filter).find('[data-shuffle="button"]').each( function() {
          $(this).on('click', function() {
            var btn = $(this);
            var isActive = btn.hasClass('active');
            var btnGroup = btn.data('group');

            $(this).closest('[data-shuffle="filter"]').find('[data-shuffle="button"].active').removeClass('active');

            var filterGroup;
            if (isActive) {
              btn.removeClass('active');
              filterGroup = Shuffle.ALL_ITEMS;
            } else {
              btn.addClass('active');
              filterGroup = btnGroup;
            }

            shuffleInstance.filter(filterGroup);
          });
        });

      } //End if


      if ( search.length ) {
        search.on('keyup', function() {
          var searchText = $(this).val().toLowerCase();
          shuffleInstance.filter(function(element, shuffle) {
            var itemText = element.textContent.toLowerCase().trim();
            return itemText.indexOf(searchText) !== -1;
          });
        });
      }


      $( this ).imagesLoaded( function() {
        shuffleInstance.layout()
      });


    });


  }

}(jQuery);


