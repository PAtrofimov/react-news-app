import React from 'react'
import { News } from './components/News'
import { Add } from './components/Add'
import './App.css'

class App extends React.Component {
  state = {
    news: null,
    isLoading: false,
    error: '',
  }

  static getDerivedStateFromProps(props, state) {
    let filteredNews

    if (Array.isArray(state.news)) {
      filteredNews = [...state.news]

      filteredNews.forEach(item => {
        if (item.bigText.toLowerCase().indexOf('pubg') !== -1) {
          item.bigText = 'SPAM'
        }
      })
      return { news: filteredNews }
    }
    return null
  }

  handleAddNews = data => {
    if ([...this.state.news].find(item => data.bigText === item.bigText)) {
      this.setState({ error: 'This is not unique new!' })
      return
    }

    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews, error: '' })
  }

  handleRemoveNews = id => {
    const nextNews = [...this.state.news].filter(news => news.id !== id)
    this.setState({ news: nextNews, error: '' })
  }

  handleSaveNews = (bigText, text, id) => {
    const news = [...this.state.news]
    const oneNew = news.find(news => news.id === +id)
    oneNew.bigText = bigText
    oneNew.text = text
    this.setState({ news, error: '' })
  }

  handleLikeNews = id => {
    const news = [...this.state.news]
    const oneNew = news.find(news => news.id === +id)
    oneNew.rating++
    if (oneNew.rating > 5) {
      oneNew.rating = 0
    }
    this.setState({ news, error: '' })
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    fetch(process.env.PUBLIC_URL + '/data/newsData.json')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setTimeout(() => {
          this.setState({ isLoading: false, news: data, error: '' })
        }, 3000)
      })
  }

  render() {
    const { news, isLoading, error } = this.state
    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <div className="news__wrapper">
          <h3>Новости</h3>
          {isLoading && <p>Загружаю...</p>}
          {error && <p className="error">{error}</p>}
          {Array.isArray(news) && (
            <News
              data={news}
              onRemoveNews={this.handleRemoveNews}
              onSaveNews={this.handleSaveNews}
              onLikeNews={this.handleLikeNews}
            />
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default App
