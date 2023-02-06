import React, { useEffect, useRef } from "react";

function Canvas(props, { image }) {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const newImage = new Image();
        if (props.image) {
            newImage.src = URL.createObjectURL(props.image);
            newImage.addEventListener("load", () => {
                context.drawImage(newImage, 5, 5);
            });
        }
    }, [props.image]);

    return <canvas ref={canvasRef} {...props}></canvas>;
}

export default Canvas;
