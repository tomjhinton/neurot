const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(800, 800)
const ctx = canvas.getContext('2d')
require('dotenv').config()
var Twitter = require('twitter');
// Write "Awesome!"
// ctx.font = '30px Impact'
// ctx.rotate(0.1)
// ctx.fillText('Awesome!', 50, 100)
//
// // Draw line under text
// var text = ctx.measureText('Awesome!')
// ctx.strokeStyle = 'rgba(0,0,0,0.5)'
// ctx.beginPath()
// ctx.lineTo(50, 102)
// ctx.lineTo(50 + text.width, 102)
// ctx.stroke()


function draw2(startX, startY, len, angle) {
  var r = Math.floor((Math.random() * 256))
  var g = Math.floor((Math.random() * 256))
  var b = Math.floor((Math.random() * 256))
  var a = Math.random()
  var color = "rgba("+r+","+g+","+b+','+a+")"
  let blah = Math.floor(Math.random() * 18)
      ctx.beginPath()
      ctx.save()

      ctx.translate(startX, startY)
      ctx.rotate(angle * Math.PI/blah)
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(10, -len/2, 30, -len/2, 0, -len)
      ctx.stroke()
      ctx.strokeStyle = color
      ctx.lineWidth = Math.random()


      if(len < 5) {
        ctx.restore()
        return
      }

      draw2(0, -len, len*0.9, -14)
      draw2(0, -len, len*0.8, 15)

      ctx.restore()
}

function draw(startX, startY, len, angle) {
      var r = Math.floor((Math.random() * 256));
      var g = Math.floor((Math.random() * 256));
      var b = Math.floor((Math.random() * 256));
      var a = Math.random()
      var color = "rgba("+r+","+g+","+b+','+a+")";
            ctx.beginPath()
            ctx.save()
            ctx.strokeStyle = color
            ctx.translate(startX, startY)
            ctx.rotate(angle * Math.PI/9)
            ctx.moveTo(0, 0)
            ctx.lineTo(0, -len)
            ctx.stroke()

            if(len < 5) {
              ctx.restore()
              return
            }

            draw(0, -len, len*0.8, -15)
            draw(0, -len, len*0.8, 15)

            ctx.restore()
         }

         function draw3(startX, startY, len, angle) {
           var r = Math.floor((Math.random() * 256))
           var g = Math.floor((Math.random() * 256))
           var b = Math.floor((Math.random() * 256))
           var a = Math.random()
           var color = "rgba("+r+","+g+","+b+','+a+")"

               ctx.beginPath()
               ctx.save()

               ctx.translate(startX, startY)
               ctx.rotate(angle * Math.PI/7)
               ctx.moveTo(0, 0)
               ctx.bezierCurveTo(Math.random()*20, -len/2, 30, -len/2, 0, -len)
               ctx.stroke()
               ctx.strokeStyle = color
               ctx.lineWidth = Math.random()


               if(len < 7) {
                 ctx.restore()
                 return
               }

               draw3(0, -len, len*0.9, -14)
               draw3(0, -len, len*0.8, 15)

               ctx.restore()
         }
const arr =[ `draw2(Math.random()*90, Math.random()*50, 100, Math.random()*4)
    draw2(Math.random()*50, Math.random()*50, 150, Math.random()*4)
    draw2(Math.random()*250, Math.random()*200, 170, Math.random()*4)
    draw2(Math.random()*250, Math.random()*350, 180, Math.random()*4)`
,
    `draw(Math.random()*50, Math.random()*80, 100, Math.random()*4)
    draw(Math.random()*50, Math.random()*50, 150, Math.random()*4)
    draw(Math.random()*250, Math.random()*200, 170, Math.random()*4)
    draw(Math.random()*250, Math.random()*350, 180, Math.random()*4)`,

    `draw3(Math.random()*50, Math.random()*80, 100, Math.random()*4)
    draw3(Math.random()*50, Math.random()*50, 150, Math.random()*4)
    draw3(Math.random()*250, Math.random()*200, 170, Math.random()*4)
    draw3(Math.random()*250, Math.random()*350, 180, Math.random()*4)`]
setTimeout(function () {
  eval(arr[Math.floor(Math.random()*2)])


  var client = new Twitter({
    consumer_key: process.env.API_key,
    consumer_secret: process.env.API_secret_key,
    access_token_key: process.env.Access_token,
    access_token_secret: process.env.access_token_secret
  })


  // client.post('statuses/update', {status: 'I am a tweet'}, function(error, tweet, response) {
  //   if (!error) {
  //     console.log(tweet);
  //   }
  // });



  // client.post('media/upload', { media_data: canvas.toBuffer().toString('base64') }, function (err, data, response) {
  //
  //   // now we can reference the media and post a tweet (media will attach to the tweet)
  //   var mediaIdStr = data.media_id_string
  //   var params = { media_ids: [mediaIdStr] }
  //
  //   client.post('statuses/update', params, function (err, data, response) {
  //     console.log(data)
  //   })
  // })

  var data = canvas.toBuffer().toString('base64')

  // Make post request on media endpoint. Pass file data as media parameter
  client.post('media/upload', {media_data: data}, function(error, media, response) {

    if (!error) {

      // If successful, a media object will be returned.
      console.log(media)

      // Lets tweet it
      var status = {
        status: '',
        media_ids: media.media_id_string // Pass the media id string
      }

      client.post('statuses/update', status, function(error, tweet, response) {
        if (!error) {
          console.log(tweet);
        }
      })

    }
  })

}, 300000);
