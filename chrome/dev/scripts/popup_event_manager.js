/*
*	Made by firetonton
*	firetonton@gmail.com
*/

function updateTopBar() {
	chrome.extension.sendRequest({func: "updateTopBar"});
}

jQuery(function () {
	// Player
	var audioPlayer = jQuery('#audioPlayer');
	audioPlayer.on('timeupdate', 	function () { updateProgress(this); });
	audioPlayer.on('ended', 		function () { stopZik() });
	
	var currentContent = null;
	function changeContentTo(contentId) {
		var newEl = jQuery('#' + contentId);
		
		if (currentContent != null) {
			var curEl = jQuery('#' + currentContent)
			curEl.css('height', '0px');
			curEl.css('padding', '0px');
		}
		
		newEl.css('display', 'block');
		newEl.css('height',  '410px');
		newEl.css('padding', '10px');
		currentContent = contentId;
	}
	
	setTimeout(function () {
		changeContentTo('playlist');
	}, 300);
	
	
	// Logo
	jQuery('#logo').click(function () {
			open_tab('http://www.beezik.com');
		});
	
	// Boutons haut
	jQuery('#boutons #apropos').click(function () {
			//open_tab('http://forum.beezik.com/forum/viewtopic.php?f=48&t=10500');
			open_tab(chrome.extension.getURL('changelog.html'));
		});
		
	jQuery('#boutons #options').click(function () {
			open_tab(chrome.extension.getURL('options.html'));
		});
		
	jQuery('#boutons #erase_downloaded').click(function () {
			//erease_downloaded();
			//fill_list();
			
			
			chrome.extension.sendRequest({func: "eraseDownloaded"},
				function(response)
				{ fill_list(); });
			updateTopBar();
		});
		
	jQuery('#boutons #erase_all').click(function () {
			//erease_all(); // TODO correct ortho
			//fill_list();
			
			chrome.extension.sendRequest({func: "eraseAll"},
				function(response)
				{ fill_list(); });
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
		
		
	// Tables
	jQuery('#contenuInfo').on('click', 'td.click_event', function () {
			//open_followedtab(@ID@); set_followed(@ID@);
			var id = jQuery(this).data('id');
			open_followedtab(id);
			set_followed(id);
		});

	jQuery('#contenuInfo').on('click', 'div.icon_suppr', function () {
			//do_unfollow_id(@ID@); fill_followed_section()
			console.log("delete " + jQuery(this).attr('id'));
			do_unfollow_id(jQuery(this).data('id'));
			fill_followed_section();
		});
	
	jQuery('#contenuInfo').on('mouseenter', 'tr', function () {
			var id = jQuery(this).data('id');
			console.log('f_img_suppr_' + id);
			replace_image_to('f_img_suppr_' + id, 'images/del.png');
		});
		
	jQuery('#contenuInfo').on('mouseleave', 'tr', function () {
			var id = jQuery(this).data('id');
			var puce = jQuery(this).data('puce');
			console.log('f_img_suppr_' + id);
			replace_image_to('f_img_suppr_' + id, puce);
		});
		
		
		
	jQuery('#contenuPlaylist').on('click', '.click_event', function () {
			//open_songtab(\'http://www.beezik.com/telecharger/t/@ID@\', @I@)
			var id = jQuery(this).data('id');
			var i = jQuery(this).data('i');
			
			//open_songtab('http://www.beezik.com/telecharger/t/' + id, i)
			open_songtab('http://www.beezik.com/#' + id, id);
		});

	jQuery('#contenuPlaylist').on('click', '.icon_suppr', function () {
			//do_unfollow_id(@ID@); fill_followed_section()
			console.log("delete " + jQuery(this).attr('id'));
			//do_unfollow_id(jQuery(this).data('id'));
			//fill_followed_section();
			var id = jQuery(this).data('id');
			var i = jQuery(this).data('i');
			//delete_song(i, 'notReload');
			delete_song(i, id, 'notReload');
			fill_list();
		});
		
	jQuery('#contenuPlaylist').on('click', '.playbtn', function () {
			//changeZik(@ID@, @I@);
			var id = jQuery(this).data('id');
			var i = jQuery(this).data('i');
			var artist = jQuery(this).data('artist');
			var title = jQuery(this).data('title');
			changeZik(id, i, artist, title);
		});
	
	jQuery('#contenuPlaylist').on('mouseenter', 'tr', function () {
			var id = jQuery(this).data('id');
			console.log('img_suppr_' + id);
			//replace_image_to('img_suppr_' + id, 'images/del.png');
			
			jQuery('#img_play_' + id).css('display', 'block');
			jQuery('#img_suppr_' + id).css('visibility', 'visible');
		});
		
	jQuery('#contenuPlaylist').on('mouseleave', 'tr', function () {
			var id = jQuery(this).data('id');
			jQuery('#img_play_' + id).css('display', 'none');
			jQuery('#img_suppr_' + id).css('visibility', 'hidden');
		});
		
		
	// Boxes
	jQuery('#playlist_click').click(function () {
			changeContentTo('playlist');
		});
		
	jQuery('#info_sorties').click(function () {
			changeContentTo('infoSorties');
		});

	jQuery('#import_export').click(function () {
			//show_id('#import_export_form');
			changeContentTo('import_export_form');
			jQuery('#zone_import_export').focus();
		});
		
		jQuery('#importButton').click(function () {
				importer(null);
				//show_id('#importAlertBox');
			});
		jQuery('#exportButton').click(function () {
				exporter();
			});
			
	jQuery('#search').click(function () {
			show_id('#search_form');
			changeContentTo('search_form');
		});
		
		jQuery('#searchButton').click(function () {
				search_playlist('#PlaylistExt# ' + jQuery('#search_area').value)
			});
			
	// Alerts
	jQuery('#closeAlertImg').click(function () {
			show_id('#importAlertBox');
		});
		
	jQuery('#alertBoxImportReplace').click(function () {
			importer(true);
			show_id('#importAlertBox');
		});
		
	jQuery('#alertBoxImportKeep').click(function () {
			importer(false);
			show_id('#importAlertBox');
		});
});
