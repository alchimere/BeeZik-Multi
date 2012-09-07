$(function () {
	$(function () {
		// Player
		var audioPlayer = $('#audioPlayer');

		audioPlayer.ended(stopZik);
		
		// Boutons haut
		$('#erease_all').click(function () {
				alert('oui');
				erease_all(); fill_list(); updateTopBar();
			});
	});
}).call(this);
