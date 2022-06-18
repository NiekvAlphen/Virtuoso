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

    const blob = new Blob(this.uploadInput.files[0], {type: 'audio/webm'});
    const file = new File([blob], this.fileName.value, {type: 'audio/webm'});
    data.append('file', file);
    data.append('filename', this.fileName.value);

    console.log(this.uploadInput.files[0]);
    console.log(this.uploadInput)
    console.log(this.uploadInput.files)
    console.log(this.fileName.value);

    const { BlobServiceClient } = require("@azure/storage-blob");

    const connStr = "DefaultEndpointsProtocol=https;AccountName=virtuosoopslag;AccountKey=fmzulsM8DvOn0zueNvTu6sTx6AwwTvnl/PAiH9F/ILPH2BWkEIG107mLeAGxXY7mL5g1rR3FWHXy+AStoUlmWg==;EndpointSuffix=core.windows.net";

    const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

    async function main() {
      const containerClient = blobServiceClient.getContainerClient('songs');

      const content = this.uploadInput.files;
      const blobName = this.fileName.value;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
      console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    }

    main();


    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

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
      config: config,
    }).then((response) => {
      response.json().then((body) => {
        console.log(data.fileName);
        console.log(body);
        this.setState({ audioUrl: `http://127.0.0.1:80/${body.audio_file}` });
      });
    });

    /*fetch('http://127.0.0.1:80/api/songs/uploadfile', {
      method: 'POST',
      body: data,
      mode: 'cors',
    }).then((response) => {
        console.log(response)
        this.setState({ content: response.body });
    });*/
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