import React from 'react';
import VideoList from './videolist';
import DebouncedInput from 'components/DebouncedInput';

const KEY = 'AIzaSyBQ0inJMYo3nyDlSs5KnDtRQl86kpsRNqI';

class Youtube extends React.Component {
  constructor(props) {
    super(props);
    this.searchVideo = this.searchVideo.bind(this);
    this.state = {
      results: [],
    };
  }

  searchVideo(term) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&type=video&q=${term}&key=${KEY}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ results: data.items.map(item => ({
          id: item.id.videoId,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
        })),
      });
      });
  }

  render() {
    return (
      <div>
        <h1>Youtube</h1>
        <DebouncedInput
          autoFocus
          placeholder="Search..."
          onChange={this.searchVideo}
        />
        <VideoList results={this.state.results} />
      </div>
    );
  }
}

export default Youtube;
