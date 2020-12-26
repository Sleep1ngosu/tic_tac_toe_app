const users = []

const addUser = (username, id) => {
	const existingUser = users.find(
		(user) => user.roomID === id && user.username === username
	)
	if (existingUser) {
		return { error: 'Username is taken' }
	}

	const user = { username, roomID: id }

	users.push(user)

	return user
}

const removeUser = (username) => {
	const index = users.findIndex((user) => user.username === username)

	if (index !== -1) {
		return users.splice(index, 1)[0]
	}
}

const getUser = (username) => users.find((user) => user.username === username)

const getUsersInRoom = (roomID) =>
	users.filter((user) => user.roomID === roomID)

const isWinner = (array) => {
	let win = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	for (let i = 0; i < win.length; i++) {
		const [a, b, c] = win[i]
		if (array[a] && array[a] === array[b] && array[a] === array[c]) {
			return array[a]
		}
	}
	return null
}

const isDraw = (array) => {
	if (array.indexOf('') === -1) return true
	return false
}
module.exports = {
	addUser,
	getUsersInRoom,
	getUser,
	removeUser,
	isWinner,
	isDraw,
}
