/*
 * Made by firetonton
 * firetonton@gmail.com
 */
 
 var CURRENT_VERSION = "3.99.1 (4 bêta 2)";
 
 // TODO compléter après 2.1
 
 var myChangeLog =
	{
		tab:[
				{
					v:"1.0.2",
					changes:[
								"Bug musiques avec un . dans le titre (ex: Martin Solveig : One 2.3 Four) => Fixé",
								"Restriction des accès de l'extension => OK"
							]
				},
				{
					v:"1.0.3",
					changes:[
								"Changement de couleur du badge (nombre de musiques dans la liste)",
								"Le badge indique désormais le nombre de musiques non téléchargée (clickées) de la liste",
								"Changement de la police pour utiliser la même que sur le site",
								"Réduction de la taille de la police",
								"Mise en surbrillance de la ligne sur laquelle la souris pointe",
								"Plus besoin de cliquer sur le texte, on peut désormais cliquer n'importe où sur la liste",
								"Plus besoin de désinstaller l'ancienne version pour installer celle-ci, elle va tout simplement la remplacer (sauf si vous avez la 1.0 ou 1.0.1)"
							]
				},
				{
					v:"1.1.0",
					changes:[
								"Légères modifications esthétiques",
								"Ajout de la page d'options (une seule option pour l'instant : conserver la liste à la fermeture du browser ou non)",
								"Plus de bug de tri",
								"Correction du pointeur (maintenant c'est bien la main qui s'affiche)"
							]
				},
				{
					v:"1.2.0",
					changes:[
								"Ajout de l'option 'Alerte lors de la tranche horaire sans DRM (tranche horaire personnalisable)' :",
								"+ Le badge passe du jaune au vert durant cette période",
								"+ Notification (du style MSN) lors du passage de la tranche horaire avec DRM à celle sans DRM"
							]
				},
				{
					v:"1.2.1",
					changes:[
								"Bug : impossible de désactiver l'option de notification => Fixé",
								"Ajout du no de version à côté du logo BeeZik",
								"Ajout d'un lien vers ce topic pour suivre les mises à jour"
							]
				},
				{
					v:"1.3.0",
					changes:[
								"Import/Export de playlists"
							]
				},
				{
					v:"1.4.0",
					changes:[
								"Plus possible d'ajouter 2 fois le même lien (pour diminuer les risques de doublon)",
								"Option <Masquer le compteur \"J'aime\" FaceBook>",
								"Les musiques téléchargées sont mises à la fin de la liste",
								"Champs de recherche de playlists (recherche les playlists postées sur le forum tel que décris ici : http://forum.beezik.com/forum/viewtopic.php?f=10&t=10552)"
							]
				},
				{
					v:"1.4.1",
					changes:[
								"Ajout de l'option choisir quoi faire à l'import d'un playlist : 1) Remplacer 2) Mettre à la suite 3) Demander (par défaut)"
							]
				},
				{
					v:"1.4.2",
					changes:[
								"Correction d'un bug : impossible d'ajouter les musiques contenant des guillemets (\") dans le titre"
							]
				},
				{
					v:"1.5.0",
					changes:[
								"Changement du format des playlists pour avoir le nom et le titre complet dans la playlist et éviter pleins de petits bugs (notamment les tirets)",
								"Correction d'un bug (enfin j'espère j'ai pas encore pu tester  ) si on ouvrait son navigateur à 0h01 (après minuit quoi) il ne détectait pas la plage sans drm"
							]
				},
				{
					v:"1.5.1",
					changes:[
								"Correction du bug des horaire plage DRM apparu à la V1.5.0"
							]
				},
				{
					v:"1.6.0",
					changes:[
								"L'appui sur la touche f12 lorsqu'on est sur une page du site BeeZik envoie directement sur la page de la première musique non téléchargée"
							]
				},
				{
					v:"1.6.1",
					changes:[
								"La nouvelle page ne n'ouvre pas dans un nouvel onglet mais dans l'onglet courant lors de l'appui sur F12 (il faut toutefois être sur une page du site BeeZik.com - le forum ne compte pas - )"
							]
				},
				{
					v:"1.6.2",
					changes:[
								"Ajout de l'extension au google store",
								"Mise a jour automatique"
							]
				},
				{
					v:"1.7",
					changes:[
								"Correction d'un dysfonctionnement suite au changement de format d'url de BeeZik"
							]
				},
				{
					v:"1.8",
					changes:[
								"Correction import/export de playlists qui ne fonctionnait plus",
								"Le lecteur flash en page prinicipale est de nouveau visible en conservant les '+' lors d'un changement de style de musique"
							]
				},
				{
					v:"1.9",
					changes:[
								"Correction d'un bug concernant les mp3 uniquement",
								"Ajout d'un bouton \"Télécharger le morceau suivant\" directement sur l'interface Beezik"
							]
				},
				{
					v:"1.10",
					changes:[
								"Ajout d'une option pour effacer la playlist une fois tous les téléchargements effectués",
								"Le bouton \"Télécharger le morceau suivant\" n'apparaît désormais que lorsqu'il y a des musiques à télecharger"
							]
				},
				{
					v:"2.0",
					changes:[
								"Possibilités d'ajouter un album entier d'un simple clic  !!!",
								"Le tri de la playlist se fait un peu plus rapidement (mais la popup est toujours un peu lente à s'ouvrir parfois ...)",
								"Lorsqu'un titre est trop long il n'est plus affiché entièrement mais tronqué pour avoir un visuel un chouilla plus agréable",
								"Police un peut réduite",
								"Affichage de l'artiste, du titre et du lien en infobulle au survol de la souris (toujours dans la popup)"
							]
				},
				{
					v:"2.1",
					changes:[
								"Bug : morceaux non retirés après téléchargement => Fixé",
								"Bug : \"Retirer les morceaux téléchargés ne retirait qu'un morceau maximium\" => Fixé"
							]
				},
				{
					v:"2.2",
					changes:[
								"Correction du bug cité plus haut avec chrome 15 (je ne sais pas comment ca c'est fait donc il est possible qu'il soit de retour on ne sait jamais...)",
								"Modification graphique de la popup : La barre de défilement (qui appraît à partir de 27 morceaux dans la playlist) a été modifiée"
							]
				},
				{
					v:"2.3",
					changes:[
								"Quelques modifications d'ordre graphique"
							]
				},
				{
					v:"2.4",
					changes:[
								"Retrait d'éléments de débug"
							]
				},
				{
					v:"3.0",
					changes:[
								"Design retouché",
								"Optimisation du tri de la playlist :",
								"->  ouverture de la popup plus rapide (EDIT: bon je me suis un peu planté alors le tri est plus lent mais la popup s'ouvre plus rapidement dans certains cas)",
								"->  titres dans l'ordre alphabétique (enfin !   )",
								"Mais sourtout la grande et nouvelle fonctionnalité (en cours d'implémentation) : Les \"Infos sorties\"",
								"Possibilité d'écouter les extraits de 30s proposés par BeeZik, directement dans l'extension",
								"Refonte complète du système de stockage de playlist"
							]
				},
				{
					v:"3.1",
					changes:[
								"Bug avec le bouton \"Télécharger morceau suivant => fixé\"",
								"Bug tri playlist => fixé"
							]
				},
				{
					v:"3.2",
					changes:[
								"Bug lors de l'ajout d'un ajout morceau => fixé"
							]
				},
				{
					v:"3.4",
					changes:[
								"Erreurs de capture de titre et d'artiste lors de l'ajout d'un album entier => fixé",
								"Boutton \"Retirer les morceaux téléchargés\" qui fonctionnait mal => fixé"
							]
				},
				{
					v:"3.5",
					changes:[
								"Retrait d'éléments de debug visibles"
							]
				},
				{
					v:"3.99 (4 bêta)",
					changes:[
								"Rajout de la page d'information sur les changements effectués",
								"Suppression temporaire des fonctions d'import/export, d'ajout d'album entier, de lecture et de recherche",
								"Adaptaion de l'extension à la nouvelle version du site (ajout de musique une à une seulement pour l'instant)",
								"Remaniement total du stockage et du tri des données",
								"Modification de tout le code pour convenir aux nouvelles exigences de Google Chrome"
							]
				},
				{
					v:"3.99.1 (4 bêta 2)",
					changes:[
								"Bug : cette page ne s'affichait pas => fixé",
								"Retour de la barre téléchargement suivant avec en plus l'artiste et le titre le la prochaine musique",
								"Ajout d'une icône de caddie pour l'ajout au panier <img src=\""+chrome.extension.getURL('images/caddy.gif')+"\"/></span>",
								"Retrait temporaire du bouton 'play' dans la popup"
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
{
	localStorage['version'] = CURRENT_VERSION;
	chrome.tabs.create({ url: chrome.extension.getURL('changelog.html') });
}
	
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
