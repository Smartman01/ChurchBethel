import logo from './logo.svg';
import './App.css';
import React, {useEffect} from 'react'
import ReactLivestream from 'react-livestream'
import { APIKEY } from "./ApiKey.js";
import styled from 'styled-components'
import { Button, Card, CardContent } from '@material-ui/core';

const StyledIframeWrapper = styled.div`
  position: relative;

  &:before {
    content: '';
    display: block;
    padding-bottom: calc(100% / (16 / 9));
  }
`

const StyledIframe = styled.iframe`
  height: 92.5%;
  width: 100%;
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
      <Card style={{maxWidth: 625}} variant="elevation">
        <CardContent>
          <p>We are offline now, but we are live on Sundays at 10 AM EST. You can also view our past streams/service on our Youtube Channel here.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <p style={{marginRight: 100}}>Bethel Baptist Church</p>
        <Button href="#churchInfo" style={{color: "white"}}>Church Info</Button>
        <Button href="#livestream" style={{color: "white"}}>Live Service</Button>
        <Button href="#offering" style={{color: "white"}}>Offerings</Button>
        <Button href="#contactInfo" style={{color: "white"}}>Contact Info</Button>
      </header>
      <div style={{height: 100}} />
      <div id="churchInfo">

      </div>
      <div id="livestream">
        {
          isLive || youtubeVideoId !== "" ? (
            <Card style={{width: "80%", height: 500}}>
              <CardContent style={{height: "100%"}}>
                <StyledIframe
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </CardContent>
            </Card>
          ) : OfflineComponent()
        }
      </div>
      <div id="offering">

      </div>
      <div id="contactInfo">

      </div>
    </div>
  );
}

export default App;
