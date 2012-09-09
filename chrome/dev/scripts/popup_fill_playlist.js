/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

// -- Table -- //

// @CLASS@ 		-> class attribute
// @I@			-> localStorage index
// @J@			-> for index
// @ID@			-> music id
// @ARTIST1@	-> artist name left
// @ARTIST2@	-> artist name context
// @TITLE@		-> music title
// @PUCE@		-> puce img

var tab_line = '<tr class="@CLASS@" id="tr_@J@" data-id="@ID@" data-puce="images/@PUCE@">\
					<!--onmouseover="$(\'img_play_@ID@\').style.display = \'block\'; $(\'img_suppr_@ID@\').style.visibility = \'visible\';"-->\
					<!--onmouseout= "$(\'img_play_@ID@\').style.display = \'none\'; $(\'img_suppr_@ID@\').style.visibility = \'hidden\';"> -->\
					 	<td width="16" id="td_0_@J@" style="background-image: url(\'images/@PUCE@\'); background-repeat: no-repeat;">\
					 			<img src="images/del.png" id="img_suppr_@ID@" class="icon_suppr"\
									 data-id="@ID@" data-i="@I@"\
									 style="visibility:hidden; cursor:pointer"\
									 title="Supprimer"/>\
									 <!--onclick="delete_song(@I@, \'notReload\'); fill_list();"/>-->\
						</td>\
						<td width="133">\
							<div class="name" title="@ARTIST2@">\
								<img src="images/play.gif" id="img_play_@ID@" class="playbtn" style="float:left; margin-right:5px; display:none; cursor:pointer"\
										 title="Jouer extrait 30s"\
										 data-id="@ID@" data-i="@I@"/>\
										 <!--onclick="changeZik(@ID@, @I@);"-->\
								<div class="name" class="click_event" data-id="@ID@" data-i="@I@"> <!--onclick="open_songtab(\'http://www.beezik.com/telecharger/t/@ID@\', @I@)"-->\
									@ARTIST1@\
								</div>\
							</div>\
						</td>\
						<td width="233" class="click_event" data-id="@ID@" data-i="@I@"> <!--onclick="open_songtab(\'http://www.beezik.com/telecharger/t/@ID@\', @I@)">-->\
							<div class="title" title="@ARTIST2@\n @TITLE@\nhttp://www.beezik.com/telecharger/t/@ID@">\
								@TITLE@\
							</div>\
						</td>\
						<td width="16">\
						</td>\
				</tr>';

function	getTabLine(cellClass, index, j, id, artist1, artist2, title, puce)
{
	return tab_line.replace(/@CLASS@/g, cellClass)
					.replace(/@I@/g, index)
					.replace(/@J@/g, j)
					.replace(/@ID@/g, id)
					.replace(/@ARTIST1@/g, artist1.substr(0, 21)) // coupure à 21 caractère pck le word wrap marche pas...
					.replace(/@ARTIST2@/g, artist2)
					.replace(/@TITLE@/g, title)
					.replace(/@PUCE@/g, puce);
}

function	fill_list()
{
	if (!sort_list())
		return ;

	if (localStorage['BeeZikExt_playlist_state_modified'] == 0
		&& localStorage['BeeZikExt_playlist_size_modified'] == 0)
	{
		contenuPlaylist.innerHTML = localStorage['BeeZikExt_popup_content'];
		return ;
	}

	var	liste = '<table>'
	var	j = 0;
	var prev_artist = null;

	for (var i = 1; i < parseInt(localStorage['BeeZikExt_cart_id']); i++)
	{
		var strSong = localStorage['BeeZikExt_cart_' + i];

		if (!strSong || strSong == undefined)
			continue;
		var song = JSON.parse(strSong);

		if (song != undefined && song.downloaded == 0)
		{
			var lineClass;
			if (j % 2)	lineClass = "ligne_blanc";
			else		lineClass = "ligne_gris";

			var artist2 = song.artist;
			var artist1 = '';

			if (artist2 != prev_artist)
				artist1 = artist2;

			var title = song.title;
			var puce = '';
			if (artist1 == artist2)
				puce = 'puce.png';

			liste += getTabLine(lineClass, i, j, song.id, artist1, artist2, title, puce);
			prev_artist = song.artist;
			j++;
		}
	}
	liste += '</table>';
	liste += '<div style="height:2px; background-color:#F7AE23"></div>';

	liste += '<table>'
	prev_artist = null;
	for (var i = 1; i < parseInt(localStorage['BeeZikExt_cart_id']); i++)
	{
		var strSong = localStorage['BeeZikExt_cart_' + i];

		if (!strSong || strSong == undefined)
			continue;
		var song = JSON.parse(strSong);

		if (song != undefined && song.downloaded == 1)
		{
			var lineClass;
			if (j % 2)	lineClass = "ligne_blanc";
			else		lineClass = "ligne_gris";

			var artist2 = song.artist;
			var artist1 = '';

			if (artist2 != prev_artist)
				artist1 = artist2;

			var title = song.title;
			var puce = '';
			if (artist1 == artist2)
				puce = 'puce.png';

			liste += getTabLine(lineClass, i, j, song.id, artist1, artist2, title, puce);
			prev_artist = song.artist;
			j++;
		}
	}
	liste += '</table>';
	localStorage['BeeZikExt_popup_content'] = liste;
	localStorage['BeeZikExt_state_modified'] = 0;
	contenuPlaylist.innerHTML = liste;
}
