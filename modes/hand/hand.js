// **Acknowledgements:**

// **→**  ml5 face-mesh key points: https://editor.p5js.org/ml5/sketches/lCurUW1TT

// →ml5 hand pose documentation: https://docs.ml5js.org/#/reference/handpose?id=detect-hand-keypoints-with-the-model

// →two hand tracking youtube reference: https://youtu.be/BX8ibqq0MJU?si=7SORTEM-nYsCx6rz

// → Open AI: I used ChatGPT to help me with brainstorming, helping me with some parts of the code blocks and debugging errors.

//modes/hand/hand.js
class HandMode {
    constructor() {
        this.initialized = false;
        this.handTracking = null;
        this.initializationError = null;
        this.p5Instance = null;
    }

    async init(p) {
        if (this.initialized) return;
        
        //console.log('Initializing Hand Mode');
        try {
            this.p5Instance = p;
            this.handTracking = new HandTracking(p);
            await this.handTracking.init();
            this.initialized = true;
        } catch (error) {
            this.initializationError = error;
            console.error('Failed to initialize hand mode:', error);
            throw error;
        }
    }

    draw(p) {
        p.background(220);

        if (this.initializationError) {
            p.fill(255, 0, 0);
            p.textSize(24);
            p.textAlign(p.CENTER, p.CENTER);
            p.text('Error initializing hand tracking. Please refresh and try again.', p.width/2, p.height/2);
            return;
        }

        if (!this.initialized) {
            p.fill(0);
            p.textSize(32);
            p.textAlign(p.CENTER, p.CENTER);
            p.text('Initializing Hand Tracking...', p.width/2, p.height/2);
            return;
        }

        if (this.handTracking) {
            this.handTracking.drawHand();
        }
    }

    cleanup() {
        if (this.handTracking) {
            this.handTracking.cleanup();
        }
        this.initialized = false;
        this.initializationError = null;
    }
}