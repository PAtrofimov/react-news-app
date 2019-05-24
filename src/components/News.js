import { Article } from './Article'
import React from 'react'
import PropTypes from 'prop-types'

class News extends React.Component {
  renderNews = () => {
    const { data, onRemoveNews, onSaveNews, onLikeNews } = this.props
    let newsTemplate = null

    if (data.length) {
      newsTemplate = data.map(function(item) {
        return (
          <Article
            key={item.id}
            data={item}
            onRemoveNews={onRemoveNews}
            onSaveNews={onSaveNews}
            onLikeNews={onLikeNews}
          />
        )
      })
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>
    }

    return newsTemplate
  }
  render() {
    const { data } = this.props

    return (
      <div className="news">
        {this.renderNews()}
        {data.length ? (
          <strong className={'news__count'}>
            Всего новостей: {data.length}
          </strong>
        ) : null}
      </div>
    )
  }
}

News.propTypes = {
  data: PropTypes.array.isRequired,
}
export { News }
