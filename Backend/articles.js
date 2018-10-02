const clone = require('clone')

let db = {}

const defaultData = {
  '1': {
    id: '1',
    websiteUrl: 'www.amazon.com',
    vote: 1
  },
  '2': {
    id: '2',
    websiteUrl: 'www.google.com',
    vote: 2
  }
}

function getData () {
  let data = db
  if (Object.keys(data).length === 0) {
    data = db = clone(defaultData)
  }
  return data
}

function getAll() {
  return new Promise((res) => {
    const articles = getData()
    let keys = Object.keys(articles)
    res(keys.map(key => articles[key]))
  })
}

function add (article) {
  return new Promise((res) => {
    let articles = getData()

    articles[article.id] = {
      id: article.id,
      websiteUrl: article.websiteUrl,
      vote: 0
    }
    res(articles[article.id])
  })
}

function vote (id) {
  return new Promise((res) => {
    let articles = getData()
    console.log(articles)
    article = articles[id]
    article.vote = article.vote + 1
    res(article)
  })
}

module.exports = {
  getAll,
  add,
  vote
}
