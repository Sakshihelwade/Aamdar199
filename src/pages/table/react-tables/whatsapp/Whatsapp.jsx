import { Card, CardContent, TextField, Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React, { useState } from 'react';

const Whatsapp = () => {
  const [uploadType, setUploadType] = useState('image'); // Default to image upload
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState('');

  const handleUploadTypeChange = (event) => {
    setUploadType(event.target.value);
    // Reset file selections when upload type changes
    setImage(null);
    setVideo(null);
    setDescription('');
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log('Image:', image);
    console.log('Video:', video);
    console.log('Description:', description);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom align="start">
            Upload Media
          </Typography>
          <hr/>
          <Typography variant="subtitle2" gutterBottom align="start">
            Please select an upload type and fill in the required fields.
          </Typography>
          <RadioGroup row value={uploadType} onChange={handleUploadTypeChange}>
            <FormControlLabel value="image" control={<Radio />} label="Image" />
            <FormControlLabel value="video" control={<Radio />} label="Video" />
            <FormControlLabel value="description" control={<Radio />} label="Description" />
          </RadioGroup>

          <form onSubmit={handleSubmit}>
            {uploadType === 'image' ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Image Upload
                </Typography>
                <TextField
                  type="file"
                  slotProps={{
                    input: {
                      accept: 'image/*',
                    },
                  }}
                  fullWidth
                  margin="normal"
                  onChange={handleImageChange}
                />
              </>
            ) : null}

            {uploadType === 'video' ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Video Upload
                </Typography>
                <TextField
                  type="file"
                  slotProps={{
                    input: {
                      accept: 'video/*',
                    },
                  }}
                  fullWidth
                  margin="normal"
                  onChange={handleVideoChange}
                />
              </>
            ) : null}

            {uploadType === 'description' ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <TextField
                  label="Enter description here..."
                  multiline
                  rows={4}
                  value={description}
                  onChange={handleDescriptionChange}
                  fullWidth
                  margin="normal"
                />
              </>
            ) : null}

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Whatsapp;
