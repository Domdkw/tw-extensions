//Name: Transcoding
//Description: a tool to decode and encode text
//Author: Domdkw
//Version: 1.0.0
//License: MIT

/* generated l10n code */
Scratch.translate.setup({
    "de": {
        "_Transcoding": "Transkodierung",
    },
    "fi": {
        "_Transcoding": "Transkoodaus",
    },
    "it": {
        "_Transcoding": "Transcodifica",
    },
    "ja": {
        "_Transcoding": "トランスコーディング",
    },
    "nb": {
        "_Transcoding": "Transkoding",
    },
    "ru": {
        "_Transcoding": "Транскодирование",
    },
    "zh-cn": {
        "_Transcoding": "转码工具",
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
                    {opcode:'ua',blockType:Scratch.BlockType.REPORTER,text:'url encode [t]',arguments:{t:{type:Scratch.ArgumentType.STRING}}},
                    {opcode:'ub',blockType:Scratch.BlockType.REPORTER,text:'url decode [t]',arguments:{t:{type:Scratch.ArgumentType.STRING}}                    },
                    {opcode:'uc',blockType:Scratch.BlockType.REPORTER,text:'url encode component [t]',arguments:{t:{type:Scratch.ArgumentType.STRING}}},
                    {opcode:'ud',blockType:Scratch.BlockType.REPORTER,text:'url decode component [t]',arguments:{t:{type: Scratch.ArgumentType.STRING}}},
                    "---",
                    {
                        opcode: 'toSHA1',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'SHA1 [t]',
                        arguments: {
                            t: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'hello scratch',
                            }
                        }
                    },
                    {
                        opcode: 'toSHA256',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'SHA256 [t]',
                        arguments: {
                            t: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'hello scratch',
                            }
                        }
                    },
                    {
                        opcode: 'toSHA512',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'SHA512 [t]',
                        arguments: {
                            t: {
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

        ua({t}){try{return encodeURI(t.toString());}catch(e){return'';}}
        ub({t}){try{return decodeURI(t.toString());}catch(e){return'';}}
        uc({t}){try{return encodeURIComponent(t.toString());}catch(e){return'';}}
        ud({t}){try{return decodeURIComponent(t.toString());}catch(e){return'';}}
    
        async toSHA(text,algorithm) {
            try {
                const hash = await crypto.subtle.digest(algorithm, this.textEncoder.encode(text.toString()));
                return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
            } catch (e) {return '';}
        }
        async toSHA1({t}){return this.toSHA(t,'SHA-1');}
        async toSHA256({t}){return this.toSHA(t,'SHA-256');}
        async toSHA512({t}){return this.toSHA(t,'SHA-512');}

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
