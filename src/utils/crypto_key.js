const crypto = require('crypto');

const APP_KEY = process.env.APP_KEY;

const SETTINGS = {
	key : Buffer.from(APP_KEY.substring(7), 'base64'),
	sha : 'sha256',
	mode : 'AES-256-CBC'
}


function calculateMac(payload, key){
	let hashedData = hash(payload['iv'], payload['value'])
	return hashHmac(hashedData, key);
}

function decrypt(payload){

	let _payload = getJsonPayload(payload);

	let _iv = Buffer.from(_payload['iv'], 'base64');

	let decipher = crypto.createDecipheriv(SETTINGS.mode, SETTINGS.key, _iv);

	let decrypted = decipher.update(_payload['value'], 'base64', 'utf8');

	decrypted += decipher.final('utf8');

	return hashDeserialize(decrypted);

}

function encrypt(data){
	let serializedValue = hashSerialize(data);

	try{
		let _iv = crypto.randomBytes(16);

		let base64_iv = _iv.toString('base64');

		let cipher = crypto.createCipheriv(SETTINGS.mode, SETTINGS.key, _iv);

		let encrypted = cipher.update(serializedValue, 'utf8', 'base64');

		encrypted += cipher.final('base64');

		let _mac = hash(base64_iv, encrypted);

		let payloadObject = {
			'iv' : base64_iv,
			'value' : encrypted,
			'mac' : _mac
		}

		let _payload = JSON.stringify(payloadObject);
		
		base64_payload = Buffer.from(_payload).toString('base64');
		return base64_payload;
	}
	catch(e){
		throw new Error('Cannot encrypt data provided !');
	}
}

function getJsonPayload(payload){
	if(payload === undefined || payload === ''){
		throw new Error('Payload MUST NOT be empty !');
	}

	if(typeof payload !== 'string'){
		throw new Error('Payload MUST be string !');
	}

	try{
		var _payload = JSON.parse(Buffer.from(payload, 'base64'));
	}
	catch(e){
		throw new Error('Payload cannot be parsed !');
	}
	
	if(!isValidPayload(_payload)){
		throw new Error('Payload is not valid !');
	}

	if(!isValidMac(_payload)){
		throw new Error('Mac is not valid !');
	}
		
	return _payload;
}

function hash(iv, value){
	if(iv === undefined || iv === ''){
		throw new Error('Iv is not defined !');
	}
	if(value === undefined || value === ''){
		throw new Error('Value is not defined !');
	}
	let data = String(iv) + String(value);
	return hashHmac(data, SETTINGS.key);
}


function hashHmac(data, key){
	let hmac = crypto.createHmac(SETTINGS.sha, key);
	hmac.update(data);
	return hmac.digest('hex');
}

function isValidMac(payload){
	let bytes = crypto.randomBytes(16),
		calculatedMac = calculateMac(payload, bytes);
	
	let originalMac = hashHmac(payload['mac'], bytes);
	return originalMac === calculatedMac;
}


function isValidPayload(payload){
	return (payload.hasOwnProperty('iv') && payload.hasOwnProperty('value') && payload.hasOwnProperty('mac'));
}

function hashDeserialize(data){
	let str = String(data);
	return str.substring( str.lastIndexOf(':') + 1, str.lastIndexOf(';') ).replace(/"/g,'');
}

function hashSerialize(data){
	if(typeof data !== 'string'){
		throw new Error('Data to be serialized must be type of string !');
	}
	let str = String(data);
	return 's:'+str.length+':"'+str+';"';
}

module.exports = {
	encrypt,
	decrypt,
	getJsonPayload,
	hash
}