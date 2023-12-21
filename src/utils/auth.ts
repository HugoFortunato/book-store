type User = {
  username: string
  password: string
}

const mockUsers: User[] = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
]

export const authenticate = (username: string, password: string): boolean => {
  const user = mockUsers.find(
    (u) => u.username === username && u.password === password,
  )

  return !!user
}
