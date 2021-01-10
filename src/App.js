import logo from './logo.svg';
import './App.css';
import React, {useEffect} from 'react'
import ReactLivestream from 'react-livestream'
import { APIKEY } from "./ApiKey.js";
import styled from 'styled-components'

const StyledIframeWrapper = styled.div`
  position: relative;

  &:before {
    content: '';
    display: block;
    padding-bottom: calc(100% / (16 / 9));
  }
`

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

function App() {
  const [isLive, setIsLive] = React.useState(false)
  const [youtubeVideoId, setYoutubeVideoId] = React.useState("")

  useEffect(() => {
    fetchYoutubeData()
  }, [])

  function fetchYoutubeData() {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCZhGQzDF3oSP1kJk9x6fwrA&eventType=live&type=video&key=${APIKEY}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
      .then(async res => {
        const response = await res.json()
  
        console.log(response)
  
        // setYoutubeVideoId("awtmhTmK9Tk")
        if (response.items && response.items.length > 0) {
          const streamInfo = response.items[0]
          setIsLive(true)
          setYoutubeVideoId(streamInfo.id.videoId)
        }
      })
      .catch(err => {
        console.log('Error fetching data from YouTube API: ', err)
      })
  }

  function OfflineComponent() {
    return (
      <div>
        <p>I am offline now, but checkout my stream on Fridays at 5 PM EST</p>
      </div>
    )
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      {
        isLive || youtubeVideoId !== "" ? (
          <StyledIframeWrapper>
            <StyledIframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </StyledIframeWrapper>
        ) : OfflineComponent() 
      }
    </div>
  );
}

export default App;
