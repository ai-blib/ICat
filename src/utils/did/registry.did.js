export const idlFactory = ({ IDL }) => {
  const TxReceipt = IDL.Variant({
    'ok' : IDL.Nat,
    'err' : IDL.Variant({
      'InsufficientAllowance' : IDL.Null,
      'InsufficientBalance' : IDL.Null,
    }),
  });
  const Stats = IDL.Record({
    'fee' : IDL.Nat,
    'cyclesPerToken' : IDL.Nat,
    'owner' : IDL.Principal,
    'numTokens' : IDL.Nat,
    'feeTokenId' : IDL.Principal,
    'cycles' : IDL.Nat,
    'maxNumTokensPerId' : IDL.Nat,
    'maxNumTokens' : IDL.Nat,
  });
  const Status = IDL.Variant({
    'stopped' : IDL.Null,
    'stopping' : IDL.Null,
    'running' : IDL.Null,
  });
  const CanisterSettings = IDL.Record({
    'freezing_threshold' : IDL.Opt(IDL.Nat),
    'controllers' : IDL.Opt(IDL.Vec(IDL.Principal)),
    'memory_allocation' : IDL.Opt(IDL.Nat),
    'compute_allocation' : IDL.Opt(IDL.Nat),
  });
  const CanisterStatus = IDL.Record({
    'status' : Status,
    'memory_size' : IDL.Nat,
    'cycles' : IDL.Nat,
    'settings' : CanisterSettings,
    'module_hash' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const TokenInfo = IDL.Record({
    'fee' : IDL.Nat,
    'decimals' : IDL.Nat8,
    'owner' : IDL.Principal,
    'logo' : IDL.Text,
    'name' : IDL.Text,
    'totalSupply' : IDL.Nat,
    'timestamp' : IDL.Int,
    'index' : IDL.Nat,
    'symbol' : IDL.Text,
    'canisterId' : IDL.Principal,
  });
  const TokenRegistry = IDL.Service({
    'addToken' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'claimFee' : IDL.Func([], [TxReceipt], []),
    'createToken' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Nat8, IDL.Nat, IDL.Nat],
        [IDL.Principal],
        [],
      ),
    'getCyclesBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'getMaxTokenNumber' : IDL.Func([], [IDL.Nat], ['query']),
    'getMaxTokenNumberPerUser' : IDL.Func([], [IDL.Nat], ['query']),
    'getStats' : IDL.Func([], [Stats], ['query']),
    'getTokenCanisterStatus' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(CanisterStatus)],
        [],
      ),
    'getTokenCount' : IDL.Func([], [IDL.Nat], ['query']),
    'getTokenInfo' : IDL.Func([IDL.Principal], [IDL.Opt(TokenInfo)], ['query']),
    'getTokenList' : IDL.Func([], [IDL.Vec(TokenInfo)], ['query']),
    'getTokens' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(TokenInfo), IDL.Nat],
        ['query'],
      ),
    'getTokensByName' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Nat],
        [IDL.Vec(TokenInfo), IDL.Nat],
        ['query'],
      ),
    'getUserTokenList' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(TokenInfo)],
        ['query'],
      ),
    'getUserTokenNumber' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'modifyTokenInfo' : IDL.Func([TokenInfo], [IDL.Bool], []),
    'removeToken' : IDL.Func([IDL.Principal], [], ['oneway']),
    'setController' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'setCyclesPerToken' : IDL.Func([IDL.Nat], [], ['oneway']),
    'setFee' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'setMaxTokenNumber' : IDL.Func([IDL.Nat], [], ['oneway']),
    'setMaxTokenNumberPerUser' : IDL.Func([IDL.Nat], [], ['oneway']),
    'setNumTokens' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'setOwner' : IDL.Func([IDL.Principal], [], ['oneway']),
  });
  return TokenRegistry;
};
export const init = ({ IDL }) => {
  return [IDL.Principal, IDL.Principal, IDL.Nat];
};
export  default idlFactory;
