/**Name: WebRTC
    *Description: Send and receive text over WebRTC
    *Author: Domdkw
    *Version: 1.0.0
    *License: MIT
    */
(function(Scratch) {
    'use strict';
    if (!Scratch.extensions.unsandboxed) {
    throw new Error('This extension must run unsandboxed');
    }

    class WebRTC {
        constructor() {
            this.offer = null;
            this.answer = null;
            this.peerConnection = {};
            this.dataChannel = {};
            this.dataChannelMessages = {};
            this.iceCandidateHandlers = {};
            this.config = {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:stun1.l.google.com:19302' },
                    { urls: 'stun:stun2.l.google.com:19302' },
                    { urls: 'stun:stun3.l.google.com:19302' },
                    { urls: 'stun:stun4.l.google.com:19302' },
                    { urls: 'stun:stun.miwifi.com:3478' },
                    { urls: 'stun:stun.chat.bilibili.com:3478' },
                    { urls: 'stun:stun.voip.blackberry.com:3478' },
                    { urls: 'stun:stun.freeswitch.org:3478' },
                    { urls: 'stun:stun.voipgate.com:3478' },
                ],
            }
        }
        getInfo(){
            return {
                id: 'WebRTC',
                name: 'WebRTC',
                description: 'Send and receive text over WebRTC',
                color1: '#71a600ff',
                color2: '#d6ff7cff',
                color3: '#c5d4a3ff',
                blocks: [
                    {
                        opcode: 'createNewConnection',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Create New Connection as [ID]',
                        disableMonitor: true,
                        arguments:{
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'to custom',
                            }
                        }
                    },
                    {
                        opcode: 'newDataChannel',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'use RTCID:[connID] to create data channel as SSID:[dcSSID]',
                        arguments:{
                            dcSSID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'chat1',
                            },
                            connID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'to custom',
                            }
                        }
                    },
                    {
                        opcode: 'setRemote',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'use RTCID:[connID] to set remote description as Offer:[offer]',
                        arguments:{
                            offer: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{...}',
                            },
                            connID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'to host',
                            }
                        }
                    },
                    {
                        opcode: 'createRTCOffer',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'use RTCID:[connID] to create offer SDP',
                        arguments:{
                            connID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'to custom',
                            }
                        }
                    },
                    {
                        opcode: 'createRTCAnswer',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'use RTCID:[connID] to create answer SDP',
                        arguments:{
                            connID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'to custom',
                            }
                        }
                    },
                    {
                        opcode: 'whenOnCandidate',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when [connID] on candidate',
                        isEdgeActivated: false,
                        arguments:{
                            connID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'to custom',
                            },
                        }
                    },
                    {
                        opcode: 'addIceCandidate',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'use RTCID:[connID] to add ICE candidate:[candidate]',
                        arguments:{
                            candidate: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"candidate":"...","sdpMid":"...","sdpMLineIndex":...}',
                            },
                            connID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'to host',
                            }
                        }
                    },
                    {
                        opcode: 'getIceCandidate',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'use RTCID:[connID] to get last ICE candidate',
                        arguments:{
                            connID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'to custom',
                            }
                        }
                    },
                    {
                        opcode: 'onDataChannelOpen',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when channel [dcSSID] opened',
                        isEdgeActivated: false,
                        arguments:{
                            dcSSID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'chat1',
                            },
                        }
                    },
                    {
                        opcode: 'onDataChannelMessage',
                        blockType: Scratch.BlockType.EVENT,
                        text: 'when channel [dcSSID] received message',
                        isEdgeActivated: false,
                        arguments:{
                            dcSSID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'chat1',
                            },
                        }
                    },
                    {
                        opcode: 'getDataChannelMessage',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get last message from channel [dcSSID]',
                        arguments:{
                            dcSSID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'chat1',
                            }
                        }
                    },
                    {
                        opcode: 'sendDataChannel',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'use channel [dcSSID] to send message:[msg]',
                        arguments:{
                            dcSSID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'chat1',
                            },
                            msg: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello World!',
                            }
                        }
                    },
                    {
                        opcode: 'closeConnection',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'close RTC connection [connID]',
                        arguments:{
                            connID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'to custom',
                            }
                        }
                    },
                ],
            }
        }
        createNewConnection({ID}){
            try{
                const id = ID.toString();
                this.peerConnection[id] = new RTCPeerConnection(this.config);
                console.log(`Connection created with ID '${id}'`);
            }
            catch(err){
                console.warn(err);
            }
        }
        newDataChannel({dcSSID, connID}){
            try{
                const id = connID.toString();
                const pc = this.peerConnection[id];
                if (!pc) {
                    console.warn(`PeerConnection with ID '${id}' not found. Please create connection first.`);
                    return;
                }
                const dc = pc.createDataChannel(dcSSID.toString(), {ordered: true});
                this.dataChannel[dcSSID.toString()] = dc;
                
                dc.onopen = () => {
                    console.log(`Data channel '${dcSSID}' opened`);
                    Scratch.vm.runtime.startHats('WebRTC_onDataChannelOpen');
                };
                
                dc.onmessage = (event) => {
                    console.log(`Message received on channel '${dcSSID}':`, event.data);
                    this.dataChannelMessages[dcSSID.toString()] = event.data;
                    Scratch.vm.runtime.startHats('WebRTC_onDataChannelMessage');
                };
                
                pc.ondatachannel = (event) => {
                    const receivedDC = event.channel;
                    const receivedDCSSID = receivedDC.label;
                    this.dataChannel[receivedDCSSID] = receivedDC;
                    
                    receivedDC.onopen = () => {
                        console.log(`Data channel '${receivedDCSSID}' opened (remote)`);
                        Scratch.vm.runtime.startHats('WebRTC_onDataChannelOpen');
                    };
                    
                    receivedDC.onmessage = (msgEvent) => {
                        console.log(`Message received on channel '${receivedDCSSID}' (remote):`, msgEvent.data);
                        this.dataChannelMessages[receivedDCSSID] = msgEvent.data;
                        Scratch.vm.runtime.startHats('WebRTC_onDataChannelMessage');
                    };
                };
                
                console.log(`Data channel created with SSID '${dcSSID}' , ID '${id}'`);
            }
            catch(err){
                console.warn(err);
            }
        }
        async createRTCOffer({connID}){
            try{
                const id = connID.toString();
                const pc = this.peerConnection[id];
                if (!pc) {
                    console.warn(`PeerConnection with ID '${id}' not found. Please create connection first.`);
                    return;
                }
                this.offer = await pc.createOffer();
                await pc.setLocalDescription(this.offer);
                
                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        console.log(`ICE candidate found for connection '${id}':`, event.candidate);
                        this.iceCandidateHandlers[id] = event.candidate;
                        Scratch.vm.runtime.startHats('WebRTC_whenOnCandidate');
                    }
                };
                
                return this.offer;
            }
            catch(err){
                console.warn(err);
            }
        }
        async createRTCAnswer({connID}){
            try{
                const id = connID.toString();
                const pc = this.peerConnection[id];
                if (!pc) {
                    console.warn(`PeerConnection with ID '${id}' not found. Please create connection first.`);
                    return;
                }
                this.answer = await pc.createAnswer();
                await pc.setLocalDescription(this.answer);
                
                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        console.log(`ICE candidate found for connection '${id}':`, event.candidate);
                        this.iceCandidateHandlers[id] = event.candidate;
                        Scratch.vm.runtime.startHats('WebRTC_whenOnCandidate');
                    }
                };
                
                return this.answer;
            }
            catch(err){
                console.warn(err);
            }
        }
        async setRemote({offer, connID}){
            try{
                const id = connID.toString();
                const pc = this.peerConnection[id];
                if (!pc) {
                    console.warn(`PeerConnection with ID '${id}' not found. Please create connection first.`);
                    return;
                }
                await pc.setRemoteDescription(offer);
            }
            catch(err){
                console.warn(err);
            }
        }
        whenOnCandidate({connID}){
            try{
                const id = connID.toString();
                const candidate = this.iceCandidateHandlers[id];
                if (candidate) {
                    return JSON.stringify(candidate);
                }
                return '';
            }
            catch(err){
                console.warn(err);
                return '';
            }
        }
        async addIceCandidate({candidate, connID}){
            try{
                const id = connID.toString();
                const pc = this.peerConnection[id];
                if (!pc) {
                    console.warn(`PeerConnection with ID '${id}' not found. Please create connection first.`);
                    return;
                }
                const candObj = JSON.parse(candidate);
                await pc.addIceCandidate(new RTCIceCandidate(candObj));
                console.log(`ICE candidate added for connection '${id}'`);
            }
            catch(err){
                console.warn(err);
            }
        }
        getIceCandidate({connID}){
            try{
                const id = connID.toString();
                const candidate = this.iceCandidateHandlers[id];
                if (candidate) {
                    return JSON.stringify(candidate);
                }
                return '';
            }
            catch(err){
                console.warn(err);
                return '';
            }
        }
        getDataChannelMessage({dcSSID}){
            try{
                const msg = this.dataChannelMessages[dcSSID.toString()];
                if (msg !== undefined) {
                    return msg;
                }
                return '';
            }
            catch(err){
                console.warn(err);
                return '';
            }
        }
        sendDataChannel({dcSSID, msg}){
            try{
                const dc = this.dataChannel[dcSSID.toString()];
                if (!dc) {
                    console.warn(`Data channel with SSID '${dcSSID}' not found. Please create data channel first.`);
                    return;
                }
                if (dc.readyState !== 'open') {
                    console.warn(`Data channel '${dcSSID}' is not open. Current state: ${dc.readyState}`);
                    return;
                }
                dc.send(msg.toString());
                console.log(`Message sent via channel '${dcSSID}': ${msg}`);
            }
            catch(err){
                console.warn(err);
            }
        }
        closeConnection({connID}){
            try{
                const id = connID.toString();
                const pc = this.peerConnection[id];
                if (!pc) {
                    console.warn(`PeerConnection with ID '${id}' not found.`);
                    return;
                }
                pc.close();
                delete this.peerConnection[id];
                delete this.iceCandidateHandlers[id];
                console.log(`Connection '${id}' closed`);
            }
            catch(err){
                console.warn(err);
            }
        }
    }


    Scratch.extensions.register(new WebRTC());
})(Scratch);
