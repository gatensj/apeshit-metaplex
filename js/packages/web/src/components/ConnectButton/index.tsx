import { useWallet } from "@solana/wallet-adapter-react";
import { Button, Dropdown, Menu } from "antd";
import { ButtonProps } from "antd/lib/button";
import React from "react";



export interface ConnectButtonProps extends ButtonProps, React.RefAttributes<HTMLElement> {
  allowWalletChange?: boolean;
}

export const ConnectButton = (
  props: ConnectButtonProps
) => {
  const { connected, connect, select, wallet } = useWallet();
  const { onClick, children, disabled, allowWalletChange, ...rest } = props;

  // only show if wallet selected or user connected

  const menu = (
    <Menu>
      <Menu.Item key="3" onClick={select as any}>Change Wallet</Menu.Item>
    </Menu>
  );

  if(!wallet?.name || !allowWalletChange) {
    return <Button

      {...rest}
      onClick={connected ? onClick : connect}
      disabled={connected && disabled}
      shape="round"
    >
      {connected ? children : 'Connect to adopt'}
    </Button>;
  }

  return (
    <Dropdown.Button
        onClick={connected ? onClick : connect}
        disabled={connected && disabled}
        overlay={menu}>
      Connect to adopt
    </Dropdown.Button>
  );
};
