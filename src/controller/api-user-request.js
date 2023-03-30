const { default: axios } = require('axios');


async function requestUsersSince(req,res){
    const {since}  = req.query;

    let url = ' https://api.github.com/users';
        
    if(since){
      url = url+'?since='+since;
    }

  const data = await axios.get(url)
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

  let url = 'https://api.github.com/users/' + username;

  const data = await axios.get(url)
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

  let url = 'https://api.github.com/users/' + username + '/repos'

  const data = await axios.get(url)
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