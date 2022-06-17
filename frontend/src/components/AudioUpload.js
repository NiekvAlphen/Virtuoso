import React from 'react';
import NavBar from './NavBar'

class AudioUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioUrl: '',
      content: '',
      userData: ''
    };

    this.handleUploadAudio = this.handleUploadAudio.bind(this);
    this.getUserData = this.getUserData.bind(this);

  }
  
  getUserData() {
      if (!localStorage.getItem('user')) {
                 
      }
      this.state.userData = JSON.parse(localStorage.getItem('user'))
  }

  handleUploadAudio(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    const audioBody = new FormData();
    audioBody.append('id', 2);
    audioBody.append('title', this.fileName.value);
    audioBody.append('artist', 'asdfdsf');
    audioBody.append('audio_file', this.fileName.value);
    audioBody.append('genre', 'dsagasgg');

    fetch('http://127.0.0.1:80/api/songs', {
      method: 'POST',
      body: audioBody,
      mode: 'cors',
    }).then((response) => {
      response.json().then((body) => {
        console.log(data.fileName);
        console.log(body);
        this.setState({ audioUrl: `http://127.0.0.1:80/${body.audio_file}` });
      });
    });

    fetch('http://127.0.0.1:80/api/songs/uploadfile', {
      method: 'POST',
      body: data,
      mode: 'cors',
    }).then((response) => {
        console.log(response)
        this.setState({ content: response.body });
    });
  }

  render() {
    return (
    <>
      <NavBar userData={this.state.userData} />
      <form onSubmit={this.handleUploadAudio}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        <div src={this.state.audioUrl} alt="mp3" />
      </form>
    </>
    );
  }
}

export default AudioUpload;