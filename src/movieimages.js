const BACKEND_URL = '/movieimage'

export async function uploadMovieImage(movieID, movieimg) {
    const formData = new FormData()
    formData.append("image", movieimg)

    const res = await fetch(`${BACKEND_URL}/${movieID}`, {
        method: "POST",
        body: formData
    })

    if (!res.ok) {
        throw new Error("Hiba a feltöltésnél")
    }

    return await res.json()
}