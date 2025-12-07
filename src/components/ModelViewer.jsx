import '@google/model-viewer';

const ModelViewerComponent = () => {
    return (
        <model-viewer
            src="/models/sample-model.glb"
            alt="A 3D model"
            auto-rotate
            camera-controls
            style={{ width: '100%', height: '400px' }}
        >
        </model-viewer>
    );
};

export default ModelViewerComponent;