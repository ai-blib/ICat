export  const nnsPartialInterfaceFactory = ({ IDL }) => {
    const BlockHeight = IDL.Nat64;
    const Stats = IDL.Record({
        'latest_transaction_block_height' : BlockHeight,
        'seconds_since_last_ledger_sync' : IDL.Nat64,
        'sub_accounts_count' : IDL.Nat64,
        'hardware_wallet_accounts_count' : IDL.Nat64,
        'accounts_count' : IDL.Nat64,
        'earliest_transaction_block_height' : BlockHeight,
        'transactions_count' : IDL.Nat64,
        'block_height_synced_up_to' : IDL.Opt(IDL.Nat64),
        'latest_transaction_timestamp_nanos' : IDL.Nat64,
        'earliest_transaction_timestamp_nanos' : IDL.Nat64,
    });
    return IDL.Service({
        'get_stats' : IDL.Func([], [Stats], ['query']),
    });
};
