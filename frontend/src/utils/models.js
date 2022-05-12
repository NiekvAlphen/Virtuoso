export const createUser = async ({user_id, email, name, image, url}) => {
    try {
        const user  = {
            user_id: user_id, email: email, name: name, image: image, url: url
        }
        localStorage.setItem('user', JSON.stringify(user))
        return user
    } catch (error) {
        return
    }
}

export const getUser = async (user_id) => {
    
}

export const savePlaylist = async (user_id, name, tracks) => {

}

export const getPlaylists = async (user_id) => {
    let playlistList = []
}

export const getPlaylist = async (id) => {

}

export const deletePlaylist = async (id) => {
    
}