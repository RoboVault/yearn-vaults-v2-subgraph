import { Address, BigInt, log } from '@graphprotocol/graph-ts';
import { Oracle as OracleContract } from '../../../generated/registry/Oracle';
import { Token } from '../../../generated/schema';
import { CalculationsCurve as CalculationsCurveContract } from '../../../generated/templates/Vault/CalculationsCurve';
import { CalculationsSushiSwap as CalculationsSushiSwapContract } from '../../../generated/templates/Vault/CalculationsSushiSwap';
import {
  BIGINT_ZERO,
  CALCULATIONS_CURVE_ADDRESS,
  CALCULATIONS_SUSHI_SWAP_ADDRESS,
  USDC_ORACLE_ADDRESS,
} from '../constants';

function getSushiSwapCalculations(): CalculationsSushiSwapContract {
  return CalculationsSushiSwapContract.bind(
    Address.fromString(CALCULATIONS_SUSHI_SWAP_ADDRESS)
  );
}

function getCurveCalculations(): CalculationsCurveContract {
  return CalculationsCurveContract.bind(
    Address.fromString(CALCULATIONS_CURVE_ADDRESS)
  );
}

function getOracleCalculator(): OracleContract {
  return OracleContract.bind(Address.fromString(USDC_ORACLE_ADDRESS));
}

export function usdcPrice(token: Token, tokenAmount: BigInt): BigInt {
  let tokenAddress = Address.fromString(token.id);
  let decimals = BigInt.fromI32(token.decimals);
  let oracleCalculatorPrice = getTokenPriceFromOracle(
    tokenAddress,
    tokenAmount
  );
  if (oracleCalculatorPrice.notEqual(BIGINT_ZERO)) {
    return oracleCalculatorPrice;
  }
  let sushiSwapCalculatorPrice = getTokenPriceFromSushiSwap(
    tokenAddress,
    tokenAmount,
    decimals
  );
  if (sushiSwapCalculatorPrice.notEqual(BIGINT_ZERO)) {
    return sushiSwapCalculatorPrice;
  }
  let curveCalculatorPrice = getTokenPriceFromCurve(
    tokenAddress,
    tokenAmount,
    decimals
  );
  if (curveCalculatorPrice.notEqual(BIGINT_ZERO)) {
    return curveCalculatorPrice;
  }
  log.warning(
    '[TokenPrice] Cannot get token {} / {} price from calculators. Amount {}',
    [tokenAddress.toHexString(), decimals.toString(), tokenAmount.toString()]
  );
  return BIGINT_ZERO;
}

export function usdcPricePerToken(tokenAddress: Address): BigInt {
  let oracle = OracleContract.bind(Address.fromString(USDC_ORACLE_ADDRESS));
  if (oracle !== null) {
    let result = oracle.try_getPriceUsdcRecommended(tokenAddress);
    if (result.reverted === false) {
      return result.value;
    }
  }

  return BIGINT_ZERO;
}

function getTokenPriceFromOracle(
  tokenAddress: Address,
  tokenAmount: BigInt
): BigInt {
  let calculator = getOracleCalculator();
  log.info('[TokenPrice] Trying to get token {} price from Oracle.', [
    tokenAddress.toHexString(),
  ]);
  if (calculator !== null) {
    let result = calculator.try_getNormalizedValueUsdc(
      tokenAddress,
      tokenAmount
    );
    if (result.reverted === false) {
      return result.value;
    } else {
      log.warning(
        "[TokenPrice] Cannot get token {} price from Oracle. 'getNormalizedValueUsdc({}, {})' call failed.",
        [
          tokenAddress.toHexString(),
          tokenAddress.toHexString(),
          tokenAmount.toString(),
        ]
      );
    }
  } else {
    log.warning(
      '[TokenPrice] Cannot get token {} price from Oracle. It is undefined.',
      [tokenAddress.toHexString()]
    );
  }
  return BIGINT_ZERO;
}

function getTokenPriceFromCurve(
  tokenAddress: Address,
  tokenAmount: BigInt,
  decimals: BigInt
): BigInt {
  let calculator = getCurveCalculations();
  log.info('[TokenPrice] Trying to get token {} price from Curve.', [
    tokenAddress.toHexString(),
  ]);
  if (calculator !== null) {
    let pool = calculator.try_getPool(tokenAddress);
    if (pool.reverted === false) {
      log.info('[TokenPrice] Getting token {} price from Curve.', [
        tokenAddress.toHexString(),
      ]);
      let underlying = calculator.try_getUnderlyingCoinFromPool(pool.value);
      if (underlying.reverted === false) {
        return getTokenPriceFromSushiSwap(
          underlying.value,
          tokenAmount,
          decimals
        );
      } else {
        log.warning(
          "[TokenPrice] Cannot to get token {} price from Curve. 'getUnderlyingCoinFromPool({})' Call failed.",
          [tokenAddress.toHexString(), pool.value.toString()]
        );
      }
    } else {
      log.warning(
        "[TokenPrice] Cannot to get token {} price from Curve. 'getPool({})' call failed.",
        [tokenAddress.toHexString(), tokenAddress.toHexString()]
      );
    }
  } else {
    log.warning(
      '[TokenPrice] Cannot get token {} price from Curve. It is undefined.',
      [tokenAddress.toHexString()]
    );
  }
  return BIGINT_ZERO;
}

function getTokenPriceFromSushiSwap(
  tokenAddress: Address,
  tokenAmount: BigInt,
  decimals: BigInt
): BigInt {
  let calculator = getSushiSwapCalculations();
  log.info('[TokenPrice] Getting token {} / {} price from SushiSwap.', [
    tokenAddress.toHexString(),
    decimals.toString(),
  ]);
  if (calculator !== null) {
    log.info('[TokenPrice] Getting token {} / {} price from SushiSwap.', [
      tokenAddress.toHexString(),
      decimals.toString(),
    ]);
    let price = calculator.try_getPriceUsdc(tokenAddress);
    if (price.reverted === false) {
      return price.value.times(tokenAmount).div(decimals);
    } else {
      log.warning(
        "[TokenPrice] Cannot get token {} / {} price from SushiSwap. 'getPriceUsdc({})' call failed.",
        [
          tokenAddress.toHexString(),
          decimals.toString(),
          tokenAddress.toHexString(),
        ]
      );
    }
  } else {
    log.warning(
      '[TokenPrice] Cannot get token {} / {} price from SushiSwap. Calculator is undefined.',
      [tokenAddress.toHexString(), decimals.toString()]
    );
  }
  return BIGINT_ZERO;
}
