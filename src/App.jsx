import { UploadImage } from './assets/components/UploadImage/UploadImage';

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
                    <UploadImage></UploadImage>
                </div>
            </div>
        </>
    );
}

export default App;
