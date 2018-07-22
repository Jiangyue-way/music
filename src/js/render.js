//实现渲染
(function ($, root) {
    var $scope = $(document.body);;
    function renderInfo (info) {
        var html = '<div class="song-name">' + info.song + '</div>' + 
            '<div class="singer-name">' + info.singer + '</div>' +
            '<div class="album-name">' + info.album + '</div>';
        $scope.find(".song-info").html(html);
    }
    function renderImage(src) {
        var image = new Image();
        image.src = src;
        image.onload = function () {
            root.blurImg(image, $scope);
            $scope.find(".song-img img").attr("src", src);
        }
        image.src = src;
    }
    function renderIsLike (isLike) {
        if(isLike){
            $scope.find(".like-btn").addClass("liking");
        }else{
            $scope.find(".like-btn").removeClass("liking");
        }
    }

    root.render = function(da) {
        renderInfo(da);
        renderImage(da.image);
        renderIsLike(da.isLike);
    }
})(window.Zepto, window.player || (window.player = {}))
//通过window.player暴露函数
