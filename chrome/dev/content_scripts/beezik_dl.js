/*
*	Made by firetonton
*	firetonton@gmail.com
*/

/*<!-- Liste de musiques -->*/
var playlist = '<p id="pBeeZikMulti">\
					Satisfait de l\'extension BeeZik Multi ?<br/>\
					Notez-la et laissez votre appréciation <span id="storeLink">en cliquant ici</span> !<br/>\
				</p>';
				
var ctx = jQuery('#ctx');

ctx.html(playlist);

jQuery('#pBeeZikMulti').css({
		'margin-top' : '50px',
		'text-align' : 'center',
		'font-weight' : 'bold'
		});
		
jQuery('#storeLink').css({
		'color' : 'black',
		'cursor' : 'pointer'
		});

jQuery('#storeLink').on('click', function () {
		chrome.extension.sendRequest({ func: "rateExt" });
	});
