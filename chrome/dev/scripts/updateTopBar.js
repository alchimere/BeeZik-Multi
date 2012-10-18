/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

function	updateTopBar(tabId)
{
	var next = getNextSongInCart();
	var text = "Panier vide";
													
	if (next)
		text = "T&eacute;l&eacute;charger le titre suivant : "+ next.title +" de "+ next.artist;
	chrome.tabs.executeScript(tabId,
							  {code:"document.getElementById('next_download_bar').innerHTML = \""+text+"\""});
}
