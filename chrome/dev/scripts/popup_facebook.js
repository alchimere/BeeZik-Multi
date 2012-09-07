
var faceBookLike = '<iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FBeeZik-Multi-Extension-chrome-by-firetonton%2F172461369439346&amp;layout=button_count&amp;show_faces=false&amp;width=400&amp;action=like&amp;colorscheme=light&amp;height=21"' +
			'scrolling="no"' +
			'frameborder="0"' +
			'style="border:none; overflow:hidden; width:100px; height:21px; float:right;" allowTransparency="true"></iframe>';

if (localStorage['BeeZikExt_option_hide_cpt_FB'] != 'yes')
	setTimeout(function() {
			$('cpt_FB').innerHTML = faceBookLike;
		},
		100);
