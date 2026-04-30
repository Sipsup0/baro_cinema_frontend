const BACKEND_URL = '/movies'

export async function addmovie(title,genre,duration,language,movieID) {
    const res = await fetch(`${BACKEND_URL}/addmovie`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({})
    })
    const data = await res.json()
    //console.log(data);
    return data
}

export async function deleteMovie(movieId) {
    const res = await fetch(`${BACKEND_URL}/deletemovie/${movieId}`, {
        method: 'DELETE'
    })

    const data = await res.json()
    return data
}

export async function all() {
    const res = await fetch(`${BACKEND_URL}/all`,{
        method:'GET',
        credentials:'include'
    })
    if (!res.ok) {
        const data = await res.json()
        return {error: data?.error}
    }
    return await res.json()
}


