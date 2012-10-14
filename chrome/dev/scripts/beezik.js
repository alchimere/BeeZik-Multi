
	/*
		Made by firetonton
		firetonton@gmail.com
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
	
jQuery('#top-20 .item .download').on('click', function () {
		var song = jQuery(this).parent().children('.play').data('player');
		addMusicToCart(song.artist, song.title, song.id);
		return false;
	});
	
jQuery('ul.songs-list p.actions a.download').on('click', function () {
		// http://www.beezik.com/kiss-a26496#6914816
		var song = jQuery(this).parent().children('.play').data('player');
		addMusicToCart(song.artist, song.title, song.id);
		return false;
	});

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

// Remplace les boutons de style de musique pour prendre en compte les +
function	replaceThemes()
{
    var themeList = document.getElementById('themeList');

    if (themeList)
    {
		var themeLinkTab = themeList.getElementsByTagName('a');

		for (var i = 0; i < themeLinkTab.length; i++)
		{
			if (themeLinkTab[i].id.substr(0, 6) == 'theme_')
			{
				var href = themeLinkTab[i].href;
				var content = themeLinkTab[i].innerHTML;

				themeLinkTab[i].innerHTML =	'<a id="BeeZikExtTheme" href="' + href + '" onclick=" document.location = \'' + href + '\'; " >' + content + "</a>";
				themeLinkTab[i].onclick = function() { return false; };
			}
		}
    }
}

// TODO Attention aux artistes avec 'de' dans le titre (ex : 'As de Trêfle')
function	get_artist_title(str) // /!\ Fonction dupliquée dans cmd_add_album.js
{
	var last = str.lastIndexOf('de');
	
	title = str.substr(0, last).replace(/T[ée]l[ée]charger gratuitement /i, '');
	artist = str.substr(last + 2);
	return (artist + ' - ' + title);
}

// Remplace telecharger par ajouter
function	downloadToAdd()
{
    var plus_img = chrome.extension.getURL('images/add_cart.png');
    var as = document.getElementsByTagName("a");

    for (var i = 0; i < as.length; i++)
    {
		if ((as[i].href.indexOf('titre-') > -1)
			|| (as[i].href.indexOf('telecharger/') != -1 && as[i].href.indexOf('telecharger/a/') == -1 && as[i].href.indexOf('telecharger/p/') == -1))
		{
			if (as[i].innerHTML.substr(0,4) == "<img" && as[i].innerHTML.indexOf('/pochette/') == -1)
			{
				as[i].innerHTML = '<img src="' + plus_img + '"/ class="acheter">';
				as[i].href = 'javascript:document.location = "#BeeZikExt:' + inhib(as[i].href) + 'BeeZikExt:' + get_artist_title(inhib(as[i].title)) + '";'
								+ 'setTimeout(\'document.location = "#BeeZik Multi";\', 100);';
			}
		}
    }

    var visuels = document.getElementsByTagName("div");
    var ok = false;

	for (var i= 0; i < visuels.length; i++)
		if (visuels[i].className == "visuel")
		{
			ok = false;
			for (var j = 0; j < visuels[i].children.length && ok == false; j++)
			{
				var a = visuels[i].children[0];

				if (a)
				{
					if (a.href)
					{
						visuels[i].innerHTML += '<div style="margin-top:-20px; margin-left:2px">'
									+ '<a href="#" onclick="document.location=\'#BeeZikExtCmd:AddAlbum->' + inhib(a.href) + '\';'
									+ ' setTimeout(\'document.location = \\\'#BeeZik Multi\\\';\', 200); return false;">'
									+ '<img src="' + plus_img + '"></a></div>';
						ok = true;
					}
					else
					{
						a = visuels[i].children[0].children[0];
						if (a)
						{
							if (a.href)
							{
								var size = visuels[i].style.height - 16;
								visuels[i].children[0].innerHTML = '<div style="position:relative; top:120px; left:2px">'
											+ '<a href="#" onclick="document.location=\'#BeeZikExtCmd:AddAlbum->' + inhib(a.href) + '\';'
											+ ' setTimeout(\'document.location = \\\'#BeeZik Multi\\\';\', 200); return false;">'
											+ '<img src="' + plus_img + '"></a></div>' + visuels[i].children[0].innerHTML;
								ok = true;
							}
						}
					}
				}
			}
		}
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
}

var maxAlert = 10;

function	myalert(str)
{
	if (maxAlert > 0)
	{
		alert(str);
		maxAlert--;
	}
}

//replaceThemes();
//downloadToAdd();
//nextSongBar();
//chrome.extension.sendRequest({func: "getFollowedArtists"}, followArtistButton);

/*document.body.innerHTML += '<div style="height:300px;background-color:red;">' + document.location + '</div>';
document.body.onchange = function() {alert("Change !!!");}*/

chrome.extension.sendRequest({func: "endBeezikJs"}, function(response){});

