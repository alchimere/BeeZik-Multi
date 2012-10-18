/*
 * Made by firetonton
 * firetonton@gmail.com
 */
 
 var CURRENT_VERSION = "3.99.1 (4 b�ta 2)";
 
 // TODO compl�ter apr�s 2.1
 
 var myChangeLog =
	{
		tab:[
				{
					v:"1.0.2",
					changes:[
								"Bug musiques avec un . dans le titre (ex: Martin Solveig : One 2.3 Four) => Fix�",
								"Restriction des acc�s de l'extension => OK"
							]
				},
				{
					v:"1.0.3",
					changes:[
								"Changement de couleur du badge (nombre de musiques dans la liste)",
								"Le badge indique d�sormais le nombre de musiques non t�l�charg�e (click�es) de la liste",
								"Changement de la police pour utiliser la m�me que sur le site",
								"R�duction de la taille de la police",
								"Mise en surbrillance de la ligne sur laquelle la souris pointe",
								"Plus besoin de cliquer sur le texte, on peut d�sormais cliquer n'importe o� sur la liste",
								"Plus besoin de d�sinstaller l'ancienne version pour installer celle-ci, elle va tout simplement la remplacer (sauf si vous avez la 1.0 ou 1.0.1)"
							]
				},
				{
					v:"1.1.0",
					changes:[
								"L�g�res modifications esth�tiques",
								"Ajout de la page d'options (une seule option pour l'instant : conserver la liste � la fermeture du browser ou non)",
								"Plus de bug de tri",
								"Correction du pointeur (maintenant c'est bien la main qui s'affiche)"
							]
				},
				{
					v:"1.2.0",
					changes:[
								"Ajout de l'option 'Alerte lors de la tranche horaire sans DRM (tranche horaire personnalisable)' :",
								"+ Le badge passe du jaune au vert durant cette p�riode",
								"+ Notification (du style MSN) lors du passage de la tranche horaire avec DRM � celle sans DRM"
							]
				},
				{
					v:"1.2.1",
					changes:[
								"Bug : impossible de d�sactiver l'option de notification => Fix�",
								"Ajout du no de version � c�t� du logo BeeZik",
								"Ajout d'un lien vers ce topic pour suivre les mises � jour"
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
								"Plus possible d'ajouter 2 fois le m�me lien (pour diminuer les risques de doublon)",
								"Option <Masquer le compteur \"J'aime\" FaceBook>",
								"Les musiques t�l�charg�es sont mises � la fin de la liste",
								"Champs de recherche de playlists (recherche les playlists post�es sur le forum tel que d�cris ici : http://forum.beezik.com/forum/viewtopic.php?f=10&t=10552)"
							]
				},
				{
					v:"1.4.1",
					changes:[
								"Ajout de l'option choisir quoi faire � l'import d'un playlist : 1) Remplacer 2) Mettre � la suite 3) Demander (par d�faut)"
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
								"Changement du format des playlists pour avoir le nom et le titre complet dans la playlist et �viter pleins de petits bugs (notamment les tirets)",
								"Correction d'un bug (enfin j'esp�re j'ai pas encore pu tester  ) si on ouvrait son navigateur � 0h01 (apr�s minuit quoi) il ne d�tectait pas la plage sans drm"
							]
				},
				{
					v:"1.5.1",
					changes:[
								"Correction du bug des horaire plage DRM apparu � la V1.5.0"
							]
				},
				{
					v:"1.6.0",
					changes:[
								"L'appui sur la touche f12 lorsqu'on est sur une page du site BeeZik envoie directement sur la page de la premi�re musique non t�l�charg�e"
							]
				},
				{
					v:"1.6.1",
					changes:[
								"La nouvelle page ne n'ouvre pas dans un nouvel onglet mais dans l'onglet courant lors de l'appui sur F12 (il faut toutefois �tre sur une page du site BeeZik.com - le forum ne compte pas - )"
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
								"Ajout d'un bouton \"T�l�charger le morceau suivant\" directement sur l'interface Beezik"
							]
				},
				{
					v:"1.10",
					changes:[
								"Ajout d'une option pour effacer la playlist une fois tous les t�l�chargements effectu�s",
								"Le bouton \"T�l�charger le morceau suivant\" n'appara�t d�sormais que lorsqu'il y a des musiques � t�lecharger"
							]
				},
				{
					v:"2.0",
					changes:[
								"Possibilit�s d'ajouter un album entier d'un simple clic  !!!",
								"Le tri de la playlist se fait un peu plus rapidement (mais la popup est toujours un peu lente � s'ouvrir parfois ...)",
								"Lorsqu'un titre est trop long il n'est plus affich� enti�rement mais tronqu� pour avoir un visuel un chouilla plus agr�able",
								"Police un peut r�duite",
								"Affichage de l'artiste, du titre et du lien en infobulle au survol de la souris (toujours dans la popup)"
							]
				},
				{
					v:"2.1",
					changes:[
								"Bug : morceaux non retir�s apr�s t�l�chargement => Fix�",
								"Bug : \"Retirer les morceaux t�l�charg�s ne retirait qu'un morceau maximium\" => Fix�"
							]
				},
				{
					v:"2.2",
					changes:[
								"Correction du bug cit� plus haut avec chrome 15 (je ne sais pas comment ca c'est fait donc il est possible qu'il soit de retour on ne sait jamais...)",
								"Modification graphique de la popup : La barre de d�filement (qui appra�t � partir de 27 morceaux dans la playlist) a �t� modifi�e"
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
								"Retrait d'�l�ments de d�bug"
							]
				},
				{
					v:"3.0",
					changes:[
								"Design retouch�",
								"Optimisation du tri de la playlist :",
								"->  ouverture de la popup plus rapide (EDIT: bon je me suis un peu plant� alors le tri est plus lent mais la popup s'ouvre plus rapidement dans certains cas)",
								"->  titres dans l'ordre alphab�tique (enfin !   )",
								"Mais sourtout la grande et nouvelle fonctionnalit� (en cours d'impl�mentation) : Les \"Infos sorties\"",
								"Possibilit� d'�couter les extraits de 30s propos�s par BeeZik, directement dans l'extension",
								"Refonte compl�te du syst�me de stockage de playlist"
							]
				},
				{
					v:"3.1",
					changes:[
								"Bug avec le bouton \"T�l�charger morceau suivant => fix�\"",
								"Bug tri playlist => fix�"
							]
				},
				{
					v:"3.2",
					changes:[
								"Bug lors de l'ajout d'un ajout morceau => fix�"
							]
				},
				{
					v:"3.4",
					changes:[
								"Erreurs de capture de titre et d'artiste lors de l'ajout d'un album entier => fix�",
								"Boutton \"Retirer les morceaux t�l�charg�s\" qui fonctionnait mal => fix�"
							]
				},
				{
					v:"3.5",
					changes:[
								"Retrait d'�l�ments de debug visibles"
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
				},
				{
					v:"3.99.1 (4 b�ta 2)",
					changes:[
								"Bug : cette page ne s'affichait pas => fix�",
								"Retour de la barre t�l�chargement suivant avec en plus l'artiste et le titre le la prochaine musique",
								"Ajout d'une ic�ne de caddie pour l'ajout au panier <img src=\""+chrome.extension.getURL('images/caddy.gif')+"\"/></span>",
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
