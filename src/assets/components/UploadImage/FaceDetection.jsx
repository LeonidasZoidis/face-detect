import React, { useState, useRef } from 'react';
import { uploadFile } from '../../util/uploadFile ';
import './FaceDetection.css';
import '../../../../public/spinner-gif.gif';

export const FaceDetection = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [spinner, setSpinner] = useState(null);
    const [numberOfFaces, setNumberOfFaces] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({
        width: 0,
        height: 0,
    });

    // reference to the canvas element
    const canvasRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        // reset numberOfFaces when a new file is selected
        setNumberOfFaces(null);

        // if file upload exists then display a preview of the selected image
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

            if (!allowedTypes.includes(file.type)) {
                alert('Please select a valid image file (JPEG, PNG, GIF).');
                event.target.value = ''; // Clear the selected file
                return;
            }
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            // Load the image to get its dimensions
            const img = new Image();
            img.onload = () => {
                setImageDimensions({ width: img.width, height: img.height });

                // set the canvas dimensions based on the image dimensions
                canvasRef.current.width = img.width;
                canvasRef.current.height = img.height;
            };
            img.src = url;
        }
    };

    // fetched data here
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedFile) {
            // display the spinner while the fetch is in progress
            setSpinner('../../../../public/spinner-gif.gif');
            try {
                // using the uploadFile function to handle the fetch and upload logic
                const data = await uploadFile(selectedFile, setPreviewUrl);
                setNumberOfFaces(`Number of faces: ${data.length}`);

                // draw circles on the canvas based on the uploaded data and image dimensions
                drawCircles(data, imageDimensions);
            } catch (error) {
                console.error('Error during upload:', error);
            } finally {
                setSpinner(null);
            }
        } else {
            alert('Please upload an image file first');
            console.log('No file selected.');
        }
    };

    const drawCircles = (data, { width, height }) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // clear previous drawings on new image upload
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw red circles based on the api data and uploaded image dimensions
        context.fillStyle = 'red';
        data.forEach((face) => {
            // scale x,y coordinates based on canvas dimensions
            const scaledX = (face.x / width) * canvas.width;
            const scaledY = (face.y / height) * canvas.height;

            context.beginPath();
            context.arc(scaledX, scaledY, 10, 0, 2 * Math.PI);
            context.fill();
        });
    };

    // clear image and faces data

    return (
        <>
            {/* page elements */}

            <form className="main-form" onSubmit={handleSubmit}>
                <label>
                    Select an image file (JPEG, PNG, GIF):
                    <input
                        type="file"
                        id="fileUpload"
                        name="fileUploadName"
                        accept="image/jpeg, image/png, image/gif"
                        onChange={handleFileChange}
                    />
                </label>
                <br />
                <button type="submit">Submit Upload</button>
            </form>
            {/* display the spinner when it's active */}
            {spinner && (
                <div className="spinner">
                    <img src={spinner} alt="Loading..." />
                </div>
            )}
            <div className="data">
                <p className="faces-found">{numberOfFaces}</p>
            </div>
            <div
                className="canvas-and-imagePreview-container"
                style={{ position: 'relative' }}
            >
                {/* canvas for drawing circles */}
                <canvas
                    ref={canvasRef}
                    width={imageDimensions.width}
                    height={imageDimensions.height}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        border: '1px solid black',
                    }}
                ></canvas>

                {/* display the preview of the uploaded image */}

                {previewUrl && (
                    <div>
                        <img
                            src={previewUrl}
                            alt="Uploaded Preview"
                            style={{ maxWidth: '100%', display: 'block' }}
                        />
                    </div>
                )}
            </div>
        </>
    );
};
