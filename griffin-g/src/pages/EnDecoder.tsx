import { useState } from 'react';
import '../App.css';

function EnDecoder() {
    const [inputType, setInputType] = useState('');
    const [outputType, setOutputType] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    type ConverterFunction = (input: string) => string;

    const morseMap: Record<string, string> = {
        'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..',
        'e': '.',  'f': '..-.', 'g': '--.',  'h': '....',
        'i': '..', 'j': '.---', 'k': '-.-',  'l': '.-..',
        'm': '--', 'n': '-.',   'o': '---',  'p': '.--.',
        'q': '--.-','r': '.-.', 's': '...',  't': '-',
        'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
        'y': '-.--','z': '--..', ' ': '/'
    };
    const reverseMorseMap: Record<string, string> = Object.fromEntries(
        Object.entries(morseMap).map(([char, code]) => [code, char])
    );
    {/* Input type { Output type(s) } */}
    const converters: Record<string, Record<string, ConverterFunction>> = {
        ascii: {
            base64: (str: string): string => btoa(str),
            binary: (str: string): string => str.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' '),
            hexadecimal: (str: string): string => str.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' '),
            morse: (str: string): string => str.toLowerCase().split('').map(c => morseMap[c] || '').join(' ')
        },
        base64: {
            ascii: (str: string): string => atob(str),
        },
        morse: {
            ascii: (str: string): string => str.trim().split(' ').map(code => reverseMorseMap[code] || '?').join(''),
        },
        binary: {
            ascii: (str: string): string => str.split(' ').map(binary => String.fromCharCode(parseInt(binary, 2))).join(''),
        },
        hexadecimal: {
            ascii: (str: string): string => str.replace(/\s+/g, '').match(/.{1,2}/g)?.map(hex => String.fromCharCode(parseInt(hex, 16))).join('') ?? '',
        },
    };

    function convertInput(input: string, inputType: string, outputType: string): string {
        if (inputType === outputType) return input;

        const direct = converters[inputType]?.[outputType];
        if (direct) {
            return direct(input);
        }

        const toAscii = converters[inputType]?.['ascii'];
        const fromAscii = converters['ascii']?.[outputType];
        
        if (toAscii && fromAscii) {
            try {
                const ascii = toAscii(input);
                return fromAscii(ascii);
            } catch (err) {
                return `Conversion failed: ${err}`;
            }
        }

        return `Conversion from ${inputType} to ${outputType} not supported.`;
    }

    return (
        <div className="container mt-5">
            <form className="row g-3">
                <div className="col-auto">
                    <select
                        className="form-select"
                        value={inputType}
                        onChange={(e) => setInputType(e.target.value)}
                    >
                        <option value="" disabled>Select Input Type</option>
                        <option value="ascii">ASCII</option>
                        <option value="base64">Base64</option>
                        <option value="binary">Binary</option>
                        <option value="hexadecimal">Hexadecimal</option>
                        <option value="morse">Morse</option>
                    </select>
                </div>

                <div className="col-12">
                    <textarea
                        className="form-control"
                        id="inputTextArea"
                        rows={3}
                        placeholder="Enter input here..."
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                </div>

                <div className="col-auto">
                    <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => {
                            const result = convertInput(input, inputType, outputType);
                            setOutput(result);
                        }}
                        disabled={!inputType || !outputType}
                    >
                        Convert
                    </button>
                </div>
            </form>

            <hr className="my-4" />

            <div className="mb-3">
                <select
                    className="form-select w-auto"
                    value={outputType}
                    onChange={(e) => setOutputType(e.target.value)}
                >
                    <option value="" disabled>Select Output Type</option>
                    <option value="ascii">ASCII</option>
                    <option value="base64">Base64</option>
                    <option value="binary">Binary</option>
                    <option value="hexadecimal">Hexadecimal</option>
                    <option value="morse">Morse</option>
                </select>
            </div>

            <div>
                <textarea className="form-control" id="outputTextArea" rows={4} value={output} readOnly />
                <div className="d-flex justify-content-start mt-2">                
                    <button 
                        className="btn btn-outline-warning" 
                        onClick={() => {
                            navigator.clipboard.writeText(output);
                        }}
                        disabled={!output}
                        >
                            Copy Text
                        </button>
                </div>
            </div>
                            
        </div>
    );

}

export default EnDecoder;