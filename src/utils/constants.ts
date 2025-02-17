import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const ETH_MAINNET_USDC_ORACLE_ADDRESS =
  '0x83d95e0d5f402511db06817aff3f9ea88224b030';
export const ETH_MAINNET_CALCULATIONS_CURVE_ADDRESS =
  '0x25BF7b72815476Dd515044F9650Bf79bAd0Df655';
export const ETH_MAINNET_CALCULATIONS_SUSHI_SWAP_ADDRESS =
  '0x8263e161A855B644f582d9C164C66aABEe53f927';

export const FTM_MAINNET_CALCULATIONS_SPOOKY_SWAP_ADDRESS =
  '0x1007eD6fdFAC72bbea9c719cf1Fa9C355D248691';
export const FTM_MAINNET_USDC_ORACLE_ADDRESS =
  '0x57AA88A0810dfe3f9b71a9b179Dd8bF5F956C46A';
export const FTM_MAINNET_CALCULATIONS_SUSHI_SWAP_ADDRESS =
  '0xec7Ac8AC897f5082B2c3d4e8D2173F992A097F24';

export const ARB_MAINNET_USDC_ORACLE_ADDRESS =
  '0x043518AB266485dC085a1DB095B8d9C2Fc78E9b9';
export const ARB_MAINNET_CALCULATIONS_SUSHI_SWAP_ADDRESS =
  '0x5EA7E501c9A23F4A76Dc7D33a11D995B13a1dD25';

export const DEFAULT_DECIMALS = 18;
export const BIGINT_ZERO = BigInt.fromI32(0);
export const BIGINT_MAX = BigInt.fromString(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935'
);

export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);
export const DAYS_PER_YEAR = new BigDecimal(BigInt.fromI32(365));
export const MS_PER_DAY = new BigDecimal(BigInt.fromI32(24 * 60 * 60 * 1000));

export const DON_T_CREATE_VAULT_TEMPLATE = false;
export const DO_CREATE_VAULT_TEMPLATE = true;

export const EXPERIMENTAL = 'Experimental';
export const API_VERSION_0_4_2 = '0.4.2';
export const ETH_MAINNET_NETWORK = 'mainnet';
export const FTM_MAINNET_NETWORK = 'fantom';
export const ARB_MAINNET_NETWORK = 'arbitrum-one';

export const ROBO_VAULT_REGISTRY = '0xF97A534300dF63B3ee2a4695836B16435Fea99C0';
