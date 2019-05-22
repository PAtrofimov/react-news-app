import React from 'react'
import { News } from './components/News'
import { Add } from './components/Add'
import './App.css'

class App extends React.Component {
  state = {
    news: null,
    isLoading: false,
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
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    fetch(process.env.PUBLIC_URL + '/data/newsData.json')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setTimeout(() => {
          this.setState({ isLoading: false, news: data })
        }, 3000)
      })
  }

  render() {
    const { news, isLoading } = this.state
    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <div className="news__wrapper">
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) && <News data={news} />}
        </div>
      </React.Fragment>
    )
  }
}

export default App
