/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

function	updateTopBar(tabId)
{
	if (get_nb_song_to_dl() == 0)
		chrome.tabs.executeScript(tabId,
								  {code:"document.getElementById('BeeZikExtNext').style.visibility='hidden'"});
	else
		chrome.tabs.executeScript(tabId,
								  {code:"document.getElementById('BeeZikExtNext').style.visibility='visible'"});
}
