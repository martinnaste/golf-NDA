import { FC, useState } from 'react'
import "./Connect.css"
declare const window: any

const Connect:FC = () => {

    const [accountAddress, setAccountAddress] = useState("");

    async function getAccount() {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccountAddress(accounts[0])
    }

    function accountAddressShort(){
        var fFive = accountAddress.slice(0, 5)
        var lThree = accountAddress.slice(accountAddress.length - 3, accountAddress.length)
        return fFive + "..." + lThree
    }

    const connectButtonOnClick = () => {
        if (
            typeof window !== "undefined" &&
            typeof window.ethereum !== "undefined"
        ) {
            getAccount()
            accountAddressShort()
        } else {
            // alert("Please use a browser with MetaMask Support")
            console.log("Please use a browser with MetaMask Support")
        }
    };


    return (
        <div className='modal-metamask'>
            <h3 className='connect' onClick={connectButtonOnClick}>Connect Wallet</h3>
        </div>
    )
}

export default Connect