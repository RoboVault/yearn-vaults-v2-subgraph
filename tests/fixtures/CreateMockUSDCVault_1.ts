import { createMockedFunction } from 'matchstick-as';
import {
  BigInt,
  ethereum,
  log,
  Address,
  Bytes,
  ByteArray,
} from '@graphprotocol/graph-ts';

export function CreateMockUSDCVault_1(): void {
  createMockedFunction(
    Address.fromString('0x5f18c75abdae578b483e5f43f12a39cf75b973a9'),
    'totalSupply',
    'totalSupply():(uint256)'
  ).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString('0'))]);

  createMockedFunction(
    Address.fromString('0x5f18c75abdae578b483e5f43f12a39cf75b973a9'),
    'totalAssets',
    'totalAssets():(uint256)'
  ).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString('0'))]);

  createMockedFunction(
    Address.fromString('0x5f18c75abdae578b483e5f43f12a39cf75b973a9'),
    'totalDebt',
    'totalDebt():(uint256)'
  ).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString('0'))]);

  createMockedFunction(
    Address.fromString('0x5f18c75abdae578b483e5f43f12a39cf75b973a9'),
    'pricePerShare',
    'pricePerShare():(uint256)'
  ).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString('1000000'))]);

  createMockedFunction(
    Address.fromString('0x5f18c75abdae578b483e5f43f12a39cf75b973a9'),
    'performanceFee',
    'performanceFee():(uint256)'
  ).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString('1000'))]);

  createMockedFunction(
    Address.fromString('0x5f18c75abdae578b483e5f43f12a39cf75b973a9'),
    'managementFee',
    'managementFee():(uint256)'
  ).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString('200'))]);

  createMockedFunction(
    Address.fromString('0x5f18c75abdae578b483e5f43f12a39cf75b973a9'),
    'activation',
    'activation():(uint256)'
  ).returns([
    ethereum.Value.fromUnsignedBigInt(BigInt.fromString('1610909579')),
  ]);

  createMockedFunction(
    Address.fromString('0x5f18c75abdae578b483e5f43f12a39cf75b973a9'),
    'apiVersion',
    'apiVersion():(string)'
  ).returns([ethereum.Value.fromString('0.3.0')]);

  createMockedFunction(
    Address.fromString('0x5f18c75abdae578b483e5f43f12a39cf75b973a9'),
    'token',
    'token():(address)'
  ).returns([
    ethereum.Value.fromAddress(
      Address.fromString('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48')
    ),
  ]);

  createMockedFunction(
    Address.fromString('0x5f18c75abdae578b483e5f43f12a39cf75b973a9'),
    'rewards',
    'rewards():(address)'
  ).returns([
    ethereum.Value.fromAddress(
      Address.fromString('0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde')
    ),
  ]);

  createMockedFunction(
    Address.fromString('0x5f18c75abdae578b483e5f43f12a39cf75b973a9'),
    'decimals',
    'decimals():(uint8)'
  ).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString('6'))]);

  createMockedFunction(
    Address.fromString('0x5f18c75abdae578b483e5f43f12a39cf75b973a9'),
    'symbol',
    'symbol():(string)'
  ).returns([ethereum.Value.fromString('yvUSDC')]);

  createMockedFunction(
    Address.fromString('0x5f18c75abdae578b483e5f43f12a39cf75b973a9'),
    'name',
    'name():(string)'
  ).returns([ethereum.Value.fromString('USDC yVault')]);

  createMockedFunction(
    Address.fromString('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'),
    'decimals',
    'decimals():(uint8)'
  ).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString('6'))]);

  createMockedFunction(
    Address.fromString('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'),
    'symbol',
    'symbol():(string)'
  ).returns([ethereum.Value.fromString('USDC')]);

  createMockedFunction(
    Address.fromString('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'),
    'name',
    'name():(string)'
  ).returns([ethereum.Value.fromString('USD Coin')]);
}
