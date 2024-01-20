export const uploadFile = async (file, setPreviewUrl) => {
    const myApiKey = import.meta.env.VITE_REACT_APP_API_KEY;

    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(
            'https://api.api-ninjas.com/v1/facedetect',
            {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Api-Key': myApiKey,
                },
            }
        );

        if (response.ok) {
            const result = await response.json();
            console.log('Upload successful:', result);
            // set the preview url of the uploaded image
            return result;
        } else {
            console.error('Upload failed:', response.statusText);
            throw new Error('Upload failed');
        }
    } catch (error) {
        console.error('Error during upload:', error);
        throw error;
    }
};
