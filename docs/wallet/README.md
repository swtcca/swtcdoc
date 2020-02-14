# 井通钱包介绍

## 大致约定

| 名称               | 名称              |                                                                        描述 |
| ------------------ | ----------------- | --------------------------------------------------------------------------: |
| **进制**           | base-x            |                                           二进制 十进制 十六进制 五十八进制 |
| **编码/解码**      | encoding/decoding |                               信息的形式转换 <br> 进制转换也是一种编码/解码 |
| **加密/解密**      | encrypt/decrypt   |                                       信息的加密还原 <br> 属于编码/解码范畴 |
| **签名/验签**      | sign/verify       |                                                              信息的声明确认 |
| **密码算法**       | encrypt-algorithm |                         井通支持两种算法 <br> ecdsa-secp256k1/eddsa-ed25519 |
| **墒**             | entropy           |                                                                  128 位整数 |
| **密钥**           | secret            |                                             base58 字符串 <br> 墒做编码得到 |
| **私钥**           | privateKey        |      256 位整数 <br> 安全由随机性保证 <br> 可以由墒单向哈希生成或者随机生成 |
| **公钥**           | publicKey         |                              256 位整数 <br> 由私钥通过单向加密算法计算得到 |
| **密钥对**         | keypairs          |                                                              私钥和公钥集合 |
| **地址/账户**      | address/account   |                         base58 字符串 <br> 由公钥通过单向算法计算得到并编码 |
| **钱包**           | wallet            |                拥有密钥或者私钥即拥有对应的钱包 <br> 可以操作区块链上的资产 |
| **比特币改进建议** | BIP               |                                 比特币协议/约定更新 <br> 大致通用于区块链界 |
| **bip32**          | HDWallet          | 使用一个主私钥管理多个私钥的改进约定 <br> 可以推导出多层次的子私钥/孙私钥等 <br> 主私钥通常记为种子/seed |
| **bip39**          | Mnemonic          |   用助记词简化密钥/私钥的改进约定 <br> 可以由助记词确定性推导出密钥或者私钥 |
| **bip44**          | bip44             |                     用来规范化bip32 的私钥推导路径 <br> 是 bip43 的一种实现 |

::: tip @swtc 开发包
所有的@swtc 开发包使用 scoped 发布 `@swtc/lib-name`
<vue-typed-js :strings="swtclibs">
  <p>const pkg = require("@swtc/<span class="typing"></span>")</p>
</vue-typed-js>
:::

## 关系

::: tip 可逆计算（如 编码解码） 单向计算(如 哈希)
:::
<mermaid>
stateDiagram
  密钥 --> 墒 : 解码
  墒 --> 密钥 : 编码
  墒 --> 私钥 : 哈希
</mermaid>

::: tip 私钥 -> 公钥 -> 地址
:::
<mermaid>
graph LR
    privateKey((私钥)) -->|单向计算| publicKey(公钥) -->|单向计算| address(地址/帐号)
</mermaid>

::: tip 密钥 <==> 墒 -> 私钥
:::
<mermaid>
graph LR
  secret((密钥)) ---|编码解码| entropy((墒)) -->|单向计算| privateKey((私钥))
</mermaid>

::: tip 加密算法   影响 熵->密钥 私钥->公钥 签名/验签
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
<mermaid>
graph LR
   seed((种子)) -->|单向计算| 子代私钥i -->|单向计算| 孙代私钥x --> ...下代私钥I
</mermaid>

::: tip BIP39 助记词 -> 熵 助记词 -> 私钥/种子
助记词代替密钥或者私钥的管理
:::
<mermaid>
graph LR
   mnemonic((助记词)) -->|单向计算| entropy((熵))
   mnemonic((助记词)) -->|单向计算| privateKey((私钥/种子))
</mermaid>

::: tip BIP44 规范化bip32
一个种子私钥管理许多钱包, 许多通证<br>
bip43的一个实例, SWTC: token=154 MOAC: token=153<br>
推导路径 m/44'/token'/a'/0/i
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
