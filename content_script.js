let hasRemoveDidomiPopup = false;

const didomiHost = document.querySelector('#didomi-host');

if (didomiHost) {
    didomiHost.remove();
    hasRemoveDidomiPopup = true;
    if (document.body.classList.contains('didomi-popup-open')){
        document.body.classList.remove('didomi-popup-open');
    }
}

const popupDialog = hasRemoveDidomiPopup
    ? 'A didomi popup has been detected and removed'
    : 'No didomi popup detected'
;


console.log(popupDialog);

setTimeout(() => {
    const videoPlayer = document.querySelector('.jwplayer');
    if (videoPlayer){
        const videoPlayerId = videoPlayer.id.split('-');
        const videoId = videoPlayerId[videoPlayerId.length - 1].length <= 3
            ? videoPlayerId[videoPlayerId.length - 2]
            : videoPlayerId[videoPlayerId.length - 1]
        ;
        const url = "https://www.jeuxvideo.com/contenu/medias/video.php?id=" + videoId;

        fetch(url).then((response) => {
            return response.json();
        }).then((response) => {
            const videoURL = response.sources[0].file;
            const newPlayer = document.createElement('video');
            newPlayer.setAttribute('src', videoURL);
            newPlayer.setAttribute("width", "100%");
            newPlayer.setAttribute('height', "100%");
            newPlayer.setAttribute('controls', "");
            newPlayer.setAttribute('class', "jwplayer jw-reset jw-state-setup jw-stretch-uniform jw-skin-jvc");
            newPlayer.setAttribute('tabindex', 0);
            newPlayer.setAttribute('aria-label', 'Video Player');
            newPlayer.setAttribute('role', 'application');
            newPlayer.setAttribute('id', videoPlayerId);

            videoPlayer.replaceWith(newPlayer);
        })
    }
}, 500);