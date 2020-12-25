import Block, { ITransaction } from './Block';

export default class Blockchain {
  private chain: Block[];
  private difficulty = 5;

  constructor() {
    this.chain = [this.createInitialBlock()];     
  }

  createInitialBlock() {
    return new Block({
      index: 0,
      timestamp: new Date().toISOString(),
      data: {
        sender: "Max Mustermann",
        recipient: "Max Mustermann",
        quantity: 500,
      },
    });
  }

  getLastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data: ITransaction) {
    const lastBlock = this.getLastBlock();
    const precedingHash = lastBlock.hash;
    const index = lastBlock.index + 1;
    const timestamp = new Date().toISOString();
    const newBlock = new Block({ index, timestamp, data, precedingHash });
    
    newBlock.proofOfWork(this.difficulty);
    this.chain.push(newBlock);
  }

  isValidChain(): boolean {
    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const precedingBlock= this.chain[i-1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }

      if (currentBlock.precedingHash !== precedingBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
