/*
 * JQuery plugin "eventbrite". A widget that allows simple placement of eventbrite data on your page.
 *
 */
(function($){
  $.fn.eventbrite_attendees = function(config) {
    var defaults = {
      /* your eventbrite app_key is REQUIRED */
      app_key: undefined,
      /* the event id is REQUIRED */
      event_id: undefined,
      /* the css class of the UL container */
      container_class: 'attendee_list'
    };

    var options = $.extend({}, defaults, config);
        
    if (!options.app_key) {
      throw new Error('app_key is required');
    }
    if (!options.event_id) {
      throw new Error('event_id is required');
    }

    //use YQL to get the data cross-domain
    $.ajax({
      url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%20%3D%20%22https%3A%2F%2Fwww.eventbrite.com%2Fjson%2Fevent_list_attendees%3Fapp_key%3D"+options.app_key+"%26id%3D"+options.event_id+"%22&format=json",
      type: 'GET',
      dataType: 'jsonp',
      jsonp: 'callback',
      context: this,
      success: function(json) {
        this.each(function() {
          var el = $(this);
          el.prepend('<ul class="'+options.container_class+'">');
          var list = el.find('ul').first();
          for (var x=0; x < json.query.results.json.attendees.length; x++) {
            var a = json.query.results.json.attendees[x].attendee;
            var text = a.first_name+' '+a.last_name;
            if (a.website) {
              text = '<a href="'+a.website+'">'+text+'</a>';
            }
            list.append('<li>'+text+'</li>');
          }
        });
      }
    });

    return this;
  };
})(jQuery);
