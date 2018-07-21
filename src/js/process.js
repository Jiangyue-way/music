//进度条
(function ($, root) {
    var $scope = $(document.body);
    var curDuration,
        frameId,
        lastPer = 0,
        startTime;
    //处理时间
    function formatTime (duration) {
        duration = Math.round(duration);
        var minutes = Math.floor(duration / 60);
        var seconds = duration - minutes * 60;
        if(minutes < 10){
            minutes = '0' + minutes;
        }
        if(seconds < 10){
            seconds = '0' + seconds;
        }
        return minutes + ':' + seconds;
    }
    //渲染总时间
    function renderAllTime (duration) {
        lastPer = 0;
        curDuration = duration;
        var allTime = formatTime(duration);
        $scope.find(".all-time").html(allTime);
    }
    //时时更新
    function update (percent) {
        var curTime = percent * curDuration;
        curTime = formatTime(curTime);
        $scope.find(".cur-time").html(curTime);
        //渲染进度条
        var percentage = (percent - 1) * 100 + "%";
        $scope.find(".pro-top").css({
            'transform': 'translateX(' + percentage + ')'
        })
    }

    //时间和进度条的改变
    function start (per) {
        // lastPer = 0;
        lastPer = per === undefined ? lastPer : per;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame () {
            var curTime = new Date().getTime();
            var percent = lastPer + (curTime - startTime) / (curDuration * 1000);
            frameId = requestAnimationFrame(frame);
            update(percent);
        }
        frame()
    }

    function stop(){
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);
    }

    root.process = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        update: update
    }

})(window.Zepto, window.player || (window.play = {}))