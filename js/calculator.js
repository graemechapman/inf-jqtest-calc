/* use strict */

import CalculatorData from './calculatorData.js';

export default class Calculator {
    buffer = new CalculatorData();
    memory = new CalculatorData();

    constructor(container) {
        Object.assign(this, { container });

        this._output = container.querySelector('#output');
    }


    set output(value) {
        if (value.toString() === 'NaN') {
            value = 'E';
        }

        this._output.value = value;
    }

    get output() {
        const { value } = this._output;

        if (value === 'E') {
            return '0';
        }

        return value;
    }

    run() {
        this.container.querySelectorAll('.bttn').forEach(
            (element) => {
                if (element.dataset.hasOwnProperty('value')) {
                    element.addEventListener('click', this.onClick.bind(this));
                }
                if (element.dataset.hasOwnProperty('memory')) {
                    element.addEventListener('click', this.onMemoryClick.bind(this));
                }
            }
        );
    }

    onClick({ target: { dataset: { value } } }) {
        const [ previousValue = '' ] = this.buffer.slice(-1);

        if (previousValue === '=') {
            this.buffer = new CalculatorData();
        }

        this.buffer.push(value);

        if (value === '=') {
            return this.output = this.buffer.total();
        }

        if (value === 'C') {
            this.buffer = new CalculatorData();
        }

        this.output = this.buffer;
    };

    onMemoryClick({ target: { dataset: { memory: operator } } }) {
        if (operator === '=') {
            this.buffer = new CalculatorData();
            this.output = this.memory.total();

            return this.memory = new CalculatorData();
        }

        this.memory.push(operator);
        this.memory.push(this.buffer.total());

        if (operator === 'C') {
            this.memory = new CalculatorData();
        }
    };
}