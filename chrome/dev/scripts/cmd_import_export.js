/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

function	add_import_to_cart(url)
{
	var		tabUrlSplitted = url.split('BeeZikExt:'); // tab[0] = http://www.beezik.com/... tab[1] = [artiste] - [titre]
	var		artiste = '';
	var		titre = '';

	// récupération des données titre et artiste
	if (tabUrlSplitted[1])
	{
		var		tabNomSplitted = tabUrlSplitted[1].split(' - ');
		
		artiste = tabNomSplitted[0];
		titre = tabNomSplitted[1];
	}

	// parsing de l'URL en tenant compte des versions
	url = adaptURL(tabUrlSplitted[0]);
	
	var cart_state = already_in_cart(url);
	if (cart_state.good == false)
	{
		alert("Already in cart : " + cart_state.good);
		return ;
	}
	
	localStorage['BeeZikExt_cart_' + localStorage['BeeZikExt_cart_id']] = JSON.stringify(newSong(artiste, titre, cart_state.trackId));
	localStorage['BeeZikExt_cart_id'] = parseInt(localStorage['BeeZikExt_cart_id']) + 1;
}

function	importer(link_list, erease)
{
	var		linkTab = link_list.split('\n');
	
	if (erease)
		erease_all();
	for (var i = 0; i < linkTab.length; i++)
	{
		if ( // TODO compare genre strncmp ?
				linkTab[i].substr(0, ('http://www.beezik.com/titre-').length) == 'http://www.beezik.com/titre-' // Version 1
				|| linkTab[i].substr(0, ('http://www.beezik.com/telecharger/t/').length) == 'http://www.beezik.com/telecharger/t/' // Version 2
			)
				add_import_to_cart(linkTab[i]);
	}
	set_badge_text(get_nb_song_to_dl().toString());
	localStorage['BeeZikExt_playlist_size_modified'] = 1;
}
