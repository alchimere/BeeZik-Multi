/*
*	Made by firetonton
*	firetonton@gmail.com
*/

jQuery(function () {
	//alert('plop');
	setTimeout(function () {fill_list(); fill_followed_section();}, 42);
	jQuery('zone_import_export').innerHTML = '';
	jQuery('#version').html(CURRENT_VERSION);
	
	jQuery('#contenu_info_sorties').css('display', 'none');
	jQuery('#contenu_import_export').css('display', 'none');
	jQuery('#contenu_search').css('display', 'none');
});

