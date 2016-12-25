function cloneObj(obj){
    var copy;
    if (null == obj || "object" != typeof obj) return obj;
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = cloneObj(obj[i]);
        }
        return copy;
    }
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = cloneObj(obj[attr]);
        }
        return copy;
    }
}
function gentleCloneObj(A,B,i){
    if(B[i] instanceof Object){
        if(typeof A[i] == 'undefined'){
            A[i]={};
        }
        for(var j in B[i]){
            if(typeof A[i][j] !='undefined'){
                gentleCloneObj(A[i],B[i],j);
            }else{
                A[i][j] = cloneObj(B[i][j]);
            }
        }
    } else {
        A[i] = B[i];
    }
}

function betweenAngles(what,angle1,angle2){
    what = (what- -720)%360;
    angle1 = (angle1- -720)%360;
    angle2 = (angle2- -720)%360;

    if(angle1 > angle2 && (angle1 < what || angle2 > what)) return true;
    if(angle1 < angle2 && angle1 < what && angle2 > what)   return true;
    return false;
}

function mergeArrays(arr1,arr2){
    if(typeof arr1 == 'undefined') arr1={};

    for(var e in arr2){
        if(typeof arr1[e] == 'undefined' || typeof arr1[e] == 'string' || typeof arr1[e] == 'number'){
            arr1[e] = arr2[e];
        }else{
            arr1[e] = mergeArrays(arr1[e],arr2[e]);
        }
    }
    return arr1;
}

function showAsSeconds(i){
    var min = parseInt(i/60);
    var sec = i - min*60;
    var html = '';
    if(min>0) html += min+' min ';
    return html+sec+' sec';
}

function makeRandomHash(Length){
    var L = Length || 10;
    var Hash='';
    var Chars = '0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    for(var i=0; i<L; ++i)
        Hash+=Chars.charAt(Math.random()*62);
    return Hash;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function Energy2Speed(Energy,Weight,Multiply){
    var W = (Weight/100)/Multiply;
    var Speed = Math.sqrt(Energy/W);
    return Speed;
}
function Speed2Energy(Speed,Weight,Multiply){
    var W = (Weight/100)/Multiply;
    var Energy = Speed*Speed*W;
    return Energy;
}
