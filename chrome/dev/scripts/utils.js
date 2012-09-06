/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

// TODO remplacer par un seul String.replace avec regexp
function	inhib_quotes(str)
{
    var	nb = str.split('%22').length - 1;

    for (var i = 0; i < nb; i++)
	str = str.replace('%22', '@dbquote;');
    return (str);
}

// TODO remplacer par un seul String.replace avec regexp
function	uninhib_quotes(str)
{
	var		nb = str.split('@dbquote;').length - 1;
	
	for (var i = 0; i < nb; i++)
		str = str.replace('@dbquote;', '%22');
	return (str);
}

/*
** Parsing de l'url pour l'importer
**  /!\ parser deux formes d'url pour une compatibilité avec les anciennes playlists
*/
var			baseURL = 'http://www.beezik.com/telecharger/t/';

// Retourne l'url de la musique en fonction de l'id
function	getURLFromID(id)
{
	return (baseURL + id);
}

function	getTrackID(url)
{
	/* Test première version */
	var		firstVersion = 'http://www.beezik.com/titre-';

	if (url.substr(0, firstVersion.length) == firstVersion)
	{
		var 	i = url.length - 1;
	
		while (i > 0 && url.charCodeAt(i) >= ('0').charCodeAt(0) && url.charCodeAt(i) <= ('9').charCodeAt(0))
			i--;
		return (parseInt(url.substr(i + 1)));
	}

	/* Test seconde version */
	var		secondVersion = 'http://www.beezik.com/telecharger/';

	if (url.substr(0, secondVersion.length) == secondVersion)
		return (parseInt(url.substr(url.lastIndexOf('/') + 1)));
}

function	adaptURL(url)
{
	return (getURLFromID(getTrackID(url)));
}

