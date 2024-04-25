import React, { useState, useEffect, useRef, useCallback } from 'react';

const colors = ['#ff0000', '#ffff00', '#ff00ff', '#00ff00', '#00ffff', '#0000ff'];

const randomRange = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
}

const addAnimation = (animationName: string, duration: number, delay: number) => {
    const xStart = randomRange(0, 0); // 시작 위치를 화면 전체 너비에 걸쳐 무작위로 설정
    const xEnd = xStart + randomRange(-80, 80);
    const rotationStart = Math.floor(randomRange(0, 360));
    const rotationEnd = rotationStart + 360;

    const styleSheet = document.styleSheets[0];
    const keyframes =
        `@keyframes ${animationName} {` +
        `0% { transform: translateX(${xStart}vw) translateY(-100%) rotate(${rotationStart}deg); }` +
        `100% { transform: translateX(${xEnd}vw) translateY(100vh) rotate(${rotationEnd}deg); }` +
        `}`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    return `${animationName} ${duration}s linear ${delay}s infinite`;
}

type ConfettiPieceProps = {
    onExitViewport: () => void;  // 화면을 벗어날 때 호출할 함수
};

const ConfettiPiece: React.FC<ConfettiPieceProps> = React.memo(({ onExitViewport }) => {
    const [style, setStyle] = useState<React.CSSProperties>({});
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const wsize = randomRange(3, 4);
        const hsize = randomRange(8, 10);
        const x = randomRange(5, 95);
        const duration = randomRange(1.8, 12);
        const delay = randomRange(1, 3);
        const animationName = `confetti-${Math.random().toString(36).substring(2, 9)}`;

        const animation = addAnimation(animationName, duration, delay);

        const newStyle: React.CSSProperties = {
            width: `${wsize}px`,
            height: `${hsize}px`,
            backgroundColor: color,
            left: `${x}%`,
            top: `-5%`,
            position: 'absolute',
            animation: animation
        };

        setStyle(newStyle);

        const currentRef = ref.current;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const { isIntersecting, boundingClientRect, rootBounds } = entry;
                // 부모 요소의 상단을 제외하고 다른 방향으로 경계를 벗어났는지 확인
                if (!isIntersecting && rootBounds) {
                    const { bottom, left, right } = boundingClientRect;
                    const { bottom: rootBottom, left: rootLeft, right: rootRight } = rootBounds;

                    if (bottom > rootBottom || left < rootLeft || right > rootRight) {
                        console.log('Destroyed');
                        onExitViewport();
                    }
                }
            });
        }, {
            root: currentRef?.parentElement, // 부모 요소를 관찰 범위의 루트로 설정
            threshold: 0.1
        });

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [onExitViewport]);

    return <div ref={ref} style={style}></div>;
});

ConfettiPiece.displayName = 'ConfettiPiece';

export default function Confetti() {
    const [pieces, setPieces] = useState<number[]>([]);

    useEffect(() => {
        setPieces(Array.from({ length: 4 }, (_, i) => i));
    }, []);

    const handleExitViewport = useCallback((index: number) => {
        console.log('Destroyed');
        setPieces(prev => prev.filter(item => item !== index));
        addPiece();
    }, []);

    const addPiece = () => {
        const newKey = Date.now() + Math.floor(Math.random() * 100000000); // 밀리초 + 랜덤 값
        setPieces(prev => [...prev, newKey]);
    };

    return (
        <div className="z-50 absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {pieces.map(index => (
                <ConfettiPiece key={index} onExitViewport={() => handleExitViewport(index)} />
            ))}
        </div>
    );
}
