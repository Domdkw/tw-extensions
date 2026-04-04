//import CryptoJS from 'crypto-js'
//Name: Transcoding
//Description: a tool to decode and encode text
//Author: Domdkw
//Version: 1.0.0
//License: MIT

/* generated l10n code */
Scratch.translate.setup({
    "de":{
        "_Transcoding":"Transkodierung",
        "_b64encode":"Base64 kodieren [text]",
        "_base64 decode [text]":"Base64 dekodieren [text]",
        "_url encode [text]":"URL kodieren [text]",
        "_url decode [text]":"URL dekodieren [text]",
        "_url encode component [text]":"URL-Komponente kodieren [text]",
        "_url decode component [text]":"URL-Komponente dekodieren [text]"
    },
    "fi":{
        "_Transcoding":"Transkoodaus",
        "_b64encode":"Base64-koodaa [text]",
        "_base64 decode [text]":"Base64-purkaa [text]",
        "_url encode [text]":"URL-koodaa [text]",
        "_url decode [text]":"URL-purkaa [text]",
        "_url encode component [text]":"URL-komponentti koodaa [text]",
        "_url decode component [text]":"URL-komponentti purkaa [text]"
    },
    "it":{
        "_Transcoding":"Transcodifica",
        "_b64encode":"Codifica Base64 [text]",
        "_base64 decode [text]":"Decodifica Base64 [text]",
        "_url encode [text]":"Codifica URL [text]",
        "_url decode [text]":"Decodifica URL [text]",
        "_url encode component [text]":"Codifica componente URL [text]",
        "_url decode component [text]":"Decodifica componente URL [text]"
    },
    "ja":{
        "_Transcoding":"トランスコーディング",
        "_b64encode":"Base64エンコード [text]",
        "_base64 decode [text]":"Base64デコード [text]",
        "_url encode [text]":"URLエンコード [text]",
        "_url decode [text]":"URLデコード [text]",
        "_url encode component [text]":"URLコンポーネントエンコード [text]",
        "_url decode component [text]":"URLコンポーネントデコード [text]"
    },
    "nb":{
        "_Transcoding":"Transkoding",
        "_b64encode":"Base64-kode [text]",
        "_base64 decode [text]":"Base64-dekode [text]",
        "_url encode [text]":"URL-kode [text]",
        "_url decode [text]":"URL-dekode [text]",
        "_url encode component [text]":"URL-komponent kode [text]",
        "_url decode component [text]":"URL-komponent dekode [text]"
    },
    "ru":{
        "_Transcoding":"Транскодирование",
        "_b64encode":"Base64 кодировать [text]",
        "_base64 decode [text]":"Base64 декодировать [text]",
        "_url encode [text]":"URL кодировать [text]",
        "_url decode [text]":"URL декодировать [text]",
        "_url encode component [text]":"URL-компонент кодировать [text]",
        "_url decode component [text]":"URL-компонент декодировать [text]"
    },
    "zh-cn":{
        "_Transcoding":"转码工具",
        "_b64encode":"base64 编码 [text]",
        "_base64 decode [text]":"base64 解码 [text]",
        "_url encode [text]":"URL 编码 [text]",
        "_url decode [text]":"URL 解码 [text]",
        "_url encode component [text]":"URL 组件编码 [text]",
        "_url decode component [text]":"URL 组件解码 [text]"
    }
});
/* end generated l10n code */


(function (Scratch){
    "use strict";

    class Transcoding{
        getInfo(){
            return {
                id: 'Transcoding',
                name: Scratch.translate('Transcoding'),
                version: '1.0.0',
                author: 'Domdkw',
                description: 'a tool to decode and encode text',
                color1: '#8B4513',
                color2: '#FFF8DC',
                color3: '#D2B48C',
                blocks: [
                    {
                        opcode: 'b64encode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('b64encode'),
                        arguments:{
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
                        arguments:{
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
                        arguments:{
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
                        arguments:{
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
                        arguments:{
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
                        arguments:{
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'a%3D1%26b%3D2',
                            }
                        }
                    },
                ],
            }
        }

        b64encode({text}){
            return btoa(text.toString());
        }
        b64decode({text}){
            return atob(text.toString());
        }
        urlencode({text}){
            return encodeURI(text.toString());
        }
        urldecode({text}){
            return decodeURI(text.toString());
        }
        urlencodeComponent({text}){
            return encodeURIComponent(text.toString());
        }
        urldecodeComponent({text}){
            return decodeURIComponent(text.toString());
        }
    }
    Scratch.extensions.register(new Transcoding());
})(Scratch)
