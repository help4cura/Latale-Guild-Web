import { useState, useEffect } from 'react';

const CharacterStatsPage = () => {
    const [strength1, setStrength1] = useState<string>('');
    const [variation1, setVariation1] = useState<string>('');
    const [finalStrength1, setFinalStrength1] = useState<string>('');
    const [appliedStrengthPercentage1, setAppliedStrengthPercentage1] = useState<string>('0.00');

    const [strength2, setStrength2] = useState<string>('');
    const [variation2, setVariation2] = useState<string>('');
    const [finalStrength2, setFinalStrength2] = useState<string>('');
    const [appliedStrengthPercentage2, setAppliedStrengthPercentage2] = useState<string>('0.00');

    useEffect(() => {
        if (strength1 !== '' && variation1 !== '' && finalStrength1 !== '') {
            calculateFinalStrength1();
        }
    }, [strength1, variation1, finalStrength1]);

    useEffect(() => {
        if (strength2 !== '' && variation2 !== '' && finalStrength2 !== '') {
            calculateFinalStrength2();
        }
    }, [strength2, variation2, finalStrength2]);

    const calculateFinalStrength1 = () => {
        const strengthNum = parseFloat(strength1);
        const variationNum = parseFloat(variation1);
        const finalStrengthNum = parseFloat(finalStrength1);

        if (!isNaN(strengthNum) && !isNaN(variationNum) && !isNaN(finalStrengthNum)) {
            const expectedFinalStrength = strengthNum + variationNum;
            const additionalIncrease = finalStrengthNum - expectedFinalStrength;
            const additionalIncreasePercentage = (additionalIncrease / variationNum) * 100;

            setAppliedStrengthPercentage1(additionalIncreasePercentage.toFixed(2));
        }
    };

    const calculateFinalStrength2 = () => {
        const strengthNum = parseFloat(strength2);
        const variationNum = parseFloat(variation2);
        const finalStrengthNum = parseFloat(finalStrength2);

        if (!isNaN(strengthNum) && !isNaN(variationNum) && !isNaN(finalStrengthNum)) {
            const expectedFinalStrength = strengthNum + variationNum;
            const additionalIncrease = finalStrengthNum - expectedFinalStrength;
            const additionalIncreasePercentage = (additionalIncrease / variationNum) * 100;

            setAppliedStrengthPercentage2(additionalIncreasePercentage.toFixed(2));
        }
    };

    const handleStrengthChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStrength1(e.target.value);
    };

    const handleVariationChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVariation1(e.target.value);
    };

    const handleFinalStrengthChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalStrength1(e.target.value);
    };

    const handleStrengthChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStrength2(e.target.value);
    };

    const handleVariationChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVariation2(e.target.value);
    };

    const handleFinalStrengthChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinalStrength2(e.target.value);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-center">Character Stats</h1>
            <div className="bg-white p-8 rounded-lg shadow-md w-120 max-w-6xl flex space-x-8">
                {/* Left Column */}
                <div className="w-full md:w-1/2">
                    <div className="mb-4">
                        <label className="block text-gray-700">기존 근력/마법력</label>
                        <input
                            type="number"
                            value={strength1}
                            onChange={handleStrengthChange1}
                            placeholder="0"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">변동 수치</label>
                        <input
                            type="number"
                            value={variation1}
                            onChange={handleVariationChange1}
                            placeholder="0"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">적용 근력/마법력 %</label>
                        <input
                            type="text"
                            value={appliedStrengthPercentage1}
                            readOnly
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">최종 근력/마법력</label>
                        <input
                            type="number"
                            value={finalStrength1}
                            onChange={handleFinalStrengthChange1}
                            placeholder="0"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                {/* Right Column */}
                <div className="w-full md:w-1/2">
                    <div className="mb-4">
                        <label className="block text-gray-700">기존 공격력/속성력</label>
                        <input
                            type="number"
                            value={strength2}
                            onChange={handleStrengthChange2}
                            placeholder="0"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">변동 수치</label>
                        <input
                            type="number"
                            value={variation2}
                            onChange={handleVariationChange2}
                            placeholder="0"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">적용 공격력/속성력 %</label>
                        <input
                            type="text"
                            value={appliedStrengthPercentage2}
                            readOnly
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">최종 공격력/속성력</label>
                        <input
                            type="number"
                            value={finalStrength2}
                            onChange={handleFinalStrengthChange2}
                            placeholder="0"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CharacterStatsPage;
