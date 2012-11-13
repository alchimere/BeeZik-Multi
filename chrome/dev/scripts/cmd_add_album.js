/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

// Ajout d'un album entier (en test)
function	getPageContent(page)
{
	var begin = page.indexOf("<body");
	begin = page.indexOf('>', begin) + 1;

	var end = page.indexOf("</body>");
	if (page.indexOf('id="Footer"') != -1)
		end = page.indexOf('id="Footer"');
	return (page.substr(begin, end - begin));
}

String.prototype.unescapeHtml = function () {

  var temp = document.createElement("div");
  temp.innerHTML = this;
  var result = temp.childNodes[0].nodeValue;
  temp.removeChild(temp.firstChild)
  return result;
}

function	parsePageContent(page)
{
	var indexTmp = 0;
	
	do {
		indexTmp = page.indexOf('data-player="', indexTmp) + 13;
		if (indexTmp >= 13)
		{
			var indexTmpEnd = page.indexOf('"', indexTmp);
			var song = page.substr(indexTmp, indexTmpEnd - indexTmp);
			song = JSON.parse(song.unescapeHtml());
			ajouter(song.artist, song.title, song.id);
		}
	} while (indexTmp >= 13);
}

function	parseRecievedPage(page)
{
	page = getPageContent(page);
	parsePageContent(page);
	updateTopBar();
	update_badge();
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
