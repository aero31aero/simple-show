var argv = require('minimist')(process.argv.slice(2));
if(!(argv.i&&argv.o)){
	console.log("Provide input and output file.");
	process.exit(1);
}

var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

// var parsePath = require('parse-filepath');
var fs = require('fs');
fs.readFile(argv.i, 'utf8', function(err, sourcefile){
	if(err){
		return console.log(err);
	}
	var mdslides = sourcefile.split('---');
	var htmlslides = [];
	mdslides.forEach(function(elem,index){
		console.log("Processing Slide:",index+1);
		htmlslides.push("<div class='slide'>" + marked(elem) + "</div>");
	})
	var html = "";
	htmlslides.forEach(function(elem,index){
		html+=elem;
		// console.log(elem)
		console.log("Adding Slide:",index+1);
	})
	console.log(html)
	fs.readFile('src/sample.html','utf8',function(err, samplehtml){
		if(err){
			return console.log(err);
		}
		// console.log(samplehtml)
		finalhtml = samplehtml.replace("<%=slides%>",html);
		fs.writeFile( argv.o, finalhtml, function(err){
			if(err){
				return console.log(err);
			}
		});
	});

});