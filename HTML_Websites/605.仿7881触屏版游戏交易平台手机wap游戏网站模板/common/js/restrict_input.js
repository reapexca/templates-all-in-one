	function restrict_price_input(el) {
		el.bind('contextmenu', function(){
			return false;
		});
		// 屏蔽输入法
		el.css('ime-mode', 'disabled');
		
		el.bind('keydown', function(e) {
	        var key = window.event ? e.keyCode : e.which;
	        if (isSpecialKey(key)) {
	        	return true;
	        }
	       	if (isFullStop(key) && !e.shiftKey) {
	       		if ($(this).val() == '') {
	       			$(this).val(0);
	       		}
	            return $(this).val().indexOf('.') < 0;
	        } else if (isNumber(key) && !e.shiftKey) {
				return !($(this).val().indexOf('.') > 0 && $(this).val().length - ($(this).val().indexOf('.') + 1) >= 2);
	        } else {
	        	return false;
	        }
	    });
	}
	
	function isNumber(key) {
	    return (key >= 48 && key <= 57) || (key >= 96 && key <= 105)
	}
	
	function isSpecialKey(key) {
	    //8:backspace; 46:delete; 37-40:arrows; 36:home; 35:end; 9:tab; 13:enter
	    return key == 8 || key == 46 || (key >= 37 && key <= 40) || key == 35 || key == 36 || key == 9 || key == 13
	}
	// .->190   NumPad.->110 
	function isFullStop(key) {
	    return key == 190 || key == 110;
	}
	
	//8: backspace  46: delete
	//48-57/96-105: 0-9	
	function restrict_digit_input(el) {
		el.bind('contextmenu', function(){
			return false;
		});
		// 屏蔽输入法
		el.css('ime-mode', 'disabled');
		
		el.bind('keydown', function(e) {
	        var key = window.event ? e.keyCode : e.which;
	        return (isSpecialKey(key)) || ((isNumber(key) && !e.shiftKey));
	    });
	}