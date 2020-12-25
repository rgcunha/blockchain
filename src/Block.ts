import * as crypto from 'crypto';

export interface ITransaction {
  sender: string;
  recipient: string;
  quantity: number;
}

interface BlockConstructorArgs {
  index: number,
  timestamp: string,
  data: ITransaction;
  precedingHash?: string;
}

export default class Block {
  private _index: number;
  private _timestamp: string;
  private _data: ITransaction;
  private _precedingHash: string;
  private _hash: string;
  private _nonce: number;

  constructor({ index, timestamp, data, precedingHash = null }: BlockConstructorArgs) {
    this._index = index;
    this._timestamp = timestamp;
    this._data = data;
    this._precedingHash = precedingHash;
    this._hash = this.computeHash();
    this._nonce = 0;
  }

  get hash() {
    return this._hash;
  }

  get index() {
    return this._index;
  }

  set hash(value: string) {
    this._hash = value;
  }

  set precedingHash(value: string) {
    this._precedingHash = value;
  }

  public computeHash(): string {
    const encrypt =
      this._index +
      this._precedingHash +
      this._timestamp +
      JSON.stringify(this._data) +
      this._nonce;

    const hash = crypto
      .createHash('sha256')
      .update(encrypt)
      .digest('hex')
    return hash.toString();
  }

  public proofOfWork(difficulty: number) {
    while(this._hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this._nonce++;
      this._hash = this.computeHash();
    }       
  }
}