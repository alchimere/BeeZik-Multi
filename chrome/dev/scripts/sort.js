/*
 *
 * Made by firetonton
 * firetonton@gmail.com
 *
 */

function	my_strcmp(str1, str2)
{
	if (str1 && str2)
	{
		str1 = str1.toUpperCase();
		str2 = str2.toUpperCase();
		for (var i = 0; i < str1.length && i < str2.length; i++)
			if (str1.charCodeAt(i) != str2.charCodeAt(i))
				return (str2.charCodeAt(i) - str1.charCodeAt(i));
	}
	return (0);
}

function	swap_songs(i, j)
{
	var		temp_str = localStorage['BeeZikExt_cart_' + i];

	localStorage['BeeZikExt_cart_' + i] =	localStorage['BeeZikExt_cart_' + j];
	localStorage['BeeZikExt_cart_' + j] =	temp_str;
}

/*function	quicksort(begin, end)
{
  	var pivot = (localStorage['BeeZikExt_cart_' + begin + '_artiste'] + localStorage['BeeZikExt_cart_' + begin + '_titre']).toLowerCase();
  	var left = begin;
  	var right = end;
  	
  	if (begin - end >= 0)
  		return true;
  	
  	while (left < right)
  	{
  		while ((localStorage['BeeZikExt_cart_' + left + '_artiste'] + localStorage['BeeZikExt_cart_' + left + '_titre']).toLowerCase() < pivot)
  			left++;
  		while ((localStorage['BeeZikExt_cart_' + right + '_artiste'] + localStorage['BeeZikExt_cart_' + right + '_titre']).toLowerCase() >= pivot
  				&& right != begin
  				&& right != left)
  			right--;
  		if (left < right)
			swap_songs(right, left);
  	}
  	quicksort(begin, left);
	quicksort(right + 1, end);
  	
  	return true;
}*/

function	getElement(i)
{
	var value = localStorage['BeeZikExt_cart_' + i];
	if (value != undefined)
		return (value);
	return "";
}

function	getNextIndex(i)
{
	for (var j = i; j < parseInt(localStorage['BeeZikExt_cart_id']); j++)
	{
		var value = localStorage['BeeZikExt_cart_' + j];
		if (value && value != 'none' && value != undefined)
			return j;
	}
	return 0;
}

function	getPrevIndex(i)
{
	for (var j = i; j > 0; j--)
	{
		var value = localStorage['BeeZikExt_cart_' + j];
		if (value && value != 'none' && value != undefined)
			return j;
	}
	return 0;
}

function	normalSort(begin, end)
{
	var 	i = 1;
	var		maxValue = localStorage['BeeZikExt_cart_id'];

	while (i < maxValue && i > 0)
	{
		var j = getNextIndex(i + 1);
		
		while (j < maxValue && j > 0)
		{
			if (getElement(i) > getElement(j))
				swap_songs(i, j);
			j = getNextIndex(j + 1);
		}
		i = getNextIndex(i + 1);
	}
}

function	sort_list()
{
    //return true;
	if (localStorage['BeeZikExt_playlist_size_modified'] == 0)
		return true;
	//quicksort(1, parseInt(localStorage['BeeZikExt_cart_id']) /*- 1*/);
	//quicksort(getNextIndex(1), getPrevIndex(parseInt(localStorage['BeeZikExt_cart_id'])) /*- 1*/);
	normalSort(getNextIndex(1), getPrevIndex(parseInt(localStorage['BeeZikExt_cart_id'])) /*- 1*/);
    //alert("fin tri");
	localStorage['BeeZikExt_playlist_size_modified'] = 0;
	return true;
}

