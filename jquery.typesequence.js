/* By Arjan Eising, 2011. Licence: MIT. See <https://github.com/arjaneising/TypeSequence> */
;(function($) {
  $.fn.typesequence = function(options) {
    var elms = this,
        executed = false,
        codedSequence = [],
        goingWell = 0,
        defaults = {};
    
    
    $.extend(defaults, $.fn.typesequence.defaults, options);
    
    elms.keydown(testForSequence);
    
    
    for (var i = 0, l = defaults.sequence.length, key, codedKey = null; i < l; ++i) {
      key = defaults.sequence[i];
      if ($.fn.typesequence.cache[key]) {
        codedKey = $.fn.typesequence.cache[key];
      }
      else {
        if (typeof key == 'number') codedKey = key;
        else if (/^[0-9]$/.test(key)) codedKey = parseInt(key, 10) + 48;
        else if (/^F[0-9]{1,2}$/.test(key)) codedKey = parseInt(key.substring(1), 10) + 111;
        else if (/^[a-zA-Z]$/.test(key)) codedKey = parseInt(key, 36) + 55;
        else if ($.fn.typesequence.keycodes[key]) codedKey = $.fn.typesequence.keycodes[key];
        if (!codedKey) continue;
        $.fn.typesequence.cache[key] = codedKey;
      }
      
      if (codedKey) {
        codedSequence.push(codedKey);
        codedKey = null;
      }
    }
    
    if (defaults.enter) {
      codedSequence.push(13);
    }
    
    
    function testForSequence(e) {
      if (defaults.once && executed) {
        return;
      }
      
      if (e.which == codedSequence[goingWell]) {
        ++goingWell;
      }
      else {
        goingWell = 0;
      }
      
      if (goingWell == codedSequence.length) {
        goingWell = 0;
        
        if (defaults.once == 'depends') {
          executed = defaults.callback(elms);
        }
        else {
          executed = true;
          defaults.callback(elms);
        }
      }
    }
    
    
    return elms;
  };
  
  
  $.fn.typesequence.defaults = {
    callback: null,
    enter: false,
    once: false,
    sequence: []
  };
  
  
  $.fn.typesequence.keycodes = {
    'BACKSPACE': 8,
    'TAB': 9,
    'ENTER': 13,
    '↵': 13,
    'SHIFT': 16,
    '⇧': 16,
    'CONTROL': 17,
    'ALT': 18,
    'CAPSLOCK': 20,
    'ESC': 27,
    'SPACE': 32,
    ' ': 32,
    'PAGEUP': 33,
    'PAGEDOWN': 34,
    'END': 35,
    'HOME': 36,
    'LEFT': 37,
    '←': 37,
    '⇐': 37,
    'UP': 38,
    '↑': 38,
    '⇑': 38,
    'RIGHT': 39,
    '→': 39,
    '⇒': 39,
    'DOWN': 40,
    '↓': 40,
    '⇓': 40,
    'INSERT': 45,
    'DELETE': 46,
    'DEL': 46,
    'NUMLOCK': 144
  };
  
  
  $.fn.typesequence.cache = {};
})(jQuery);