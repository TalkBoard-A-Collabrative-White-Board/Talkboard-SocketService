class UserStore {
  private socketToUser = new Map<string, string>();
  private userToRoom = new Map<string, string>();

  set(socketId: string, userId: string, roomId: string) {
    this.socketToUser.set(socketId, userId);
    this.userToRoom.set(userId, roomId);
  }

  getUser(socketId: string) {
    return this.socketToUser.get(socketId);
  }

  getRoom(userId: string) {
    return this.userToRoom.get(userId);
  }

  remove(socketId: string) {
    const userId = this.socketToUser.get(socketId);

    if (!userId) return;

    this.socketToUser.delete(socketId);
    this.userToRoom.delete(userId);

    return userId;
  }
}

export const userStore = new UserStore();
