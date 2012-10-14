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
		if (tab[index].id == id)
			return ;
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

function panierCount() {
	var total = 0;
	for (artiste in BeeZikExtData)
		for (var i = 0; i < BeeZikExtData[artiste].length; i++)
			total += (BeeZikExtData[artiste][i].dl == 0);
	return total;
}

function backup() {
	localStorage['BeeZikExt_backup'] = JSON.stringify(BeeZikExtData);
}

var backupInterval = setInterval(backup, 10000);
