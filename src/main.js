//import CryptoJS from 'crypto-js'

(function (Scratch){
    "use strict";

    class Transcoding{
        getInfo(){
            return {
                id: 'dmTranscoding',
                name: 'transcoding',
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
                        text: 'base64 encode [text]',
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
                        text: 'base64 decode [text]',
                        arguments:{
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'aGVsbG8=',
                                // base64 decode 'hello'
                            }
                        }
                    },
                    {
                        opcode: 'urlencode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'url encode [text]',
                        arguments:{
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'a=1 & b=2',
                                // url encode 'a=1%20&%20b=2'
                            }
                        }
                    },
                    {
                        opcode: 'urldecode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'url decode [text]',
                        arguments:{
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'a=1%20&%20b=2',
                                // url decode 'a=1 & b=2'
                            }
                        }
                    },
                    {
                        opcode: 'urlencodeComponent',
                        blockType: Scratch.BlockType.REPORTER,
                        text: ' url encode component [text]',
                        arguments:{
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'a=1&b=2',
                                // url encode component 'a%3D1%26b%3D2'
                            }
                        }
                    },
                    {
                        opcode: 'urldecodeComponent',
                        blockType: Scratch.BlockType.REPORTER,
                        text: ' url decode component [text]',
                        arguments:{
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'a%3D1%26b%3D2',
                                // url decode component 'a=1&b=2',
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
