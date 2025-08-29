/**
 * @description 房间管理
 */


export function getSignature (authorization: string) {
	return {
		authorization, // 用户token
		request_id: Date.now(), // 请求ID 幂等性使用
		signature: "", // 签名
		timestamp: + Date.now() // 毫秒级时间戳
	}
}

export function joinRoom (socket: any, { authorization, fileId }: { authorization: string, fileId: string }) {
	if (!socket) {
		return
	}
	console.log("joinRoom-zptest", {fileId, signature: getSignature(authorization)})
	socket.send(JSON.stringify({
		data: {
			context: getSignature(authorization),
			data: { room_id: fileId }
		},
		event: "JOIN_ROOM"
	}))

	if (socket.keepRoomInterval) {
		clearInterval(socket.keepRoomInterval)
		socket.keepRoomInterval = null
	}
	socket.keepRoomInterval = setInterval(() => {
		socket.send(JSON.stringify({
			data: {
				context: getSignature(authorization),
				data: {}
			},
			event: "KEEP_ROOM"
		}))
	}, 25 * 1000)
}


