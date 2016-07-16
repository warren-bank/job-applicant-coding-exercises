jQuery(document).ready(function($){

	var letters = ["","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

	var surveys, current_servey, titles, $tables, pie_chart_size, survey_info_width, orientation, horizontal_chart_padding, horizontal_navigation_padding, horizontal_gutter;

	horizontal_chart_padding      = 82;
	horizontal_navigation_padding = 82;
	horizontal_gutter             = 10;

	var chart_current_survey = function(){
		var $table, $data_html, title;

		$table     = $tables[ current_servey ];
		$data_html = $('#data_html_'+current_servey);

		if ($data_html.hasClass('charted')){
			// nothing to do
			return true;
		}

		title = surveys[current_servey].title;
		$table.visualize({"type": "pie", "parseDirection": "x", "title": title, "width": pie_chart_size, "height": pie_chart_size}, $data_html);
		$data_html.addClass('charted');

		$.getJSON('data/get_result.json')
		.then(function(survey){
			if (!survey.success){
				return false;
			}
			survey = survey.data;

			var $survey_info = $('<div></div>')
				.addClass('survey_info')
				.addClass( (orientation==='h')? 'tablet' : 'mobile' )
				.append(
					$('<h3></h3>').text( survey.question )
				)
			;
			var $ul = $('<ul></ul>').appendTo( $survey_info );
			for (var i=0; i<survey.answers.length; i++){
				$ul.append(
					$('<li></li>')
						.append(
							$('<span></span>').addClass('answer_label').text('Answer ' + letters[ survey.answers[i].answer_id ] + ':')
						)
						.append(
							$('<span></span>').addClass('answer_label_meta').text( '(' + survey.answers[i].count + ')' )
						)
						.append(
							$('<br>')
						)
						.append(
							$('<span></span>').text( survey.answers[i].answer )
						)
				);
			}
			$survey_info.width(survey_info_width).appendTo( $data_html.parent() );
		});

	};

	var build_dom = function(){
		// http://sachinchoolur.github.io/lightGallery/docs/api.html#events

		var $win  = $(window);
		var $body = $('body');

		// determine dom element widths
		var widths = (function(){
			var window_w, min_chart_w, min_info_w, max_chart_w, spare_w;

			var add_margin = function(x){
				var y = Math.floor( x * 0.9 );
				return y;
			};

			var output_chart_w = function(chart_w){
				var info_w;

				chart_w = chart_w - horizontal_chart_padding;
				chart_w = add_margin(chart_w);
				info_w  = window_w - chart_w - horizontal_navigation_padding;

				if (info_w < min_info_w){
					orientation = 'v';
					info_w = add_margin(window_w);
				}
				else {
					orientation = 'h';
				}

				return [chart_w, info_w, window_w];
			};

			window_w    = $win.width();
			window_w    = window_w - horizontal_navigation_padding - horizontal_gutter;

			min_chart_w = 350;
			min_chart_w = min_chart_w + horizontal_chart_padding;

			min_info_w  = 400;
			max_chart_w = ( $win.height() * 0.8 );
			max_chart_w = (max_chart_w < min_chart_w)? min_chart_w : max_chart_w;

			if (window_w < min_chart_w){
				return output_chart_w(window_w);
			}
			if (window_w < (min_chart_w + min_info_w)){
				return output_chart_w(window_w);
			}
			else {
				// side by side. allocate spare width to the chart.
				spare_w = window_w - min_info_w;
				if (spare_w < max_chart_w){
					return output_chart_w(spare_w);
				}
				else {
					return output_chart_w(max_chart_w);
				}
			}
		})();
		pie_chart_size    = widths[0];
		survey_info_width = widths[1];

		// add a hidden <div>
		var $hidden = $('<div></div>').attr('id','hidden_divs').hide().appendTo($body);

		// define the gallery elements
		var gallery_elements = [];

		titles  = [];
		$tables = [];
		var i, $table;
		for (i=0; i<surveys.length; i++){
			// gallery element
			gallery_elements.push({
				"html"    : ('#data_html_'+i),
				"subHtml" : ('#data_sub_html_'+i),
				"width"   : pie_chart_size
			});

			// data-html
			// to conserve resources, we'll use the callback functions to generate one pie chart at a time
			$('<div></div>')
				.attr('id', ('data_html_'+i))
				.attr('role', 'img')
				.addClass('visualize')
				.appendTo($hidden)
			;

			// data-sub-html
			$('<div></div>')
				.attr('id', ('data_sub_html_'+i))
				.append(
					$('<h3></h3>').text( surveys[i].title )
				)
				.appendTo($hidden)
			;

			titles.push( surveys[i].title );

			$table = $('<table></table>');
			$('<tr></tr>')
				.append(
					$('<td></td>')
				)
				.append(
					$('<th></th>').attr('scope','col').text( surveys[i].title )
				)
				.appendTo($table);
			$.each(surveys[i].answers, function(j){
				$('<tr></tr>')
					.append(
						$('<th></th>').attr('scope','row').text( 'Answer ' + letters[ surveys[i].answers[j].answer_id ] )
					)
					.append(
						$('<td></td>').text( surveys[i].answers[j].count )
					)
					.appendTo($table);
			});
			$tables.push( $table );
		}

		// initialize
		// ==========
		// docs:
		//     http://sachinchoolur.github.io/lightGallery/demos/dynamic.html
		//     http://sachinchoolur.github.io/lightGallery/docs/api.html#dynamic
		// ==========
		$(document)
			.lightGallery({
				dynamic: true,
				dynamicEl: gallery_elements,
				closable: false,
				escKey: false,
				mode: 'lg-fade',
				speed: 350,
				getCaptionFromTitleOrAlt: false,
				preload: 0,
				index: current_servey,
				download: false,
				slideEndAnimatoin: false
			})
			.on('onBeforeSlide.lg', function(event, prevIndex, index){
				// notes:
				//   - prevIndex is the current slide
				//   - index will be next

				// alert("onBeforeSlide: prevIndex="+prevIndex+". index="+index);
			})
			.on('onAfterSlide.lg', function(event, prevIndex, index){
				// notes:
				//   - index is the current slide
				//   - prevIndex was last

				var post_fade = function(){
					// this serves two purposes:
					//   - 1st: For some unknown reason, the addon isn't moving the chart's DOM element into the modal popup window.
					//          I'm guessing that it isn't supposed to. It probably tries to find a <video> tag inside of it (or something).
					//          In any case, I need to move it myself.
					//   - 2nd: The chart can't be built until after the parent container is visible in the DOM.
					//          If it stays in $hidden and the charting plugin is called,
					//          the <canvas> reports its width to be zero, and all of the plugins math blows up in a spectacular way.
					$('#hidden_divs #data_html_'+current_servey).appendTo('.lg-current:first');

					chart_current_survey();

					$('#survey_titles').val(index);
				};

				if (
					   (0 === prevIndex)
					&& (0 === index)
					&& (0 === current_servey)
				){
					// loading the 1st slide
					post_fade();
				}
				else {
					$('#data_html_'+current_servey).fadeOut(350, function(){
						var $chart, $slide;
						$chart = $(this);
						$slide = $chart.parent();

						$chart.empty().removeClass('charted').appendTo( $hidden ).show();
						$slide.empty();

						current_servey = index;
						post_fade();
					});
				}

				// alert("onAfterSlide: prevIndex="+prevIndex+". index="+index);
			})
			.on('onAfterOpen.lg', function(){
				var $container, $dropdown, i;

				$container = $('#lg-counter').parent();
				$dropdown  = $('<select></select>').attr('id', 'survey_titles');

				for (i=0; i<titles.length; i++){
					$('<option></option>')
						.val(i)
						.text( titles[i] )
						.appendTo( $dropdown )
				}

				$dropdown.change(function(){
					var title_index;
					title_index = parseInt( $(this).val(), 10 );
					$(document).data('lightGallery').slide( title_index );
				});

				$dropdown.appendTo( $container );
			})
		;

	};

	var process_data = function(data){
		surveys        = data;
		current_servey = 0;

		build_dom();
	};

	var process_error = function(err_message){
		
	};

	// get survey results data
	$.getJSON('data/get_results.json')
	.then(function(surveys){
		if (surveys.success){
			process_data(surveys.data);
		}
		else {
			process_error(surveys.error);
		}
	});

});
