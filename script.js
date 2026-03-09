const menu = document.getElementById('courseMenu')

let player
let currentElement = null

/* -------------------------------
   Fetch YouTube title if missing
--------------------------------*/

async function fetchYouTubeTitle(embedLink) {
  try {
    const videoId = embedLink.split('/embed/')[1].split('?')[0]

    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    )

    const data = await res.json()

    return data.title
  } catch (err) {
    console.error('Error fetching title', err)
    return 'Untitled Video'
  }
}

/* -------------------------------
   Load YouTube API
--------------------------------*/

const tag = document.createElement('script')
tag.src = 'https://www.youtube.com/iframe_api'
document.body.appendChild(tag)

function onYouTubeIframeAPIReady() {
  player = new YT.Player('videoPlayer', {
    height: '500',
    width: '100%',
    videoId: '',
    events: {
      onStateChange: onPlayerStateChange,
    },
  })
}

/* -------------------------------
   Load Video
--------------------------------*/

function loadVideo(link, element) {
  const videoId = link.split('/embed/')[1].split('?')[0]

  player.loadVideoById(videoId)

  document.querySelectorAll('.video-item').forEach((v) => {
    v.classList.remove('active')
  })

  if (element) {
    element.classList.add('active')

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })

    currentElement = element
  }
}

/* -------------------------------
   Detect when video ends
--------------------------------*/

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    playNextVideoInCategory()
  }
}

/* -------------------------------
   Play next video in same category
--------------------------------*/

function playNextVideoInCategory() {
  if (!currentElement) return

  const next = currentElement.nextElementSibling

  if (next && next.classList.contains('video-item')) {
    next.click()
  }
}

/* -------------------------------
   Build Course Menu
--------------------------------*/

courses.forEach((course, index) => {
  const category = document.createElement('div')
  category.className = 'accordion-item'

  let videosHTML = ''

  course.videos.forEach((video, i) => {
    const title = video.title && video.title.trim() !== '' ? video.title : 'Loading title...'

    videosHTML += `
      <li class="list-group-item video-item"
          data-video="${video.link}"
          data-index="${i}"
          onclick="loadVideo('${video.link}', this)">
          ${i + 1}. ${title}
      </li>
    `
  })

  category.innerHTML = `

    <h2 class="accordion-header">
        <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse${index}">
            ${course.category}
        </button>
    </h2>

    <div id="collapse${index}"
         class="accordion-collapse collapse ${index === 0 ? 'show' : ''}">

        <ul class="list-group list-group-flush">
            ${videosHTML}
        </ul>

    </div>

  `

  menu.appendChild(category)

  /* -------------------------------
     Fetch titles if missing
  --------------------------------*/

  course.videos.forEach(async (video, i) => {
    if (!video.title || video.title.trim() === '') {
      const title = await fetchYouTubeTitle(video.link)

      const li = category.querySelector(`li[data-index="${i}"]`)

      if (li) {
        const index = parseInt(li.dataset.index)
        li.textContent = `${index + 1}. ${title}`
      }
    }
  })
})

window.onload = () => {
  const firstVideo = document.querySelector('.video-item')

  if (firstVideo) {
    const link = firstVideo.dataset.video
    const videoId = link.split('/embed/')[1].split('?')[0]

    player.cueVideoById(videoId)
  }
}
