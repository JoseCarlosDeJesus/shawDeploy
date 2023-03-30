const { Octokit} = require("octokit");

const TOKEN = "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"

const octokit = new Octokit({ auth: TOKEN });

async function requestUsersSince(req,res){
    const {since}  = req.query;

    let url = 'GET /users';
        
    if(since){
      url = url+'?since='+since;
    }

  const data = await octokit.request(url, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  .then((response)=>{
    let listUsers = response.data;
  
    let nextPage = listUsers[listUsers.length-1]
    nextPage= nextPage.id

    let out = {
        nextPage : nextPage,
        users : response.data
    }
    
    return res.status(200).send(out);
  })
  .catch((error)=>{
    console.log(error);
    return res.status(403).json(error)
  })

  return data;
}



async function usernameDetails(req,res){
  const { username } = req.params;

  let url = 'GET /users/' + username;

  const data = await octokit.request(url, {
    username: username,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  .then((response)=>{        
    let out = { userDetails : response.data }

    return res.status(200).json(out);
  })
  .catch((error)=>{
    if(error.code === 'ERR_BAD_REQUEST'){
        return res.status(404).json({message:'User not found'});
    }
    return res.status(500).json(error);
  })

  return data;
}

async function userRepos(req,res){
  const { username } = req.params;

  let url = 'GET /users/' + username + '/repos';

  const data = await octokit.request(url, {
    username: username,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  .then((response)=>{        

    let out = {
        userDetails : response.data
    }

    return res.status(200).json(out);
  }).catch((error)=>{
    if(error.code === 'ERR_BAD_REQUEST'){
        return res.status(404).json({message:'User not found'});
    }
    return res.status(500).json(error);
  })

  return data;
}

module.exports = {requestUsersSince, usernameDetails, userRepos};