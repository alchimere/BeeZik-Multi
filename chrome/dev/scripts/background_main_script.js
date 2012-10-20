/*
	Storage (old) :
		BeeZikExt_cart_id -> num courant dans le tableau

		BeeZikExt_cart_(x) -> lien de la musique // obsolète
		BeeZikExt_cart_(x)_status -> statut
		BeeZikExt_cart_(x)_track -> trackId
		BeeZikExt_cart_(x)_artiste -> artiste
		BeeZikExt_cart_(x)_titre -> titre

	New :

		localStorage['test'] = JSON.stringify(
												{
													artist 		: "Nightwish",
													title 		: "Wishmaster",
													downloaded 	: 0,
													id 			: 364891
												}
											); // TODO rajouter next/prev ?
		myobj = JSON.parse(localStorage['test']);
*/

function	update_badge()
{
	var count = panierCount();
	set_badge_text('' + count);
	return count;
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

function inspectCartFor(idSong) {
	var		cart_id = localStorage['BeeZikExt_cart_id'];
	var		free_id = -1; // /!\ TODO /!\ pas encore testé
	var		nb_songs = 0;

	for (var i = 1; i <= cart_id; i++)
	{
		var song = localStorage['BeeZikExt_cart_' + i];
		if (song)
		{
			if (song[song.length - 2] == '0')
				nb_songs++;
			if (song.indexOf('"id":' + idSong + ',') != -1)
				return { alreadyIn:true, id:i };
		}
		else if (free_id == -1)
			free_id = i;
	}
	if (free_id == -1)
		free_id = cart_id;
	nb_songs++;
	return { alreadyIn:false, id:free_id, nb_dl:nb_songs };
}

function addSongToCart(artist, title, idSong) {
	console.log('A');
	var state = inspectCartFor(idSong);
	console.log('B');
	if  (state.alreadyIn == false) {
		console.log('C');
		localStorage['BeeZikExt_cart_' + state.id] = JSON.stringify({
																		"id" 			: idSong,
																		"artist" 		: artist,
																		"title" 		: title,
																		"downloaded" 	: 0
																	});
		console.log('D');
		localStorage['BeeZikExt_cart_id'] = localStorage['BeeZikExt_cart_id'] + 1;
		localStorage['BeeZikExt_playlist_size_modified'] = 1;
		console.log('E');
		//set_badge_text(get_nb_song_to_dl().toString());
		set_badge_text(state.nb_dl.toString());
		console.log('F');
	}
	console.log('G');
}


var tabsTab = [];


function addTab(id) {
	for (var i = 0; i < tabsTab.length; i++)
		if (tabsTab[i] == id)
			return;
	tabsTab.push(id);
}

function removeTab(id) {
	for (var i = 0; i < tabsTab.length; i++)
		if (tabsTab[i] == id) {
			tabsTab.splice(i, 1);
			return;
		}
}

var gl_curTab = null;
/* ---------- Gestion des updates du bouton next ---------- */
chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo)
											{
												gl_curTab = tabId;
												updateTopBar(tabId);
												// TODO update aussi follow
											}
										  );

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo)
									{
										// TODO checker si il est ouvert et si oui le virer
										//removeTab(tabId);
									});

/* ---------- Gestion des requêtes ---------- */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
										{
											switch (request.func)
											{
												/*case 'tabId' :
													addTab(request.id);
													break;*/
													
												case 'pickNewPageInfo' :
													// -- http://yann.mustaki.fr/bee_zik_multi/push pour compter le nombre de pages par jour
													jQuery.ajax({url: "http://yann.mustaki.fr/bee_zik_multi/push"});
													break;
													
													
												case 'setBadgeColor' :
														clearTimeout(cur_no_drm_timer);
														setBadgeColor();
														sendResponse({});
													break;
													
												case 'setDownloaded' :
													setDownloaded(request.id, request.artist);
													sendRespone({nbSong:update_badge()});
													break;

												case 'importer' :
														importer(request.liste, request.erease);
														sendResponse({});
													break;

												case 'updateTopBar' :
												case 'endBeezikJs' :
														updateTopBar();
														update_badge();
														sendResponse({});
													break;
													
												case 'getFollowedArtists' :
														if (localStorage['BeeZikExt_followed_artists'].length == 0)
															localStorage['BeeZikExt_followed_artists'] = ';';
														sendResponse({ str : localStorage['BeeZikExt_followed_artists'] });
													break;
													
												case 'getDatas' :
													trierPanier();
													sendResponse(BeeZikExtData);
													break;
													

												case 'nextSong' :
													var next = getNextSongInCart();
													
													if (next) {
														sendResponse({id:next.id});
														setDownloaded(next.id, next.artist);
														update_badge();
													}
													break;
													
												case 'addMusic' : // TODO      	#777777 où 777777 id du morceau
													console.log('#[');
													ajouter(request.song.artist, request.song.title, request.song.idSong);
													update_badge();
													console.log(']');
													break;
													
												case 'deleteMusic' :
													retirer(request.id, request.artist);
													update_badge();
													break;
													
												case 'addAlbum' : // TODO		http://beezik.com/x-p777777 où 777777 id de l'album
													break;
													
												case 'eraseDownloaded' :
													break; // TODO
													
												case 'eraseAll' :
													BeeZikExtData = {};
													update_badge();
													sendResponse({});
													break;
													
												case 'changeFollowedStatus' : // TODO
													// Retourne le statut courant
													break;
											}
											if (request.func)
												updateTopBar(gl_curTab);
										}
									  );


// DEBUG
//localStorage['BeeZikExt_followed_artists'] = "42;183349;"
initializeExt();
