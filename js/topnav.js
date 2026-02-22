(function () {

    var ran = false;

    function runOnce(fn) {
        if (ran) return;
        ran = true;
        fn();
    }

    function onReady(fn) {
        if (document.readyState === "complete") {
            runOnce(fn);
        } else if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", function () {
                runOnce(fn);
            }, false);
            window.onload = function () {
                runOnce(fn);
            };
        } else {
            window.attachEvent("onload", function () {
                runOnce(fn);
            });
        }
    }

    onReady(function () {

        var nav = document.createElement("div");
        nav.className = "topnav";
        nav.id = "myTopnav";

        function createLink(href, text, isImg, imgSrc) {
            var a = document.createElement("a");
            a.href = href;

            if (isImg) {
                var img = document.createElement("img");
                img.src = imgSrc;
                img.className = "navlogo";
                a.appendChild(img);
            } else {
                a.appendChild(document.createTextNode(text));
            }
            return a;
        }

        nav.appendChild(createLink("https://ctrhome.github.io/", "", true, "https://ctrhome.github.io/img/logo_small.png"));
        nav.appendChild(createLink("https://ctrhome.github.io/games", "Games"));
        nav.appendChild(createLink("https://ctrhome.github.io/about", "About"));
        nav.appendChild(createLink("https://ctrhome.github.io/fan-projects", "Fan Projects"));
        nav.appendChild(createLink("https://ctrhome.github.io/play", "Play Online"));
        nav.appendChild(createLink("https://ctrhome.github.io/extras", "Extras"));

        var iconLink = document.createElement("a");
        iconLink.href = "javascript:void(0)";
        iconLink.className = "icon";

        iconLink.onclick = function () {
            if (nav.className === "topnav") {
                nav.className = "topnav responsive";
            } else {
                nav.className = "topnav";
            }
        };

        var icon = document.createElement("i");
        icon.className = "fa fa-bars";
        iconLink.appendChild(icon);
        nav.appendChild(iconLink);

        document.body.insertBefore(nav, document.body.firstChild);

            var s = document.createElement("script");
            s.src = "/js/extras.js";
            s.async = true;
            document.body.appendChild(s);

    });

})();