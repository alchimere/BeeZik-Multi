/*
*	Made by firetonton
*	firetonton@gmail.com
*/

/*$('.infosOff').click(function () {
	alert('YES !!!');
});*/
	
function addMusicToCart(p_artist, p_title, p_songId) {
	// request.song.artist, request.song.title, request.song.idSong
	chrome.extension.sendRequest(
										{
											func: "addMusic",
											song: 	{
														artist: p_artist,
														title: 	p_title,
														idSong: p_songId
													}
										}
									);
}

// Top 20 page accueil
jQuery('#top-20 .item .download').on('click', function () {
		var song = jQuery(this).parent().children('.play').data('player');
		addMusicToCart(song.artist, song.title, song.id);
		return false;
	});
	
// Top 300
jQuery('.tops .download').on('click', function () {
		var song = jQuery(this).parent().children('.play').data('player');
		addMusicToCart(song.artist, song.title, song.id);
		return false;
	});

// Artiste // Album
jQuery('ul.songs-list p.actions a.download').on('click', function () {
		// http://www.beezik.com/kiss-a26496#6914816
		var song = jQuery(this).parent().children('.play').data('player');
		addMusicToCart(song.artist, song.title, song.id);
		return false;
	});

/*
// TODO enlever ća ...
var callTopBarUpdate = 'javascript:eval(document.getElementById(&quot;refreshTopBar&quot;).innerHTML)';

// Ajout de la barre supérieure
function	nextSongBar()
{
    var footer = document.getElementById('Header');
    var jsnexttimeout = 'javascript:document.location = \'#BeeZikExtCmd:Next\'; setTimeout(\'document.location = \\\'#BeeZikMulti\\\'\', 100);';

    backgroundURL = chrome.extension.getURL('bar_background.jpg');

	// TODO mieux setter le zindex
    top_bar = '<div id="BeeZikExtNext" style=	"margin-left:auto; padding-right:20px; padding-left:20px; color:black; font-weight:bold; font-size:20px;\
    											 font-family:Arial,Helvetica,sans-serif; z-index:42000; width:100%; height:45px; position:absolute; text-align:center;">';
    top_bar += '<a style="text-decoration:none;" href="' + jsnexttimeout + '"> <img src="' + chrome.extension.getURL('images/bouton_haut_page.png') + '"/> </a>';
    top_bar += '</div>';

    if (footer)
		footer.innerHTML = top_bar + footer.innerHTML;
}

// TODO remplacer par un seul String.replace avec regexp
// Remplacement des double quotes pour éviter quelques soucis
function	inhib(str)
{
    var	nb = str.split('%22').length - 1;

    for (var i = 0; i < nb; i++)
		str = str.replace('%22', '@dbquote;');
    return (str);
}

// TODO Attention aux artistes avec 'de' dans le titre (ex : 'As de Trêfle')
function	get_artist_title(str) // /!\ Fonction dupliquée dans cmd_add_album.js
{
	var last = str.lastIndexOf('de');
	
	title = str.substr(0, last).replace(/T[ée]l[ée]charger gratuitement /i, '');
	artist = str.substr(last + 2);
	return (artist + ' - ' + title);
}

function	followArtistButton(artists)
{
    //var obj_div = document.getElementById('Content').getElementsByTagName('h2')[0].getElementsByTagName('div')[0];
	var obj_div = document.getElementById('Content').getElementsByTagName('h2')[0].getElementsByTagName('span')[0];

	if (obj_div == null)
		return ;
		
	var obj_name = document.getElementById('Content').getElementsByTagName('h2')[0].getElementsByTagName('span')[0];
	if (obj_name == null)
		return ;

	var		model = "beezik.com/telecharger/a/";
	var		url = document.location + '';
	var		pos;

	if ((pos = url.indexOf(model)) > -1)
	{
		var idArtist = parseInt(url.substr(pos + model.length));
		
		if (idArtist >= 0)
		{
			var content = '';
		    var style_none = ' style="position:absolute; left: 7px; cursor:pointer; display:none" ';
		    var style_ok = ' style="position:absolute; left: 7px; cursor:pointer; display:inline" ';
			
			if (artists.str.indexOf(idArtist + ';') > -1)
			{
				// Artiste déjà suivi
				content = 	'<img id="BeeZikExt_follow" 	src="' 	+ chrome.extension.getURL('images/follow.png')
																 	+ '" onclick=	"'
																 	+				'document.location = \'#BeeZikExtCmd:follow-' + idArtist + '-' + obj_name.innerHTML + '\';'
																 	+				'setTimeout(\'document.location = \\\'#BeeZikMulti\\\'\', 100);'
																 	+ '"' + style_none + '/>';

				content += 	'<img id="BeeZikExt_unfollow" 	src="' 	+ chrome.extension.getURL('images/unfollow.png')
																 	+ '" onclick=	"'
																 	+				'document.location = \'#BeeZikExtCmd:unfollow-' + idArtist + '-' + obj_name.innerHTML + '\';'
																 	+				'setTimeout(\'document.location = \\\'#BeeZikMulti\\\'\', 100);'
																	+ '"' + style_ok + '/>';
			}
			else
			{
				// Artiste pas encore suivi
				content = 	'<img id="BeeZikExt_follow" 	src="' 	+ chrome.extension.getURL('images/follow.png')
																 	+ '" onclick=	"'
																 	+				'document.location = \'#BeeZikExtCmd:follow-' + idArtist + '-' + obj_name.innerHTML + '\';'
																 	+				'setTimeout(\'document.location = \\\'#BeeZikMulti\\\'\', 100);'
																 	+ '"' + style_ok + '/>';

				content += 	'<img id="BeeZikExt_unfollow" 	src="' 	+ chrome.extension.getURL('images/unfollow.png')
																 	+ '" onclick=	"'
																 	+				'document.location = \'#BeeZikExtCmd:unfollow-' + idArtist + '-' + obj_name.innerHTML + '\';'
																 	+				'setTimeout(\'document.location = \\\'#BeeZikMulti\\\'\', 100);'
																	+ '"' + style_none + '/>';
			}
			if (content.length > 0)
				obj_div.innerHTML = content + obj_div.innerHTML;
		}
	}
}*/

//nextSongBar();
//chrome.extension.sendRequest({func: "getFollowedArtists"}, followArtistButton);

/*document.body.innerHTML += '<div style="height:300px;background-color:red;">' + document.location + '</div>';
document.body.onchange = function() {alert("Change !!!");}*/

chrome.extension.sendRequest({func: "endBeezikJs"}, function(response){});

