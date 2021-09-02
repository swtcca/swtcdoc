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
### 一些例子
#### 默认为井通公链 "jingtum" {}
::: details 代码
```javascript
> .load chains.js
const Wallet_default = require("@swtc/wallet").Factory()
const Wallet_jingtum = require("@swtc/wallet").Factory({})
console.log(`同指向井通公链 ${Wallet_default.config === Wallet_jingtum.config}`)
console.log(Wallet_default.config)
 
同指向井通公链 true
{
  code: 'jingtum',
  currency: 'SWT',
  issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
  CURRENCIES: {
    CNT: 'CNY',
    JCC: 'JJCC',
    SLASH: 'JSLASH',
    MOAC: 'JMOAC',
    CALL: 'JCALL',
    EKT: 'JEKT',
    ETH: 'JETH'
  },
  XLIB: {
    default_ws: 'ws.bcapps.ca:5020',
    default_api: 'api.bcapps.ca:5080',
    default_ws_failover: 'ws-failover.bcapps.ca:5020',
    default_api_failover: 'api-failover.bcapps.ca:5080'
  },
  ACCOUNT_ALPHABET: 'jpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65rkm8oFqi1tuvAxyz',
  SEED_PREFIX: 33,
  ACCOUNT_PREFIX: 0,
  ACCOUNT_ZERO: 'jjjjjjjjjjjjjjjjjjjjjhoLvTp',
  ACCOUNT_ONE: 'jjjjjjjjjjjjjjjjjjjjBZbvri',
  fee: 10000,
  guomi: false,
  ACCOUNT_GENESIS: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh'
}
```
:::
#### 用字符串标识注册的公链 "ripple" "call" "bizain"
::: details 代码
```javascript
> .load registeredchains.js
const Wallet_ripple = require("@swtc/wallet").Factory('ripple')
const Wallet_call = require("@swtc/wallet").Factory("call")
console.log(`瑞波链`)
console.log(Wallet_ripple.config)
console.log(`CALL链`)
console.log(Wallet_call.config)
 
瑞波链
{
  code: 'ripple',
  currency: 'XRP',
  simple: true,
  ACCOUNT_ALPHABET: 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz',
  fee: 10,
  guomi: false,
  ACCOUNT_ZERO: 'rrrrrrrrrrrrrrrrrrrrrhoLvTp',
  ACCOUNT_ONE: 'rrrrrrrrrrrrrrrrrrrrBZbvji',
  ACCOUNT_GENESIS: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
  issuer: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
  CURRENCIES: {},
  XLIB: {}
}
CALL链
{
  code: 'call',
  currency: 'CALL',
  ACCOUNT_ALPHABET: 'cpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2brdeCg65jkm8oFqi1tuvAxyz',
  fee: 10,
  guomi: false,
  ACCOUNT_ZERO: 'ccccccccccccccccccccchoLvTp',
  ACCOUNT_ONE: 'ccccccccccccccccccccBZbvji',
  ACCOUNT_GENESIS: 'cHb9CJAWyB4cj91VRWn96DkukG4bwdtyTh',
  issuer: 'cHb9CJAWyB4cj91VRWn96DkukG4bwdtyTh',
  CURRENCIES: {},
  XLIB: {}
}
```
:::
#### 用对象来标识 联盟链/测试链/国密链 {guomi: true} {fee: 1000}
::: details 代码
```javascript
> .load testchains.js
const Wallet_test = require("@swtc/wallet").Factory({})
const Wallet_test_more = require("@swtc/wallet").Factory({fee: 100, issuer: "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"})
const Wallet_guomi = require("@swtc/wallet").Factory({guomi: true})
const Wallet_guomi_more = require("@swtc/wallet").Factory({guomi: true, fee: 100, issuer: "jHgKXtmDXGJLupHWoeJyisirpZnrvnAA9W"})
 
console.log(`测试/联盟链`)
console.log(Wallet_test.config)
console.log(`测试/联盟链 定制`)
console.log(Wallet_test_more.config)
 
console.log(`国密链`)
console.log(Wallet_guomi.config)
console.log(`国密链 定制`)
console.log(Wallet_guomi_more.config)
 
测试/联盟链
{
  code: 'jingtum',
  currency: 'SWT',
  fee: 10,
  guomi: false,
  ACCOUNT_ALPHABET: 'jpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65rkm8oFqi1tuvAxyz',
  ACCOUNT_ZERO: 'jjjjjjjjjjjjjjjjjjjjjhoLvTp',
  ACCOUNT_ONE: 'jjjjjjjjjjjjjjjjjjjjBZbvri',
  ACCOUNT_GENESIS: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
  issuer: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
  CURRENCIES: {},
  XLIB: {}
}
测试/联盟链 定制
{
  fee: 100,
  issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
  code: 'jingtum',
  currency: 'SWT',
  guomi: false,
  ACCOUNT_ALPHABET: 'jpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65rkm8oFqi1tuvAxyz',
  ACCOUNT_ZERO: 'jjjjjjjjjjjjjjjjjjjjjhoLvTp',
  ACCOUNT_ONE: 'jjjjjjjjjjjjjjjjjjjjBZbvri',
  ACCOUNT_GENESIS: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
  CURRENCIES: {},
  XLIB: {}
}
国密链
{
  guomi: true,
  code: 'jingtum',
  currency: 'SWT',
  fee: 10,
  ACCOUNT_ALPHABET: 'jpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65rkm8oFqi1tuvAxyz',
  ACCOUNT_ZERO: 'jjjjjjjjjjjjjjjjjjjjjn1TT5q',
  ACCOUNT_ONE: 'jjjjjjjjjjjjjjjjjjjjwVBfmE',
  ACCOUNT_GENESIS: 'j9syYwWgtmjchcbqhVB18pmFqXUYahZvvg',
  issuer: 'j9syYwWgtmjchcbqhVB18pmFqXUYahZvvg',
  CURRENCIES: {},
  XLIB: {}
}
国密链 定制
{
  guomi: true,
  fee: 100,
  issuer: 'jHgKXtmDXGJLupHWoeJyisirpZnrvnAA9W',
  code: 'jingtum',
  currency: 'SWT',
  ACCOUNT_ALPHABET: 'jpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65rkm8oFqi1tuvAxyz',
  ACCOUNT_ZERO: 'jjjjjjjjjjjjjjjjjjjjjn1TT5q',
  ACCOUNT_ONE: 'jjjjjjjjjjjjjjjjjjjjwVBfmE',
  ACCOUNT_GENESIS: 'j9syYwWgtmjchcbqhVB18pmFqXUYahZvvg',
  CURRENCIES: {},
  XLIB: {}
}
```
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

### 编码解码 `require("@swtc/address-codec").Factory(chain)`
#### 相同的种子编码后的密钥不同，解码后对应同一个种子
#### 都支持ed25519
::: details 代码
```javascript
> .load seed.js
const addressCodec_jingtum = require("@swtc/address-codec").Factory("jingtum")
const addressCodec_guomi = require("@swtc/address-codec").Factory("guomi")
 
const seed = Buffer.from(`00000000000000000000000000000000`, "hex")
console.log(`同一个种子编码后的密钥不同`)
const secret_jingtum = addressCodec_jingtum.encodeSeed(seed)
const secret_guomi = addressCodec_guomi.encodeSeed(seed)
console.log(`井通： ${secret_jingtum}`)
console.log(`国密： ${secret_guomi}`)
console.log(`解码显示算法`)
console.log(addressCodec_jingtum.decodeSeed(secret_jingtum))
console.log(addressCodec_guomi.decodeSeed(secret_guomi))
 
console.log(`都支持ed25519，同样一个种子编码后的密钥不同`)
const secret_ed25519_jingtum = addressCodec_jingtum.encodeSeed(seed, "ed25519")
const secret_ed25519_guomi = addressCodec_guomi.encodeSeed(seed, "ed25519")
console.log(`井通： ${secret_ed25519_jingtum}`)
console.log(`国密： ${secret_ed25519_guomi}`)
console.log(`解码显示算法`)
console.log(addressCodec_jingtum.decodeSeed(secret_ed25519_jingtum))
console.log(addressCodec_guomi.decodeSeed(secret_ed25519_guomi))
 
同一个种子编码后的密钥不同
井通： sp6JS7f14BuwFY8Mw6bTtLKWauoUs
国密： sp6JS7f14BuwFY8Mw6bTtLKTnTe6w
解码显示算法
{
  version: [ 33 ],
  bytes: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>,
  type: 'secp256k1'
}
{
  version: [ 33 ],
  bytes: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>,
  type: 'sm2p256v1'
}
都支持ed25519，同样一个种子编码后的密钥不同
井通： sEdSJHS4oiAdz7w2X2ni1gFiqtbJHqE
国密： sEdSJHS4oiAdz7w2X2ni1gFiqq1RRce
解码显示算法
{
  version: [ 1, 225, 75 ],
  bytes: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>,
  type: 'ed25519'
}
{
  version: [ 1, 225, 75 ],
  bytes: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>,
  type: 'ed25519'
}
```
:::

### 私钥/公钥 `require("@swtc/keypairs").Factory(chain)`
#### 同一个私钥生成的公钥不同
#### 同一个种子生成的私钥不同
#### 都支持ed25519
#### 签名和验证签名
::: details 代码
```javascript
> .load keypairs.js
const Keypair_jingtum = require("@swtc/keypairs").Factory("jingtum")
const Keypair_guomi = require("@swtc/keypairs").Factory({guomi: true})
addressCodec_jingtum = Keypair_jingtum.addressCodec
addressCodec_guomi = Keypair_guomi.addressCodec
 
const PRIVATE_KEY = `002512BBDFDBB77510883B7DCCBEF270B86DEAC8B64AC762873D75A1BEE6298665`
console.log(`同一个私钥生成的公钥不同`)
const pubkey_jingtum = Keypair_jingtum.deriveKeypair(PRIVATE_KEY).publicKey
const pubkey_guomi = Keypair_guomi.deriveKeypair(PRIVATE_KEY).publicKey
console.log(`私    钥: ${PRIVATE_KEY}`)
console.log(`井通公钥: ${pubkey_jingtum}`)
console.log(`国密公钥：${pubkey_guomi}`)
 
const seed = Buffer.from(`00000000000000000000000000000000`, "hex")
console.log(`同一个种子生成的私钥不同`)
const secret_jingtum = addressCodec_jingtum.encodeSeed(seed)
const secret_guomi = addressCodec_guomi.encodeSeed(seed)
const keypairs_jingtum = Keypair_jingtum.deriveKeypair(secret_jingtum)
const keypairs_guomi = Keypair_guomi.deriveKeypair(secret_guomi)
console.log(`井通:`)
console.log(keypairs_jingtum)
console.log(`国密：`)
console.log(keypairs_guomi)
 
console.log(`都支持ed25519，同样一个种子生成的私钥不同`)
const secret_ed25519_jingtum = addressCodec_jingtum.encodeSeed(seed, "ed25519")
const secret_ed25519_guomi = addressCodec_guomi.encodeSeed(seed, "ed25519")
const keypairs_ed25519_jingtum = Keypair_jingtum.deriveKeypair(secret_ed25519_jingtum, "ed25519")
const keypairs_ed25519_guomi = Keypair_guomi.deriveKeypair(secret_ed25519_guomi, "ed25519")
console.log(`井通:`)
console.log(keypairs_ed25519_jingtum)
console.log(`国密：`)
console.log(keypairs_ed25519_guomi)
 
console.log(`签名 和 验证签名`)
const message = "hello how do you do"
console.log(`待签名信息： ${message}`)
const signed_jingtum = Keypair_jingtum.sign(message, keypairs_jingtum.privateKey) 
console.log(`井通签名: ${signed_jingtum}`)
console.log(`井通验证: ${Keypair_jingtum.verify(message, signed_jingtum, keypairs_jingtum.publicKey)}`)
const signed_guomi = Keypair_guomi.sign(message, keypairs_guomi.privateKey) 
console.log(`国密签名: ${signed_guomi}`)
console.log(`国密验证: ${Keypair_guomi.verify(message, signed_guomi, keypairs_guomi.publicKey)}`)
 
同一个私钥生成的公钥不同
私    钥: 002512BBDFDBB77510883B7DCCBEF270B86DEAC8B64AC762873D75A1BEE6298665
井通公钥: 0390A196799EE412284A5D80BF78C3E84CBB80E1437A0AECD9ADF94D7FEAAFA284
国密公钥：035A7079DF68641377666464E0B7B6CF4953D4C55741AE6442701BB3ABB069CB14
同一个种子生成的私钥不同
井通:
{
  privateKey: '002512BBDFDBB77510883B7DCCBEF270B86DEAC8B64AC762873D75A1BEE6298665',
  publicKey: '0390A196799EE412284A5D80BF78C3E84CBB80E1437A0AECD9ADF94D7FEAAFA284'
}
国密：
{
  privateKey: '00FD10E5E5A9DD4A35DBF27B931A2D3CA8C6CD4743D74CE4E4C03131DC5A34A9B1',
  publicKey: '024CD9E73D04415C4E0C73C5F7CBF51A6C84871E9746614A345652CDE3F0C09CEB'
}
都支持ed25519，同样一个种子生成的私钥不同
井通:
{
  privateKey: 'ED0B6CBAC838DFE7F47EA1BD0DF00EC282FDF45510C92161072CCFB84035390C4D',
  publicKey: 'ED1A7C082846CFF58FF9A892BA4BA2593151CCF1DBA59F37714CC9ED39824AF85F'
}
国密：
{
  privateKey: 'ED106E34A2B8C7BB13156CFDD0D91379DCC47543DCF9787C68AE5EB582620AE6E8',
  publicKey: 'ED11A47E4CF71B46981ACD0FF7E363278463C4D777453C1982BEEB4E4592768FA8'
}
签名 和 验证签名
待签名信息： hello how do you do
井通签名: 3045022100EBEA129426455020FFDA256084523B8650DF848C2679108C5870F3F9C0B8F13102207122CB117B205D2C7E27EE417999A6C3E60192671AD44C0AF69DA0EF98C4BC3F
井通验证: true
国密签名: 3046022100B8D8AB2332CDADF7DEFD4E7E135A5C1F9D2AD01F47D8BF5AAEF600E70399A235022100A5159AFC93D5BE29B36289D97D27136E20E453E63961D69694398DB45C735386
国密验证: true
```
:::

### 钱包 `require("@swtc/wallet").Factory()`
#### 静态方法 Wallet.generate() Wallet.fromSecret(secret) Wallet.fromPhrase(phrase)
::: details 代码
```javascript
> .load wallet2.js
const Wallet_jingtum = require("@swtc/wallet").Factory("jingtum")
const Wallet_guomi = require("@swtc/wallet").Factory({guomi: true})
const addressCodec_jingtum = Wallet_jingtum.KeyPair.addressCodec
const addressCodec_guomi = Wallet_guomi.KeyPair.addressCodec
 
const seed = Buffer.from(`00000000000000000000000000000000`, "hex")
const secret_jingtum = addressCodec_jingtum.encodeSeed(seed)
const secret_guomi = addressCodec_guomi.encodeSeed(seed)
 
console.log(Wallet_jingtum.generate()) 
console.log(Wallet_guomi.generate()) 
 
console.log(Wallet_jingtum.fromSecret(secret_jingtum))
console.log(Wallet_guomi.fromSecret(secret_guomi))
 
console.log(Wallet_jingtum.fromPhrase('masterpassphrase'))
console.log(Wallet_guomi.fromPhrase('masterpassphrase'))
 
{
  secret: 'ssKhPpenrKvR96RxEkf96TLffwYZv',
  address: 'jpm59XTLSL6kr8dcg8nxTgk549nJCfdmp9'
}
{
  secret: 'ss2RoG276RxttWVPZh2JKfMTJHRSb',
  address: 'jDyPSXDXVE46h2LnrJQWHneecvqzJGoQbA'
}
{
  secret: 'sp6JS7f14BuwFY8Mw6bTtLKWauoUs',
  address: 'jGCkuB7PBj5tNy68tPEABEtcdno4hE6Y7f'
}
{
  secret: 'sp6JS7f14BuwFY8Mw6bTtLKTnTe6w',
  address: 'jN6pecdxLqs9TbZ1HugLXYQg3qnzseRoiK'
}
{
  secret: 'snoPBjXtMeMyMHUVTgbuqAfg1SUTb',
  address: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh'
}
{
  secret: 'shstwqJpVJbsqFA5uYJJw1YniXcDF',
  address: 'j9syYwWgtmjchcbqhVB18pmFqXUYahZvvg'
}
```
:::
#### 钱包实例 new Wallet(secret)
::: details 代码
```javascript
> .load wallet3.js
const Wallet_jingtum = require("@swtc/wallet").Factory("jingtum")
const Wallet_guomi = require("@swtc/wallet").Factory({guomi: true})
const Keypair_jingtum = Wallet_jingtum.KeyPair
const Keypair_guomi = Wallet_guomi.KeyPair
addressCodec_jingtum = Keypair_jingtum.addressCodec
addressCodec_guomi = Keypair_guomi.addressCodec
 
const seed = Buffer.from(`00000000000000000000000000000000`, "hex")
const secret_jingtum = addressCodec_jingtum.encodeSeed(seed)
const secret_guomi = addressCodec_guomi.encodeSeed(seed)
 
console.log(`井通：`)
console.log(new Wallet_jingtum(secret_jingtum))
console.log(`国密：`)
console.log(new Wallet_guomi(secret_guomi))
 
console.log(`都支持ed25519`)
const secret_ed25519_jingtum = addressCodec_jingtum.encodeSeed(seed, "ed25519")
const secret_ed25519_guomi = addressCodec_guomi.encodeSeed(seed, "ed25519")
console.log(`井通：`)
console.log(new Wallet_jingtum(secret_ed25519_jingtum))
console.log(`国密：`)
console.log(new Wallet_guomi(secret_ed25519_guomi))
 
 
 
井通：
Wallet {
  _keypairs: {
    privateKey: '002512BBDFDBB77510883B7DCCBEF270B86DEAC8B64AC762873D75A1BEE6298665',
    publicKey: '0390A196799EE412284A5D80BF78C3E84CBB80E1437A0AECD9ADF94D7FEAAFA284'
  },
  _secret: 'sp6JS7f14BuwFY8Mw6bTtLKWauoUs'
}
国密：
Wallet {
  _keypairs: {
    privateKey: '00FD10E5E5A9DD4A35DBF27B931A2D3CA8C6CD4743D74CE4E4C03131DC5A34A9B1',
    publicKey: '024CD9E73D04415C4E0C73C5F7CBF51A6C84871E9746614A345652CDE3F0C09CEB'
  },
  _secret: 'sp6JS7f14BuwFY8Mw6bTtLKTnTe6w'
}
都支持ed25519
井通：
Wallet {
  _keypairs: {
    privateKey: 'ED0B6CBAC838DFE7F47EA1BD0DF00EC282FDF45510C92161072CCFB84035390C4D',
    publicKey: 'ED1A7C082846CFF58FF9A892BA4BA2593151CCF1DBA59F37714CC9ED39824AF85F'
  },
  _secret: 'sEdSJHS4oiAdz7w2X2ni1gFiqtbJHqE'
}
国密：
Wallet {
  _keypairs: {
    privateKey: 'ED106E34A2B8C7BB13156CFDD0D91379DCC47543DCF9787C68AE5EB582620AE6E8',
    publicKey: 'ED11A47E4CF71B46981ACD0FF7E363278463C4D777453C1982BEEB4E4592768FA8'
  },
  _secret: 'sEdSJHS4oiAdz7w2X2ni1gFiqq1RRce'
}
```
:::
#### 钱包主要包装上面的 Keypairs 和 addressCodec 
::: details 代码
```javascript
> .load wallet.js
const Wallet_jingtum = require("@swtc/wallet").Factory("jingtum")
const Wallet_guomi = require("@swtc/wallet").Factory({guomi: true})
const Keypair_jingtum = Wallet_jingtum.KeyPair
const Keypair_guomi = Wallet_guomi.KeyPair
addressCodec_jingtum = Keypair_jingtum.addressCodec
addressCodec_guomi = Keypair_guomi.addressCodec
 
const seed = Buffer.from(`00000000000000000000000000000000`, "hex")
console.log(`同一个种子编码后的地址不同`)
const secret_jingtum = addressCodec_jingtum.encodeSeed(seed)
const secret_guomi = addressCodec_guomi.encodeSeed(seed)
const address_jingtum = Wallet_jingtum.fromSecret(secret_jingtum).address
const address_guomi = Wallet_guomi.fromSecret(secret_guomi).address
console.log(`井通： ${address_jingtum}`)
console.log(`国密： ${address_guomi}`)
 
console.log(`都支持ed25519，同样一个种子编码后的密钥不同`)
const secret_ed25519_jingtum = addressCodec_jingtum.encodeSeed(seed, "ed25519")
const secret_ed25519_guomi = addressCodec_guomi.encodeSeed(seed, "ed25519")
const address_ed25519_jingtum = Wallet_jingtum.fromSecret(secret_ed25519_jingtum).address
const address_ed25519_guomi = Wallet_guomi.fromSecret(secret_ed25519_guomi).address
console.log(`井通： ${address_ed25519_jingtum}`)
console.log(`国密： ${address_ed25519_guomi}`)
 
 
 
同一个种子编码后的地址不同
井通： jGCkuB7PBj5tNy68tPEABEtcdno4hE6Y7f
国密： jN6pecdxLqs9TbZ1HugLXYQg3qnzseRoiK
都支持ed25519，同样一个种子编码后的密钥不同
井通： j9zRhGj7b6xPekLvT6wP4qNdWMjyaumZS7
国密： jnjgyTG6heEC1Exza68mCJQbTyNPC8uTsE
```
:::

### 操作区块链
#### 通过WEBSOCKET `require("@swtc/lib").Factory(chain)`
#### 通过RPC `require("@swtc/rpc").Factory(chain)`
::: details 代码
```javascript
```
:::

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
            ' 只使用    钱包 npm install @swtc/wallet '
					],
          simplified: [
            ' const {Transaction, Wallet, Serializer, utils} = Remote ',
            ' const {KeyPair, addressCodec, config} = Wallet '
					],
          startups: [
            ' websocket接口 const Remote = require("@swtc/lib").Factory(chain_spec)',
            '       rpc接口 const Remote = require("@swtc/rpc").Factory(chain_spec)',
            ' 只使用    钱包 const Wallet = require("@swtc/wallet").Factory(chain_spec)'
          ],
					chainspecs: [
            '缺省为井通公链',
						'用字串指定预定义的链  "jingtum" 对应 井通公链',
						'用字串指定预定义的链  "ripple" 对应 瑞波公链',
						'用字串指定预定义的链  "bizain" 对应 商链',
						'用对象定制链  {fee: 1000} 定制转账费用的 井通链',
						'用对象定制链  {guomi: true} 定制符合国密标准的 井通链',
						'用对象定制链  {fee: 1000000, currency: "BWT", ACCOUNT_ALPHABET: "bpsh...Axyz"} 定制转账费用的 商链',
						'用对象定制链  还可以定制默认issuer/通证别名/默认节点等'
					]
      }
  },
}
</script>