jQuery(document).ready(function($){

	$.getJSON('/static/json/sumos.json', function(sumos){
		var $content, total_content_width, max_width_possible;
		var widths, min_width, max_width, column_count, content_width, column_width;
		var column_gutter_px = 10;

		if (
			(typeof sumos !== "object") ||
			(typeof sumos.length !== "number") ||
			(sumos.length === 0)
		){
			console.log('no sumos found..');
			return;
		}

		$content = $('body > .content:first');
		total_content_width = $content.innerWidth();
		max_width_possible = total_content_width - (2 * column_gutter_px);

		widths = sumos.map(function(sumo){
			return sumo.image_width;
		});
		widths = widths.sort(function(a,b){
			return a-b;
		});
		min_width = widths[0];
		max_width = widths[ widths.length - 1 ];
		max_width = (max_width > max_width_possible)? max_width_possible : max_width;

		column_count = Math.floor(max_width / min_width);
		content_width = total_content_width - ((column_count + 1) * column_gutter_px);
		column_width = Math.floor(content_width / column_count);

		$content
			.empty()
			.css({"width": ((total_content_width - column_gutter_px) + "px")})
		;

		$.each(sumos, function(i, sumo){
			var columns, img_width, img_height, $img, $a;
			columns = Math.floor(sumo.image_width / (column_width + column_gutter_px));
			columns = (columns === 0)? 1 : columns;
			columns = (columns > column_count)? column_count : columns;
			img_width = (columns * column_width) + ((columns - 1) * column_gutter_px);
			img_height = Math.floor((sumo.image_height / sumo.image_width) * img_width);
			$img = $('<img></img>')
				.attr('src', sumo.image_url)
				.css({"width": (img_width + "px"), "height": (img_height + "px")})
			;
			$a = $('<a></a>')
				.addClass('youtube')
				.attr('href', ('http://www.youtube.com/embed/' + sumo.video_id + '?modestbranding=1&rel=0&autoplay=1'))
				.append($img)
				.appendTo($content)
			;
		});

		// apply masonry
		$content.masonry({
			columnWidth: column_width,
			gutter: column_gutter_px,
			itemSelector: 'a.youtube'
		});

		// apply colorbox
		$content.children('a.youtube').colorbox({iframe:true, innerWidth:640, innerHeight:390});
	});

});
