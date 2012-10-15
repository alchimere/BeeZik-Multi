/*
*	Made by firetonton
*	firetonton@gmail.com
*/

jQuery(function () {
	var selectFrom = jQuery('#selectFrom');
	var selectTo = jQuery('#selectTo');
	
	function displayChangeLogs(from, to)
	{
		var changeLogs = getChangeLog(from, to);
		var htmlString = '';
		
		for (var i = 0; i < changeLogs.length; i++) {
			var changes = changeLogs[i].changes;
			
			htmlString += '<div class="version"><div class="version_number">'+changeLogs[i].v+'</div><ul>';
			for (var j = 0; j < changes.length; j++)
				htmlString += '<li>'+changes[j]+'</li>';
			htmlString += '</ul></div>';
		}
		jQuery('#result').html(htmlString);
		selectFrom.val(from);
		selectTo.val(to);
	}
	
	function updateSelectFrom() {
		var changes = getLogNames();
		
		for (var i = 0; i < changes.length; i++) {
			selectFrom.html(selectFrom.html() + '<option>' + changes[i] + '</option>');
		}
	}

	function updateSelectTo() {
		var changes = getLogNames();
		console.log('changes : ' + changes);
		console.log('changes[0] : ' + changes[0] + ' == selectFrom.val() : ' + selectFrom.val());
		while (changes.length > 0) {
			if (changes[0] == selectFrom.val())
				break;
			else
				changes.shift();
			console.log('...');
		}
		console.log('changes : ' + changes);
		
		var valIsPresent = false;
		var value = selectTo.val();
		selectTo.html('');
		for (var i = 0; i < changes.length; i++) {
			selectTo.html(selectTo.html() + '<option>' + changes[i] + '</option>');
			if (changes[i] == value)
				valIsPresent = true;
		}
		if (valIsPresent)
			selectTo.val(value);
	}
	
	updateSelectFrom();
	updateSelectTo();
	
	selectFrom.on('change', function () {
		updateSelectTo();
		displayChangeLogs(selectFrom.val(), selectTo.val());
	});
	selectTo.on('change', function () {
		displayChangeLogs(selectFrom.val(), selectTo.val());
	});
	
	selectFrom.val(localStorage['version_old']);
	updateSelectTo();
	displayChangeLogs(localStorage['version_old'], localStorage['version']);
});
