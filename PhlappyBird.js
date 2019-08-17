var MainFactory = function() {
	// global model
	const phlappyBird = {
		metaData,
		viewObject : {
			circle : {
				// shape object
			},
			rect: {
				// shape object
				// Array <Array<Object>>
			},
		},
		userControl,
	};
	const defaultConfig = {
		// has something
	};
	let config = {};

	const main = {};

	// define canvas object
	var canvas = document.querySelector('canvas');
	// hardcode canvas dimension
	canvas.width = 600;
	canvas.height = 800;

	var c = canvas.getContext('2d');

	const processor = ProcessorFactory(phlappyBird);
	const userInput = UserInputFactory(phlappyBird);

	const renderer = RendererFactory(phlappyBird, c);

	// processor.process();
	main.config = function(userConfig) {
		// do some config
		let config = {
			...defaultConfig,
			...userConfig
		};
	};

	main.start = function () {
		while(true) {
			// a timer to track period
			processor.process(); // for example, 5t
			renderer.render();// for example, 10t
		}
	}

	return main;
}


// index.html
var myGame = MainFactory();
myGame.config({});
myGame.start();
