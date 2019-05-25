import React from 'react'
import PropTypes from 'prop-types'

class Article extends React.Component {
  bigText = React.createRef()
  text = React.createRef()
  state = {
    visible: false,
    isEditing: false,
  }
  handleReadMoreClck = e => {
    e.preventDefault()
    this.setState({ visible: true })
  }

  handleRemoveClk = e => {
    e.preventDefault()
    this.props.onRemoveNews(+e.currentTarget.id)
  }

  handleLikeClk = e => {
    e.preventDefault()
    this.props.onLikeNews(+e.currentTarget.id)
  }

  handleCancelClk = e => {
    e.preventDefault()
    this.setState({ isEditing: false })
  }

  handleEditClk = e => {
    e.preventDefault()
    this.setState({ isEditing: true })
  }

  handleSaveClk = e => {
    const { id, value: bigText } = this.bigText.current
    const { value: text } = this.text.current
    e.preventDefault()
    this.setState({ isEditing: false })
    this.props.onSaveNews(bigText, text, id)
  }

  render() {
    const { author, text, bigText, id, rating } = this.props.data
    const { visible, isEditing } = this.state
    return (
      <div className="article">
        <p className="news__author">{author}:</p>
        <a
          onClick={this.handleLikeClk}
          href="#like"
          className="like__link"
          id={id}
        >
          Оценка: {rating}
        </a>
        {isEditing ? (
          <textarea
            className="news__text"
            defaultValue={text}
            ref={this.text}
            id={id}
          />
        ) : (
          <p className="news__text">{text}</p>
        )}
        {!visible && (
          <a
            onClick={this.handleReadMoreClck}
            href="#readmore"
            className="news__readmore"
          >
            Подробнее
          </a>
        )}
        {visible && !isEditing && (
          <React.Fragment>
            <p className="news__big-text">{bigText}</p>
            <button onClick={this.handleEditClk} className="btn">
              Редактировать
            </button>

            <button onClick={this.handleRemoveClk} className="btn" id={id}>
              Удалить
            </button>
          </React.Fragment>
        )}
        {visible && isEditing && (
          <React.Fragment>
            <textarea
              className="news__big-text"
              defaultValue={bigText}
              ref={this.bigText}
              id={id}
            />
            <button onClick={this.handleSaveClk} className="btn">
              Сохранить
            </button>
            <button onClick={this.handleCancelClk} className="btn">
              Отмена
            </button>
          </React.Fragment>
        )}
      </div>
    )
  }
}

Article.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired, // добавили id, это число, обязательно
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    bigText: PropTypes.string.isRequired,
    onRemoveNews: PropTypes.func.isRequired,
    onSaveNews: PropTypes.func.isRequired,
    onLikeNews: PropTypes.func.isRequired,
  }),
}

export { Article }
