var request = require('request');
var fs = require('fs');

let getToken = (auth) =>{
  // console.log(auth);
  return new Promise((resolve,reject)=>{ 
    // let Base64EncodedCredentials = Buffer.from(email+':'+password).toString('base64');
    request({
      url: `https://api.pepperi.com/v1.0/company/apitoken`,
      json: true,
      headers:{
        'Authorization':`Basic ${auth}`,
        'X-Pepperi-ConsumerKey':'LkOCYs3cYPGqnA22TyfNO8qfotJkEL5c'
      }
    },(error,response,body)=>{
      if(error)
       reject(error);
      //  console.log(body);
      resolve(body);
   });
  });
}

let authenticate = (req, res, next) => {
  console.log("HI from authentication");
  // console.log(req);
  // fs.appendFileSync('./response2.txt',JSON.stringify(req,undefined,2));
  // console.log(req);
  let auth = req.query.auth;
  getToken(auth).then(res=>{
    if (!res){
      return Promise.reject();
      console.log("HI from authentication error123");
    }
    req.token = Buffer.from('TokenAuth:'+res.APIToken).toString('base64');
    // console.log(req.token);
    console.log("HI from authentication success");
    next();
  }).catch(e=>{
    console.log(e);
    console.log("HI from authentication error");
    res.status(401).send();
  })
};

module.exports = {authenticate};
