/*
*	Made by firetonton
*	firetonton@gmail.com
*/

chrome.extension.sendRequest({ func: "pickNewPageInfo" });

// TODO suivi des artistes

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

function addAlbumToCart(p_url) {
	if (p_url.substr(0, 7) != "http://")
		p_url = "http://www.beezik.com/" + p_url;
					
	chrome.extension.sendRequest(
										{
											func: "addAlbum",
											url: p_url
										}
									);
}

// -- Ajout des boutons
function addCaddies() {	
	var htmlCaddie 		= '<span title="Ajouter à BeeZik Multi" class="caddie"><img src="'+chrome.extension.getURL('images/caddy.gif')+'"/></span><span class="sep caddie_sep">';
	var htmlCaddieTop 	= htmlCaddie.replace('caddie', 'caddie caddie_top_20');

	jQuery(htmlCaddie)		.insertBefore(jQuery('ul.songs-list p.actions span.play'));	// Artiste // Album
	jQuery(htmlCaddieTop)	.insertBefore(jQuery('#top-20 .item .play'));				// Top 20 page accueil
	jQuery(htmlCaddieTop)	.insertBefore(jQuery('.tops .play'));						// Top 300

	jQuery('.caddie').on('click', function () {
			var song = jQuery(this).next().next().data('player');
			addMusicToCart(song.artist, song.title, song.id);
		});
}

function addCaddiesOnAlbums() {
	var imgCaddieUrl = chrome.extension.getURL('images/caddy.gif');
	var htmlCaddie = '<span class="albumBubble">\
							<img src="'+imgCaddieUrl+'"/> Ajouter l\'album au panier\
					</span>';
					
	//ul.songs-list p.album a
	var links = jQuery('ul.songs-list p.album a');
	
	if (links)
	{
		links.each(function () {
				if ($(this).html().length > 30)
					$(this).html($(this).html().substr(0, 30) + '...');
			});
		jQuery(htmlCaddie).insertBefore(links);
		jQuery('<li class="track itemFirst"></li>').insertBefore(jQuery('ul.songs-list li:first-child'));
		jQuery('ul.songs-list p.album').hover(
					function () {
						$(this).children('.albumBubble').css({
																'display': 'block',
																'opacity': '1',
																'top': '-25px'
															});
					},
					function () {
						$(this).children('.albumBubble').css({'opacity': '0',
															  'top': '0'});
					}
				);
		
		jQuery('ul.songs-list .albumBubble').on('click', function () {
				addAlbumToCart(jQuery(this).next().attr('href'));
			});
	}
		
	// #albums .carousel li figure a
	if (jQuery('#albums .carousel li figure'))
	{
		jQuery(htmlCaddie).insertBefore(jQuery('#albums .carousel li figure figcaption'));
		jQuery('#albums .carousel li figure').hover(
					function () {
						$(this).children('.albumBubble').css({
																'display': 'block',
																'opacity': '1',
																'top': '50px'
															});
					},
					function () {
						$(this).children('.albumBubble').css({'opacity': '0',
															  'top': '0'});
					}
				);
		jQuery('#albums .carousel .albumBubble').on('click', function () {
				var url = $(this).parent().find('span.image a').attr('href');
				console.log(url);
				addAlbumToCart(url);
			});
	}
	
	console.log('-- A');
	if (jQuery('#ctx').attr('itemtype') == 'http://schema.org/MusicAlbum')
	{
		jQuery(htmlCaddie).insertBefore(jQuery('#album-info > p:first-child'));
		jQuery('#album-info .albumBubble').on('click', function () {
				addAlbumToCart(document.location.href);
			});
	}
}

// -- Ajout de la barre supérieure
function	nextSongBar()
{
	var bar = $('<div id="next_download_bar">Panier vide</div>').insertBefore('#categories');
	bar.on('click', function () {
			chrome.extension.sendRequest({ func: "nextSong" },
											function (id)
											//{ location.href = 'http://www.beezik.com/beezik-multi-'+ id.id +'#' + id.id; }
											{ location.href = 'http://www.beezik.com/#' + id.id; }
										);
		});
}

/*
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

nextSongBar();
addCaddies();
addCaddiesOnAlbums();
//addAd();
//chrome.extension.sendRequest({func: "getFollowedArtists"}, followArtistButton);

chrome.extension.sendRequest({func: "endBeezikJs"}, function(response){});

