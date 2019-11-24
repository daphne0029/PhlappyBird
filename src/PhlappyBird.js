var MainFactory = function() {
    // global model
    const phlappyBird = {
        metaData: {},
        viewObject : {
            bird : {
                // shape object
            },
            obstacle: {
                // shape object
                // Array <Array<Object>>
            },
        },
        userControl: {},
    };

    const main = {};

    // define canvas object
    var canvas = document.querySelector('canvas');
    // hardcode canvas dimension
    canvas.width = 1024;
    canvas.height = 720;

    var ctx = canvas.getContext('2d');

    const renderer = new RendererFactory(phlappyBird, ctx);
    const processor = new ProcessorFactory(phlappyBird);
    // const utilityFunction = new Utilities();
    const NUM_OF_WALL = 10;

    const inputConfig = {
        'uiType': 'COMPUTER',
    };
    const userInput = new UserInputFactory(phlappyBird, inputConfig);

    const processT = 20;
    const renderT = 25;

    main.loadImage = function(callback) {
        const NUM_OF_FRAMES = 4;
        let frameImage = [];

        let loaded = 0;
        let _log = {
            success: [],
            error: []
        };

        let verifier = function() {
            loaded++;

            if (loaded == NUM_OF_FRAMES) {
                console.log('All the images are loaded.');
                console.log(_log);
                callback(frameImage);
            }
        };

        const fileName= 'red-frame-';
        for (var i = 0; i < NUM_OF_FRAMES; i++) {
            let imgSrc = './assets/avatar/' + fileName + i + '.png';
            frameImage[i] = document.createElement("img");
            frameImage[i].setAttribute('id', 'avatar-frame-' + i);
            frameImage[i].setAttribute('src', imgSrc);
            frameImage[i].addEventListener('load', function() {
                _log.success.push(imgSrc);
                verifier();
            });
            frameImage[i].addEventListener('error', function() {
                _log.error.push(imgSrc);
                verifier();
            });
        }
    }

    main.start = function(frameImage) {
        let start = Date.now(); // remember start time  

        // Create Bird Object 
        const birdConfig = {
            x: 50,
            y: 50,
            dx: 0,
            dy: 1,
            ddx: 0,
            ddy: 0.5,
            avatarImage: frameImage,
        };

        phlappyBird.viewObject.bird.factory = new BirdFactory(birdConfig);

        // Create Obstable Object
        const obstacleConfig = {
            x: 720,
            y: 5,
            dx: -10,
            dy: 0
        }
        phlappyBird.viewObject.obstacle.factory = new ObstacleFactory(obstacleConfig);


        // Setup processor
        let processorTimer = setInterval(function() {
            // how much time passed from the start?
            let currTS = Date.now();
            processor.process(phlappyBird, processT);
        }, processT);

        // Setup renderer
        let rendererTimer = setInterval(function() {
            // how much time passed from the start?
            let currTS = Date.now();

            // draw the animation at the moment timePassed
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            renderer.render(phlappyBird, currTS);
        }, renderT);

        // Render App
        renderer.init(phlappyBird);
    }

    return main;
}


// index.html
var myGame = MainFactory();
// myGame.config({});
myGame.loadImage(function(frameImage) {
    myGame.start(frameImage);
});

