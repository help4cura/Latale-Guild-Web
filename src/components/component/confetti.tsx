import React, { useState, useEffect } from 'react';

const colors = ['#ff0000', '#ffff00', '#ff00ff', '#00ff00', '#00ffff', '#0000ff'];

const randomRange = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
}

const ConfettiPiece: React.FC = () => {
    const [style, setStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const wsize = randomRange(3, 4);
        const hsize = randomRange(8, 10);
        const x = randomRange(0, 100);
        const y = randomRange(-100, -10);
        const rotation = randomRange(0, 360);
        const delay = randomRange(0, 5);

        const newStyle: React.CSSProperties = {
            position: 'absolute',
            width: `${wsize}px`,
            height: `${hsize}px`,
            backgroundColor: color,
            left: `${x}%`,
            top: `${y}%`,
            transform: `translateY(100vh) rotate(${rotation}deg)`,
            animation: `confetti 5s linear ${delay}s infinite`
        };

        console.log(`ConfettiPiece: color=${color}, size=${wsize}x${hsize}, position=(${x}%, ${y}%), rotation=${rotation}deg, delay=${delay}s`);
        setStyle(newStyle);
    }, []);

    return <span style={style}></span>;
};

export default function Confetti() {
    console.log('Rendering Confetti component');
    const pieces = Array.from({ length: 300 }, (_, i) => <ConfettiPiece key={i} />);
    return (
        <div className="z-300 absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {pieces}
        </div>
    );
}
