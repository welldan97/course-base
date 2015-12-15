Resembler = require './resembler'

through = require('through2')


module.exports = ({ misMatch, fail }) ->
  src = './src/index.html'
  dest = './tmp/pages/index.png'

  resembler = new Resembler
    shotsDir: './tmp/pages'
    imagesDir: './resemble'
    diffsDir: './tmp/diffs'

  through.obj (file, encoding, cb) ->
    resembler.checkPage file.path, (data) ->
      return cb() if data.misMatchPercentage < misMatch

      if fail
        throw "Huge Mismatch: #{file.base} #{data.misMatchPercentage}"
      else
        console.log "Huge Mismatch: #{file.base} #{data.misMatchPercentage}"
        cb()
