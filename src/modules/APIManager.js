import Settings from "./Settings"

export default Object.create(null, {
    get: {
        value: function(id) {
            return fetch(`${Settings.remoteURL}/${this.desiredDatabase}/${id}`)
            .then(e => e.json())
        }
    },
    getAll: {
        value: function() {
            return fetch(`${Settings.remoteURL}/${this.desiredDatabase}`)
            .then(e => e.json())
        }
    },
    removeAndList: {
        value: function(id) {
            return fetch(`${Settings.remoteURL}/${this.desiredDatabase}/${id}`, {
                method: "DELETE"
            })
            .then(e => e.json())
            .then(() => fetch(`${Settings.remoteURL}/${this.desiredDatabase}`))
            .then(e => e.json())
        }
    },
    post: {
        value: function(obj) {
            return fetch(`${Settings.remoteURL}/${this.desiredDatabase}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            .then(e => e.json())
        }
    },
    put: {
        value: function(obj) {
            return fetch(`${Settings.remoteURL}/${this.desiredDatabase}/${obj.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            .then(e => e.json())
        }
    }
})