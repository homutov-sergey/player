const buttons = document.querySelectorAll('.button');
const wrapperPlayer = document.querySelector('.player-container');

// const url = document.querySelector("#url");

const getUrl = document.querySelector("#get-url");

// console.log(getUrl);

getUrl.addEventListener("click", () => {
    const url = document.querySelector("#url");
    if (url) {
        let iframeUrl = url.value;
        
        fetch(iframeUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Ошибка сети: ' + response.status);
            }
            return response.text(); 
          })
          .then(html => {
            let fileMatch = html.match(/file\s*:\s*"([^"]+)"/);
            if (fileMatch && fileMatch[1]) {
      
            //   console.log("URL видео:", fileMatch[1]);
      
      
              var video = document.getElementById('video');
              var videoSrc = fileMatch[1];
            
              if (Hls.isSupported()) {
                var hls = new Hls();
                hls.loadSource(videoSrc);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, function() {
                  video.play();
                });
              }
              else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = videoSrc;
                video.addEventListener('loadedmetadata', function() {
                  video.play();
                });
              }
      
      
            } else {
              console.log("Не удалось найти URL видео.");
            }
      
          })
          .catch(error => {
            console.error('Ошибка при получении данных:', error);
          });
      } else {
        console.log("iframe не найден на странице.");
      }
})


axios.get('https://cors-anywhere.herokuapp.com/https://uakino.me/cartoon/features/22051-uyavn-druz.html')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });






// console.log(iframe.attributes);


buttons.forEach(button => {
    button.addEventListener("click", () => {
        wrapperPlayer.innerHTML = "";

        let link = button.getAttribute('data-link');

        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", link);
        iframe.setAttribute("width", "500");
        iframe.setAttribute("height", "500");

        wrapperPlayer.appendChild(iframe);
    })
});