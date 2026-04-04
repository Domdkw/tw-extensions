//Name: Transcoding
//Description: a tool to decode and encode text
//Author: Domdkw
//Version: 1.0.0
//License: MIT

/* generated l10n code */
Scratch.translate.setup({
    "de": {
        "_Transcoding": "Transkodierung",
        "_b64encode": "Base64 kodieren [text]",
        "_base64 decode [text]": "Base64 dekodieren [text]",
        "_url encode [text]": "URL kodieren [text]",
        "_url decode [text]": "URL dekodieren [text]",
        "_url encode component [text]": "URL-Komponente kodieren [text]",
        "_url decode component [text]": "URL-Komponente dekodieren [text]"
    },
    "fi": {
        "_Transcoding": "Transkoodaus",
        "_b64encode": "Base64-koodaa [text]",
        "_base64 decode [text]": "Base64-purkaa [text]",
        "_url encode [text]": "URL-koodaa [text]",
        "_url decode [text]": "URL-purkaa [text]",
        "_url encode component [text]": "URL-komponentti koodaa [text]",
        "_url decode component [text]": "URL-komponentti purkaa [text]"
    },
    "it": {
        "_Transcoding": "Transcodifica",
        "_b64encode": "Codifica Base64 [text]",
        "_base64 decode [text]": "Decodifica Base64 [text]",
        "_url encode [text]": "Codifica URL [text]",
        "_url decode [text]": "Decodifica URL [text]",
        "_url encode component [text]": "Codifica componente URL [text]",
        "_url decode component [text]": "Decodifica componente URL [text]"
    },
    "ja": {
        "_Transcoding": "トランスコーディング",
        "_b64encode": "Base64エンコード [text]",
        "_base64 decode [text]": "Base64デコード [text]",
        "_url encode [text]": "URLエンコード [text]",
        "_url decode [text]": "URLデコード [text]",
        "_url encode component [text]": "URLコンポーネントエンコード [text]",
        "_url decode component [text]": "URLコンポーネントデコード [text]"
    },
    "nb": {
        "_Transcoding": "Transkoding",
        "_b64encode": "Base64-kode [text]",
        "_base64 decode [text]": "Base64-dekode [text]",
        "_url encode [text]": "URL-kode [text]",
        "_url decode [text]": "URL-dekode [text]",
        "_url encode component [text]": "URL-komponent kode [text]",
        "_url decode component [text]": "URL-komponent dekode [text]"
    },
    "ru": {
        "_Transcoding": "Транскодирование",
        "_b64encode": "Base64 кодировать [text]",
        "_base64 decode [text]": "Base64 декодировать [text]",
        "_url encode [text]": "URL кодировать [text]",
        "_url decode [text]": "URL декодировать [text]",
        "_url encode component [text]": "URL-компонент кодировать [text]",
        "_url decode component [text]": "URL-компонент декодировать [text]"
    },
    "zh-cn": {
        "_Transcoding": "转码工具",
        "_b64encode": "base64 编码 [text]",
        "_base64 decode [text]": "base64 解码 [text]",
        "_url encode [text]": "URL 编码 [text]",
        "_url decode [text]": "URL 解码 [text]",
        "_url encode component [text]": "URL 组件编码 [text]",
        "_url decode component [text]": "URL 组件解码 [text]"
    }
});
/* end generated l10n code */


(function (Scratch) {
    "use strict";

    class Transcoding {
        constructor(){
            this.textEncoder = new TextEncoder();
            this.textDecoder = new TextDecoder();
            this.currentGCM_IV = '';
            this.currentCBC_IV = '';
        }
        getInfo() {
            return {
                id: 'Transcoding',
                name: Scratch.translate('Transcoding'),
                version: '1.0.0',
                author: 'Domdkw',
                description: 'a tool to decode and encode text',
                color1: '#c06524ff',
                color2: '#D2B48C',
                color3: '#FFF8DC',
                blocks: [
                    {
                        opcode: 'b64encode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('b64encode'),
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'hello',
                            }
                        }
                    },
                    {
                        opcode: 'b64decode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('base64 decode [text]'),
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'aGVsbG8=',
                            }
                        }
                    },
                    {
                        opcode: 'urlencode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('url encode [text]'),
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'a=1 & b=2',
                            }
                        }
                    },
                    {
                        opcode: 'urldecode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('url decode [text]'),
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'a=1%20&%20b=2',
                            }
                        }
                    },
                    {
                        opcode: 'urlencodeComponent',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('url encode component [text]'),
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'a=1&b=2',
                            }
                        }
                    },
                    {
                        opcode: 'urldecodeComponent',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('url decode component [text]'),
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'a%3D1%26b%3D2',
                            }
                        }
                    },
                    "---",
                    {
                        opcode: 'toSHA1',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'SHA1 [text]',
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'hello scratch',
                            }
                        }
                    },
                    {
                        opcode: 'toSHA256',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'SHA256 [text]',
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'hello scratch',
                            }
                        }
                    },
                    {
                        opcode: 'toSHA512',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'SHA512 [text]',
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'hello scratch',
                            }
                        }
                    },
                    "---",
                    {
                        opcode: 'generateGCM_IV',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate('generate AES-GCM IV len:[len]'),
                        arguments: {
                            len: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 12,
                            },
                        }
                    },
                    {
                        opcode: 'getGCM_IV',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('current AES-GCM IV'),
                    },
                    {
                        opcode: 'generateCBC_IV',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate('generate AES-CBC IV'),
                    },
                    {
                        opcode: 'getCBC_IV',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('current AES-CBC IV'),
                    },
                    {
                        opcode: 'toAES_GCM',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('AES-GCM iv:[IV] key:[KEY] text:[TEXT]'),
                        arguments: {
                            IV: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '',
                            },
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '',
                            },
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'hello scratch',
                            },
                        }
                    },
                    {
                        opcode: 'toAES_CBC',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('AES-CBC iv:[IV] key:[KEY] text:[TEXT]'),
                        arguments: {
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '',
                            },
                            IV: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '',
                            },
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'hello scratch',
                            },
                        }
                    },
                    {
                        opcode: 'fromAES_GCM',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('AES-GCM decrypt iv:[IV] key:[KEY] text:[TEXT]'),
                        arguments: {
                            IV: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '',
                            },
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '',
                            },
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '',
                            },
                        }
                    },
                    {
                        opcode: 'fromAES_CBC',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('AES-CBC decrypt iv:[IV] key:[KEY] text:[TEXT]'),
                        arguments: {
                            IV: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '',
                            },
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '',
                            },
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '',
                            },
                        }
                    },
                ],
            }
        }

        b64encode({ text }) { try { return btoa(text.toString()); } catch (e) { return ''; } }//无法处理中文&特殊字符
        b64decode({ text }) { try { return atob(text.toString()); } catch (e) { return ''; } }
        urlencode({ text }) { try { return encodeURI(text.toString()); } catch (e) { return ''; } }
        urldecode({ text }) { try { return decodeURI(text.toString()); } catch (e) { return ''; } }
        urlencodeComponent({ text }) { try { return encodeURIComponent(text.toString()); } catch (e) { return ''; } }
        urldecodeComponent({ text }) { try { return decodeURIComponent(text.toString()); } catch (e) { return ''; } }
    
        async toSHA1({ text }) {
            try {
                const hash = await crypto.subtle.digest('SHA-1', this.textEncoder.encode(text.toString()));
                return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
            } catch (e) {
                return '';
            }
        }
        async toSHA256({ text }) {
            try {
                const hash = await crypto.subtle.digest('SHA-256', this.textEncoder.encode(text.toString()));
                return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
            } catch (e) {
                return '';
            }
        }
        async toSHA512({ text }) {
            try {
                const hash = await crypto.subtle.digest('SHA-512', this.textEncoder.encode(text.toString()));
                return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
            } catch (e) {
                return '';
            }
        }

        // 生成新的 AES-GCM 随机 IV 并存储
        generateGCM_IV({ len }) {
            try {
                const iv = crypto.getRandomValues(new Uint8Array(len));
                this.currentGCM_IV = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
            } catch (e) {
                this.currentGCM_IV = '';
            }
        }
        // 获取当前存储的 AES-GCM IV
        getGCM_IV() {return this.currentGCM_IV;}
        // 生成新的 AES-CBC 随机 IV (16字节) 并存储
        generateCBC_IV() {
            try {
                const iv = crypto.getRandomValues(new Uint8Array(16));
                this.currentCBC_IV = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
            } catch (e) {
                this.currentCBC_IV = '';
            }
        }
        //获取当前存储的 AES-CBC IV
        getCBC_IV() {return this.currentCBC_IV;}

        /**
         * 将十六进制字符串转换为 Uint8Array
         * @param {string} hex - 十六进制字符串
         * @returns {Uint8Array}
         */
        hexToUint8Array(hex) {
            const arr = new Uint8Array(hex.length / 2);
            for (let i = 0; i < hex.length; i += 2) {
                arr[i / 2] = parseInt(hex.substr(i, 2), 16);
            }
            return arr;
        }

        // AES 通用处理方法
        async handleAES(mode, operation, TEXT, IV, KEY) {
            try {
                if (!IV || !KEY || (operation === 'decrypt' && !TEXT)) return '';

                const keyData = this.hexToUint8Array(KEY);
                const cryptoKey = await crypto.subtle.importKey(
                    'raw',
                    keyData,
                    { name: mode },
                    false,
                    [operation]
                );
                const ivArray = this.hexToUint8Array(IV);
                const data = operation === 'encrypt'
                    ? this.textEncoder.encode(TEXT.toString())
                    : this.hexToUint8Array(TEXT.toString());

                const result = await crypto.subtle[operation](
                    { name: mode, iv: ivArray },
                    cryptoKey,
                    data
                );

                return operation === 'encrypt'
                    ? Array.from(new Uint8Array(result)).map(b => b.toString(16).padStart(2, '0')).join('')
                    : this.textDecoder.decode(result);
            } catch (e) {
                return '';
            }
        }

        async toAES_GCM({ TEXT, IV, KEY }) { return this.handleAES('AES-GCM', 'encrypt', TEXT, IV, KEY); }
        async toAES_CBC({ TEXT, IV, KEY }) { return this.handleAES('AES-CBC', 'encrypt', TEXT, IV, KEY); }
        async fromAES_GCM({ TEXT, IV, KEY }) { return this.handleAES('AES-GCM', 'decrypt', TEXT, IV, KEY); }
        async fromAES_CBC({ TEXT, IV, KEY }) { return this.handleAES('AES-CBC', 'decrypt', TEXT, IV, KEY); }
    }
    Scratch.extensions.register(new Transcoding());
})(Scratch)
