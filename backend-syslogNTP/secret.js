const secrets = {
    dbUri: "mongodb+srv://admin-cisco:admin-cisco@syslogntp-ajh8a.mongodb.net/test?retryWrites=true&w=majority"
  };
  
  const getSecret = key => secrets[key];
  
  module.exports = getSecret;