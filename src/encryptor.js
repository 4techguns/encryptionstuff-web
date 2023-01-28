import seedrandom from 'seedrandom'

export default class Encryptor {
    _key
    _identifier = 987

    constructor(key) {
        this._key = this.stringToNumber(key)
    }

    characterCodes(input) {
        return [...input].map((val, idx) => val.charCodeAt(0))
    }

    stringToNumber(input) {
        const charCodes = this.characterCodes(input)
        const sum = charCodes.reduce((a, b) => a + b)

        return sum
    }

    encrypt(input) {
        const characterCodes = this.characterCodes(input);
        const transformed = characterCodes.map((val) => val + this._key)

        const randomTransformed = transformed.map((val, idx) => {
            const prng = seedrandom(this._key + (idx * 12) + 12)

            return val + Math.round((prng() * 100) - 50)
        })

        randomTransformed.splice(2, 0, this._identifier);

        return randomTransformed.join(' ')
    }

    decrypt(input) {
        const theNumbersWhatAreTheySaying = input.split(' ').map((val) => parseInt(val))
        theNumbersWhatAreTheySaying.splice(2, 1); // index 2
        const stage1 = theNumbersWhatAreTheySaying.map((val) => val - this._key)

        const stage2 = stage1.map((val, idx) => {
            const prng = seedrandom(this._key + (idx * 12) + 12)

            return String.fromCharCode(val - Math.round((prng() * 100) - 50))
        })

        return stage2.join('')
    }
}