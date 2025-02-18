import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

const Account = () => {
    const { address } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    return (
        <div>
            {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
        </div>
    )
}

export default Account;