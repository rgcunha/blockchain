import Blockchain from './Blockchain';
import { ITransaction } from './Block';

const blockchain = new Blockchain();

const transactionOne: ITransaction = {
  sender: "Iris Ljesnjanin",
  recipient: "Cosima Mielke",
  quantity: 50
}

const transactionTwo: ITransaction = {
  sender: "Vitaly Friedman",
  recipient: "Ricardo Gimenes",
  quantity: 100
}

console.log("blockchain mining in progress....");

blockchain.addBlock(transactionOne);
blockchain.addBlock(transactionTwo);

console.log(JSON.stringify(blockchain, null, 4));