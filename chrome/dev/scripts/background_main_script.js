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

function	is_valid_cmd(url)
{
	var		i = url.lastIndexOf("#");

	if (i < 0)
		return (false);
	if (url.substr(i, 14) == "#BeeZikExtCmd:")
		return (true);
	return (false);
}

function	do_cmd(url, tabId)
{
	var		i = url.lastIndexOf("#");

	if (i < 0)
		return ;
	if (url.substr(i + 14, 4) == "Next")
		do_cmd_next(url);
	else if (url.substr(i + 14, 10) == "AddAlbum->")
		do_cmd_add_album(url.substr(i + 24));
	//else if (url.substr(i + 14, 7) == "follow-") // TODO : remplacer par une regexp
	else if (url.match(/.+#BeeZikExtCmd:follow-[0-9]+-.+/))
		do_follow(url.substr(i + 14 + 7), tabId);
	//else if (url.substr(i + 14, 9) == "unfollow-") // TODO : remplacer par une regexp
	else if (url.match(/.+#BeeZikExtCmd:unfollow-[0-9]+-.+/))
		do_unfollow(url.substr(i + 14 + 9), tabId);
	/*else
		alert("Bad CMD...");*/
}

/* ---------- Gestion des ajouts ---------- */
chrome.tabs.onUpdated.addListener(function(tabId, infos, tab)
									{
										if (localStorage['BeeZikExt_update'] == 0)
										{
											localStorage['BeeZikExt_update'] = 1;
											if (!test_url_to_update(tab.url)) // Test Ajout de musique
												add_to_cart(tab);
											else if (is_valid_cmd(tab.url)) // Commande
												do_cmd(tab.url, tabId);
											updateTopBar(tabId);
											
											setTimeout(function () { localStorage['BeeZikExt_update'] = 0; }, 200);
										}
										//alert("update [" + tab.url + "]");
									}
								 );

/* ---------- Gestion des updates du bouton next ---------- */
chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo)
											{
												updateTopBar(tabId);
											}
										  );

/* ---------- Gestion des requêtes ---------- */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
										{
											switch (request.func)
											{
												case 'setBadgeColor' :
														clearTimeout(cur_no_drm_timer);
														setBadgeColor();
														sendResponse({});
													break;

												case 'importer' :
														importer(request.liste, request.erease);
														sendResponse({});
													break;

												case 'endBeezikJs' :
														updateTopBar();
														sendResponse({});
													break;
												case 'getFollowedArtists' :
														if (localStorage['BeeZikExt_followed_artists'].length == 0)
															localStorage['BeeZikExt_followed_artists'] = ';';
														sendResponse({ str : localStorage['BeeZikExt_followed_artists'] });
													break;
											}
										}
									  );


// DEBUG
//localStorage['BeeZikExt_followed_artists'] = "42;183349;"
initializeExt();
