# 井通钱包介绍

## 大致约定

| 名称               | 名称              |                                                                        描述 |
| ------------------ | ----------------- | --------------------------------------------------------------------------: |
| **进制**           | base-x            |                                           二进制 十进制 十六进制 五十八进制 |
| **编码/解码**      | encode/decode     |                               信息的形式转换 <br> 进制转换也是一种编码/解码 |
| **加密/解密**      | encrypt/decrypt   |                                       信息的加密还原 <br> 属于编码/解码范畴 |
| **签名/验签**      | sign/verify       |                                                              信息的声明确认 |
| **密码算法**       | crypto-algorithm  |                         井通支持两种算法 <br> ecdsa-secp256k1/eddsa-ed25519 |
| **熵**             | entropy           |                                                                  128 位整数 |
| **密钥**           | secret            |                                             base58 字符串 <br> 熵做编码得到 |
| **私钥**           | privateKey        |      256 位整数 <br> 安全由随机性保证 <br> 可以由熵单向哈希生成或者随机生成 |
| **公钥**           | publicKey         |                              256 位整数 <br> 由私钥通过单向加密算法计算得到 |
| **密钥对**         | keypairs          |                                                              私钥和公钥集合 |
| **地址/账户**      | address/account   |                         base58 字符串 <br> 由公钥通过单向算法计算得到并编码 |
| **钱包**           | wallet            |                拥有密钥或者私钥即拥有对应的钱包 <br> 可以操作区块链上的资产 |
| **比特币改进建议** | BIP               |                                 比特币协议/约定更新 <br> 大致通用于区块链界 |
| **bip32/分层钱包** | HDWallet          | 使用一个主私钥管理多个私钥的改进约定 <br> 可以推导出多层次的子私钥/孙私钥等 <br> 主私钥通常记为种子/seed |
| **bip39/助记词**   | Mnemonic          |   用助记词简化密钥/私钥的改进约定 <br> 可以由助记词确定性推导出密钥或者私钥 |
| **bip44/规范**     | bip44-constants   |                     用来规范化bip32 的私钥推导路径 <br> 是 bip43 的一种实现 |

::: tip @swtc 开发包
所有的@swtc 开发包使用 scoped 发布 `@swtc/lib-name`
<vue-typed-js :strings="swtclibs" :loop="true">
  <p>const pkg = require("@swtc/<span class="typing"></span>")</p>
</vue-typed-js>
:::

## 关系

::: tip 可逆计算（如 编码解码） 单向计算(如 哈希)
:::
::: details 代码示例
```javascript
> .load ac.js
const { Keypairs } = require("@swtc/keypairs")
const { addressCodec } = require("@swtc/address-codec")
const entropy = Buffer.alloc(16)  // 128位整数， 0
let secret = addressCodec.encodeSeed(entropy)
let secret_ed = addressCodec.encodeSeed(entropy, "ed25519")
console.log(`密钥是base58编码后的熵: ${secret}`)
console.log(`ed25519算法的密钥: ${secret_ed}`)
console.log("解码后：secp256k1")
console.log(addressCodec.decodeSeed(secret))
console.log("解码后：ed25519")
console.log(addressCodec.decodeSeed(secret_ed))
console.log(`ed25519私钥直接由熵哈希得到：\n\t${Buffer.from(Keypairs.hash(entropy)).toString('hex')}`)

密钥是base58编码后的熵: sp6JS7f14BuwFY8Mw6bTtLKWauoUs
ed25519算法的密钥: sEdSJHS4oiAdz7w2X2ni1gFiqtbJHqE
解码后：secp256k1
{
  version: [ 33 ],
  bytes: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>,
  type: 'secp256k1'
}
解码后：ed25519
{
  version: [ 1, 225, 75 ],
  bytes: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>,
  type: 'ed25519'
}
ed25519私钥直接由熵哈希得到：
	0b6cbac838dfe7f47ea1bd0df00ec282fdf45510c92161072ccfb84035390c4d
undefined
>
```
:::
<mermaid>
stateDiagram
  密钥 --> 熵 : 解码
  熵 --> 密钥 : 编码
  熵 --> 私钥 : 哈希
</mermaid>

::: tip 私钥 -> 公钥 -> 地址
:::
::: details 代码示例
```javascript
> .load pk.js
const { Keypairs } = require("@swtc/keypairs")

const entropy = Buffer.alloc(16)  // 128位整数， 0
privateKey = Buffer.from(Keypairs.hash(entropy)).toString('hex').toUpperCase()
console.log(`私钥（ed25519）：${privateKey}`)

const keypair = Keypairs.deriveKeypair(privateKey, "ed25519")
console.log(keypair)

const address = Keypairs.deriveAddress(keypair.publicKey)
console.log(`地址： ${address}`)

私钥（ed25519）：0B6CBAC838DFE7F47EA1BD0DF00EC282FDF45510C92161072CCFB84035390C4D
{
  privateKey: 'ED0B6CBAC838DFE7F47EA1BD0DF00EC282FDF45510C92161072CCFB84035390C4D',
  publicKey: 'ED1A7C082846CFF58FF9A892BA4BA2593151CCF1DBA59F37714CC9ED39824AF85F'
}
地址： j9zRhGj7b6xPekLvT6wP4qNdWMjyaumZS7
undefined
>
```
:::
<mermaid>
graph LR
    privateKey((私钥)) -->|单向计算| publicKey(公钥) -->|单向计算| address(地址/帐号)
</mermaid>

::: tip 密钥 <==> 熵 -> 私钥
:::
::: details 代码示例
```javascript
> .load ac.js
const { Keypairs } = require("@swtc/keypairs")
const { addressCodec } = require("@swtc/address-codec")
const entropy = Buffer.alloc(16)  // 128位整数， 0
let secret = addressCodec.encodeSeed(entropy)
let secret_ed = addressCodec.encodeSeed(entropy, "ed25519")
console.log(`密钥是base58编码后的熵: ${secret}`)
console.log(`ed25519算法的密钥: ${secret_ed}`)
console.log("解码后：secp256k1")
console.log(addressCodec.decodeSeed(secret))
console.log("解码后：ed25519")
console.log(addressCodec.decodeSeed(secret_ed))
console.log(`ed25519私钥直接由熵哈希得到：\n\t${Buffer.from(Keypairs.hash(entropy)).toString('hex')}`)

密钥是base58编码后的熵: sp6JS7f14BuwFY8Mw6bTtLKWauoUs
ed25519算法的密钥: sEdSJHS4oiAdz7w2X2ni1gFiqtbJHqE
解码后：secp256k1
{
  version: [ 33 ],
  bytes: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>,
  type: 'secp256k1'
}
解码后：ed25519
{
  version: [ 1, 225, 75 ],
  bytes: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>,
  type: 'ed25519'
}
ed25519私钥直接由熵哈希得到：
	0b6cbac838dfe7f47ea1bd0df00ec282fdf45510c92161072ccfb84035390c4d
undefined
>
```
:::
<mermaid>
graph LR
  secret((密钥)) ---|编码解码| entropy((熵)) -->|单向计算| privateKey((私钥))
</mermaid>

::: tip 加密算法   影响 熵->密钥 私钥->公钥 签名/验签
:::
::: details 代码示例
```javascript
> .load ac.js
const { Keypairs } = require("@swtc/keypairs")
const { addressCodec } = require("@swtc/address-codec")
const entropy = Buffer.alloc(16)  // 128位整数， 0
let secret = addressCodec.encodeSeed(entropy)
let secret_ed = addressCodec.encodeSeed(entropy, "ed25519")
console.log(`密钥是base58编码后的熵: ${secret}`)
console.log(`ed25519算法的密钥: ${secret_ed}`)
console.log("解码后：secp256k1")
console.log(addressCodec.decodeSeed(secret))
console.log("解码后：ed25519")
console.log(addressCodec.decodeSeed(secret_ed))
console.log(`ed25519私钥直接由熵哈希得到：\n\t${Buffer.from(Keypairs.hash(entropy)).toString('hex')}`)
let keypairs = Keypairs.deriveKeypair(secret)
console.log("密钥对：(sec256k1私钥加了前缀00)")
console.log(keypairs)
let keypairs_ed = Keypairs.deriveKeypair(secret_ed)
console.log("密钥对：(ed25519加了前缀ED)")
console.log(keypairs_ed)

密钥是base58编码后的熵: sp6JS7f14BuwFY8Mw6bTtLKWauoUs
ed25519算法的密钥: sEdSJHS4oiAdz7w2X2ni1gFiqtbJHqE
解码后：secp256k1
{
  version: [ 33 ],
  bytes: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>,
  type: 'secp256k1'
}
解码后：ed25519
{
  version: [ 1, 225, 75 ],
  bytes: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>,
  type: 'ed25519'
}
ed25519私钥直接由熵哈希得到：
	0b6cbac838dfe7f47ea1bd0df00ec282fdf45510c92161072ccfb84035390c4d
密钥对：(sec256k1私钥加了前缀00)
{
  privateKey: '002512BBDFDBB77510883B7DCCBEF270B86DEAC8B64AC762873D75A1BEE6298665',
  publicKey: '0390A196799EE412284A5D80BF78C3E84CBB80E1437A0AECD9ADF94D7FEAAFA284'
}
密钥对：(ed25519加了前缀ED)
{
  privateKey: 'ED0B6CBAC838DFE7F47EA1BD0DF00EC282FDF45510C92161072CCFB84035390C4D',
  publicKey: 'ED1A7C082846CFF58FF9A892BA4BA2593151CCF1DBA59F37714CC9ED39824AF85F'
}
undefined
>
```
:::
<mermaid>
graph LR
   密钥secp256k1 & 密钥ed25519 ---|编码解码| 熵 -->|单向计算| 私钥 -->|单向计算| 公钥secp256k1 & 公钥ed25519
   公钥secp256k1 -->|单向计算| 地址secp256k1
   公钥ed25519 -->|单向计算| 地址ed25519
</mermaid>

::: tip BIP32 种子 -> 子孙后代私钥
每代都有兄弟私钥<br>
一个种子私钥管理许多钱包<br>
推导路径 m/g1/g2/g3/g4/...
:::
::: details 代码演示
```javascript{7}
> .load test.js
const bip39 = require("bip39")
const bip32 = require("bip32")
bip39.setDefaultWordlist("chinese_simplified")
const mnemonic = bip39.entropyToMnemonic('00000000000000000000000000000000')
let seed = bip39.mnemonicToSeedSync(mnemonic)
b32 = bip32.fromSeed(seed)

console.log(`主节点 私钥: ${b32.privateKey.toString("hex")}`)

son_son = b32.derivePath("m/0/1")
console.log(`孙节点 m/0/1: ${son_son.privateKey.toString("hex")}`)

主节点 私钥: de515c704d69559b2ad1bd1724cd400097fa5c7b94cce4249f4198239f3e1af2
孙节点 m/0/1: be72cf3eb3c9e5155d3d9cad768f862fdd609ccb3a227f4c596bb1d0885d1e87
undefined
>
```
:::
<mermaid>
graph LR
   seed((种子)) -->|单向计算| 子代私钥i -->|单向计算| 孙代私钥x --> ...下代私钥I
</mermaid>

::: tip BIP39 助记词 -> 熵 助记词 -> 私钥/种子
助记词代替密钥或者私钥的管理
:::
::: details 代码示例
```javascript
> .load test.js
const bip39 = require("bip39")
bip39.setDefaultWordlist("chinese_simplified")

const mnemonic = bip39.entropyToMnemonic('00000000000000000000000000000000')
console.log(mnemonic)

let entropy = bip39.mnemonicToEntropy(mnemonic)
let seed = bip39.mnemonicToSeedSync(mnemonic)
console.log(`助记词 到 熵: ${entropy}`)
console.log(`助记词 到 种子: ${seed.toString("hex")}`)

的 的 的 的 的 的 的 的 的 的 的 在
助记词 到 熵: 00000000000000000000000000000000
助记词 到 种子: c015b86e4b208402bb0bdd0febb746708b869bb6e433cb227fd66d444f3ccdc360fee9ca9271014c2a684df380fcc40bd80a37eaa41a8061a52a18d319cdd899
undefined
>
```
:::
<mermaid>
graph LR
   mnemonic((助记词)) ---|编码解码| entropy((熵))
   mnemonic((助记词)) -->|单向计算| privateKey((私钥/种子))
</mermaid>

::: tip BIP44 规范化bip32
一个种子私钥管理许多钱包, 许多通证<br>
bip43的一个实例<br>
314	0x8000013a	MOAC	MOAC<br>
315	0x8000013b	SWTC	SWTC<br>
推导路径 m/44'/token'/a'/0/i
:::
::: details 代码演示
```javascript
> .load test.js
const bip39 = require("bip39")
const bip32 = require("bip32")
const constants = require("bip44-constants")
const getCoin = coin => constants.filter(e => e[1] === coin.toUpperCase())
const SWTC = getCoin('SWTC')[0][0] << 1 >> 1
const MOAC = getCoin('MOAC')[0][0] << 1 >> 1
console.log(SWTC)
bip39.setDefaultWordlist("chinese_simplified")
const mnemonic = bip39.entropyToMnemonic('00000000000000000000000000000000')
let seed = bip39.mnemonicToSeedSync(mnemonic)
b32 = bip32.fromSeed(seed)

console.log(`主节点 私钥: ${b32.privateKey.toString("hex")}`)

let private_key_moac = b32.derivePath(`m/44'/${MOAC}'/0/0/0`).privateKey
let private_key_swtc = b32.derivePath(`m/44'/${SWTC}'/0/0/0`).privateKey

console.log(`墨客 第一个私钥: ${private_key_moac.toString("hex")}`)
console.log(`井通 第一个私钥: ${private_key_swtc.toString("hex")}`)

315
主节点 私钥: de515c704d69559b2ad1bd1724cd400097fa5c7b94cce4249f4198239f3e1af2
墨客 第一个私钥: 4811ecbd173cf51a85b7563dbc55ff95760e3b286d81cf766043c08423b73c05
井通 第一个私钥: c038cb886d299ff45362ca39900a7025c484ddf6dbac20676b6fe7cc509231d1
undefined
>
```
:::
<mermaid>
graph LR
   seed((种子)) -->|单向计算| m/44'/token'/a'/0/i
</mermaid>

<script>
export default {
  data () {
      return {
          swtclibs: [
            'lib',
            'transaction',
            'serializer',
            'wallet',
            'keypairs',
			'address-codec'
          ]
      }
  },
}
</script>

## bip到swtclib的完整示例

::: tip bip39 -> 钱包
助记词(bip39) -> 密钥+钱包(swtclib) <br>
助记词(bip39) -> 种子(bip32) -> 私钥(bip44) -> 钱包(swtclib)
:::
::: details 代码
```javascript
> .load test.js
const { Wallet } = require("@swtc/wallet")
const Keypair = Wallet.KeyPair
const addressCodec = Keypair.addressCodec
const bip39 = require("bip39")
const bip32 = require("bip32")
const constants = require("bip44-constants")
const getCoin = coin => constants.filter(e => e[1] === coin.toUpperCase())
const SWTC = getCoin('SWTC')[0][0] << 1 >> 1
console.log(SWTC)
bip39.setDefaultWordlist("chinese_simplified")

let mnemonic, seed, entropy, secret, privateKey, publicKey, address, wallet

for (const length of [128, 160, 192, 224, 256]) {
	mnemonic = bip39.generateMnemonic(length)
	console.log(`\n随机助记词-${Math.ceil(length / 11)}: ${mnemonic}`)
	entropy = bip39.mnemonicToEntropy(mnemonic)
	console.log(`\t熵  : ${entropy.toString("hex")}`)
	console.log(`\t\t密钥-secp256k1: ${addressCodec.encodeSeed(entropy.slice(0,16))}`)
	console.log(`\t\t密钥-ed25519  : ${addressCodec.encodeSeed(entropy.slice(0,16), 'ed25519')}`)
	seed = bip39.mnemonicToSeedSync(mnemonic)
	console.log(`\t种子: ${seed.toString("hex")}`)
	b32 = bip32.fromSeed(seed)
	privateKey = b32.derivePath(`m/44'/${SWTC}'/0/0/0`).privateKey
	wallet = Wallet.fromSecret(privateKey.toString("hex"))
	console.log(`\t井通第一私钥: ${privateKey.toString("hex")}`)
	console.log(`\t\t井通地址-secp256k1: ${wallet.address}`)
	wallet = new Wallet(privateKey.toString("hex"), "ed25519")
	console.log(`\t\t井通地址-ed25519  : ${wallet.address()}`)
	privateKey = b32.derivePath(`m/44'/${SWTC}'/0/0/1`).privateKey
	wallet = Wallet.fromSecret(privateKey.toString("hex"))
	console.log(`\t井通第二私钥: ${privateKey.toString("hex")}`)
	console.log(`\t\t井通地址-secp256k1: ${wallet.address}`)
	wallet = new Wallet(privateKey.toString("hex"), "ed25519")
	console.log(`\t\t井通地址-ed25519  : ${wallet.address()}`)
}
entropy = '00000000000000000000000000000000'
mnemonic = bip39.entropyToMnemonic(entropy)
console.log(`\n\n零号助记词-12: ${mnemonic}`)
console.log(`零号熵  : ${entropy.toString("hex")}`)
console.log(`\t零号密钥-secp256k1: ${addressCodec.encodeSeed(entropy.slice(0,16))}`)
console.log(`\t零号密钥-ed25519  : ${addressCodec.encodeSeed(entropy.slice(0,16), 'ed25519')}`)
seed = bip39.mnemonicToSeedSync(mnemonic)
b32 = bip32.fromSeed(seed)
console.log(`零号种子: ${seed.toString("hex")}`)
privateKey = b32.derivePath(`m/44'/${SWTC}'/0/0/0`).privateKey
wallet = Wallet.fromSecret(privateKey.toString("hex"))
console.log(`零号井通第一私钥: ${privateKey.toString("hex")}`)
console.log(`\t井通地址-secp256k1: ${wallet.address}`)
wallet = new Wallet(privateKey.toString("hex"), "ed25519")
console.log(`\t井通地址-ed25519  : ${wallet.address()}`)
privateKey = b32.derivePath(`m/44'/${SWTC}'/0/0/1`).privateKey
wallet = Wallet.fromSecret(privateKey.toString("hex"))
console.log(`零号井通第二私钥: ${privateKey.toString("hex")}`)
console.log(`\t井通地址-secp256k1: ${wallet.address}`)
wallet = new Wallet(privateKey.toString("hex"), "ed25519")
console.log(`\t井通地址-ed25519  : ${wallet.address()}`)

315

随机助记词-12: 辈 和 译 粗 党 砍 陪 瓜 识 险 挥 沟
	熵  : cc401f38466175f0baae223b8fb18856
		密钥-secp256k1: sp6JSdrz9ZB8y8vCr4Yk6j9sqnx35
		密钥-ed25519  : sEdSJHSYRyrjHaKFCteXFydXCRsZDdh
	种子: e3187691cfbfcea0dc965e9e2e7eee8fd651850f3d2b687e82e7d7ef672ffee346c4c670b796d67e47d38ec2ecc4fa12e208adf8109a0e41c07c057855659528
	井通第一私钥: d6e1cc345ca47b916cf6b89123fd61447898a0820f8d3c64f24712f85da94340
		井通地址-secp256k1: jUktxoNNCAcUwBVNyXsTN5K24NgUnWMX27
		井通地址-ed25519  : jJz7Ew6tCsRccHWw1pAHTs3zmzUwobhUmP
	井通第二私钥: a65a952cbdec8f26358e8ae35a460810f2d1d864c1dd1d6d3c86c240b162ae6b
		井通地址-secp256k1: jj39vPgBjWW9uLuWHbXKbGPUwCtcxeAah
		井通地址-ed25519  : j46jD19nb7dPAJXsar1M9coPdJv5Dyq6EY

随机助记词-15: 刀 昌 死 卸 亚 附 逻 稍 载 专 即 组 购 具 增
	熵  : 8492f0fdf5343ac8ffad3656675c848e38da5148
		密钥-secp256k1: spo8fDCiJos5Fympzu6CYvfr2Cnm5
		密钥-ed25519  : sEdSQmf3MqtE9pBjWEvhytVSeNbZYuq
	种子: e7405f6e9811eedffc72d48d8978646f7a11edf47073b5aa2e53924587ea125cdb3b133ab6ca17aa6d6d91eaa3490f5aec4fae81e9befbdbaf065a4fdd2c2b39
	井通第一私钥: a9f9e55ec2724c49c38d03ab3b191bfb5dd90a024571c98f23e7442411514e78
		井通地址-secp256k1: jndwouVw8T39KdLHc8YaTurXyHU5VySvwi
		井通地址-ed25519  : j9K2CSFcnHF8DP4LqsuGfQA8YuWwdjtph1
	井通第二私钥: c8ee50b72a299b343e79fcb32bc7f9b9fdeedcce97e17eaf4a1ec3b5a5b8ba70
		井通地址-secp256k1: jf6N9z4GrnSw56ruSXA1iLpz56UGhBeNnE
		井通地址-ed25519  : j9u78MXrT19Sxqru4tX2rCTpDQQWT7acPX

随机助记词-18: 数 践 搬 哭 偏 糊 链 巷 幕 控 皇 士 奉 琴 裕 晚 丽 武
	熵  : 114df75d5b58a98d6c5feeb22a9dbb232db1557e8b3db0e8
		密钥-secp256k1: sp5fVVQJK5eNWwGbkJ4wPiQUgWsNT
		密钥-ed25519  : sEdSKaVQaHuwrXiUjFCTePL4vbBKtve
	种子: 376c790208a628c13b0f0d6905df653ddc1a99e2ad50ca54863c6e828c99550621cf4cc65539b53f16eeec81af889fb833dc781293d4b637237b3ab35ebd7650
	井通第一私钥: 1b12faa853caaf735b0dd1fb43baff2953047376d0c1b1efa8041d5b16eaaa8b
		井通地址-secp256k1: jGPYzPHZnwQYeMLNspbxpyhEP4DDYDNyP
		井通地址-ed25519  : j3tMyTx3tdCMa7uGkdCuUDBBYSTMHRYKmF
	井通第二私钥: faa99ccd4b17ffea4391e3f77723ec42b5156b49f5d39df008954784c9703ad8
		井通地址-secp256k1: jJEcxBQTmaugJkBva7BiRfdYRj5TTCVa1R
		井通地址-ed25519  : jDKngb8JRstRHdQH4rz23TV4ewHBPyvqcc

随机助记词-21: 毅 罚 牛 得 宋 第 功 莱 胺 益 裕 脏 山 辊 雄 威 实 造 拆 区 逆
	熵  : e215e5c983d93e2693a7e8f06abbe8f051bbade243a10ac437c00f2c
		密钥-secp256k1: sp6JokGFQYNJBpyqm2ESpeyMYECgz
		密钥-ed25519  : sEdSJHoexoyzKbXhrhgrXeyBVmvpYMo
	种子: dfb8ca9449bb01a8aae23602d1db3218579e46230f5d1ba42a6123cfba8d42bd23e6ad9670657c0da908801fc4274983f5ce2650c2b0a49887657c661a204a87
	井通第一私钥: 2f8b8eeb1a8ef33b6000e85036c4c58fed6a326bcab570093c4eee554882be25
		井通地址-secp256k1: jsTpwFp4uWbKamc9j8Shyxa62AqEKGDAnV
		井通地址-ed25519  : jU1UW6SotyHYVCkp62scDNpdreg6GmpwS5
	井通第二私钥: 7f06d178dd08c0526113a4d956e4742e13f049127cadd494d5ca8d38f2f29dba
		井通地址-secp256k1: jBnuvpEbAAtJQ2wZWKSDzW3CF9G3jc9kLS
		井通地址-ed25519  : jPjqCTDAahA8HGUshito6DKcNmpdMzZf9H

随机助记词-24: 购 彻 碗 消 圆 障 酚 趋 炉 外 尘 影 释 互 绘 者 凶 字 坏 住 散 晒 溶 玄
	熵  : 8db02f539b03bf41fa7e5e79a1ce4117e8f69ff440aff28889429e25eff5d16f
		密钥-secp256k1: spom44bc5ohEzyirVVCWJq9MonfRa
		密钥-ed25519  : sEdSQk4HHcJE9ZMjbxQeArEMCkXbejz
	种子: 53e402ed7aa6ac9a88263d8a97059bbd5dd2381c15ff3b288e51777ca883bb282c01cb9b4d6c2f8e43034e7a8eac01100981ce11d40c251eff5a4d1202cb9a6e
	井通第一私钥: d43e5fc7783e97c2f77a2a80ddf11b0b163a35e8a4e49ab6ee369179c9ec51df
		井通地址-secp256k1: jBjUPZeB7rYMhW5mgr9V81BSNshbeKQH4b
		井通地址-ed25519  : jsk8wTS7VqZFgcgYj9TciaTk7wtSKiw759
	井通第二私钥: 787fed8f5953e7474e73035beb78bd62d8d6740284e0a7aa7fa77ee71433d136
		井通地址-secp256k1: jfsgee2txBncFMxPNv3DnhY3BHXLnL2r7w
		井通地址-ed25519  : jBPmi5PwNycpmPe7kiSa59i6rRXK44fwog


零号助记词-12: 的 的 的 的 的 的 的 的 的 的 的 在
零号熵  : 00000000000000000000000000000000
	零号密钥-secp256k1: sp6JS7f14BuwFY8Mw6bTtLKWauoUs
	零号密钥-ed25519  : sEdSJHS4oiAdz7w2X2ni1gFiqtbJHqE
零号种子: c015b86e4b208402bb0bdd0febb746708b869bb6e433cb227fd66d444f3ccdc360fee9ca9271014c2a684df380fcc40bd80a37eaa41a8061a52a18d319cdd899
零号井通第一私钥: c038cb886d299ff45362ca39900a7025c484ddf6dbac20676b6fe7cc509231d1
	井通地址-secp256k1: jKyGBLtk4bLgnW3pgEnANHWy4RzNAJ7rvh
	井通地址-ed25519  : jLo8ceorncEVPzwxiopaeWFhJExdzXnhCL
零号井通第二私钥: 28dbed5d65f766f8e372829279c6fdb471662eb98c748e7ea0b6fbf7135e1696
	井通地址-secp256k1: jMb6TXoPURa6jDYekoAHb2o3w9sDCRRjd4
	井通地址-ed25519  : jPm4XVyNGYmnPmRmPsXedSvC3R7mRLAu9Q
undefined
>
```
:::

## 移动开发
::: tip 开发框架
`npm install -g nativescript`
:::

::: details 代码
```shell
Documents xcliu$ tns create bipapp --js
Documents xcliu$ cd bipapp
bipapp xcliu$ npm install bip32 bip39 @swtc/wallet @swtc/nativescript
bipapp xcliu$ echo "更新webpack配置 更新程序引入bip和swtc"
bipapp xcliu$ git diff
diff --git a/webpack.config.js b/webpack.config.js
index 59360c3..e6583c2 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -120,7 +120,7 @@ module.exports = env => {
                 `node_modules/${coreModulesPackageName}`,
                 "node_modules",
             ],
-            alias,
+            alias: Object.assign({}, alias, require("@swtc/nativescript").aliases),
             // resolve symlinks to symlinked modules
             symlinks: true
         },
@@ -134,6 +134,7 @@ module.exports = env => {
             "timers": false,
             "setImmediate": false,
             "fs": "empty",
+            "process": "mock",
             "__dirname": false,
         },
         devtool: hiddenSourceMap ? "hidden-source-map" : (sourceMap ? "inline-source-map" : "none"),
@@ -225,7 +226,7 @@ module.exports = env => {
             // Define useful constants like TNS_WEBPACK
             new webpack.DefinePlugin({
                 "global.TNS_WEBPACK": "true",
-                "process": "global.process",
+                // "process": "global.process",
             }),
             // Remove all files from the out dir.
             new CleanWebpackPlugin(itemsToClean, { verbose: !!verbose }),
bipapp xcliu$ git diff app
diff --git a/app/main-view-model.js b/app/main-view-model.js
index 0903f55..046e416 100755
--- a/app/main-view-model.js
+++ b/app/main-view-model.js
@@ -1,21 +1,37 @@
 const Observable = require("tns-core-modules/data/observable").Observable;
+const { Wallet } = require("@swtc/wallet")
+const bip32 = require("bip32")
+const bip39 = require("bip39")
+bip39.setDefaultWordlist('chinese_simplified')
+let b32
 
-function getMessage(counter) {
+function getMessage(counter, mnemonic, seed, b32) {
     if (counter <= 0) {
         return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
     } else {
-        return `${counter} taps left`;
+        return `${counter} ${mnemonic}
+                       bip39: ${seed}
+                               bip32: ${b32}
+               `;
     }
 }
 
 function createViewModel() {
     const viewModel = new Observable();
     viewModel.counter = 42;
-    viewModel.message = getMessage(viewModel.counter);
+    viewModel.mnemonic = bip39.generateMnemonic();
+       viewModel.seed = bip39.mnemonicToSeedSync(viewModel.mnemonic)
+    b32 = bip32.fromSeed(viewModel.seed)
+    viewModel.b32 = b32.privateKey
+    viewModel.message = getMessage(viewModel.counter, viewModel.mnemonic, viewModel.seed.toString("hex"), viewModel.b32.toString("hex"));
 
     viewModel.onTap = () => {
         viewModel.counter--;
-        viewModel.set("message", getMessage(viewModel.counter));
+        viewModel.mnemonic = bip39.generateMnemonic();
+           viewModel.seed = bip39.mnemonicToSeedSync(viewModel.mnemonic)
+        b32 = bip32.fromSeed(viewModel.seed)
+        viewModel.b32 = b32.privateKey
+        viewModel.set("message", getMessage(viewModel.counter, viewModel.mnemonic, viewModel.seed.toString("hex"), viewModel.b32.toString("hex")));
     };
 
    return viewModel;
bipapp xcliu$ tns run android
```
:::

