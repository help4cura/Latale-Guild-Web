import { Dispatch, SetStateAction } from 'react';

interface Props {
    isSignUp: boolean;
    setIsSignUp: Dispatch<SetStateAction<boolean>>;
}

const ToggleSlider = ({ isSignUp, setIsSignUp }: Props) => {

    return (
        <div className="flex justify-center items-center mt-8">
            <div className="relative flex">
                <div className={`absolute inset-0 w-1/2 h-full rounded-md shadow-md bg-blue-100 transform transition-transform duration-300 ${isSignUp ? 'translate-x-0' : 'translate-x-full'}`}></div>
                <button
                    className={`relative z-10 w-24 h-10 rounded-md focus:outline-none ${isSignUp ? 'text-black' : 'text-gray-400'}`}
                    onClick={() => setIsSignUp(true)}
                >
                    Sign Up
                </button>
                <button
                    className={`relative z-10 w-24 h-10 rounded-md focus:outline-none ${isSignUp ? 'text-gray-400' : 'text-black'}`}
                    onClick={() => setIsSignUp(false)}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default ToggleSlider;
