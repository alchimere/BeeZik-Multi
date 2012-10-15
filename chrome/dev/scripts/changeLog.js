jQuery(function () {
	function displayChangeLogs(from, to)
	{
		var changeLogs = getChangeLog(from, to);
		var htmlString = '';
		
		for (var i = 0; i < changeLogs.length; i++) {
			var changes = changeLogs[i].changes;
			
			htmlString += '<div class="version"><div class="version_number">'+changeLogs[i].v+'</div><ul>';
			for (var j = 0; j < changes.length; j++) {
				console.log(''+ j + " | " + changes[i]);
				htmlString += '<li>'+changes[j]+'</li>';
			}
			htmlString += '</ul></div>';
		}
		jQuery('#result').html(htmlString);
	}
	
	var selectFrom = jQuery('#selectFrom');
	var selectTo = jQuery('#selectTo');
	
	function updateSelectFrom() {
		var changes = getLogNames();
		
		for (var i = 0; i < changes.length; i++) {
			selectFrom.html(selectFrom.html() + '<option>' + changes[i] + '</option>');
		}
	}

	function updateSelectTo() {
		var changes = getLogNames();
		console.log('value : ' + selectFrom.val());
		while (changes.legnth > 0) {
			if (changes[0] == selectFrom.val())
				break;
			else
				changes.shift();
		}
		for (var i = 0; i < changes.length; i++) {
			var changes = getLogNames();
			selectTo.html(selectTo.html() + '<option>' + changes[i] + '</option>');
		}
	}
	
	updateSelectFrom();
	updateSelectTo();
	
	displayChangeLogs(localStorage['version_old'], localStorage['version']);
});
