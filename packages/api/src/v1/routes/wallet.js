const bip39 = require("bip39");
const { hdkey } = require("ethereumjs-wallet");
const { setCorsHeaders } = require("../../common/utils.js");
const { ResponseStatus } = require("../enums.js");
const {
  DEVELOPMENT
} = require("../../common/environment.js");
const { default: Web3 } = require("web3");
const {
  getBlockchain,
  runSidechainTransaction,
  runSidechainWalletTransaction,
  runSidechainWalletBalance
} = require("../../common/blockchain.js");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_URL,
  dialect: 'mysql',
});

async function createWalletInternal() {
  
    const userMnemonic = bip39.generateMnemonic();
    console.log("Responding with mnemonic")
    console.log(userMnemonic);
    const wallet = hdkey
      .fromMasterSeed(bip39.mnemonicToSeedSync(userMnemonic))
      .derivePath(`m/44'/60'/0'/0/0`)
      .getWallet();
    const userAddress = wallet.getAddressString();
    const privateKey = wallet.getPrivateKeyString();
    return {
      status: ResponseStatus.Success,
      userMnemonic,
      userAddress,
      privateKey,
      error: null,
    };
    /*
    return res.json({
      status: ResponseStatus.Success,
      userMnemonic,
      userAddress,
      privateKey,
      error: null,
    });
    */
  
}

// Generates a new mnemonic, private key and public address and hands the mnemonic back
async function createWallet(req, res) {
  if (DEVELOPMENT) setCorsHeaders(res);
  // try {
    const userMnemonic = bip39.generateMnemonic();
    console.log("Responding with mnemonic")
    console.log(userMnemonic);
    const wallet = hdkey
      .fromMasterSeed(bip39.mnemonicToSeedSync(userMnemonic))
      .derivePath(`m/44'/60'/0'/0/0`)
      .getWallet();
    const userAddress = wallet.getAddressString();
    const privateKey = wallet.getPrivateKeyString();

    return res.json({
      status: ResponseStatus.Success,
      userMnemonic,
      userAddress,
      privateKey,
      error: null,
    });
  // } catch (error) {
  //   return res.json({
  //     status: ResponseStatus.Error,
  //     userMnemonic: null,
  //     userAddress: null,
  //     error,
  //   });
  // }
}

async function sendTransactionUserWallet(req, res) {
  try {

    const { fromUserId, toUserId, amount } = req.body;
    let status = true;
    let error = null;

    const asyncUserWallet = async() => {
      let fromData,toData;
      try {
        fromData = await sequelize.query('SELECT userMnemonic, userAddress, userPrivateKey FROM `USER_WALLET_DATA` WHERE userId=?', {type: sequelize.QueryTypes.SELECT,replacements: [fromUserId]});
        toData = await sequelize.query('SELECT userMnemonic, userAddress, userPrivateKey FROM `USER_WALLET_DATA` WHERE userId=?', {type: sequelize.QueryTypes.SELECT,replacements: [toUserId]});

      } catch (err) {
        console.log(err);
      }
      return {"from":fromData,"to":toData};
    };
    const asyncUserWalletData = await asyncUserWallet();
    const {userMnemonic:fromUserMnemonic,userAddress:fromUserAddress,userPrivateKey:fromUserPrivateKey} = asyncUserWalletData.from[0]
    const {userMnemonic:toUserMnemonic,userAddress:toUserAddress,userPrivateKey:toUserPrivateKey} = asyncUserWalletData.to[0]
        
      try {
        const result = await runSidechainWalletTransaction(fromUserPrivateKey, fromUserAddress)(
          toUserAddress,
          amount
        );

        status = status && result.status;
      } catch (err) {
        console.warn(err.stack);
        status = false;
        error = err;
      }

      if (status) {
      return res.json({
        status: ResponseStatus.Success,
        message: "Transferred to " + toUserAddress,
        error: null,
      });
    } else {
      return res.json({
        status: ResponseStatus.Error,
        message: "Transfer request could not be fulfilled: " + status,
        error: error,
      });
    }
  } catch (error) {
    return res.json({
      status: ResponseStatus.Error,
      message: "Error sending asset",
      error: error,
    });
  }
}

async function sendTransactionWallet(req, res) {
  try {
    const { privateKey, fromUserAddress, toUserAddress, amount } = req.body;
    let status = true;
    let error = null;

    
      try {
        const result = await runSidechainWalletTransaction(privateKey, fromUserAddress)(
          toUserAddress,
          amount
        );

        status = status && result.status;
      } catch (err) {
        console.warn(err.stack);
        status = false;
        error = err;
      }

    if (status) {
      return res.json({
        status: ResponseStatus.Success,
        message: "Transferred to " + toUserAddress,
        error: null,
      });
    } else {
      return res.json({
        status: ResponseStatus.Error,
        message: "Transfer request could not be fulfilled: " + status,
        error: error,
      });
    }
  } catch (error) {
    return res.json({
      status: ResponseStatus.Error,
      message: "Error sending asset",
      error: error,
    });
  }
}

async function showTransactionWallet(req, res) {
  try {
    console.log(req.params);
    const { address } = req.params;
    let status = true;
    let error = null;
    
      try {
        const result = await runSidechainWalletBalance(address)();
        return res.json({
          status: ResponseStatus.Success,
          message: "Balance " + result,
          error: null,
        });
      } catch (err) {
        console.warn(err.stack);
        status = false;
        error = err;
      }
  } catch (error) {
    return res.json({
      status: ResponseStatus.Error,
      message: "Error getting Balance",
      error: error,
    });
  }
}

module.exports = {
  createWallet,
  createWalletInternal,
  sendTransactionWallet,
  showTransactionWallet,
  sendTransactionUserWallet
};
