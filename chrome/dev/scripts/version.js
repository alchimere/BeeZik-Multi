/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */
 
 var CURRENT_VERSION = "3.99 (4 b�ta)";
 
 var myChangeLog =
	{
		tab:[
				{
					v:"3.5",
					changes:[
								"plop oui",
								"plop oui 2",
								"plop oui 3"
							]
				},
				{
					v:"3.99 (4 b�ta)",
					changes:[
								"Rajout de la page d'information sur les changements effectu�s",
								"Suppression temporaire des fonctions d'import/export, d'ajout d'album entier, de lecture et de recherche",
								"Adaptaion de l'extension � la nouvelle version du site (ajout de musique une � une seulement pour l'instant)",
								"Remaniement total du stockage et du tri des donn�es",
								"Modification de tout le code pour convenir aux nouvelles exigences de Google Chrome"
							]
				}
			]
	};
	
 
 if (localStorage['version'])
 {
	if (localStorage['version'] != CURRENT_VERSION)
	{
		localStorage['version_old'] = localStorage['version'];
		localStorage['version'] = CURRENT_VERSION;
		chrome.tabs.create({ url: chrome.extension.getURL('changelog.html') });
	}
}
else
	localStorage['version'] = CURRENT_VERSION;
	
if (!localStorage['version_old'])
	localStorage['version_old'] = CURRENT_VERSION;


function getChangeLog(old, last)
{
	var ret = [];
	var found = false;
	console.log(JSON.stringify(myChangeLog));
	console.log(myChangeLog.tab.length);
	for (var i = 0; i < myChangeLog.tab.length; i++) {
		if (myChangeLog.tab[i].v == old)
			found = true;
		if (found)
			ret.push(myChangeLog.tab[i]);
		if (myChangeLog.tab[i].v == last)
			break;
	}
	return ret;
}

function getLogNames() {
	var ret = [];
	
	console.log(myChangeLog.tab.length);
	for (var i = 0; i < myChangeLog.tab.length; i++)
		ret.push(myChangeLog.tab[i].v);
	console.log(JSON.stringify(ret));
	return ret;
}
