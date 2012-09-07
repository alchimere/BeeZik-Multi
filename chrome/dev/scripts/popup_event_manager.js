jQuery(function () {
	// Player
	var audioPlayer = jQuery('#audioPlayer');

	//audioPlayer.ended(stopZik);
	audioPlayer.bind('timeupdate', function () { updateProgress(audioPlayer); });
	// TODO verifier
	// TODO binder stop
	audioPlayer.bind('ended', function () { stopZik() });
	
	
	// Logo
	jQuery('#logo').click(function () {
			open_tab('http://www.beezik.com');
		});
	
	// Boutons haut
	jQuery('#boutons #apropos').click(function () {
			open_tab('http://forum.beezik.com/forum/viewtopic.php?f=48&t=10500')
		});
		
	jQuery('#boutons #options').click(function () {
			open_tab(chrome.extension.getURL('options.html'));
		});
		
	jQuery('#boutons #erase_downloaded').click(function () {
			erease_downloaded();
			fill_list();
		});
		
	jQuery('#boutons #erase_all').click(function () {
			erease_all(); // TODO correct ortho
			fill_list();
			updateTopBar();
		});
		
	
	// Tabs
	jQuery('#infoSortiesButton').click(function () {
			show_id('#playlist');
			show_id('#infoSorties');
		});
	jQuery('#playlistButton').click(function () {
			show_id('#playlist');
			show_id('#infoSorties');
		});
		
		
	// Boxes
	jQuery('#import_export').click(function () {
			show_id('#import_export_form');
			jQuery('#zone_import_export').focus();
		});
		
		jQuery('#importButton').click(function () {
				importer();
			});
		jQuery('#exportButton').click(function () {
				exporter();
			});
			
	jQuery('#search').click(function () {
			show_id('#search_form');
		});
		
		jQuery('#searchButton').click(function () {
				search_playlist('#PlaylistExt# ' + jQuery('#search_area').value)
			});
});
