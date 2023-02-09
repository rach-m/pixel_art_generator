import React, { useEffect, useRef, useState } from "react";
import "./Canvas.css";

function Canvas(props) {
    const canvasRef = useRef(null);
    const resultRef = useRef(null);
    const [pixelation, setPixelation] = useState(1);
    const [canvasState, setCanvasState] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        const newImage = new Image();
        if (props.image) {
            newImage.src = URL.createObjectURL(props.image);
            newImage.addEventListener("load", () => {
                const heightRatio = canvas.width / newImage.width;
                const widthRatio = canvas.height / newImage.height;
                const ratio = Math.min(heightRatio, widthRatio);
                const x_start = (canvas.width - newImage.width * ratio) / 2;
                const y_start = (canvas.height - newImage.height * ratio) / 2;
                const canvasWidth = newImage.width * ratio;
                const canvasHeight = newImage.height * ratio;

                context.drawImage(
                    newImage,
                    0,
                    0,
                    newImage.width,
                    newImage.height,
                    x_start,
                    y_start,
                    canvasWidth,
                    canvasHeight
                );

                const imageData = context.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                let data = imageData.data;

                setData(data);
                setCanvasState({
                    heightRatio,
                    widthRatio,
                    ratio,
                    x_start,
                    y_start,
                    canvasWidth,
                    canvasHeight,
                    canvas,
                });
            });
        }
    }, [props.image]);

    useEffect(() => {
        pixelate();
    }, [pixelation, canvasState]);

    function pixelate() {
        const resultCanvas = resultRef.current;
        const resultContext = resultCanvas.getContext("2d");

        if (canvasState && data) {
            resultCanvas.width = canvasState.canvas.width;
            resultCanvas.height = canvasState.canvas.height;
            resultCanvas.style.width = canvasState.canvasWidth * 2;
            resultCanvas.style.height = canvasState.canvasHeight * 2;
            resultContext.clearRect(
                0,
                0,
                resultCanvas.width,
                resultCanvas.height
            );
            for (let i = 0; i < resultCanvas.width; i += Number(pixelation)) {
                for (
                    let j = 0;
                    j < resultCanvas.height;
                    j += Number(pixelation)
                ) {
                    const pixelPosition = (i + j * resultCanvas.width) * 4;

                    resultContext.fillStyle =
                        "rgba(" +
                        data[pixelPosition] +
                        "," +
                        data[pixelPosition + 1] +
                        "," +
                        data[pixelPosition + 2] +
                        "," +
                        data[pixelPosition + 3] +
                        ")";

                    resultContext.fillRect(i, j, 4, 4);
                }
            }
            resultContext.mozImageSmoothingEnabled = false;
            resultContext.webkitImageSmoothingEnabled = false;
            resultContext.msImageSmoothingEnabled = false;
            resultContext.imageSmoothingEnabled = false;
        }
    }

    return (
        <div>
            <p>original</p>
            <canvas ref={canvasRef} {...props}></canvas>
            <p>pixelated</p>
            <canvas ref={resultRef} {...props}></canvas>
            <div id='slider'>
                <label htmlFor='pixels'>Pixelation:</label>
                <input
                    id='pixels'
                    name='pixels'
                    type='range'
                    max='10'
                    min='1'
                    steps='10'
                    defaultValue={1}
                    list='markers'
                    onChange={(evt) => {
                        setPixelation(evt.target.value);
                    }}
                />
                <datalist id='markers'>
                    <option value='1'></option>
                    <option value='2'></option>
                    <option value='3'></option>
                    <option value='4'></option>
                    <option value='5'></option>
                    <option value='6'></option>
                    <option value='7'></option>
                    <option value='8'></option>
                    <option value='9'></option>
                    <option value='10'></option>
                </datalist>
            </div>
        </div>
    );
}

export default Canvas;
