class OneauthService {
  constructor(url) {
    this.url = url
  }

  fetchUser () {
    return fetch(this.url + '/users/me?include=demographic', {
      credentials: 'include'
    })
      .then(resp => resp.json())
  }
  
  fetchColleges () {
    return fetch(this.url + '/colleges')
      .then(resp => resp.json())
  }
  
  fetchBranches () {
    return fetch(this.url + '/branches')
      .then(resp => resp.json())
  }
  
  updateUser (userParams) {
    return fetch(this.url + `/users/me/edit`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userParams)
    })
      .then(resp => resp.json())
  } 
}

export default new OneauthService('http://test.oneauth/api')
