/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

function	test_url_to_update(url)
{
	var		i = url.lastIndexOf("#");
	
	if (i < 0)
		return (true); 
	if (url.substr(i, 11) == "#BeeZikExt:")
		return (false);
	return (true);
}

function	get_nb_song_to_dl()
{
	var		nb = 0;
	
	for (var i = 1; i < parseInt(localStorage['BeeZikExt_cart_id']); i++)
	{
		var song = localStorage['BeeZikExt_cart_' + i];
		if (song && song.indexOf('"downloaded":0') != -1)
			nb++;
	}
	return (nb);
}

function	already_in_cart(url) // TODO en profiter pour retourner un id de libre
{
	var		id_track;
	var 	i = url.length - 1;
	var		cart_id = localStorage['BeeZikExt_cart_id'];
	var		free_id = -1; // /!\ TODO /!\ pas encore testé

	id_track = getTrackID(url);
	for (i = 1; i < cart_id; i++)
	{
		var song = localStorage['BeeZikExt_cart_' + i];
		if (song)
		{
			if (song.indexOf('"id":' + id_track + '}') != -1)
				return ({good : false});
		}
		else
			free_id = i;
	}
	return ({good : true, trackId : id_track, freeId : free_id});
}

function	add_to_cart(tab)
{
	add_url_to_cart(tab.url);
	localStorage['BeeZikExt_playlist_size_modified'] = 1;
}

function	add_url_to_cart(url)
{
	var		i = url.lastIndexOf("#");
	var		title = url.substr(i + 11);
	
	var		tabUrlSplitted = url.split('BeeZikExt:'); // tab[0] = http://www.beezik.com/...# tab[1] = titre-... tab[2] = [artiste] - [titre]
	var		tabNomSplitted = tabUrlSplitted[2].split(' - ');
	var		artiste = tabNomSplitted[0];
	var		titre = tabNomSplitted[1];

	url = adaptURL(tabUrlSplitted[1]);
	
	var cart_state = already_in_cart(url);
	if (cart_state.good == false)
		return ;
	if (cart_state.freeId == -1)
	{
		i = parseInt(localStorage['BeeZikExt_cart_id']);
		localStorage['BeeZikExt_cart_id'] = i + 1;
	}
	else
		i = cart_state.freeId;
	localStorage['BeeZikExt_cart_' + i] = JSON.stringify(newSong(artiste, titre, cart_state.trackId));
	
	set_badge_text(get_nb_song_to_dl().toString());
}

