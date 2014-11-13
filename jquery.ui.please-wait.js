/*! jquery.ui.please-wait.js
 *
 * URL: http://corydorning.com/projects/please-wait
 *
 * @author: Cory Dorning
 * @modified: 11/13/2014
 *
 * dependencies: jQuery 1.10+, jQuery UI 1.10+
 *
 * PleaseWait is an event-driven jQuery UI widget that
 * displays a dialog box and updateable progress bar,
 * to indicate to your users that your application is
 * currently busy or processing data.
 *
 */


;(function($) {
  "use strict";

  $.widget('ui.pleasewait', {
  
    // default options
    options: {
      content: null,
      on: 'click',
      timer: null,
      dialog: {
        autoOpen: false,
        modal: true,
        closeOnEscape: false,
        resizable: false,
        title: 'Please wait...'
      },
      progressbar: {
        value: false
      }
    }, // options

    _create: function() {
      // update options with html5 data
      $.extend(this.options, this.element.data('options').pleasewait);

      var self = this
        ,
          o = self.options
        ,
          // create dialog
          $dialog = self.$dialog = $('<div/>').addClass('ui-please-wait-dialog').dialog(o.dialog)
        ,
          // create progressbar
          $progressbar = self.$progressbar = $('<div/>').addClass('ui-please-wait-progressbar').progressbar(o.progressbar)
      ;

      // append progressbar to dialog and dialog to body
      $dialog
        .addClass('ui-please-wait-dialog')
        .append(o.content)
        .append($progressbar)
      ;

      // perform event bindings
      self._bindEvents();
    }, // _create method


    // binds events
    _bindEvents: function() {
      var self = this
        ,
          o = self.options
        ,
          $trigger = self.element
      ;

      // add event to plugin selector
      $trigger.on(o.on, function() {
        self.open();
      });

    }, // _bindEvents method


    // open the dialog
    open: function() {
      var self = this
        ,
          o = self.options
      ;

      // open the dialog
      self.$dialog.dialog('open');

      // close after timer
      if(o.timer) {
        setTimeout(function() {
          self.close();
        }, o.timer * 1000);
      }
    }, // open method


    // close the menu
    close: function() {
      var self = this
      ,
        o = self.options
      ;

      // close the dialog
      self.$dialog.dialog('close');
    }, // close method


    // update the progress bar
    update: function(value) {
      var self = this
      ;

      self.$progressbar.progressbar({value: value});

      // close dialog if progress reachs 100%
      if (value >= self.$progressbar.progressbar( "option", "max" )) {
        self.close();
      }
    } // update method

  }); // $.widget('multimenu')
})(jQuery);
// end multimenu