/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

function	newSong(artist, title, id)
{
	return {
				artist		: artist,
				title		: title,
				downloaded	: 0,
				id			: parseInt(id)
			};
}

// Must include prototype.js before

// -- Audio -- //
function changeZik(idBeeZik, idExt) {
	var player = jQuery("#audioPlayer");
	player.trigger('pause');
	player.attr('src', "http://www.beezik.com/anonymousMp3Path.htm?track=" + idBeeZik);

	var song = JSON.parse(localStorage['BeeZikExt_cart_' + idExt]);
	jQuery("#playingArtist").html(song.artist);
	jQuery("#playingTitle").html(song.title);
	player.trigger('play');
	//jQuery("#divPlayer").css('display', 'block');
	jQuery("#divPlayer").css('top', '0');
}

function stopZik() {
	jQuery("#audioPlayer").trigger('pause');
	//jQuery("#divPlayer").css('display', 'none');
	jQuery("#divPlayer").css('top', '-30px');
}

function updateProgress(audioObj) {
	console.log('' + audioObj + ' ' + audioObj.currentTime);
	var pos = audioObj.currentTime * 100 / audioObj.duration;
	jQuery('#progressPlayer').css('width', pos + '%');
}

// -- Search -- //
function	search_playlist(keywords)
{
	localStorage['BeeZikExt_search_playlist'] = keywords;
	open_tab(chrome.extension.getURL('search_playlist.html'));
}


// -- other -- //

function	show_id(id_to_show)
{
	var	el = jQuery(id_to_show)[0];

	if (el)
	{
		if (el.style.display == 'none')
			el.style.display = 'block';
		else
			el.style.display = 'none';
	}
}

function	exporter()
{
	var content = '';
	var	el = jQuery('#zone_import_export');

	for (var i = 1; i < parseInt(localStorage['BeeZikExt_cart_id']); i++)
	{
		var strSong = localStorage['BeeZikExt_cart_' + i];

		if (!strSong || strSong == undefined)
			continue;
		var song = JSON.parse(strSong);

		if (song && song != 'none')
			content += 'http://www.beezik.com/telecharger/t/' + song.id + '#BeeZikExt:' + song.artist + ' - ' + song.title + '\n';
	}
	el.html(content);
	el.focus();
	el.select();
}

function	importer(replace)
{
	/*
		localStorage['BeeZikExt_option_import']
				''			=> Demander
				'import_b1' => Remplacer
				'import_b2' => Mettre à la suite
				'import_b3' => Demander
	*/
	var	remplacement = true;
	var el = jQuery('#zone_import_export');
	if (el.html() == '')
		return ;

	switch (localStorage['BeeZikExt_option_import'])
	{
		case 'import_b1' :
				remplacement = true;
			break;
		case 'import_b2' :
				remplacement = false;
			break;
		case 'import_b3' :
		default :
				/*if (localStorage['BeeZikExt_cart_id'] == 1)
					remplacement = false;
				else
					remplacement = confirm("[OK] Pour remplacer l'ancienne liste\n[Annuler] Pour rajouter à la liste actuelle");*/
				remplacement = replace; // TODO faire une fenetre de confirmation sans fonction 'confirm'
			break;
	}
	
	if (remplacement == null) {
		show_id('#importAlertBox');
		return ;
	}

	if (el)
		chrome.extension.sendRequest(
										{
											func: "importer",
											liste: el.html(),
											erease: remplacement
										},
										function(response)
										{
											el.html('');
											location.reload();
										}
									);
	else
		alert('Erreur !');

	chrome.extension.sendRequest({func: "endBeezikJs"}, function(response){});
}

function	open_songtab(str, songId)
{
	//localStorage['BeeZikExt_cart_' + i] = localStorage['BeeZikExt_cart_' + i].replace(/"downloaded":0/, '"downloaded":1');

	//var texte_badge = '';
	//chrome.browserAction.setBadgeText({text : texte_badge});
	chrome.extension.sendRequest({func: "setDownloaded", id: songId},
									function (response)
									{
										if (response.nbSong == 0 && localStorage['BeeZikExt_option_del_end'] == 'yes')
											erease_all();
									});
	chrome.tabs.create({ url: str });


	chrome.extension.sendRequest({func: "endBeezikJs"}, function(response){});

	localStorage['BeeZikExt_playlist_size_modified'] = 0;
	localStorage['BeeZikExt_playlist_state_modified'] = 1;
	location.reload();
}

function	update_following_status()
{
    var followed_ids = localStorage['BeeZikExt_followed_artists'].split(';');
    var followed_hashes, str;

    localStorage['BeeZik_followed_new'] = "false";
    for (var i = 0; i < followed_ids.length; i++)
    {
	str = localStorage['BeeZikExt_followed_' + followed_ids[i]];
	followed_hashes = str.split('|');
	if (followed_hashes[0] != followed_hashes[1])
	    localStorage['BeeZik_followed_new'] = "true";
    }

    if (localStorage['BeeZik_followed_new'] == "true")
	chrome.browserAction.setIcon({ path : "images/icon_new.png" });
    else
	chrome.browserAction.setIcon({ path : "images/icon.png" });
}

function	open_followedtab(idArtist)
{
    chrome.tabs.create({ url: "http://www.beezik.com/memberMusicArtistAllAlbum.htm?artiste=" + idArtist });
}

function	set_followed(idArtist)
{
	var str = localStorage['BeeZikExt_followed_' + idArtist];

	if (str)
	{
		var followed_hashes = str.split('|');
		var name = str.substr(followed_hashes[0].length + followed_hashes[1].length + 2);

		localStorage['BeeZikExt_followed_' + idArtist] = followed_hashes[1] + '|' + followed_hashes[1] + '|' + name;
	}
    update_following_status();
}

var		title_start = 0;

function	getArtiste(str, cur_i)
{
	var song = JSON.parse(localStorage['BeeZikExt_cart_' + cur_i]);
	return song.artist;
}

// TODO remplacer par un seul String.replace avec regexp
function	uninhib_quotes(str)
{
	var		nb = str.split('%22').length - 1;

	for (var i = 0; i < nb; i++)
	    str = str.replace('%22', '"');
	return (str);
}

function	getSong(str, cur_i)
{
	var song = JSON.parse(localStorage['BeeZikExt_cart_' + cur_i]);
	return song.title;
}

function	delete_song(id, songId, reload)
{
	if (jQuery('#tr_' + id))
		jQuery('#tr_' + id).css('display', 'none');
	if (jQuery('#tr2_' + id))
		jQuery('#tr2_' + id).css('display', 'none');
		
	
	chrome.extension.sendRequest({func: "deleteMusic", id: songId});
	
	/*localStorage.removeItem('BeeZikExt_cart_' + id);

	localStorage['BeeZikExt_cart_delete'] = parseInt(localStorage['BeeZikExt_cart_delete']) + 1;
	var texte_badge = get_nb_song_to_dl();
	chrome.browserAction.setBadgeText({text : texte_badge.toString()});
	chrome.extension.sendRequest({func: "endBeezikJs"}, function(response){});*/

	localStorage['BeeZikExt_playlist_state_modified'] = 1;
	if (reload == "reload")
		window.location.reload();
}

function	erease_downloaded()
{
	for (var i = 1; i <= parseInt(localStorage['BeeZikExt_cart_id']); i++)
		if (localStorage['BeeZikExt_cart_' + i])
			if (localStorage['BeeZikExt_cart_' + i].indexOf('"downloaded":1,') != -1)
				delete_song(i, "notReload");

	localStorage['BeeZikExt_playlist_state_modified'] = 1;
	window.location.reload();
}

// TODO remplacer par un seul String.replace avec regexp
function	inhib_quotes(lnk)
{
	var regQuote = new RegExp('\'', 'gi');

	lnk = lnk.replace(regQuote, '\\\'');
	return (lnk);
}

function	replace_image_to(id_span, new_image)
{
	var		span_img = jQuery('#' + id_span);

	if (span_img)
	{
		if (new_image == '' || new_image == null)
			span_img.css('background-image', '');
		else
			span_img.css('background-image', "url('" + new_image + "')");
	}
}
