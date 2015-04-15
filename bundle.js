var id="#qm0";
var writeback="";

function write_siteMapNode(content, depth) {
	var qmparent = false;

	writeback += ('<li>' + "\n");

	if (depth == 0) {
		qmparent = true;
	}

	if (content.siteMapNode) {
		qmparent = true;
	}

	if (qmparent) {
		writeback += ('<a class="qmparent" href="'+ content.url + '">' + content.title +'</a>' + "\n");
	} else {
		writeback += ('<a href="'+ content.url + '">' + content.title +'</a>' + "\n");
	}

	if (content.siteMapNode) {

		writeback += ('<ul>' + "\n");
		if (content.siteMapNode.length) {
			for (var j = 0; j < content.siteMapNode.length; j++) {
				write_siteMapNode(content.siteMapNode[j], depth+1);
			}	
		} else {
			write_siteMapNode(content.siteMapNode, depth+1);
		}
		writeback += ('</ul>' + "\n");
	}

	writeback += ('</li>' + "\n");
}

function dyn_write(xml) {
	var container = $(id);
	for (var i = 0; i < xml.siteMapNode.length; i++) {
		write_siteMapNode(xml.siteMapNode[i], 0);
	}
	container.append(writeback);
}

function dyn_menu_create(base_url) {

	var content;

	callback = function(response) {

		content = $.xml2json(response);
		
		dyn_write(content);

		//idk, this is some crap.
		qm_create(0,false,0,250,false,false,false,false,false);

		//init arrows
		qm_ibcss_init();

		var total_width=$(window).width();var is_ie = 0;

		var elem_width = (total_width / content.siteMapNode.length) - 2;
		$("#qm0 a").css({"min-width":elem_width});
		if (is_ie == 1) {
			$("#qm0 a").css({"width":elem_width});
			$("#kvs_logo").css({"top":"12.5%"});
		}
		$("#qm0").css({"paddingLeft":"7px"});

	};


	return $.ajax(base_url, {
		dataType: "xml",
		type: "get"
	}).success(function(response) {
		return callback(response);
	});





}

