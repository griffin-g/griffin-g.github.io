import { useState } from 'react';
import '../css/Resistors.css'
import '../App.css';
import { calculateResistance } from '../utils/ResistorHelper';

function ResistorChart() {

    const [bandCount, setBandCount] = useState(4); 
    const [bandColors, setBandColors] = useState<string[]>(Array(4).fill('none'));

        const resistorColors = [
        'black', 'brown', 'red', 'orange', 'yellow', 'green',
        'blue', 'violet', 'grey', 'white', 'gold', 'silver', 'none'
    ];

    const colorDigitMap: Record<string, number> = {
        black: 0,
        brown: 1,
        red: 2,
        orange: 3,
        yellow: 4,
        green: 5,
        blue: 6,
        violet: 7,
        grey: 8,
        white: 9
    };

    const multiplierMap: Record<string, number> = {
        pink: 0.001,
        silver: 0.01,
        gold: 0.1,
        black: 1,
        brown: 10,
        red: 100,
        orange: 1000,
        yellow: 10000,
        green: 100000,
        blue: 1000000,
        violet: 10000000,
        grey: 100000000,
        white: 1000000000
    };

    const toleranceMap: Record<string, string> = {
        brown: "±1%",
        red: "±2%",
        green: "±0.5%",
        blue: "±0.25%",
        violet: "±0.1%",
        grey: "±0.05%",
        gold: "±5%",
        silver: "±10%",
        none: "±20%"
    };

    const tempCoefficientMap: Record<string, string> = {
        brown: "100ppm/K",
        red: "50ppm/K",
        orange: "15ppm/K",
        yellow: "25ppm/K",
        blue: "10ppm/K",
        violet: "5ppm/K"
    };


    const handleBandColorChange = (index: number, color: string) => {
        const updatedColors = [...bandColors];
        updatedColors[index] = color;
        setBandColors(updatedColors);
    };

    const handleBandCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const count = parseInt(e.target.value, 10);
        setBandCount(count);
        setBandColors(Array(count).fill('none'));
    };

    return (
        <div className="container mt-5">
            <h4 className="mb-3">Resistor Band Color Picker</h4>

            <div className="mb-4">
                <label className="form-label me-2">Number of Bands:</label>
                <select
                    className="form-select w-auto d-inline-block"
                    value={bandCount}
                    onChange={handleBandCountChange}
                >
                    {[3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </div>

            <div className="row g-3 mb-4">
                {Array.from({ length: bandCount }, (_, bandIndex) => (
                    <div key={bandIndex} className="col-md-3">
                        <label className="form-label">Band {bandIndex + 1}</label>
                        <select
                            className="form-select"
                            value={bandColors[bandIndex]}
                            onChange={(e) =>
                                handleBandColorChange(bandIndex, e.target.value)
                            }
                        >
                            <option value="none" disabled>
                                Select Color
                            </option>
                            {resistorColors.map((color) => (
                                <option key={color} value={color}>
                                    {color.charAt(0).toUpperCase() + color.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            
            <div className="mt-4">
                <h5>Calculated Resistance:</h5>
                <p className="fs-5">
                {calculateResistance(bandColors, bandCount, colorDigitMap, multiplierMap, toleranceMap, tempCoefficientMap)}
                </p>
            </div>
            <br /><br />
            <div className="resistor-svg-wrapper mt-4">
            <svg
                viewBox="0 0 500 100"
                preserveAspectRatio="xMidYMid meet"
                className="resistor-svg w-100 h-auto"
            >
                <rect
                x={50}
                y={30}
                rx={10}
                ry={10}
                width={400}
                height={40}
                stroke="black"
                fill="#FDF1C5"
                />

                {bandColors.map((color, index) => {
                const spacing = 400 / (bandCount + 1);
                const bandX = 50 + spacing * (index + 1) - 4;
                return (
                    <rect
                    key={index}
                    x={bandX}
                    y={30}
                    width={8}
                    height={40}
                    fill={color === 'none' ? '#ccc' : color}
                    stroke="black"
                    strokeWidth="0.5"
                    rx={2}
                    />
                );
                })}
            </svg>
            </div>


        </div>
    );
}

export default ResistorChart;
