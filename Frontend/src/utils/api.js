const api = "http://localhost:3001"

/* Api Functions */

// Fetch all Articles
export const getAllArticles = () => fetch(`${api}/articles`).then(result => result.json())

// Add new Articles
export const addArticle = (article) => fetch(`${api}/articles`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(article)
}).then(result => result.json())


// Vote Article
export const voteArticle = (id) => fetch(`${api}/articles/${id}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(result => result.json())
