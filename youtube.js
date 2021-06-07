const YouTube = require('youtube-node')
const config = require('./youtube-config')

const youTube = new YouTube()
youTube.setKey(config.key)

function searchVideoURL(message, queryText) {
    return new Promise((resolve, reject) => {

        youTube.search(`Node js ${queryText}`, 2, (error, result) => {
            if(!error) {
                const videoIds = result.items.map((item) => item.id.videoId).filter(item => item)
                const youtubeLinks = videoIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`).join(', ')
                resolve(`${message} ${youtubeLinks}`)  
              
                
            }else { 

                reject('Não foi possível encontrar um vídeo no momento, por favor tente mais tarde')
            }
        })
    })

}

module.exports.searchVideoURL = searchVideoURL

