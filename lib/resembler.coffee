fs = require 'fs'
path  = require 'path'
resemble = require 'node-resemble-js'
phantom = require 'phantom'
SLEEP_TIME = 3000

VIEWPORT_SIZE =
  width: 1440
  height: 1024

class Resembler
  shotsDir: './pages'
  imagesDir: './images'
  diffsDir: './diffs'

  constructor: ({ @shotsDir, @imagesDir, @diffsDir }) ->

  renderPage: (src, dest, cb) ->
    phantom.create (ph) ->
      ph.createPage (page) ->
        page.set 'viewportSize', VIEWPORT_SIZE

        page.open src, ->
          page.render dest
          ph.exit()
          setTimeout cb, SLEEP_TIME

  checkPage: (page, cb) ->
    basename = path.basename page, '.html'
    @renderPage page, "#{@shotsDir}/#{basename}.png", =>
      @compare "#{@shotsDir}/#{basename}.png",
        "#{@imagesDir}/#{basename}.png",
        "#{@diffsDir}/#{basename}.png",
        cb


  compare: (first, second, diff, cb) ->
    resemble(first).compareTo(second).onComplete (data) =>
      @saveDiff diff, data, ->
        cb(data)

  saveDiff: (diffPath, data, cb) ->
    png = data.getDiffImage()
    buf = new Buffer([])
    strm = png.pack()
    strm.on 'data', (dat) ->
      buf = Buffer.concat([buf, dat])

    strm.on 'end', ->
      fs.writeFile diffPath, buf, null, (err) ->
        if err
          throw 'error writing file: ' + err
        cb()

module.exports = Resembler
