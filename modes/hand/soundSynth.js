// **Acknowledgements:**

// **→**  ml5 face-mesh key points: https://editor.p5js.org/ml5/sketches/lCurUW1TT

// →ml5 hand pose documentation: https://docs.ml5js.org/#/reference/handpose?id=detect-hand-keypoints-with-the-model

// →two hand tracking youtube reference: https://youtu.be/BX8ibqq0MJU?si=7SORTEM-nYsCx6rz

// → Open AI: I used ChatGPT to help me with brainstorming, helping me with some parts of the code blocks and debugging errors.

//modes/hand/soundSynth.js
class SoundSynth {
    constructor() {
        this.synth = new Tone.PolySynth().toDestination();
        this.notes = {
            'open_palm': 'C4',
            'fist': 'D4',
            'peace': 'E4',
            'point': 'F4',
            'thumbs_up': 'G4',
            'thumbs_down': 'A4',
            'three': 'B4',
            'four': 'C5',
            'rock_on': 'D5'
        };
        this.isPlaying = false;
    }

    async init() {
        await Tone.start();
        //console.log('Audio engine initialized');
    }

    playGestureSound(gesture, handIndex) {
        if (!gesture || gesture === 'unknown') return;
        const note = this.notes[gesture];
        if (note) {
            // Adjust pitch based on which hand
            const adjustedNote = Tone.Frequency(note)
                .transpose(handIndex * 12)  // Offset second hand by an octave
                .toNote();
            this.synth.triggerAttackRelease(adjustedNote, "8n");
        }
    }
    cleanup() {
        this.synth.dispose();
    }
}