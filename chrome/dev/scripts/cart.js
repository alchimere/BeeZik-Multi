/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

function	newSong(artist, title, id)
{
	return {
				artist		: artist,
				title		: title,
				downloaded	: 0,
				id			: parseInt(id)
			};
}


/*
 *	{
 * 		"Le groupe qui fait la musique ...": // artist
 * 				[ // songs
 * 					{
 * 						"t":"Titre de la chanson",
 * 						"id":1234567890,
 * 						"dl":0
 * 					},
 * 				 	...
 * 				],
 * 		...
 * 	}
 */

var BeeZikExtData = {};

function ajouter(artist, titre, id) {
	if (BeeZikExtData[artist] === undefined)
		BeeZikExtData[artist] = [];
	var tab = BeeZikExtData[artist];
	for (index in tab)
		if (tab[index].id == id) {
			tab[index].dl = 0;
			return ;
		}
	BeeZikExtData[artist].push({t:titre, id:id, dl:0});
}

function setDownloaded(id, artist) {
	if (artist) {
		for (var i = 0; i < BeeZikExtData[artist].length; i++)
			if (BeeZikExtData[artist][i].id == id)
			{
				BeeZikExtData[artist][i].dl = 1;
				return ;
			}
	}
	
	for (art in BeeZikExtData)
		for (var i = 0; i < BeeZikExtData[art].length; i++)
			if (BeeZikExtData[art][i].id == id)
			{
				BeeZikExtData[art][i].dl = 1;
				return ;
			}
}

function retirer(id, artist) {
	if (artist) {
		for (var i = 0; i < BeeZikExtData[artist].length; i++)
			if (BeeZikExtData[artist][i].id == id)
			{
				BeeZikExtData[artist].splice(i, 1);
				if (BeeZikExtData[artist].length == 0)
					delete BeeZikExtData[artist];
				return ;
			}
	}
	
	for (art in BeeZikExtData)
		for (var i = 0; i < BeeZikExtData[art].length; i++)
			if (BeeZikExtData[art][i].id == id)
			{
				BeeZikExtData[art].splice(i, 1);
				if (BeeZikExtData[art].length == 0)
					delete BeeZikExtData[art];
				return ;
			}
}

function trierPanier() {
	for (artiste in BeeZikExtData)
		BeeZikExtData[artiste].sort(function (a, b) { return a.t > b.t; });
	return BeeZikExtData;
}

function getNextSongInCart() {
	var total = 0;
	for (artiste in BeeZikExtData)
		for (var i = 0; i < BeeZikExtData[artiste].length; i++)
			if (BeeZikExtData[artiste][i].dl == 0)
				return {
							artist: artiste,
							title: BeeZikExtData[artiste][i].t,
							id: BeeZikExtData[artiste][i].id
						};
	return null;
}

function panierCount() {
	var total = 0;
	for (artiste in BeeZikExtData)
		for (var i = 0; i < BeeZikExtData[artiste].length; i++)
			total += (BeeZikExtData[artiste][i].dl == 0);
	return total;
}

function restore() { // à revoir ...
	if (localStorage['BeeZikExt_backup'])
		BeeZikExtData = JSON.parse(localStorage['BeeZikExt_backup']);
}

function backup() {
	console.log('Backup');
	if (localStorage['BeeZikExt_option_savePlaylistOnClose'] == 'yes')
		localStorage['BeeZikExt_backup'] = JSON.stringify(BeeZikExtData);
	else
		localStorage['BeeZikExt_backup'] = "{}";
}

//restore();
var backupInterval = setInterval(backup, 10000);
