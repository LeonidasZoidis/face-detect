import { FaceDetection } from './assets/components/UploadImage/FaceDetection';

function App() {
    return (
        <>
            <div className="app-container">
                <div className="app-wrapper">
                    <h1>Face Detect</h1>
                    <i>
                        <p>
                            upload an image consisting of faces and watch the
                            magic happen
                        </p>
                    </i>
                    <br />
                    <FaceDetection></FaceDetection>
                </div>
            </div>
        </>
    );
}

export default App;
