/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

var			tab_id = 0;
var			id_to_open = 0;

function	get_tab(tab)
{
    tab_id = tab.id;
}

function	ouvrir_musique(i)
{
    var song = JSON.parse(localStorage['BeeZikExt_cart_' + i]);
    song.downloaded = 1;
    localStorage['BeeZikExt_cart_' + i] = JSON.stringify(song);
    localStorage['BeeZikExt_playlist_state_modified'] = 1;

    todo = "chrome.tabs.executeScript(" + tab_id + ", {code : \"document.location = 'http://beezik.com/telecharger/t/" + song.id + "';\"});";
    setTimeout(todo, 111);

    var badgeText = get_nb_song_to_dl().toString()
    set_badge_text(badgeText);
    if (badgeText == "0" && localStorage['BeeZikExt_option_del_end'] == 'yes')
	erease_all();
}

function	open_tab(str)
{
    chrome.tabs.create({ url: str });
}

function	do_cmd_next(url)
{
    var		limit = parseInt(localStorage['BeeZikExt_cart_id']);

    for (var i = 1; i <= limit; i++)
    {
	var song = localStorage['BeeZikExt_cart_' + i];
	if (song && song.indexOf('"downloaded":0,"') != -1)
	{
	    chrome.windows.getLastFocused( function (win)
					   {
					       chrome.tabs.getSelected(win.id,
								       function	(tab)
								       {
									   get_tab(tab);
									   ouvrir_musique(i);
								       }
								      );
					   } );
	    break;
	}
    }
}
