$(function () {
    console.log("Hello %c:)", "color:cyan;");

    // Get Spotify Now Playing from https://np.gian.sh
    $.ajax({
        method: "GET",
        url: "https://np.gian.sh",
    }).done((resp, status) => {
        if (status === "success") {
            $("#spotify-art").find("img").attr("src", resp.albumArt);
            $("#spotify-art").fadeIn('fast');

            $("#spotify-np").html("<a href='" + resp.link + "' target='_blank'>" + resp.name + "</a><br>" + resp.album + "<br>" + resp.artist);
            $("#spotify-age").html((resp.age.toFixed(2) + "s").replaceAll("0.00s", "now"))
        }
    }).fail((resp, status) => {
        let trace = JSON.stringify(resp);
        if (status === 'abort') {
            trace = "The XHR request was aborted by the browser.";
        } else {
            trace = status + ": " + resp.responseText;
        }
        console.warn("Failed to get Now Playing:", trace);
    });
});