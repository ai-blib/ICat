export const idlFactory = ({ IDL }) => {
  const PoolInfoExt = IDL.Record({
    'id' : IDL.Nat,
    'startTime' : IDL.Int,
    'lastRewardTime' : IDL.Int,
    'accTokenPerShare' : IDL.Nat,
    'stakingToken' : IDL.Text,
    'rewardToken' : IDL.Principal,
    'endTime' : IDL.Int,
    'isDSwapLP' : IDL.Bool,
    'totalSupply' : IDL.Nat,
    'rewardRate' : IDL.Nat,
    'totalReward' : IDL.Nat,
  });
  const UserInfoExt = IDL.Record({
    'unclaimedReward' : IDL.Nat,
    'lastUpdateTime' : IDL.Int,
    'rewardDebt' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  const Staking = IDL.Service({
    'addPool' : IDL.Func(
        [IDL.Text, IDL.Bool, IDL.Principal, IDL.Int, IDL.Int, IDL.Nat],
        [IDL.Bool],
        [],
      ),
    'claimReward' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'deposit' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Bool], []),
    'getAllOpenPools' : IDL.Func([], [IDL.Vec(PoolInfoExt)], ['query']),
    'getAllPools' : IDL.Func([], [IDL.Vec(PoolInfoExt)], ['query']),
    'getPoolInfo' : IDL.Func([IDL.Nat], [PoolInfoExt], ['query']),
    'getUserInfo' : IDL.Func(
        [IDL.Nat, IDL.Principal],
        [UserInfoExt],
        ['query'],
      ),
    'getUserPendingReward' : IDL.Func(
        [IDL.Nat, IDL.Principal],
        [IDL.Nat],
        ['query'],
      ),
    'massUpdatePools' : IDL.Func([], [], ['oneway']),
    'removePool' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'transferToken' : IDL.Func(
        [IDL.Text, IDL.Bool, IDL.Principal, IDL.Principal, IDL.Nat],
        [IDL.Bool],
        [],
      ),
    'withdraw' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Bool], []),
  });
  return Staking;
};
export const init = ({ IDL }) => { return [IDL.Principal, IDL.Principal]; };
export default idlFactory;
