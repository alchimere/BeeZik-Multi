/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

// -- Table -- //

// @CLASS@ 		-> class attribute
// @J@			-> for index (0 or 1)
// @ID@			-> artist id
// @ARTIST@		-> artist name
// @PUCE@		-> maybe for new or not
var follow_tab_line = '<tr class="@CLASS@" id="tr_@J@"\
							onmouseover="replace_image_to(\'f_img_suppr_@ID@\', \'images/del.png\')"\
							onmouseout= "replace_image_to(\'f_img_suppr_@ID@\', \'images/@PUCE@\')"/>\
							 	<td width="30" id="td_0_@J@">\
							 		<div id="f_img_suppr_@ID@" style="height: 15px; background-image: url(\'images/@PUCE@\'); background-repeat: no-repeat;"\
										onclick="do_unfollow_id(@ID@); fill_followed_section()">\
									</div>\
								</td>\
								<td width="366" onclick="open_followedtab(@ID@); set_followed(@ID@);">\
									<div class="name" title="@ARTIST@">\
										@ARTIST@\
									</div>\
								</td>\
								<td width="16">\
								</td>\
						</tr>';

function	getFollowTabLine(cellClass, j, id, artist, puce)
{
	return follow_tab_line.replace(/@CLASS@/g, cellClass)
						.replace(/@J@/g, j)
						.replace(/@ID@/g, id)
						.replace(/@ARTIST@/g, artist)
						.replace(/@PUCE@/g, puce);
}

// TODO Trier par ordre alphabétique ?
function	fill_followed_section()
{
	var followed_ids = localStorage['BeeZikExt_followed_artists'].split(';');
	var followed_hashes;
	var contentNew = '';
	var contentOld = '';
	var j = 0;
	var k = 0;

	for (var i = 0; i < followed_ids.length; i++)
	{
		if (followed_ids[i] == '')
			continue;
		followed_hashes = localStorage['BeeZikExt_followed_' + followed_ids[i]].split('|');
		if (followed_hashes.length == 3)
		{
			var lineClass;
			if (j % 2)	lineClass = "ligne_blanc";
			else		lineClass = "ligne_gris";

			if (followed_hashes[0] == followed_hashes[1])
				contentOld += getFollowTabLine(lineClass, i, followed_ids[i],
												localStorage['BeeZikExt_followed_' + followed_ids[i]].substr(followed_hashes[0].length + followed_hashes[1].length + 2),
												'puce.png');
			else
				contentNew += getFollowTabLine(lineClass, i, followed_ids[i],
												localStorage['BeeZikExt_followed_' + followed_ids[i]].substr(followed_hashes[0].length + followed_hashes[1].length + 2),
												'new.gif');
			j++;
		}
	}
	contenuInfo.innerHTML = '<table>'
		 + contentNew
		 + '</table>'
		 + '<div style="height:2px; background-color:#F7AE23">'
		 + '</div>'
		 + '<table>'
		 + contentOld
		 + '</table>';
	if (contentNew.length > 0)
	{
		localStorage['BeeZik_followed_new'] = "true";
		chrome.browserAction.setIcon({ path : "images/icon_new.png" });
		infoSortiesButton.style.backgroundColor = '#ac7';
	}
	else
	{
		localStorage['BeeZik_followed_new'] = "false";
		chrome.browserAction.setIcon({ path : "images/icon.png" });
		new_img.style.display = "none";
	}
}
