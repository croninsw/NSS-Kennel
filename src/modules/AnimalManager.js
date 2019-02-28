const remoteURL = "http://localhost:5002"

export default {
  get(id, desiredDatabase) {
    return fetch(`${remoteURL}/${desiredDatabase}/${id}`).then(e => e.json())
  },
  getAll(desiredDatabase) {
    return fetch(`${remoteURL}/${desiredDatabase}`).then(e => e.json())
  }
}