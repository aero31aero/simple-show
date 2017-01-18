var argv = require('minimist')(process.argv.slice(2));
if(!(argv.i&&argv.o)){
	console.log("Provide input and output file.");
	process.exit(1);
}
