const dotenv = require("dotenv");
require('dotenv').config();

dotenv.config({
  path: `../../.env`,
});
const { Sequelize, Model, DataTypes } = require("sequelize");

console.log("in environment");
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_URL,
  dialect: 'mysql',
});
const { QueryTypes } = require('sequelize');

  async function getGlobal(){
    let data;
    try {
      data = await sequelize.query('SELECT dataKey,dataValue FROM `ENVIRONMENT_DATA`', {type: sequelize.QueryTypes.SELECT});
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const globalData = getGlobal();
 

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const AUTH_TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET;
const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;
const HTTP_PORT = process.env.HTTP_PORT;
const HTTPS_PORT = process.env.HTTPS_PORT;

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

const SES_REGION = process.env.SES_REGION;
const SES_ACCESS_ID = process.env.SES_ACCESS_ID;
const SES_ACCESS_KEY = process.env.SES_ACCESS_KEY;
const SES_SENDER_ADDRESS = process.env.SES_SENDER_ADDRESS;

const CONSOLE_WEB_URL = process.env.CONSOLE_WEB_URL;

const DEVELOPMENT = !process.env.PRODUCTION;
const PRODUCTION = process != undefined && process.env.PRODUCTION;
const ETHEREUM_HOST = process.env.ETHEREUM_HOST;
const POLYGON_VIGIL_KEY = process.env.POLYGON_VIGIL_KEY;
const REDIS_KEY = process.env.REDIS_KEY;
const MINTING_FEE = process.env.MINTING_FEE;
const ASSET_CONTRACT_NAME = process.env.ASSET_CONTRACT_NAME;
const DEVELOPMENT_URL = process.env.DEVELOPMENT_URL;
const DEVELOPMENT_MNEMONIC = process.env.DEVELOPMENT_MNEMONIC;
const DEVELOPMENT_SIGNER_ADDRESS = process.env.DEVELOPMENT_SIGNER_ADDRESS;
const DEVELOPMENT_TREASURY_ADDRESS = process.env.DEVELOPMENT_TREASURY_ADDRESS;
const TESTNET_URL = process.env.TESTNET_URL;
const TESTNET_SIDECHAIN_URL = process.env.TESTNET_SIDECHAIN_URL;
const TESTNET_POLYGON_URL = process.env.TESTNET_POLYGON_URL;
const MAINNET_URL = process.env.MAINNET_URL;
const MAINNET_SIDECHAIN_URL = process.env.MAINNET_SIDECHAIN_URL;
const POLYGON_URL = process.env.POLYGON_URL;
const TESTNET_MNEMONIC = process.env.TESTNET_MNEMONIC;
const TESTNET_SIDECHAIN_MNEMONIC = process.env.TESTNET_SIDECHAIN_MNEMONIC;
const TESTNET_POLYGON_MNEMONIC = process.env.TESTNET_POLYGON_MNEMONIC;
const MAINNET_MNEMONIC = process.env.MAINNET_MNEMONIC;
const MAINNET_SIDECHAIN_MNEMONIC = process.env.MAINNET_SIDECHAIN_MNEMONIC;
const POLYGON_MNEMONIC = process.env.POLYGON_MNEMONIC;
const MAINNET_SIGNER_ADDRESS = process.env.MAINNET_SIGNER_ADDRESS;
const MAINNET_TREASURY_ADDRESS = process.env.MAINNET_TREASURY_ADDRESS;
const MAINNET_SIDECHAIN_SIGNER_ADDRESS = process.env.MAINNET_SIDECHAIN_SIGNER_ADDRESS;
const MAINNET_SIDECHAIN_TREASURY_ADDRESS = process.env.MAINNET_SIDECHAIN_TREASURY_ADDRESS;
const POLYGON_SIGNER_ADDRESS = process.env.POLYGON_SIGNER_ADDRESS;
const POLYGON_TREASURY_ADDRESS = process.env.POLYGON_TREASURY_ADDRESS;
const TESTNET_POLYGON_SIGNER_ADDRESS = process.env.TESTNET_POLYGON_SIGNER_ADDRESS;
const TESTNET_POLYGON_TREASURY_ADDRESS = process.env.TESTNET_POLYGON_TREASURY_ADDRESS;
const TESTNET_SIGNER_ADDRESS = process.env.TESTNET_SIGNER_ADDRESS;
const TESTNET_TREASURY_ADDRESS = process.env.TESTNET_TREASURY_ADDRESS;
const TESTNET_SIDECHAIN_SIGNER_ADDRESS = process.env.TESTNET_SIDECHAIN_SIGNER_ADDRESS;
const TESTNET_SIDECHAIN_TREASURY_ADDRESS = process.env.TESTNET_SIDECHAIN_TREASURY_ADDRESS;
const COIN_CONTRACT_SYMBOL = process.env.COIN_CONTRACT_SYMBOL;
const CURRENCY_MARKET_CAP = process.env.CURRENCY_MARKET_CAP;
const ASSET_CONTRACT_SYMBOL = process.env.ASSET_CONTRACT_SYMBOL;
const ASSETS_ARE_MINTABLE = process.env.ASSETS_ARE_MINTABLE;
const ASSET_BASE_URI = process.env.ASSET_BASE_URI;

module.exports = {
  INFURA_PROJECT_ID,
  ETHEREUM_HOST,
  POLYGON_VIGIL_KEY,
  AUTH_TOKEN_SECRET,
  AUTH_SECRET_KEY,
  HTTP_PORT,
  HTTPS_PORT,
  SES_REGION,
  SES_ACCESS_ID,
  SES_ACCESS_KEY,
  SES_SENDER_ADDRESS,
  CONSOLE_WEB_URL,
  PINATA_API_KEY,
  PINATA_SECRET_API_KEY,
  DEVELOPMENT,
  PRODUCTION,
  REDIS_KEY,
  MINTING_FEE,
  ASSET_CONTRACT_NAME,
  MAINNET_MNEMONIC,
  DEVELOPMENT_URL,
  DEVELOPMENT_MNEMONIC,
  DEVELOPMENT_SIGNER_ADDRESS,
  DEVELOPMENT_TREASURY_ADDRESS,
  TESTNET_URL,
  TESTNET_SIDECHAIN_URL,
  TESTNET_POLYGON_URL,
  MAINNET_URL,
  MAINNET_SIDECHAIN_URL,
  POLYGON_URL,
  TESTNET_MNEMONIC,
  TESTNET_SIDECHAIN_MNEMONIC,
  TESTNET_POLYGON_MNEMONIC,
  MAINNET_SIDECHAIN_MNEMONIC,
  POLYGON_MNEMONIC,
  MAINNET_SIGNER_ADDRESS,
  MAINNET_TREASURY_ADDRESS,
  MAINNET_SIDECHAIN_SIGNER_ADDRESS,
  MAINNET_SIDECHAIN_TREASURY_ADDRESS,
  POLYGON_SIGNER_ADDRESS,
  POLYGON_TREASURY_ADDRESS,
  TESTNET_POLYGON_SIGNER_ADDRESS,
  TESTNET_POLYGON_TREASURY_ADDRESS,
  TESTNET_SIGNER_ADDRESS,
  TESTNET_TREASURY_ADDRESS,
  TESTNET_SIDECHAIN_SIGNER_ADDRESS,
  TESTNET_SIDECHAIN_TREASURY_ADDRESS,
  COIN_CONTRACT_SYMBOL,
  CURRENCY_MARKET_CAP,
  ASSET_CONTRACT_SYMBOL,
  ASSETS_ARE_MINTABLE,
  ASSET_BASE_URI,
  globalData
};