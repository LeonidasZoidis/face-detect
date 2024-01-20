import './FaceDetect.css';

export const FaceDetect = () => {
    const myApiKey = import.meta.env.VITE_REACT_APP_API_KEY;
    return (
        <>
            <h1>Face detect component</h1>
            {console.log(myApiKey)}
        </>
    );
};
