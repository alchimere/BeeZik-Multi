/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

/* ---------- Initialisation ---------- */
function	initializeExt()
{
	if (!localStorage['BeeZikExt_followed_artists'])
		localStorage['BeeZikExt_followed_artists'] = ';';
	
	// Réinitialisation de la liste
	if (localStorage['BeeZikExt_option_savePlaylistOnClose'] != 'yes')
		erease_all();
	
	// Initialisation update
	localStorage['BeeZikExt_update'] = 0;
	localStorage['BeeZikExt_playlist_size_modified'] = 0;
	localStorage['BeeZikExt_playlist_state_modified'] = 1;
	
	// Initialisation du badge
	set_badge_text(get_nb_song_to_dl().toString());
	setBadgeColor();
	setTimeout(updateFollowedArtists, 500);
}

function	erease_all()
{
	/*
	Options :
		BeeZikExt_option_savePlaylistOnClose	=> Sauvegarde de l'état de la liste à la fermeture du navigateur
		
		BeeZikExt_option_hide_cpt_FB			=> Affichage du bouton j'aime facebook
		
		BeeZikExt_option_import					=> Action à l'appui sur le bouton d'import
		
		BeeZikExt_option_del_end				=> Suppression de la playlist une fois téléchargée
	*/
	
	var savePlaylistOnClose 	= localStorage['BeeZikExt_option_savePlaylistOnClose'];
	var hide_cpt_FB				= localStorage['BeeZikExt_option_hide_cpt_FB'];
	var opt_import				= localStorage['BeeZikExt_option_import'];
	var del_end					= localStorage['BeeZikExt_option_del_end'];
	var followed_artists		= localStorage['BeeZikExt_followed_artists'];
	
	var followed_ids			= localStorage['BeeZikExt_followed_artists'].split(';');
	var followed_hashes			= localStorage['BeeZikExt_followed_artists'].split(';');
	
	for (var i = 0; i < followed_ids.length; i++)
		followed_hashes[i] = localStorage['BeeZikExt_followed_' + followed_ids[i]];
	
	localStorage.clear();
	
	localStorage['BeeZikExt_followed_artists'] = ';' + followed_ids.join(';') + ';';
	for (var i = 0; i < followed_ids.length; i++)
		localStorage['BeeZikExt_followed_' + followed_ids[i]] = followed_hashes[i];
	
	
	localStorage['BeeZikExt_option_savePlaylistOnClose'] = savePlaylistOnClose;
	localStorage['BeeZikExt_option_hide_cpt_FB'] = hide_cpt_FB;
	localStorage['BeeZikExt_option_import'] = opt_import;
	localStorage['BeeZikExt_option_del_end'] = del_end;
	localStorage['BeeZikExt_followed_artists'] = followed_artists;
	
	/* -- end options -- */
	
	localStorage['BeeZikExt_cart_id'] = 1;
	localStorage['BeeZikExt_cart_delete'] = 0;
	localStorage['BeeZikExt_update'] = 0;
	localStorage['BeeZikExt_playlist_size_modified'] = 1;
	
	set_badge_text('0');
}

