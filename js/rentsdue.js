$(document).ready(function() {
    const setTitle = () => {
        let t_width = $("#title").width();
        const title = document.querySelector('#title');
        const text = title.textContent;
        const length = text.length;
        const width = window.innerWidth;
        const ratio = width / t_width;
        let cssfontsize = $("#title").css("font-size");
        cssfontsize = parseInt(cssfontsize.slice(0, -2));
        cssfontsize = cssfontsize * ratio;
        let size = width / length;
        const percent = 1.3;
        size = size * percent;
        size = parseInt(size);
        size = cssfontsize * 0.95;

        let value = "" + size + "px";
        $('#title').css("font-size", value);
        t_width = $("#title").width();
    }

    const setSpins = () => {
        if ($(".spin-block")[0].childElementCount / 2 >= 4) {
            $(".spin-block").clone().appendTo(".spin-up");
            $(".spin-wrap").css("height", "" + $(".spin-up > .spin-block").height() + "px");
        } else {
            $(".spin-up").css("animation-play-state", "paused");
        }
        const vw = $(window).width();
        let title = $("h1").text();
        $(".spin-left p").text(title.concat(" !!! "));
        $(".spin-left p").css("width", "fit-content");
        const pw = $(".spin-left p").width();
        const factor = pw > 0 ? vw / pw : 1;
        const n = Math.round(factor) - 1;
        let string = "";
        for (i = 0; i < n; i++) {
            string = string.concat(title.concat(" !!! "));
        }
        $(".spin p").text(string);
        $('.spin p').css("text-align-last", "justify");
        $('.spin p').css("width", "auto");

        const spins = [$(".spin-left"), $(".spin-right")];
        spins.forEach((spin) => {
            if (spin.length === 1) {
                const parent = spin[0].parentElement;
                spin.clone().addClass("spin-2").appendTo($(parent));
            }
        });
        $(".spin").css("animation-play-state", "running");
    }

    const setLinks = () => {
        $(".draggable").draggable({ containment: "window" });
        $(".row-sm").css("height", $("#hidden-gif > img")[0].height);
    }

    setTitle();
    setSpins();
    setLinks();

    $(window).resize(() => {
        setTitle();
        setSpins();
        setLinks();
    });
});

const sharePost = id => {
    $("#".concat(id)).find("#popup").toggleClass("show");
}

const toggleModal = mid => {
    $("#".concat(mid)).toggleClass("show-modal");
}

window.onclick = event => {
    const modal = $('.show-modal');
    if (modal.length > 0 && event.target.id == modal[0].id) {
        toggleModal(modal[0].id);
    }
}