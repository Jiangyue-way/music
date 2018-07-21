(function ($, root) {
    function audioControl () {
        this.audio = new Audio();
        this.status = "pause";
    }
    audioControl.prototype = {
        play: function() {
            this.audio.play();
            this.status = "play";
        },
        pause: function () {
            this.audio.pause();
            this.status = "pause";
        },
        playTo: function (time) {
            this.audio.currentTime = time;
            this.play();
        },
        getAudio: function  (src) {
            this.audio.src = src;
            this.audio.load();
        }

    }

    root.audioControl = audioControl;
})(window.Zepto, window.player || {})