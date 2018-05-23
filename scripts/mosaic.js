'use strict'
let
timeout

const
mosaic = document.querySelector('.mosaic'),
random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
palette = [
  '#009688','#00BCD4','#03A9F4','#2196F3','#3F51B5',
  '#4CAF50','#607D8B','#673AB7','#795548','#8BC34A',
  '#9C27B0','#9E9E9E','#CDDC39','#E91E63','#F44336',
  '#FF5722','#FF9800','#FFC107','#FFEB3B'
],
url = 'images/',
imageList = [
  'jalapao-01.jpg',
  'jalapao-02.jpg',
  'jalapao-03.jpg',
  'jalapao-04.jpg',
  'jalapao-05.jpg',
  'jalapao-06.jpg',
  'jalapao-07.jpg',
  'jalapao-08.jpg',
  'jalapao-09.jpg',
  'jalapao-10.jpg',
  'jalapao-11.jpg',
  'jalapao-12.jpg',
  'jalapao-13.jpg',
  'jalapao-14.jpg',
  'jalapao-15.jpg',
  'jalapao-16.jpg',
  'jalapao-17.jpg',
  'jalapao-18.jpg',
  'jalapao-20.jpg',
  'jalapao-21.jpg',
  'jalapao-22.jpg',
  'jalapao-23.jpg',
  'jalapao-24.jpg',
  'jalapao-25.jpg',
  'jalapao-26.jpg',
  'jalapao-27.jpg',
  'jalapao-28.jpg',
  'jalapao-29.jpg',
  'jalapao-30.jpg',
  'jalapao-31.jpg',
  'jalapao-32.jpg',
  'jalapao-33.jpg',
  'jalapao-34.jpg',
  'jalapao-35.jpg',
  'treedbox.svg',
  'treedbox-black.svg'
],
blobUrlList = [],
divExpand = (columns, rows) => {
  const
  div = document.querySelectorAll('.mosaic div'),
  el = div[random(0, div.length - 1)],
  c = random(1, columns),
  r = random(1, rows)

  el.style.gridColumn = `span ${c}`
  el.style.gridRow = `span ${r}`

  setBgColor(el)
  setBgImage(el)

  timeout = setTimeout(() => {
    divExpand(columns, rows)
  }, random(1000, 5000))
},
setBgColor = e => {
  e.style.backgroundColor = palette[random(0, palette.length - 1)]
},
setBgImage = e => {
  e.style.backgroundImage = `url('${blobUrlList[random(0, blobUrlList.length - 1)]}')`
},
mosaicBuild = () => {
  const
  num = random(20, 200),
  gridBorder = 8,
  w = mosaic.offsetWidth - gridBorder,
  h = mosaic.offsetHeight - gridBorder,
  divColumns = Math.round(w / num),
  divRows = Math.round(h / num),
  divWidth = w / num,
  divHeight = h / num

  mosaic.innerHTML = ''
  for (var i = 0; i < divColumns * divRows; i++) {
    const
    div = document.createElement('div')
    mosaic.appendChild(div)
  }
  // grid-template-columns: repeat(10, 1fr);
  mosaic.style.gridTemplateColumns = `repeat(${divColumns}, 1fr)`
  // grid-template-rows: repeat(10, 1fr);
  mosaic.style.gridTemplateRows = `repeat(${divRows}, 1fr)`
  setBgImage(mosaic)
  divExpand(divColumns, divRows)
},
getImage = () => {
  //set backgroundColor before the fetch of all images
  setBgColor(mosaic)

  //sort array before fetch to get different images at first time
  imageList.sort((a, b) => random(-1, 1)).forEach((e, i) => {
    fetch(url + e)
    .then(response => response.blob())
    .then(data => {
      const
      blobUrl = URL.createObjectURL(data)
      blobUrlList.push(blobUrl)
      if (i === 0) mosaicBuild(100)
    }).catch(error => console.log('ERROR:', error.message))
  })
}

getImage()

addEventListener('resize', () => {
  clearTimeout(timeout)
  mosaicBuild()
})
