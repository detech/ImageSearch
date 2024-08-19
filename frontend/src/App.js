import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [pictureFile, setPictureFile] = useState(null);
  const [description, setDescription] = useState('');
  const [fileSize, setFileSize] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', pictureFile);

    try {
      const response = await axios.post(
        'http://localhost:5000/processImage',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setFileSize(response.data.size); // Access the size property
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='App'>
      <h1>Upload Image:</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='pictureFile'>Picture File</label>
          <div>
            <input
              type='file'
              name='pictureFile'
              id='pictureFile'
              onChange={(e) => {
                setPictureFile(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <div>
            <input
              type='text'
              name='description'
              id='description'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type='submit'>Find Image File Size</button>
        </div>
      </form>
      {fileSize && (
        <div>
          <p>File Size: {fileSize} bytes</p>
        </div>
      )}
      <br />
      <h3>Colored vs Grayscale of Image</h3>
      <div>
        {pictureFile && (
          <>
            <img
              src={URL.createObjectURL(pictureFile)}
              alt={description}
              width='300px'
              className='distance'
            />
            <img
              style={{ filter: 'grayscale(100%)' }}
              src={URL.createObjectURL(pictureFile)}
              alt={description}
              width='300px'
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
