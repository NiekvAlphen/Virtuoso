export const createUser = async (data) => {
    try {
        fetch('http://127.0.0.1:80/api/users', {method: 'POST', body: data,mode: 'cors'})
        .then(response => {
          console.log(response)
          if(response.status === 201){
            (response.json()).then((data) => {
              //this.setState({songs: data['songs']})
              console.log(data)
              return true
            })
          } else {
            (response.json()).then(() => {
              //this.setState({songs: 'error'})
              return false
            })
          }
        }).catch((error) => {
            console.log("Error in fetching.", error)
            return false
        })
    } catch (error) {
        return error
    }
}

export const getUser = async (id) => {
    try {
        fetch('http://127.0.0.1:80/api/users/'+id.toString(), {method: 'GET',mode: 'cors'})
        .then(response => {
          console.log(response)
          if(response.status === 201){
            (response.json()).then((data) => {
              //this.setState({songs: data['songs']})
              console.log(data)
              return data
            })
          } else {
            (response.json()).then(() => {
              //this.setState({songs: 'error'})
              return null
            })
          }
        }).catch((error) => {
            console.log("Error in fetching.", error)
            return error
        })
    } catch (error) {
        return error
    }
}

export const deleteUser = async (id) => {
  try {
      fetch('http://127.0.0.1:80/api/users/'+id.toString(), {method: 'DELETE',mode: 'cors'})
      .then(response => {
        console.log(response)
        if(response.status === 201){
          (response.json()).then((data) => {
            //this.setState({songs: data['songs']})
            console.log(data)
            return true
          })
        } else {
          (response.json()).then(() => {
            //this.setState({songs: 'error'})
            return false
          })
        }
      }).catch((error) => {
          console.log("Error in fetching.", error)
          return false
      })
  } catch (error) {
      return error
  }
}

export const searchSong = async (term) => {
    return fetch('http://127.0.0.1:80/api/songs/search/'+term.toString(), {method: 'GET',mode: 'cors'})
        .then(response => { 
          console.log(response)
          return response.json()
        }).catch((error) => {
            console.log("Error in fetching.", error)
            return error
        })
}

export const savePlaylist = async (data) => {
  console.log(data)
    try {
        fetch('http://127.0.0.1:80/api/playlists', {method: 'POST', body: data,mode: 'cors'})
        .then(response => {
          console.log(response)
          if(response.status === 201){
            (response.json()).then((data) => {
              //this.setState({songs: data['songs']})
              console.log(data)
              return data
            })
          } else {
            (response.json()).then(() => {
              //this.setState({songs: 'error'})
              return null
            })
          }
        }).catch((error) => {
            console.log("Error in fetching.", error)
            return false
        })
    } catch (error) {
        return error
    }
}

export const getSong = async (id) => {
  return fetch('http://127.0.0.1:80/api/songs/'+id.toString(), {method: 'GET',mode: 'cors'})
        .then(response => {
          console.log(response)
          return response.json()
        }).catch((error) => {
            console.log("Error in fetching.", error)
            return error
        })
}

export const getPlaylists = async (user_id) => {
      return fetch('http://127.0.0.1:80/api/playlists/search/'+user_id.toString(), {method: 'GET',mode: 'cors'})
        .then(response => {
          console.log(response)
          return response.json()
        }).catch((error) => {
            console.log("Error in fetching.", error)
            return error
        })
}

export const getPlaylist = async (id) => {
    try {
        fetch('http://127.0.0.1:80/api/playlists/'+id.toString(), {method: 'GET',mode: 'cors'})
        .then(response => {
          console.log(response)
          if(response.status === 201){
            (response.json()).then((data) => {
              //this.setState({songs: data['songs']})
              console.log(data)
              return data
            })
          } else {
            (response.json()).then(() => {
              //this.setState({songs: 'error'})
              return null
            })
          }
        }).catch((error) => {
            console.log("Error in fetching.", error)
            return error
        })
    } catch (error) {
        return error
    }
}

export const deletePlaylist = async (id) => {
    try {
        fetch('http://127.0.0.1:80/api/playlists/'+id.toString(), {method: 'DELETE',mode: 'cors'})
        .then(response => {
          console.log(response)
          if(response.status === 201){
            (response.json()).then((data) => {
              //this.setState({songs: data['songs']})
              console.log(data)
            })
          } else {
            (response.json()).then(() => {
              //this.setState({songs: 'error'})
              return null
            })
          }
        }).catch((error) => {
            console.log("Error in fetching.", error)
            return error
        })
    } catch (error) {
        return error
    }
}