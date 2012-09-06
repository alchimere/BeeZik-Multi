/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

function	set_badge_text(str)
{
	chrome.browserAction.setBadgeText({text : str});
}

// ------ Script plage sans DRM -----------
var	cur_no_drm_timer;

function	setBadgeColor()
{
	if (localStorage['BeeZikExt_option_plageNoDRM'] != 'yes')
	{
		chrome.browserAction.setBadgeBackgroundColor({color : [200, 130, 0, 255]});
		return ;
	}
	
	var		date = new Date();
	// -----------
	var		date_debut = new Date();
		date_debut.setHours(localStorage['BeeZikExt_DRMfree_start_h'] % 24);
		date_debut.setMinutes(localStorage['BeeZikExt_DRMfree_start_m'] % 60);
		date_debut.setSeconds(0);
	var		time_debut = date_debut.getTime();
	// -----------
	var		date_fin = new Date();
		date_fin.setHours(localStorage['BeeZikExt_DRMfree_end_h'] % 24);
		date_fin.setMinutes(localStorage['BeeZikExt_DRMfree_end_m'] % 60);
		date_fin.setSeconds(0);
	var		time_fin = date_fin.getTime();
	
	if (time_fin <= date.getTime())
		time_fin += 24 * 3600 * 1000;
	
	if (time_fin < time_debut)
	{
		date_debut.setHours(0);
		date_debut.setMinutes(0);
		date_debut.setSeconds(0);
		time_debut = date_debut.getTime();
	}

	// Heure sans DRM
	if (time_debut <= date.getTime() && date.getTime() <= time_fin)
	{
		chrome.browserAction.setBadgeBackgroundColor({color : [130, 200, 0, 255]});
		if (time_fin - date.getTime() >= 0)
		{
			var notification_no_drm = webkitNotifications.createHTMLNotification('notif_no_drm.html');
			
			cur_no_drm_timer = setTimeout('setBadgeColor()', time_fin - date.getTime());
			document.head.innerHTML += '<script>a ' + (time_fin - date.getTime()) + '</' + 'script>';
			notification_no_drm.show();
		}
	}
	// Heure avec DRM
	else
	{
		chrome.browserAction.setBadgeBackgroundColor({color : [200, 130, 0, 255]});
		if (time_debut - date.getTime() >= 0)
		{
			cur_no_drm_timer = setTimeout('setBadgeColor()', time_debut - date.getTime());
			document.head.innerHTML += '<script>b ' + (time_debut - date.getTime()) + '</' + 'script>';
		}
	}
}
