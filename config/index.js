var myconfig=require("./config");
module.exports={
    getConnectionString:function(){
        return 'mongodb://'+myconfig.dbhost+'/'+myconfig.dbname;

    }
};
