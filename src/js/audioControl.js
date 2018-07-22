(function ($, root) {
    var $scope = $(document.body);
    function audioControl () {
        this.audio = new Audio();
        this.status = "pause";
    }
    audioControl.prototype = {
        //绑定监听歌曲是否播放完成事件
        bindEvent:function(){
            $(this.audio).on("ended",function(){
                $scope.find(".next-btn").trigger("click");
            }) 
        },
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
        },
        getCurTime: function () {
            var cur = this.audio.currentTime;
            // var cur = 'ssss';
            return cur;
        }
    }

    root.audioControl = audioControl;
})(window.Zepto, window.player || {})