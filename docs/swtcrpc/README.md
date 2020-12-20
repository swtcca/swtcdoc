# SWTC-RPC

[[toc]]

## 0. 接口说明
::: tip
##### 强制本地签名
##### 使用rpc接口，不依赖于websocket
:::

## 1 安装
1. 安装SWTC公链库(rpc)
```bash
npm install --save @swtc/rpc
```

## 2 项目文件结构
##### @swtc/rpc库基于rpc协议跟底层交互，内部实现我们包装的是流行的`axios`库

## 3 创建钱包
::: tip
##### 首先引入@swtc/rpc库的Wallet对象，然后使用以下两种方法创建钱包
##### 方法1: Wallet.generate()
##### 方法2: Wallet.fromSecret(secret);
:::

##### 参数:
 
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
##### 返回的结果信息:
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
### 4.2 节点相关
#### 4.2.1 Remote.rpcServerInfo() 获取节点信息
::: tip 参数
无
:::
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
#### 4.2.2 Remote.rpcServerState() 获取节点状态
::: tip 参数
无
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcServerState().then(console.log)
Promise { <pending> }
> {
  state: {
    build_version: '0.28.1',
    complete_ledgers: '266955-17854908',
    io_latency_ms: 1,
    last_close: { converge_time: 2001, proposers: 9 },
    load_base: 256,
    load_factor: 256,
    peers: 15,
    pubkey_node: 'n9LWVPJSuztHtgePSB4c8g37WUPM1EEphHjSY6si7jPeTqMbKmiM',
    server_state: 'full   09:09:06',
    startup_time: '2020-Dec-13 14:53:46',
    validated_ledger: {
      base_fee: 10,
      close_time: 661710590,
      fee_account: 'jEoSyfChhUMzpRDttAJXuie8XhqyoPBYvV',
      hash: '1C681687739A2AE3CAC7BE4943F735BFC3B321110B7AE7158D1D3FBDEE2D1A7F',
      reserve_base: 20000000,
      reserve_inc: 5000000,
      seq: 17854908
    },
    validation_quorum: 5
  },
  status: 'success'
}
```
:::
### 4.3 帐本相关
#### 4.3.1 Remote.rpcLedgerClosed() 获取已关闭帐本信息
::: tip 参数
无
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcLedgerClosed().then(console.log)
Promise { <pending> }
> {
  ledger_hash: '6D2FCA61969249A890452DBA50F2D665C413B6AC7CF8922B04CD5DA8BEF2CD2B',
  ledger_index: 17854964,
  status: 'success'
}
```
:::
#### 4.3.2 Remote.rpcLedgerCurrent() 获取已关闭帐本信息
::: tip 参数
无
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcLedgerCurrent().then(console.log)
Promise { <pending> }
> { ledger_current_index: 17854969, status: 'success' }
```
:::
#### 4.3.3 Remote.rpcLedger(params: IRpcLedgerOptions) 获取帐本信息
::: tip 参数
```typescript
interface IRpcLedgerOptions {
  ledger_index?: "validated" | "closed" | "current" | number
  ledger_hash?: string
  expand?: boolean
  transactions?: boolean
  accounts?: boolean
  full?: boolean
  binary?: boolean
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| ledger_index | Uint/string | 指定查询账本,"validated","closed","current"或区块编号 |
| ledger_hash  | string      | 指定查询账本, 区块哈希 |
| accounts     | Boolean     | 可选参数，默认为假，如果设置为真，将返回账本中所有的账户信息，如 果没有指定账本，则会忽略。|
| full         | Boolean     | 可选参数，默认为假，设置为真时，将返回账本中的所有信息，如果没有 指定账本，则会忽略。|
| transactions | Boolean     | 可选参数，默认为假，设置为真时，将返回账本中所有的交易信息，如果 没有指定账本，则会忽略。|
| expand       | Boolean     | 可选参数，默认为假，设置为真时，将以 json 格式返回账户和交易信息， 但是如果账户和交易参数为假，这个值将会忽略。|
| binary       | Boolean     | 可选参数，默认为假，设置为真时，交易以原始编码返回|
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
#### 4.3.4 Remote.rpcLedgerData(params: IRpcLedgerDataOptions) 获取帐本数据
::: tip 参数
```typescript
interface IRpcLedgerDataOptions {
  ledger_index?: "validated" | "closed" | "current" | number
  ledger_hash?: string
  binray?: boolean
  limit?: number
  marker?: IMarker
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| ledger_index | Uint/string | 可选参数, 指定账本,"validated","closed","current"或区块编号 |
| ledger_hash  | string      | 可选参数, 指定账本, 区块哈希 |
| binary       | Boolean     | 可选参数，默认为假，设置为真时，以原始编码返回|
| limit        | Number      | 可选参数，返回数量|
| marker       | IMarker     | 可选参数，分页相关|
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcLedgerData({limit: 2, binary: true}).then(console.log)
Promise { <pending> }
> {
  ledger_current_index: 17855102,
  ledger_hash: '72CA9373AFA1E894A61A700CA7936DDC3B8F5B5FEE53511E4F804B3BDE36F7A8',
  ledger_index: '17855102',
  marker: '0000072D097A02B52E70B09D1C9A2B4AF6C0A256DE4E50649C626F73903A6DF1',
  state: [
    {
      data: '110061220000000024000000012500B17A972D00000001559BBDDBE6996E16FD8AE87B6EE64997C98E16B59C246C173281A822F124DF1B66624000000002160EC081143BF0D3DC4719F3BD2221A7AAD216E16E8BD68EB9',
      index: '0000035323A056896406C8C16C21CB382175ADF83F41E14E91B4ADFD4B72743A'
    },
    {
      data: '11007222001100002500DA4F27370000000000000000380000000000008EC955126E65949BD9F9190AA9FF70F8502554E181BA444F5AC1AF3B38815CAF1184FA62D4838D7EA4C680000000000000000000000000004353500000000000000000000000000000000000000000000000000166D7038D7EA4C68000000000000000000000000000435350000000000002BF6C5E4E68145EF6F144165AB847BBD2302BB86780000000000000000000000000000000000000004353500000000000A582E432BFC48EEDEF852C814EC57F3CD2D41596',
      index: '000006B7C0C15ED622FC359154790CCF77898EF0B90B86A9E9D8863AE19D7D6B'
    }
  ],
  status: 'success',
  validated: false
}
```
:::
#### 4.3.5 Remote.rpcLedgerEntry(params: IRpcLedgerEntryOptions) 获取帐本数据
::: tip 参数
```typescript
interface IRpcLedgerEntryOptions {
  ledger_index?: "validated" | "closed" | "current" | number
  ledger_hash?: string
  binray?: boolean
  type?: string
  [key: string]: any
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| ledger_index | Uint/string | 可选参数, 指定账本,"validated","closed","current"或区块编号 |
| ledger_hash  | string      | 可选参数, 指定账本, 区块哈希 |
| binary       | Boolean     | 可选参数，默认为假，设置为真时，以原始编码返回|
| limit        | Number      | 可选参数，返回数量|
| marker       | IMarker     | 可选参数，分页相关|
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcLedgerEntry({type: "account_root", account_root: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz"}).then(console.log)
Promise { <pending> }
> {
  index: 'DB35CDEAF3F0D3C190B041C0C7D92FB0E43CBCBFAD4F498C28858A35CEA8BBB7',
  ledger_current_index: 17855371,
  node: {
    Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
    Balance: '52359960',
    Flags: 0,
    LedgerEntryType: 'AccountRoot',
    OwnerCount: 7,
    PreviousTxnID: '55791A6BD2C0D71D339B2366D9A60F2AB71829648EC8F0B10EBD941A5D663433',
    PreviousTxnLgrSeq: 17051932,
    Sequence: 109,
    index: 'DB35CDEAF3F0D3C190B041C0C7D92FB0E43CBCBFAD4F498C28858A35CEA8BBB7'
  },
  status: 'success',
  validated: false
}
```
:::
### 4.4 事务相关
#### 4.4.0 Remote.rpcSign() Remote.rpcSignFor() 服务器签名
::: danger
不安全操作，不予提供
:::
#### 4.4.1 Remote.rpcTxHistory(params: IRpcTxHistoryOptions) 获取最近事务
::: tip 参数
```typescript
export interface IRpcTxHistoryOptions {
  start?: number
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| start        | number      | 可选参数，略过事务 |
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcTxHistory().then(console.log)
Promise { <pending> }
> {
  index: 0,
  status: 'success',
  txs: [
    {
      Account: 'j35tEXrGej8U69ffiQSaXuxWBmq5oxSbCa',
      Amount: [Object],
      Destination: 'j36znoDj2V9YRvZprJgc3eFovxdbrebTqY',
      Fee: '20',
      Flags: 0,
      Memos: [Array],
      Sequence: 818,
      SigningPubKey: '02F3066AA10B81BDD088B6EE54C7BAE9E1EEB4F18C4F16CE4E115FA5800FB22E1D',
      TransactionType: 'Payment',
      TxnSignature: '3045022100FEA587BE9255AD240D1AF8F09CC1F959705D8613581CCD6F59815F369B4A9C3502206452C673BE62BD72752FFDCAAAD457A97FEB2AA181194F272015E728F6312955',
      hash: '6BB25BF815EE0A2339C951C6553ECC519BDB0B43A241E44AC0717793B2DDF3FF',
      inLedger: 17855666,
      ledger_index: 17855666
    },
    {
      Account: 'jKimtpPTnQyz2DrHBHhVuX5Zz8W4PNo6GA',
      Amount: [Object],
      Destination: 'jLHErZNEwevjzWXCqzAxcAid7TAG1NMjFj',
      Fee: '20',
      Flags: 0,
      Memos: [Array],
      Sequence: 463,
      SigningPubKey: '027C4F80C38CB4C2662F67FBB50A448F5B7B2D1993C9D7210DD84C19F6D2525464',
      TransactionType: 'Payment',
      TxnSignature: '304402207A6AFD08BCD15974A68F87F40CDAFFDBDCD239F79E1352B7BA69A04CD3A33F8902206C68EDCE9BA4703ADC1857B23834929E12FFF5C6A4FE2857C24558DCEFD83029',
      hash: '4816C3B849A96C68A3B11C1011CA75603D836AEB163E5F0C13F9F4A3EA905BDB',
      inLedger: 17855666,
      ledger_index: 17855666
    }
  ]
}
```
:::
#### 4.4.2 Remote.rpcTx(params: IRpcTxOptions) 获取事务内容
::: tip 参数
```typescript
export interface IRpcTxOptions {
  transaction: string
  binray?: boolean
  min_ledger?: number
  max_ledger?: number
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| transaction  | string      | 指定事务哈希 |
| binary       | Boolean     | 可选参数，默认为假，设置为真时，以原始编码返回|
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcTx({transaction: '1C955BFC05E5A434DF041C4E4AFA8891DF1AAFBE504707F01A94EBD0F0A76181'}).then(console.log)
Promise { <pending> }
> {
  Account: 'jasyAHN5mKpLJpefdnpyPeaihoTdsY5RUo',
  Amount: {
    currency: 'JEQC',
    issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
    value: '2.146'
  },
  Destination: 'jM6wEZJnHYWv6Vdy4skdhpb1xAUXGvf3uD',
  Fee: '10',
  Flags: 0,
  Memos: [ { Memo: [Object] } ],
  Sequence: 2,
  SigningPubKey: '022B17F87C523C1675BCE5BDCF0CB263159F28382C745AC13D64022DDAD7EFA332',
  TransactionType: 'Payment',
  TxnSignature: '3044022078DC1A37C8EEA61B93A1DF24F1102D1708F5A4F3A1D1D04BFF326C61541F2B8802203415FA3E32F857CC6FE593757D09D941F6608427644DF9C07AA64B7834B6B07F',
  date: 661161510,
  hash: '1C955BFC05E5A434DF041C4E4AFA8891DF1AAFBE504707F01A94EBD0F0A76181',
  inLedger: 17800000,
  ledger_index: 17800000,
  meta: {
    AffectedNodes: [ [Object], [Object], [Object], [Object] ],
    TransactionIndex: 0,
    TransactionResult: 'tesSUCCESS'
  },
  status: 'success',
  validated: true
}

```
:::
#### 4.4.3 Remote.rpcTxEntry(params: IRpcTxEntryOptions) 从特定帐本获取事务内容
::: tip 参数
```typescript
export interface IRpcTxEntryOptions {
  ledger_index?: "validated" | "closed" | "current" | number
  ledger_hash?: string
  tx_hash: string
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| tx_hash      | string      | 指定事务, 区块哈希 |
| ledger_index | Uint/string | 可选参数, 指定账本,"validated","closed","current"或区块编号 |
| ledger_hash  | string      | 可选参数, 指定账本, 区块哈希 |
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcTxEntry({ledger_hash: "433D4046C84DE4E9619FF17F1BCF4C6D908DF08E5AE762D5170097E104405B70", tx_hash: "1C955BFC05E5A434DF041C4E4AFA8891DF1AAFBE504707F01A94EBD0F0A76181"}).then(console.log)
Promise { <pending> }
> {
  ledger_hash: '433D4046C84DE4E9619FF17F1BCF4C6D908DF08E5AE762D5170097E104405B70',
  ledger_index: 17800000,
  metadata: {
    AffectedNodes: [ [Object], [Object], [Object], [Object] ],
    TransactionIndex: 0,
    TransactionResult: 'tesSUCCESS'
  },
  status: 'success',
  tx_json: {
    Account: 'jasyAHN5mKpLJpefdnpyPeaihoTdsY5RUo',
    Amount: {
      currency: 'JEQC',
      issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
      value: '2.146'
    },
    Destination: 'jM6wEZJnHYWv6Vdy4skdhpb1xAUXGvf3uD',
    Fee: '10',
    Flags: 0,
    Memos: [ [Object] ],
    Sequence: 2,
    SigningPubKey: '022B17F87C523C1675BCE5BDCF0CB263159F28382C745AC13D64022DDAD7EFA332',
    TransactionType: 'Payment',
    TxnSignature: '3044022078DC1A37C8EEA61B93A1DF24F1102D1708F5A4F3A1D1D04BFF326C61541F2B8802203415FA3E32F857CC6FE593757D09D941F6608427644DF9C07AA64B7834B6B07F',
    hash: '1C955BFC05E5A434DF041C4E4AFA8891DF1AAFBE504707F01A94EBD0F0A76181',
    inLedger: 17800000,
    ledger_index: 17800000
  },
  validated: true
}

```
:::
#### 4.4.4 Remote.rpcSubmit(params: IRpcSubmitOptions) 提交单签事务
::: danger
sign-and-submit模式不应该使用，这里只使用submit-only模式，本地签名
:::
::: tip 参数
```typescript
export interface IRpcSubmitOptions {
  tx_blob: string
  fail_hard?: boolean
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| tx_blob      | string      | 签名后得到的blob，是序列化后的哈希 |
| fail_hard    | boolean     | 可选参数, 默认false。 为真时不尝试其它服务器 |
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcSubmit({tx_blob: "12000022000000002400000EA4614000000002160EC068400000000000000A732103E466DB080F3863F354E9C1B1CA0927175B338C41789ACFC0EFAD50301524C23E7446304402200A1F6E65FD9D7076E4589C5BA13E2433B1C2CA9E7C0E42EFC7D57F22C74B1B780220355A2456589B79FD6D6185FD5A74BDE44CFB10E0F6711E4A3BF86FE531C72E6C81141C3D155BB13D3FE79CBF85E5C1DCB6B508079ABE83140ECD295EA24E99608A9B346838EB991BCF143E62F9EA7C06737472696E677D00E1F1"}).then(console.log)
Promise { <pending> }
> {
  engine_result: 'tefPAST_SEQ',
  engine_result_code: -190,
  engine_result_message: 'This sequence number has already past.',
  status: 'success',
  tx_blob: '12000022000000002400000EA4614000000002160EC068400000000000000A732103E466DB080F3863F354E9C1B1CA0927175B338C41789ACFC0EFAD50301524C23E7446304402200A1F6E65FD9D7076E4589C5BA13E2433B1C2CA9E7C0E42EFC7D57F22C74B1B780220355A2456589B79FD6D6185FD5A74BDE44CFB10E0F6711E4A3BF86FE531C72E6C81141C3D155BB13D3FE79CBF85E5C1DCB6B508079ABE83140ECD295EA24E99608A9B346838EB991BCF143E62F9EA7C06737472696E677D00E1F1',
  tx_json: {
    Account: 'js2KaXJMUZoXA47Ua2wZyXRDmLL55mhPSN',
    Amount: '35000000',
    Destination: 'jpMGNZgCk4jnDnQfr95XF3NnnryC4tduAG',
    Fee: '10',
    Flags: 0,
    Memos: [ [Object] ],
    Sequence: 3748,
    SigningPubKey: '03E466DB080F3863F354E9C1B1CA0927175B338C41789ACFC0EFAD50301524C23E',
    TransactionType: 'Payment',
    TxnSignature: '304402200A1F6E65FD9D7076E4589C5BA13E2433B1C2CA9E7C0E42EFC7D57F22C74B1B780220355A2456589B79FD6D6185FD5A74BDE44CFB10E0F6711E4A3BF86FE531C72E6C',
    hash: 'B7C029F58D754C133D329243B21959E10DC5FC2E36DEC8DF4713086EBEA097A9'
  }
}
```
:::
#### 4.4.5 Remote.rpcSubmitMultisigned(params: IRpcSubmitMultisignedOptions) 提交多签事务
::: warning
To be successful, the weights of the signatures must be equal or higher than the quorum of the SignerList.
:::
::: tip 参数
```typescript
export interface IRpcSubmitMultisignedOptions {
  tx_json: string
  fail_hard?: boolean
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| tx_json      | string      | 多签签名后得到的tx_json |
| fail_hard    | boolean     | 可选参数, 默认false。 为真时不尝试其它服务器 |
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> tx_json = {
...   "Flags": 0,
...   "Fee": 20000,
...   "TransactionType": "Payment",
...   "Account": "jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D",
...   "Amount": "1000000",
...   "Destination": "jLXCzapdDd1K11EtUv4Nz4agj8DPVbARjk",
...   "Sequence": 11,
...   "Signers": [
...     {
.....       "Signer": {
.......         "Account": "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz",
.......         "SigningPubKey": "029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15",
.......         "TxnSignature": "3045022100D788CFBD76BB183D43E175191BD37965D01EFDD9D7F978B4DC7AED1F6421CA5B0220334448FEAF2A153EEF24FDFB7E4BC90BFFB29EBEB32342CEA3234F4737E9C967"
.......       }
.....     },
...     {
.....       "Signer": {
.......         "Account": "jfdqBEDsbk3eMSXX2t7CGeu2RPkEjHs6ie",
.......         "SigningPubKey": "0261DD84455B92BDFD59C1DB2A5BD9CE1A3AF0FD531A08EEB2EE354C3BB230B878",
.......         "TxnSignature": "3045022100FC692AF1374D347C7E53205F165EF7F9AD3F96F558A2BE339947E277AB74447102204B8103DCA38AEC05A1EFD65C4E635242E882449B98328EAF13DC0DD2AFC0F239"
.......       }
.....     }
...   ],
...   "SigningPubKey": ""
... }
{
  Flags: 0,
  Fee: 20000,
  TransactionType: 'Payment',
  Account: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
  Amount: '1000000',
  Destination: 'jLXCzapdDd1K11EtUv4Nz4agj8DPVbARjk',
  Sequence: 11,
  Signers: [ { Signer: [Object] }, { Signer: [Object] } ],
  SigningPubKey: ''
}
> remote.rpcSubmitMultisigned({tx_json}).then(console.log)
Promise { <pending> }
> {
  engine_result: 'terPRE_SEQ',
  engine_result_code: -92,
  engine_result_message: 'Missing/inapplicable prior transaction.',
  status: 'success',
  tx_blob: '1200002200000000240000000B6140000000000F4240684000000000004E2073008114054FADDC8595E2950FA43F673F65C2009F58C7F18314D6376941DD44B16D5A9652C5A8B928B2B336B95FFCED7321029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E1574473045022100D788CFBD76BB183D43E175191BD37965D01EFDD9D7F978B4DC7AED1F6421CA5B0220334448FEAF2A153EEF24FDFB7E4BC90BFFB29EBEB32342CEA3234F4737E9C96781141359AA928F4D98FDB3D93E8B690C80D37DED11C3E1ED73210261DD84455B92BDFD59C1DB2A5BD9CE1A3AF0FD531A08EEB2EE354C3BB230B87874473045022100FC692AF1374D347C7E53205F165EF7F9AD3F96F558A2BE339947E277AB74447102204B8103DCA38AEC05A1EFD65C4E635242E882449B98328EAF13DC0DD2AFC0F239811448C7F1F5E9D4D0FC0D3F16F1606ACCCFB8D51463E1F1',
  tx_json: {
    Account: 'jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D',
    Amount: '1000000',
    Destination: 'jLXCzapdDd1K11EtUv4Nz4agj8DPVbARjk',
    Fee: '20000',
    Flags: 0,
    Sequence: 11,
    Signers: [ [Object], [Object] ],
    SigningPubKey: '',
    TransactionType: 'Payment',
    hash: '92BD7DC9D9955C5813E61A4C2D9FB712379A29A9C7F3FD7384FDBB01E8A7829B'
  }
}
```
:::
### 4.5 路径和挂单相关
#### 4.5.1 Remote.rpcBookOffers(params: IRpcBookOffersOptions) 获取交易两种通证的挂单
::: tip 参数
```typescript
export interface IRpcBookOffersOptions {
  taker_pays: object
  taker_gets: object
  ledger_index?: "validated" | "closed" | "current" | number
  ledger_hash?: string
  limit?: number
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| taker_gets   | object      | 接受挂单的账号`得到`的货币和发行者 |
| taker_pays   | object      | 接受挂单的账号`提供`的货币和发行者 |
| ledger_index | Uint/string | 可选参数, 指定账本,"validated","closed","current"或区块编号 |
| ledger_hash  | string      | 可选参数, 指定账本, 区块哈希 |
| limit        | number      | 可选参数，限制返回的数目 |
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcBookOffers({taker_pays: {currency: "SWT", issuer: ""}, taker_gets: {currency: "CNY", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"}, limit: 2}).then(console.log)
Promise { <pending> }
> {
  ledger_current_index: 17857995,
  offers: [
    {
      Account: 'jajX5uTGnkhskXYjvnhhER7cK6Hum4H51U',
      BookDirectory: '51603377F758E3C8FA007C77312DDA06A737A1395CD5FC435D20E477B26300B0',
      BookNode: '0000000000000000',
      Flags: 0,
      LedgerEntryType: 'Offer',
      OwnerNode: '0000000000000000',
      PreviousTxnID: '5B1D643C21275976D57DFE923D553AD71536E8A6EFD9CD65717D4A5BF6037256',
      PreviousTxnLgrSeq: 17854900,
      Sequence: 2791,
      TakerGets: [Object],
      TakerPays: '500000000000',
      index: '15E1C0A9A84B21A57858A24070FEAC91424C601BDB8BB35E553CEC1C7351C016',
      owner_funds: '8502.275898725341',
      quality: '925840199.9814832'
    },
    {
      Account: 'jwpEySXz9NCfKhE5BL5g7o7QKfnc9xcbz2',
      BookDirectory: '51603377F758E3C8FA007C77312DDA06A737A1395CD5FC435D20E52955EFE040',
      BookNode: '0000000000000000',
      Flags: 0,
      LedgerEntryType: 'Offer',
      OwnerNode: '0000000000000000',
      PreviousTxnID: '7118865C9EC18F257EE1DD4141B591D3DD7E0034CC6D4155C34180E340E78040',
      PreviousTxnLgrSeq: 17854730,
      Sequence: 14991,
      TakerGets: [Object],
      TakerPays: '535197754071',
      index: '4441FFCC9A604F1EF8D907C43C33076F922B632A91FF9C15818EF5558DEDBA95',
      owner_funds: '580.0194615722775',
      quality: '925916495.2944704'
    }
  ],
  status: 'success',
  validated: false
}
```
:::
#### 4.5.2 Remote.rpcSkywellPathFind(params: IRpcSkywellPathFindOptions) 获取两个账户间的交易路径
::: tip 参数
```typescript
export interface IRpcBookOffersOptions {
  taker_pays: object
  taker_gets: object
  ledger_index?: "validated" | "closed" | "current" | number
  ledger_hash?: string
  limit?: number
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| taker_gets   | object      | 接受挂单的账号`得到`的货币和发行者 |
| taker_pays   | object      | 接受挂单的账号`提供`的货币和发行者 |
| ledger_index | Uint/string | 可选参数, 指定账本,"validated","closed","current"或区块编号 |
| ledger_hash  | string      | 可选参数, 指定账本, 区块哈希 |
| limit        | number      | 可选参数，限制返回的数目 |
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcSkywellPathFind({
        destination_account: "jGxW97eCqxfAWvmqSgNkwc2apCejiM89bG",
        source_account: "jGxW97eCqxfAWvmqSgNkwc2apCejiM89bG",
        destination_amount: remote.makeAmount(1, "cny"),
        source_currencies: [ remote.makeCurrency("vcc"), remote.makeCurrency("jcc") ]
      }).then(console.log)
```
:::
### 4.6 账户相关
#### 4.6.1 Remote.rpcAccountInfo(params: IRpcAccountInfoOptions) 获取账户基本信息
::: tip 参数
```typescript
export interface IRpcAccountInfoOptions {
  account: string
  ledger_index?: "validated" | "closed" | "current" | number
  ledger_hash?: string
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| account      | string      | 指定账户, 地址 |
| ledger_index | Uint/string | 可选参数, 指定账本,"validated","closed","current"或区块编号 |
| ledger_hash  | string      | 可选参数, 指定账本, 区块哈希 |
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcAccountInfo({account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz"}).then(console.log)
Promise { <pending> }
> {
  account_data: {
    Account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
    Balance: '52359960',
    Flags: 0,
    LedgerEntryType: 'AccountRoot',
    OwnerCount: 7,
    PreviousTxnID: '55791A6BD2C0D71D339B2366D9A60F2AB71829648EC8F0B10EBD941A5D663433',
    PreviousTxnLgrSeq: 17051932,
    Sequence: 109,
    index: 'DB35CDEAF3F0D3C190B041C0C7D92FB0E43CBCBFAD4F498C28858A35CEA8BBB7'
  },
  ledger_current_index: 17857652,
  status: 'success',
  validated: false
}
```
:::
#### 4.6.2 Remote.rpcAccountObjects(params: IRpcAccountObjectsOptions) 获取账户扩展信息
::: tip 参数
```typescript
export interface IRpcAccountObjectsOptions {
  account: string
  ledger_index?: "validated" | "closed" | "current" | number
  ledger_hash?: string
  type?: "offer" | "ticket" | "state" | "deposit_preauth" | "SignerList"
  limit?: number
  marker?: IMarker
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| account      | string      | 指定账户, 地址 |
| ledger_index | Uint/string | 可选参数, 指定账本,"validated","closed","current"或区块编号 |
| ledger_hash  | string      | 可选参数, 指定账本, 区块哈希 |
| type         | string      | 可选参数，过滤类型 |
| limit        | number      | 可选参数，默认10 |
| marker       | IMarker     | 可选参数，分页相关 |
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcAccountObjects({account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz"}).then(console.log)
Promise { <pending> }
> {
  account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
  account_objects: [
    {
      Balance: [Object],
      Flags: 1114112,
      HighLimit: [Object],
      HighNode: '000000000000A54B',
      LedgerEntryType: 'SkywellState',
      LowLimit: [Object],
      LowNode: '0000000000000000',
      PreviousTxnID: '55791A6BD2C0D71D339B2366D9A60F2AB71829648EC8F0B10EBD941A5D663433',
      PreviousTxnLgrSeq: 17051932,
      index: 'B5904B308E9CD91DCF9ECB863F27FDD24B94C9109BAD70AE184CC0C8F0D0F4D7'
    },
    {
      Balance: [Object],
      Flags: 0,
      HighLimit: [Object],
      HighNode: '0000000000000000',
      LedgerEntryType: 'TrustState',
      LowLimit: [Object],
      LowNode: '0000000000000000',
      RelationType: 1,
      index: 'F27DB8B79BFE0A2ADC7225301945D3B24023AD32BDFAF010B76B4CD62821C53E'
    },
    {
      FeeAccountID: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
      FeeCurrency: 'JSLASH',
      FeeCurrencyIssuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
      Flags: 0,
      HighNode: '000000000000B0B2',
      LedgerEntryType: 'Brokerage',
      LowNode: '0000000000000000',
      OfferFeeRateDen: '00000000000003E8',
      OfferFeeRateNum: '0000000000000001',
      Platform: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
      index: 'F4BAC6B760B91575B18922CA630AE448F2796C365086EF2EC2A9A84806457970'
    },
    {
      Flags: 0,
      LedgerEntryType: 'SignerList',
      OwnerNode: '0000000000000000',
      PreviousTxnID: '5917B3F760BFC0F5BFE5EF5EAE2642FDEE6908606E37FE76561C7A7F137B76C9',
      PreviousTxnLgrSeq: 15203720,
      SignerEntries: [Array],
      SignerQuorum: 5,
      index: '4A017344F9068871DC873D548052FFFF7271B86DDEB68AA93A515A5D0228BC21'
    },
    {
      Balance: [Object],
      Flags: 0,
      HighLimit: [Object],
      HighNode: '0000000000000000',
      LedgerEntryType: 'TrustState',
      LowLimit: [Object],
      LowNode: '0000000000000000',
      RelationType: 3,
      index: '765D5AE12803F142209C246ECB3DF61A6BA883019DBE7CE065D7BB25266EB20E'
    },
    {
      FeeAccountID: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
      FeeCurrency: 'CNY',
      FeeCurrencyIssuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
      Flags: 0,
      HighNode: '000000000000DD69',
      LedgerEntryType: 'Brokerage',
      LowNode: '0000000000000000',
      OfferFeeRateDen: '00000000000003E8',
      OfferFeeRateNum: '0000000000000001',
      Platform: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
      index: 'E58E4B5BE423BDBC8C9DCC09E31B723E02FB95716C9F26FB132EBBB782CDE610'
    },
    {
      Balance: [Object],
      Flags: 1114112,
      HighLimit: [Object],
      HighNode: '000000000000ED46',
      LedgerEntryType: 'SkywellState',
      LowLimit: [Object],
      LowNode: '0000000000000000',
      PreviousTxnID: '722DD0C5D911F8CABFBDD495A1609FDB6EA047F03E450F535B6006BC37C001C4',
      PreviousTxnLgrSeq: 16941122,
      index: '8AB1084F4EACAEF5BCCF0317B96BCACCA4EB3253B2D5BDAC5955C73DCCB4AA26'
    }
  ],
  ledger_current_index: 17857656,
  status: 'success',
  validated: false
}
```
:::
#### 4.6.3 Remote.rpcAccountCurrencies(params: IRpcAccountCurrenciesOptions) 获取账户可发送/接收token
::: tip 参数
```typescript
export interface IRpcAccountCurrenciesOptions {
  account: string
  ledger_index?: "validated" | "closed" | "current" | number
  ledger_hash?: string
  strict?: boolean
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| account      | string      | 指定账户, 地址 |
| ledger_index | Uint/string | 可选参数, 指定账本,"validated","closed","current"或区块编号 |
| ledger_hash  | string      | 可选参数, 指定账本, 区块哈希 |
| strict       | boolean     | 可选参数, 严格模式，account要求地址或公钥 |
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcAccountCurrencies({account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz"}).then(console.log)
Promise { <pending> }
> {
  ledger_current_index: 17857771,
  receive_currencies: [ 'JCALL', 'JSLASH' ],
  send_currencies: [ 'JCALL', 'JSLASH' ],
  status: 'success',
  validated: false
}
```
:::
#### 4.6.4 Remote.rpcAccountLines(params: IRpcAccountLinesOptions) 获取账户信任线
::: tip 参数
```typescript
export interface IRpcAccountLinesOptions {
  account: string
  ledger_index?: "validated" | "closed" | "current" | number
  ledger_hash?: string
  strict?: boolean
  peer?: string
  marker?: IMarker
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| account      | string      | 指定账户, 地址 |
| ledger_index | Uint/string | 可选参数, 指定账本,"validated","closed","current"或区块编号 |
| ledger_hash  | string      | 可选参数, 指定账本, 区块哈希 |
| strict       | boolean     | 可选参数, 严格模式，account要求地址或公钥 |
| peer         | string      | 可选参数, 第二个账户的地址，如果提供，则只显示连接这两个账户之间的trust_line |
| marker       | IMarker     | 可选参数，分页相关 |
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcAccountLines({account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz"}).then(console.log)
Promise { <pending> }
> {
  account: 'jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz',
  ledger_current_index: 17857806,
  lines: [
    {
      account: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
      balance: '61.998',
      currency: 'JSLASH',
      limit: '10000000000',
      limit_peer: '0',
      no_skywell: true,
      quality_in: 0,
      quality_out: 0
    },
    {
      account: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
      balance: '6',
      currency: 'JCALL',
      limit: '10000000000',
      limit_peer: '0',
      no_skywell: true,
      quality_in: 0,
      quality_out: 0
    }
  ],
  status: 'success',
  validated: false
}
```
:::
#### 4.6.5 Remote.rpcAccountOffers(params: IRpcAccountOffersOptions) 获取账户挂单
::: tip 参数
```typescript
export interface IRpcAccountOffersOptions {
  account: string
  ledger_index?: "validated" | "closed" | "current" | number
  ledger_hash?: string
  strict?: boolean
  limit?: number
  marker?: IMarker
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| account      | string      | 指定账户, 地址 |
| ledger_index | Uint/string | 可选参数, 指定账本,"validated","closed","current"或区块编号 |
| ledger_hash  | string      | 可选参数, 指定账本, 区块哈希 |
| strict       | boolean     | 可选参数, 严格模式，account要求地址或公钥 |
| limit        | number      | 可选参数, 分页相关， 最大返回数目 |
| marker       | IMarker     | 可选参数，分页相关 |
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcAccountOffers({account: "jGxW97eCqxfAWvmqSgNkwc2apCejiM89bG"}).then(console.log)
Promise { <pending> }
> {
  account: 'jGxW97eCqxfAWvmqSgNkwc2apCejiM89bG',
  ledger_current_index: 17858547,
  offers: [
    {
      flags: 131072,
      seq: 758,
      taker_gets: [Object],
      taker_pays: '625000000000'
    }
  ],
  status: 'success',
  validated: false
}
```
:::
#### 4.6.6 Remote.rpcAccountTx(params: IRpcAccountTxOptions) 获取账户事务
::: tip 参数
```typescript
export interface IRpcAccountTxOptions {
  account: string
  ledger_index_min?: number
  ledger_index_max?: number
  ledger_index?: "validated" | "closed" | "current" | number
  ledger_hash?: string
  binary?: boolean
  forward?: boolean
  limit?: number
  marker?: IMarker
}
```
:::
::: details 参数说明
| 参数          | 类型        | 解析
|--------------|-------------|-----| 
| account      | string      | 指定账户, 地址 |
| ledger_index_min | Int     | 可选参数, 指定包含交易的最早账本，-1表示指定服务器使用最早可以获得的经过验证的账本。 |
| ledger_index_max | Int     | 可选参数, 指定包含交易的最迟账本，-1表示指定服务器使用最迟可以获得的经过验证的账本。 |
| ledger_index | Uint/string | 可选参数, 指定账本,"validated","closed","current"或区块编号 |
| ledger_hash  | string      | 可选参数, 指定账本, 区块哈希 |
| strict       | boolean     | 可选参数, 严格模式，account要求地址或公钥 |
| limit        | number      | 可选参数, 分页相关， 最大返回数目 |
| marker       | IMarker     | 可选参数，分页相关 |
:::
::: details 代码示例
```javascript
> const Remote = require("@swtc/rpc").Remote
> const remote = new Remote({server: "http://swtclib.ca:5050"})
> remote.rpcAccountTx({account: "jGxW97eCqxfAWvmqSgNkwc2apCejiM89bG", limit: 3}).then(console.log)
Promise { <pending> }
> {
  account: 'jGxW97eCqxfAWvmqSgNkwc2apCejiM89bG',
  ledger_index_max: 17858550,
  ledger_index_min: 266955,
  limit: 3,
  marker: { ledger: 17832370, seq: 0 },
  status: 'success',
  transactions: [
    { meta: [Object], tx: [Object], validated: true },
    { meta: [Object], tx: [Object], validated: true },
    { meta: [Object], tx: [Object], validated: true }
  ]
}
```
:::
