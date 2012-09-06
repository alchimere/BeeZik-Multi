/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

/*
 * CMD functions :
 *   do_follow(), do_unfollow()
 */
// localStorage['BeeZikExt_followed_' + id] = hashprev|hashnow
var followInjectedScript = 	"document.getElementById(\'BeeZikExt_follow\').style.display = \'none\';\
							 document.getElementById(\'BeeZikExt_unfollow\').style.display = \'inline\';";
function	do_follow(urlArtist, tabId)
{
	var tab = urlArtist.split('-');

	chrome.tabs.executeScript(tabId, {code : followInjectedScript});
	if (localStorage['BeeZikExt_followed_artists'].indexOf(tab[0] + ';') == -1)
	{
		localStorage['BeeZikExt_followed_artists'] += tab[0] + ';';
		var artistHash = getArtistPageHash(tab[0]);
		localStorage['BeeZikExt_followed_' + tab[0]] =  artistHash + '|' + artistHash + '|' + tab[1];
	}
}

var unfollowInjectedScript = 	"document.getElementById(\'BeeZikExt_follow\').style.display = \'inline\';\
								 document.getElementById(\'BeeZikExt_unfollow\').style.display = \'none\';";
function	do_unfollow(urlArtist, tabId)
{
    var tab = urlArtist.split('-');

    do_unfollow_id(tab[0]);
    chrome.tabs.executeScript(tabId, {code : unfollowInjectedScript});
}

function	do_unfollow_id(idToUnfollow)
{
    while (localStorage['BeeZikExt_followed_artists'].indexOf(idToUnfollow + ';') > -1)
	localStorage['BeeZikExt_followed_artists'] = localStorage['BeeZikExt_followed_artists'].replace(idToUnfollow + ';', '');
    localStorage.removeItem ('BeeZikExt_followed_' + idToUnfollow);
}

/*
 *  Update functions
 */
function	updateFollowedArtists()
{
	var followed_ids = localStorage['BeeZikExt_followed_artists'].split(';');
	var followed_hashes, str, name;

	localStorage['BeeZik_followed_new'] = "false";

	for (var i = 0; i < followed_ids.length; i++)
	{
		str = localStorage['BeeZikExt_followed_' + followed_ids[i]];
		followed_hashes = str.split('|');
		if (followed_hashes.length != 3)
		{
			followed_hashes[0] = '42';
			// TODO setter le nom ?? ou virer la donnée
			continue;
		}
		else
		{
			name = str.substr(followed_hashes[0].length + followed_hashes[1].length + 2);
		}
		str = getArtistPageHash(followed_ids[i])
		if (str != "" && str != null)
		{
			localStorage['BeeZikExt_followed_' + followed_ids[i]] = followed_hashes[0] + '|' + str + '|' + name;
			if (followed_hashes[0] != str)
				localStorage['BeeZik_followed_new'] = "true";
		}
	}

	if (localStorage['BeeZik_followed_new'] == "true")
		chrome.browserAction.setIcon({ path : "images/icon_new.png" });
	else
		chrome.browserAction.setIcon({ path : "images/icon.png" });
}

function	getArtistPageHash(idArtist)
{
	var valide = false;
	var pageHash = "";

	jQuery.ajax(
				{
					url: "http://www.beezik.com/memberMusicArtistAllAlbum.htm",
					data: { artiste: idArtist },
					async: false,
					success: function(data) {
									if (data.length == 0)
									{
										valide = false;
										alert("empty data");
										return ;
									}
								 	valide = true;
								 	var footEnd = data.lastIndexOf('<div id="Footer">');

								 	if (footEnd > 0)
								 		data = data .substr(0, footEnd);
								 	data = data.replace(/<head>.*<\/head>/g, "<head></head>")
								 				.replace(/<link.*\/>/g, "")
								  				.replace(/src=\".*\"/g, "");

								  	var pos = 0;
								  	var size;
								  	while ((pos = data.indexOf("/telecharger/p/", pos)) != -1)
								  	{
								  		size = data.indexOf('\"', pos) - pos;
								  		pageHash = calcMD5(pageHash + data.substr(pos, size));
								  		pos++;
								  	}
								}
				}
			  );
	if (valide == false)
		return null;
	return pageHash;
}
