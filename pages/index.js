import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import Player from '../components/Player';
export default function Home() {
  const tracks = [
    { title: 'Track 1', url: 'https://res.cloudinary.com/dwq30zq8e/video/upload/v1637534672/Nujubes/Nujabes_-_Winter_Lane_Remix_y1cnlf.mp3' },
    { title: 'Track 2', url: 'https://res.cloudinary.com/dwq30zq8e/video/upload/v1634414042/musica/Nas_Is_Like_-_Phoniks_Remix_on6wdz.mp3' },
    { title: 'Track 3', url: 'https://res.cloudinary.com/dwq30zq8e/video/upload/v1635017502/musica/9th_Wonder_-_Make_Your_Move_Remix_Instrumental_q1trpk.mp3' },
  ]

  const handleTimeUpdate = (currentTime) => {
    console.log('Current time:', currentTime);
  }


  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
        <Player 
        onReady={handleTimeUpdate}
        onPlay={handleTimeUpdate}
        onPause={handleTimeUpdate}
        onEnded={handleTimeUpdate}
        onSeek={handleTimeUpdate}
        onSeeked={handleTimeUpdate}
        onVolumeChange={handleTimeUpdate}
        onTimeUpdate={handleTimeUpdate}
        
         />
        </Col>
        <Col xs={6} md={4}>
        
        <Image src="/images/cassette.jpg" alt="cassette1" width={300} height={200} />
        <Image src="/images/cassette2.jpg" alt="cassette1" width={300} height={200} />

        </Col>
      </Row>

    </Container>
  );
}
