let _n = 2;
let _end = false;
let _before = 0;
let _posts = {};
let _mobile;
const _url = document.URL;
const _exec = _url.match('(/search/|/tagged/)|[/|/#]$');

if (!_exec) _end = true;

const showNext = () => {
    if (!_end) {
        const now = new Date();
        const delta = now - _before;
        if (delta > 1000) {
            let posts = document.createDocumentFragment();
            for (i = 0; i < _posts.length; i++) {
                posts.appendChild(_posts[i]);
            }
            document.getElementById("posts").appendChild(posts);
            getNext();
        } else if (_end) {
            $('#load-more').css("display", "none");
            $('#the-end').css("display", "flex");
        }
        before = now;
    }
}

const getNext = () => {
    let url = _url.match('/$') && _url.slice(0, -1) || _url;
    url = url.concat("/page/").concat(_n);
    getAsync(url, (xml) => {
        let html = document.createElement('div');
        html.innerHTML = xml.trim();
        const posts = html.querySelectorAll(".post")
        if (posts.length > 0) {
            _n++;
            _posts = posts;
            $('#load-more').css("display", "flex");
        } else {
            $('#load-more').css("display", "none");
            $('#the-end').css("display", "flex");
            _end = true;
        }
    });
}

const getAsync = (url, callback) => {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

!_end && getNext();

$(function() {
    const checkDevice = () => {
        console.log(":: checkDevice()");
        const scroll = $(document).height() - $(window).height() > 0;
        let windowWidth = $(window).width();
        console.log(windowWidth);
        if (scroll) windowWidth = windowWidth + 17;
        console.log(windowWidth);
        if (windowWidth >= 675) {
            _mobile = false;
            $('#load-more').css("display", "none");
            console.log("*** DESKTOP ***");
        } else {
            _mobile = true;
            if (_exec && !_end) $('#load-more').css("display", "flex");
            console.log("*** MOBILE ***");
        }
        console.log("_mobile: " + _mobile);
    }
    checkDevice();
    console.log(":: Window Width");
    console.log($(window).width());
    $(window).scroll(() => {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() && !_mobile) {
            showNext();
        }
    });
    $(window).resize(() => {
        checkDevice();
    });
});