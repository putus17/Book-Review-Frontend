export type RegisterType = {
  username: string
  email: string
  passwordHash: string
  
}

export type UserType = {
  _id: string
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
}

export type RegisterResponse = {
  data: UserType
  token: string
}

export type LoginType = {
  name: string
  passwordHash: string
}

export type LoginResponse = {
  message: string
  token: string
}

export type GetUsersResponse = {
  data: UserType[]
}

export type UserUpdateType = {
  userId?: string
  username?: string
  email?: string
  bio?: string
  avatarUrl?: string
}

export type UpdateUsersResponse = {
  message: string
  data: EventType
}
export type UserFormValues = {
  username?: string
  email?: string
  bio?: string
  avatar?: FileList 
  _id?: string

}


export type BookPayload = {
  title: string
  author: string
  description: string
  genre: string[]
  publishedYear: Date
}


export type BookType = {
  _id: string;
  title: string;
  author: string;
  description: string;
  genre: string[]; // e.g. ["Fiction", "Mystery"]
  publishedYear: Date;
  createdBy: Types.ObjectId; // FK -> User.id
}
export type CreateBookResponse = {
  data: BookType
  message: string
}

export type GetBooksResponse = {
  data: TodoType[]
}

export type UpdateBooksResponse = {
  message: string
  data: EventType
}

export type BookUpdateType = {
  bookId?: string
  title?: string
  author?: string
  description?: string
  genre?: string[]
  publishedYear?: Date
}

export type BookFormValues = {
  title: string
  author: string
  description: string
  genre: string[]
  publishedYear: Date
  _id?: string
}