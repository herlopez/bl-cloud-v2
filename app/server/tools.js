
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function verifyString(obj, string, maxLen = 200, minLen = 0, type = 'string') {
    if (obj.hasOwnProperty(string)) {
        if(type === 'string'){
            if (typeof obj[string] === 'string' || obj[string] instanceof String) {
                if (obj[string].length > minLen) {
                    if (obj[string].length < maxLen) {
                        return ('{}');
                    } else {
                        return ({error:`${titleCase(string)} is to0 long.`});
                    }
                } else {
                    return ({error:`${titleCase(string)} is to0 short.`});
                }
            }else{
                return ({error:`${titleCase(string)} must be a string.`});
            }
        }else if(type === 'number'){
            if(typeof obj[string] === 'number' ||  obj[string] instanceof Number){
                return('{}')
            }
            else{
                return ({error:`${titleCase(string)} must be a number.`});
            }
        }
        else if(type === 'any'){
            return('{}');
        }
        else{
            return ({error:`Invalid verify string type.`});

        }

    } else {
        return ({error:`No ${titleCase(string)} was provided.`});
    }
}
function error(obj, callback){
    if (obj.hasOwnProperty('error')) {
        callback.send(JSON.stringify({"error": obj['error']}));
        return true;
    }
    else{
        return false;
    }
}
function hasError(obj){
    return obj.hasOwnProperty('error');
}
function formError(element, message, cb) {
    console.log(message);
    if (message.hasOwnProperty('error')) {
        console.log('Error: ', message['error']);
        message['error'] = titleCase(message['error']);
        cb.send(JSON.stringify({
            "fn": `{
            console.log('Form error');
            var targetContainer=document.getElementById('${element}');
            try{
                document.getElementById('error_message').remove();
            }
            catch(e){
            }
            var errorMessage=document.createElement('div');
            errorMessage['innerText']="${message['error']}";
            errorMessage.style.color='red';
            errorMessage.style.margin='1rem';
            errorMessage.style.textAlign = 'center';
            errorMessage.id='error_message';
            targetContainer.appendChild(errorMessage);}`
        }));
        return true;
    }
    return false;
}

function titleCase(str){
    str = str.split('_').join(' ');
    str = str.toLowerCase().split(' ');
    let final = [ ];
    for(let  word of str){
        final.push(word.charAt(0).toUpperCase()+ word.slice(1));
    }
    return final.join(' ')
}


module.exports = {
    titleCase,
    formError,
    verifyString,
    error,
    hasError,
    validateEmail
};