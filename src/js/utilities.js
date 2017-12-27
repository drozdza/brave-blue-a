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
            if(typeof A[i][j] != 'undefined'){
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

function mergeObjects(A,B){
    for(var b in B){
        if(typeof B[b] === 'object'){
            if(typeof A[b] === 'undefined'){
                if(Array.isArray(B[b])) A[b] = [];
                        else            A[b] = {};
            }
            mergeObjects(A[b],B[b]);
        }else if(typeof B[b] === 'number'){
            if(typeof A[b] === 'undefined') A[b] = 0;
            A[b]-=-B[b];
        }else{
            A[b] = B[b];
        }
    }

    return A;
}


function showObject(obj,lvl1,lvl2,lvl3){
    var s='';
    for(var a in obj){
        if(obj[a] instanceof Object){
            s+=a+ ' :[';
            for(var b in obj[a]){
                if(obj[a][b] instanceof Object){
                    s+=b+ ' :[';
                    for(var c in obj[a][b]){
                        if(obj[a][b][c] instanceof Object){
                            s+=c+ ' :[';
                            for(var d in obj[a][b][c]){
                                s+=d+' : '+obj[a][b][c][d]+', ';
                            }
                            s+='], ';
                        }else s+=c+' : '+obj[a][b][c]+', ';
                        if(lvl3) s+='<br/>';
                    }
                    s+='], ';
                }else s+=b+' : '+obj[a][b]+', ';
                if(lvl2) s+='<br/>';
            }
            s+='], ';
        }else s+=a+' : '+obj[a]+', ';
        if(lvl1) s+='<br/>';
    }
    return s;
}

function showObjInTable(obj,lvls,lvl){
    lvl = lvl || 0;
    if(lvl > 7) return '';
    var html='';
    var rows = 0;

    for(var i in obj){
        if(typeof lvls[lvl] != 'undefined' && typeof lvls[lvl][i] != 'undefined' && lvls[lvl][i]=='noshow')
            continue;

        if(!rows==0 || lvl == 0) html += '<tr>';

        if(obj[i] instanceof Object){
            if(typeof lvls[lvl] != 'undefined' && typeof lvls[lvl][i] != 'undefined' && lvls[lvl][i]=='inline'){
                html+='<td class="nachos">'+i+'</td><td colspan="'+(10-lvl)+'">'+showObjInLine(obj[i])+'</td>';
                rows-=-1;
            }else{
                t = showObjInTable(obj[i], lvls, lvl+1);
                html+='<td rowspan="'+t.rows+'" class="tapas">'+i+'</td>'+t.html;
                rows+=t.rows;
            }

        }else{
            html+='<td class="nachos">'+i+'</td><td colspan="'+(10-lvl)+'">'+obj[i]+'</td></tr>'+"\n";
            rows-=-1;
        }
    }
    return {html:html,rows:rows};
}
function showObjInLine(obj){
    var html = '';
    for(var i in obj){
        if(obj[i] instanceof Object){
            html +=  i +':['+showObjInLine(obj[i])+'], ';
        }else{
            html += i +': '+obj[i]+', ';
        }
    }
    return html;
}

function ArrayShuffle(A1){
    var A2 = [];
    var Len = A1.length;
    while(Len > 0){
        var i = parseInt(Math.random()*Len);
        A2.push( A1[i] );
        A1[i] = A1[--Len];
    }
    A1 = A2;
    return A2;
}
