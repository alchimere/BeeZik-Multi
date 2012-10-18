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
	/*if (localStorage['BeeZikExt_playlist_state_modified'] == 0
		&& localStorage['BeeZikExt_playlist_size_modified'] == 0)
	{
		contenuPlaylist.innerHTML = localStorage['BeeZikExt_popup_content'];
		return ;
	}*/
console.log('sendRequest getDatas');
chrome.extension.sendRequest({func: "getDatas"},
	function (data) {
		var	j = 0, nbReady = 0, nbDl = 0;
		var prev_artist = null;
		var readyList = '';
		var downloadedList = '';
		var sortedArtists = [];
		
		for (artist in data)
			sortedArtists.push(artist);
		sortedArtists.sort(function (a, b) 
							{
							   a = a.toUpperCase();
							   b = b.toUpperCase();
							   if(a > b) 
								  return 1;
							   if(a < b) 
								  return -1; 
							   return 0
							});
		
		for (var index = 0; index < sortedArtists.length; index++)
		{
			artist = sortedArtists[index];
			for (var i = 0; i < data[artist].length; i++)
			{
				var song = data[artist][i];
				
				if (song.dl == 0) {
					if (i == 0)
						readyList += getTabLine(nbReady % 2 ? 'ligne_blanc' : 'ligne_gris',
											i, j, song.id, artist, artist, song.t, 'puce.png');
					else
						readyList += getTabLine(nbReady % 2 ? 'ligne_blanc' : 'ligne_gris',
											i, j, song.id, '', artist, song.t, '');
					nbReady++;
				}
				else {
					if (i == 0)
						downloadedList += getTabLine(nbDl % 2 ? 'ligne_blanc' : 'ligne_gris',
											i, j, song.id, artist, artist, song.t, 'puce.png');
					else
						downloadedList += getTabLine(nbDl % 2 ? 'ligne_blanc' : 'ligne_gris',
											i, j, song.id, '', artist, song.t, '');
					nbDl++;
				}
				j++;
			}
		}
		
		var	liste = '<table>';
		liste += readyList;
		liste += '</table>';
		liste += '<div style="height:2px; background-color:#F7AE23"></div>';
		liste += '<table>'
		liste += downloadedList;
		liste += '</table>';
		localStorage['BeeZikExt_popup_content'] = liste;
		localStorage['BeeZikExt_state_modified'] = 0;
		console.log(liste);
		contenuPlaylist.innerHTML = liste;
		console.log('Fin fill_playlist');
		
		// Le temps de rétablir le player audio
		jQuery('.playbtn').css('visibility', 'hidden');
		jQuery('.playbtn').css('width', '0');
	});
}
