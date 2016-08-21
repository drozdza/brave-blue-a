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
