import React, { PropTypes } from 'react'

const styles = {
  li: {
    display: 'inline',
    listStyleProperty: 'none'
  },
  thumb: {
    width: '256px'
  }
}

const VideoList = (props) => (
  <ul>
    {props.results.map(video => (
      <li style={styles.li} key={video.id}>
        <a href={video.url}><img style={styles.thumb} alt={video.title} src={video.thumbnail} /></a>
      </li>
    ))}
  </ul>
)

VideoList.propTypes = {
  results: PropTypes.array
}

export default VideoList
