# SWTC-RPC

[[toc]]

## 0. 接口说明
::: tip
#### 强制本地签名
#### 使用rpc接口，不依赖于websocket
:::

## 1 安装
1. 安装SWTC公链库(rpc)
```bash
npm install --save @swtc/rpc
```

## 2 项目文件结构
#### @swtc/rpc库基于rpc协议跟底层交互，内部实现我们包装的是流行的`axios`库

## 3 创建钱包
::: tip
#### 首先引入@swtc/rpc库的Wallet对象，然后使用以下两种方法创建钱包
#### 方法1: Wallet.generate()
#### 方法2: Wallet.fromSecret(secret);
:::

#### 参数:
 
|参数    |类型      |说明       |
|--------|----------|-----------:|
|secret|String|井通钱包私钥|

::: details 代码示例
```javascript
//创建Wallet对象
var jlib = require('@swtc/lib');
var Wallet = jlib.Wallet;
//方式一
var w1 = Wallet.generate();

console.log(w1);
//方式二
var w2 = Wallet.fromSecret('ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C');
var w3 = Wallet.fromSecret('ssLX1xmdj51Gu4BemCKb1ZKhFTjec');
var w4 = Wallet.fromSecret('snaSEqR4cTU6stvgtQKjq9FNPet8m');
console.log(w2);
console.log(w3);
```
:::
#### 返回的结果信息:
|参数    |类型    |说明        |
|-------|--------|-----------:|
|secret|String|井通钱包私钥|
|address|String|井通钱包地址|

::: details 代码输出
```javascript
> Wallet.generate()
{ secret: 'ssiUDhUpUZ5JDPWZ9Twt27Ckq6k4C',
  address: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz' }
```
:::

## 4 rpc交互
### 4.1 Remote对象
::: tip
Remote是与节点rpc交互的抽象类
:::
::: details 实例化 Remote
```javascript
const Remote = require("@swtc/rpc").Remote
const remote = new Remote({server: "http://swtclib.ca:5050"})
remote.config()
```
输出
```javascript
{
  server: 'http://swtclib.ca:5050',
  token: 'SWT',
  solidity: false,
  issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
  backend: 'rpc'
}
```
:::
### 4.2 Remote.rpcServerInfo() 获取节点信息
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcServerInfo().then(console.log)
Promise { <pending> }
> {
  info: {
    build_version: '0.28.1',
    complete_ledgers: '266955-17849981',
    hostid: 'BING',
    io_latency_ms: 1,
    last_close: { converge_time_s: 2.001, proposers: 8 },
    load_factor: 1,
    peers: 15,
    pubkey_node: 'n9LWVPJSuztHtgePSB4c8g37WUPM1EEphHjSY6si7jPeTqMbKmiM',
    server_state: 'full   11:52:25',
    startup_time: '2020-Dec-13 14:53:46',
    validated_ledger: {
      age: 5,
      base_fee_swt: 0.00001,
      fee_account_swt: 'jEoSyfChhUMzpRDttAJXuie8XhqyoPBYvV',
      hash: 'D335479AD59416E8CEA2B0286FBCD756C8FC818B83A8291E27E8B92A7249D602',
      issuerop_account: 'j4TVCesxU2s6tjYpsDoH4Pc81c4WMvNHPo',
      manager_account: 'jHZhYWj3kLvitkmqZan46FPkzbQYszuhvF',
      reserve_base_swt: 20,
      reserve_inc_swt: 5,
      seq: 17849981
    },
    validation_quorum: 5
  },
  status: 'success'
}
```
:::
### 4.3 Remote.rpcLedger(params) 获取帐本信息
::: tip 参数
```typescript
interface IRpcLedgerOptions {
  ledger_index?: "validated" | "closed" | "open" | number
  expand?: boolean
  transactions?: boolean
  accounts?: boolean
  full?: boolean
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| ledger_index | Uint/string | 指定查询账本。"validated","closed","current"或区块编号|
| accounts     | Boolean     | 可选参数，默认为假，如果设置为真，将返回账本中所有的账户信息，如 果没有指定账本，则会忽略。|
| full         | Boolean     | 可选参数，默认为假，设置为真时，将返回账本中的所有信息，如果没有 指定账本，则会忽略。|
| transactions | Boolean     | 可选参数，默认为假，设置为真时，将返回账本中所有的交易信息，如果 没有指定账本，则会忽略。|
| expand       | Boolean     | 可选参数，默认为假，设置为真时，将以 json 格式返回账户和交易信息， 但是如果账户和交易参数为假，这个值将会忽略。|
| owner_funds  | Boolean     | 可选参数，默认为假，设置为真时，在交易元数据中的创建挂单的交易中 包含 owner_funds 字段。但是如果交易和 expand 参数为假时，将会忽略。|
:::
::: details 代码示例
```javascript
const Remote = require("@swtc/rpc").Remote
const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcLedger({ledger_index: "closed"}).then(console.log)
Promise { <pending> }
> {
  ledger: {
    accepted: true,
    account_hash: 'FF7B9EDCB820E7BF6C79FED8E77CEAD652A6CFACA40D5D9F4AB5C741DDB7A64B',
    close_time: 661661510,
    close_time_human: '2020-Dec-19 02:51:50',
    close_time_resolution: 10,
    closed: true,
    hash: '4B70E1B2C1C710A4B4546B39C2234303180CC9B4CFE128219B4DAF4B1102AC17',
    ledger_hash: '4B70E1B2C1C710A4B4546B39C2234303180CC9B4CFE128219B4DAF4B1102AC17',
    ledger_index: '17850000',
    parent_hash: '501B47BAB2276319BB5FFD024A2A67FE7063424F8BDCD1F5387188A974414BAC',
    seqNum: '17850000',
    totalCoins: '599999999999460713',
    total_coins: '599999999999460713',
    transaction_hash: '798E3F8953101B74C038FF81CD6A3E655F280927EDC6ABD08370B13F83D76933'
  },
  ledger_hash: '4B70E1B2C1C710A4B4546B39C2234303180CC9B4CFE128219B4DAF4B1102AC17',
  ledger_index: 17850000,
  status: 'success',
  validated: true
}

```
输出说明
```
键名              类型     解析
Ledger           Object   完整的账本头数据
Account_hash     String   该账本中所有账户状态信息的哈希，十六进制。
Account Array    Account  参数为真时有，账本中所有账户信息。
Close_time       Int      该账本的关闭时间，距离井通元年时间。
Close_time_human String   以标准时间形式显示账本关闭时间。
Close            Boolean  是否这个账本已经关闭
Ledger_hash      String   标识该账本的账本哈希
Ledger_index     Uint     账本序列号，可以通过该序列号引用该账本。参数 ledger_index 为"validated"时，返回值为当前最新区块。
Parent_hash      String   该账本父母账本的哈希。
Total_coins      Int      网络中所有的井通币数目
Transaction_hash String   该账本中所有交易的哈希。
Transaction      Array    Tranaction 参数为真时，账本中所有交易信息。
```
:::