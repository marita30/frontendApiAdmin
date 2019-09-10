var axios = require('axios')
let apiHost = 'http://' + (process.env.API_HOST || 'localhost') + ':4000'

module.exports = {
  authenticateUser: function(email, password) {
    let body = {
      auth: {
	          	email: email,
		          password: password
	}
    }

    return axios.post(apiHost + '/user_token', body)
    .then(function (response){
      return response.body.jwt
    })
    .catch(function (error){
      return undefined
    })
  },

  getCurrentUser: function(jwt) {
    var config = {
      headers: {}
    }
    if (jwt) {
      config['headers']['Authorization'] = 'Bearer' + jwt
    }

    return axios.get(apiHost + '/current_user/details', config)
    .then(function(response){
      return response.body
    })
    .catch(function (error){
      return undefined
    })
  }
}
