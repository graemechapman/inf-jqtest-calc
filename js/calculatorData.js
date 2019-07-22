/* use strict */

const OPERATIONS = [ 'x', '/', '+', '-', '=' ];

export default class CalculatorData extends Array {
    #operations = [
        ['x', (a, b) => a * b],
        ['/', (a, b) => a / b],
        ['+', (a, b) => a + b],
        ['-', (a, b) => a - b]
    ];

    push(item) {
        if (this.length === 0 && OPERATIONS.includes(item)) {
            Array.prototype.push.apply(this, [this.length ? this[0] : '0']);
        }

        const [ previousValue = '' ] = this.slice(-1);

        if (OPERATIONS.includes(previousValue) && OPERATIONS.includes(item)) {
            return this.splice(-1, 1, item);
        }

        if (OPERATIONS.includes(previousValue) || OPERATIONS.includes(item)) {
            return Array.prototype.push.apply(this, [item]);
        }

        this.splice(-1);

        Array.prototype.push.apply(this, [`${previousValue}${item}`]);
    };

    toString() {
        return this.join(' ');
    }

    total() {
        let i;
        const values = [ ...this ];

        this.#operations.forEach(
            ([k, fn]) => {
                while ((i = values.indexOf(k)) > -1) {
                    values.splice(i-1, 3, fn(parseInt(values[i-1]), parseInt(values[i+1])));
                }
            }
        );

        return values[0];
    }
}