import CryptoJS from 'crypto-js';
const key = CryptoJS.enc.Utf8.parse('47FC4454CF94E07i'); // 密钥
const iv = CryptoJS.enc.Utf8.parse('ovOh2iuoRdfATobd'); // 密钥偏移量
// 加密方法
export const AesEncode = function (word) {
  const srcs = CryptoJS.enc.Utf8.parse(word);

  // console.log('split("").reverse().join("")',word.split("").reverse().join(""))
  // 对称加密算法主要有AES、DES、3DES / 非对称加密算法主要有RSA、DSA、RCC
  // iv(初始变量)
  // key(加密密钥)
  // mode(加密模式 主要有CBC(默认)、CFB、CTR、OFB、ECB
  // padding(填充方式 主要有Pkcs7(默认)、Iso97971、AnsiX923、Iso10126、ZeroPadding)

  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const encryptedBase64Data = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  return encodeURIComponent(encryptedBase64Data);
};

// 解密方法
export const AesDecode = function (word) {
  word = decodeURIComponent(word);
  const encryptedHexStr = CryptoJS.enc.Base64.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  console.log('CryptoJS.pad.Pkcs7', CryptoJS.pad.Pkcs7);
  return decryptedStr.toString();
};
