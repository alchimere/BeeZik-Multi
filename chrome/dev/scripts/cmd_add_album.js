/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

// Ajout d'un album entier (en test)
function	getPageContent(page)
{
	var begin = page.indexOf("<body>");
	begin += 6;

	var end = page.indexOf("</body>");
	if (page.indexOf('id="Footer"') != -1)
		end = page.indexOf('id="Footer"');
	return (page.substr(begin, end - begin));
}

var index = 0;
var songLink = "";

// TODO Attention aux artistes avec 'de' dans le titre (ex : 'As de Trêfle')
function	get_artist_title(str) // /!\ Fonction dupliquée dans beezik.js
{
	var last = str.lastIndexOf('de');

	title = str.substr(0, last).replace(/&eacute;/g, 'e').replace(/T[ée]l[ée]charger gratuitement /i, '');
	artist = str.substr(last + 2);
	return (artist + ' - ' + title);
}

function	getNextSong(page)
{
	var indexTmp;

	if ((indexTmp = page.indexOf("/telecharger/t/", index)) != -1
		|| (indexTmp = page.indexOf("/telecharger/mp3/", index)) != -1)
	{
		index = indexTmp;
		for (var i = index; page[i] != '"'; i++)
			;
		songLink = "http://www.beezik.com#BeeZikExt:http://www.beezik.com" + page.substr(index, i-index);

		if ((index = page.indexOf("title=\"", index)) == -1)
		{
			songLink = "";
			return true;
		}
		index += 7;
		for (var i = index; page[i] != '"'; i++)
			;
		songLink += 'BeeZikExt:' + get_artist_title(inhib_quotes(page.substr(index, i-index)));
		//alert(songLink);
		return true;
	}
	return false;
}

function	parseRecievedPage(page)
{
	index = 0;
	page = getPageContent(page);
	while (getNextSong(page))
	{
		if (songLink != "")
			add_url_to_cart(songLink);
		songLink = "";
	}
	localStorage['BeeZikExt_playlist_size_modified'] = 1;
	updateTopBar();
}

function	do_cmd_add_album(url)
{ // TODO jQuery ajax
	var xhr;

 	try { xhr = new XMLHttpRequest(); }
	catch (e3) { xhr = false; }

	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4)
		{
  			if(xhr.status == 200)
				parseRecievedPage(xhr.responseText);
  			else
				alert("Erreur ! La page '" + url + "' n'existe peut-être pas.");
		}
	};
	xhr.open("GET", url, true);
	xhr.send(null);
}
