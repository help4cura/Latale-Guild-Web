import React from 'react';
import { Afacad, Do_Hyeon } from 'next/font/google';

// 폰트 설정
const afacad = Afacad({
    subsets: ['latin'],
});

const do_Hyeon = Do_Hyeon({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal'],
});

interface AutoFontProps {
    text: string;
}

const AutoFont: React.FC<AutoFontProps> = ({ text }) => {
    return (
        <span>
            {Array.from(text).map((char, index) => (
                <span key={index} className={/[a-zA-Z]/.test(char) ? afacad.className : do_Hyeon.className}>
                    {char}
                </span>
            ))}
        </span>
    );
};

export default AutoFont;
