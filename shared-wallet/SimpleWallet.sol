// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import './Allowance.sol';

contract SimpleWallet is Allowance {

    event MoneySent(address indexed _beneficiary, uint _amount);
    event MoneyReceive(address indexed _from, uint _amount);

    function withdrawMoney(address payable _to, uint _amount) public ownerOrAllowed(_amount) {
        require(_amount <= address(this).balance, "There are not enough funds store in the smart contract");
        if(!isOwner()) {
            reduceAllowance(msg.sender, _amount);
        }
        _to.transfer(_amount);
        emit MoneySent(_to, _amount);
    }

    function renounceOwnership() override public virtual onlyOwner {
        revert("Can't renouce ownership here");
    }

    receive() external payable {
        emit MoneyReceive(msg.sender, msg.value);
    }
}