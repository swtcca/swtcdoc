# 国密综合 - 国密支持 公链/联盟链/定制链

[[toc]]

## 安装开发库 定义区块链 使用开发库

::: tip 安装
<vue-typed-js :strings="install" :loop="true">
  <p>区块链操作使用 <span class="typing"></span></p>
</vue-typed-js>
:::
::: tip 定义区块链
<vue-typed-js :strings="chainspecs" :loop="true">
  <p>区块链定义举例 <span class="typing"></span></p>
</vue-typed-js>
:::
::: tip 使用
<vue-typed-js :strings="startups" :loop="true">
  <p>区块链操作使用 <span class="typing"></span></p>
</vue-typed-js>
<vue-typed-js :strings="simplified" :loop="true">
  <p>属性静态绑定<span class="typing"></span></p>
</vue-typed-js>
:::

## 开发库示意图

<mermaid>
stateDiagram-v2
    direction BT
    LIB --> websocketServiceBLOCKCHAIN : websocket
    RPC --> rpcServiceBLOCKCHAIN : rpc
    LIB: Class Remote
    state LIB {
        LIBFactory: require("@swtc/lib").Factory(chain_or_wallet)
    }
    RPC: Class Remote
    state RPC {
        RPCFactory: require("@swtc/rpc").Factory(chain_or_wallet)
    }
    Transaction: Class Transaction
    Serializer: Class Serializer
    Keypair: Class Keypair
    Wallet: Class Wallet
    state Wallet {
        WalletFactory: require("@swtc/wallet").Factory(chain)
    }
    AddressCodec --> Keypair
    Keypair --> Wallet
    Wallet --> LIB : 依赖
    Wallet --> Utils
    Serializer --> Transaction
    Wallet --> Transaction : 依赖
    Utils --> Transaction
    Wallet --> Serializer
    Wallet --> RPC : 依赖
    Transaction --> LIB : 依赖
    Transaction --> RPC : 依赖
</mermaid>

## 公链 vs 国密链

### secret

### keypairs

### address

### sign/verify

## 国密测试链上验证

### getAccountInfo/getAccountBalances

### send/receive Payment Transaction

### getOrderBook / push Offer

## 遗留

### 多签

### contract

### erc721

<script>
export default {
  data () {
      return {
          install: [
            ' websocket接口 npm install @swtc/lib ',
            '       rpc接口 npm install @swtc/rpc ',
            ' 不操作   区块链 npm install @swtc/transaction ',
            ' 只使用     钱包 npm install @swtc/wallet '
					],
          simplified: [
            ' const {Transaction, Wallet, Serializer, utils} = Remote ',
            ' const {Wallet, Serializer, utils} = Transaction ',
            ' const {KeyPair, addressCodec, config} = Wallet '
					],
          startups: [
            ' websocket接口 const Remote = require("@swtc/lib").Factory(chain_spec)',
            '       rpc接口 const Remote = require("@swtc/rpc").Factory(chain_spec)',
            ' 不操作  区块链 const Transaction = require("@swtc/transaction").Factory(chain_spec)',
            ' 只使用    钱包 const Wallet = require("@swtc/wallet").Factory(chain_spec)'
          ],
					chainspecs: [
            '缺省为井通公链',
						'用字串指定预定义的链  "jingtum" 对应 井通公链',
						'用字串指定预定义的链  "ripple" 对应 瑞波公链',
						'用字串指定预定义的链  "bizain" 对应 商链',
						'用对象定制链  {fee: 1000} 定制转账费用的 井通链',
						'用对象定制链  {guomi: true} 定制符合国密标准的 井通链',
						'用对象定制链  {fee: 1000000, currency: "BWT", ACCOUNT_ALPHABET: "bpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2jcdeCg65rkm8oFqi1tuvAxyz"} 定制转账费用的 商链',
						'用对象定制链  还可以定制默认issuer/通证别名/默认节点等'
					]
      }
  },
}
</script>