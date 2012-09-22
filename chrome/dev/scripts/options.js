////////////////////////////////////////////////////////////////////////
// Document : ready
////////////////////////////////////////////////////////////////////////
jQuery(function () {
	var S_ACTIVE = '&nbsp;&nbsp;Activ&eacute;&nbsp;&nbsp;';
	var S_DESACTIVE = '&nbsp;&nbsp;Desactiv&eacute;&nbsp;&nbsp;';
	
	
	actualiser_option_del_end();
	actualiser_option_hide_cpt_FB();
	actualiser_option_import();
	actualiser_option_savePlaylistOnClose();
	localStorage['BeeZikExt_option_plageNoDRM'] = 'no';
	

	////////////////////////////////////////////////////////////////////////
	// Save list on close
	////////////////////////////////////////////////////////////////////////
	function	actualiser_option_savePlaylistOnClose()
	{
		var el = document.getElementById('bouton_option_savePlaylistOnClose');
		
		if (!el)
			return ;
		
		if (localStorage['BeeZikExt_option_savePlaylistOnClose'] == 'yes')
		{
				el.className = 'option_activee';
				el.innerHTML = S_ACTIVE;
		}
		else
		{
				el.className = 'option_desactivee';
				el.innerHTML = S_DESACTIVE;
		}
	}

	function	change_option_savePlaylistOnClose()
	{
		var		now = localStorage['BeeZikExt_option_savePlaylistOnClose'];
		
		if (now == 'yes')
			localStorage['BeeZikExt_option_savePlaylistOnClose'] = 'no';
		else
			localStorage['BeeZikExt_option_savePlaylistOnClose'] = 'yes';
		actualiser_option_savePlaylistOnClose();
	}

	jQuery("#bouton_option_savePlaylistOnClose").on('click', function() {
			change_option_savePlaylistOnClose()
		});



	////////////////////////////////////////////////////////////////////////
	// J'aime Facebook
	////////////////////////////////////////////////////////////////////////
	function	actualiser_option_hide_cpt_FB()
	{
		var el = document.getElementById('bouton_option_hide_cpt_FB');
		
		if (!el)
			return ;
		
		if (localStorage['BeeZikExt_option_hide_cpt_FB'] == 'yes')
		{
				el.className = 'option_activee';
				el.innerHTML = S_ACTIVE;
		}
		else
		{
				el.className = 'option_desactivee';
				el.innerHTML = S_DESACTIVE;
		}
	}

	function	change_option_hide_cpt_FB()
	{
		var		now = localStorage['BeeZikExt_option_hide_cpt_FB'];
		
		if (now == 'yes')
			localStorage['BeeZikExt_option_hide_cpt_FB'] = 'no';
		else
			localStorage['BeeZikExt_option_hide_cpt_FB'] = 'yes';
		actualiser_option_hide_cpt_FB();
	}
						
	jQuery("#bouton_option_hide_cpt_FB").on('click', function () {
			change_option_hide_cpt_FB();
		});




	////////////////////////////////////////////////////////////////////////
	// Action import playlist
	////////////////////////////////////////////////////////////////////////
	function	actualiser_option_import()
	{
		var		option_is_set = false;
		
		for (var i = 1; i <= 3; i++)
		{
			if (localStorage['BeeZikExt_option_import'] == ('import_b' + i))
			{
				document.getElementById('import_b' + i).className = 'option_activee';
				option_is_set = true;
			}
			else
				document.getElementById('import_b' + i).className = 'option_desactivee';
		}
		
		if (!option_is_set)
		{
			document.getElementById('import_b3').className = 'option_activee';
			localStorage['BeeZikExt_option_import'] = 'import_b3';
		}
	}

	function	change_option_import(id_bouton)
	{
		switch (id_bouton)
		{
			case 'import_b1' :
			case 'import_b2' :
			case 'import_b3' :
					localStorage['BeeZikExt_option_import'] = id_bouton;
				break;
			default :
		}
		actualiser_option_import();
	}

	jQuery("#import_b1").on('click', function () {
			change_option_import("import_b1");
		});
	jQuery("#import_b2").on('click', function () {
			change_option_import("import_b2");
		});
	jQuery("#import_b3").on('click', function () {
			change_option_import("import_b3");
		});
		



	////////////////////////////////////////////////////////////////////////
	// Suppression en fin de liste
	////////////////////////////////////////////////////////////////////////
	function	actualiser_option_del_end()
	{
		var el = document.getElementById('bouton_option_del_end');
		
		if (!el)
			return ;
		
		if (localStorage['BeeZikExt_option_del_end'] == 'yes')
		{
				el.className = 'option_activee';
				el.innerHTML = S_ACTIVE;
		}
		else
		{
				el.className = 'option_desactivee';
				el.innerHTML = S_DESACTIVE;
		}
	}

	function	change_option_del_end()
	{
		var		now = localStorage['BeeZikExt_option_del_end'];
		
		if (now == 'yes')
			localStorage['BeeZikExt_option_del_end'] = 'no';
		else
			localStorage['BeeZikExt_option_del_end'] = 'yes';
		actualiser_option_del_end();
	}

	jQuery("#bouton_option_del_end").on('click', function () {
			change_option_del_end();
		});

});
