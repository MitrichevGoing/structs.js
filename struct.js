/**
  *version : 0.5
  *注重简化处理对象及结构常规性问题
  *author: JohnHarvy
*/
var struct = (function(){

  this.dataPocket = {}; //保存strut对象收纳的值

//对未知数量具有相同属性的对象数组按照属性分组
this.getTeamsBy = function(arr,pro){ 
    //如果arr不是对象组成的数组,属性不是共有属性
    for(var _x_y = 0 ; _x_y < arr.length; _x_y++){
      if(typeof(arr[_x_y]) != "object" ){
         console.error("数组参数格式错误！");
         return;
      } 

      if(arr[_x_y][pro] === undefined){
         console.error("该属性非公共属性！");
         return;
      }
    }
    var temp = [];
    var i = 0;

    function do1(arr){
       var stand = arr[0][pro]; //基数组第一个设为标准
       temp[i] = [];  //用来存放找到的一组数据
       var indexs =[]; //存放属性值相同的元素
       for (var k = 0;k < arr.length; k++ ){
           if( arr[k][pro] === stand){
            temp[i].push(arr[k]);
            indexs.push(arr[k]);
         }
       }
   (function(){
       for( var j = 0; j< indexs.length; j++){
              arr.pull(indexs[j]); //基数组删除已排列好的元素
          }
       })();
    }

   while(arr.length > 0){ //数组不为空
        do1(arr);
        i++;
    }
     return temp;
}

// pull can relize delete any element of  an array and Maintain element order
Array.prototype.pull = pull;
function pull(item){
    var a = [];
    a = this;
    var that = this;
    var temp;
    var index;
     (function(){
        for( var z = 0; z < that.length;z++ ){
           if(that[z] === item){
                a[z] = temp;
                a[z] = a[0];
                a[0] = temp;
                index = z;
                z = that.length;
             }
        }
     })();
     a.shift();       
     (function(){
        if(index == 0) return;
        temp = a[index-1];
        for( var y = index-1;y > 0; y--){
              a[y] = a[y -1];
        }
        a[0] = temp;
     })();
     return a; 
}

   /*可以吃掉其他对象成长自己，并支持链式调用*/
   this.contact = function(ob){
            if(typeof(ob) != "object"){
              console.error("参数必须是对象！");
              return;
            } 
            for(var x in ob){
                this.dataPocket[x] = ob[x];
            }
            return this;
        } 

    /*叉树数据结构平面化查找处理,返回层次位置，所在层序列位置，值重复时的序列位置*/
    this.deriveFind2D = function(ob,item){
        var Teams = [];
        var i = 0;
        Teams[i] =[];

        function examOb(obArr){ //检查某列数组中是否有下续对象
           for(var x in obArr){
             if(typeof(obArr[x]) == "object"){
                return true;
               }
            }
           return false;
        }
           //第一列集合
        (function(){
          for( var x in ob){
           Teams[0].push(ob[x]);
          }
        })();  

        while(examOb(Teams[i])){
          var _a = i+1;
          Teams[_a] = [];
         
        (function(){
             for(var x in Teams[i]){ //每层数组中检索
              if(typeof(Teams[i][x]) == "object"){
               for(var y in Teams[i][x]){  //每层数组中每个元素的属性
                Teams[_a].push(Teams[i][x][y]);
                 }
               }
              }
          })();

          i++;
        }
        var totalIndexs = [];
        var _index = -1; //计数器
           //记录位置
           (function(){
            console.log(Teams[1]);
             for(var i = 0; i< Teams.length;i++){
                  for(var y = 0; y < Teams[i].length; y++){
                    if(JSON.stringify(Teams[i][y]) === JSON.stringify(item)){
                      _index++;
                      totalIndexs.push({level:i,levelIndex:y,order:_index});
                    }
                  }
             }
           })();

         if(totalIndexs.length >0) return totalIndexs;
         else return _index;
 }    

  return this;
    }).call({});

if (typeof module != "undefined" && module !== null && module.exports) module.exports = struct;
else if (typeof define === "function" && define.amd) define(function() {return struct});

