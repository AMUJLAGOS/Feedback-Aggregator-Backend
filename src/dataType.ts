// 

export type createUser = {
  figma_id: string,
  figma_email: string
  figma_handle: string
  figma_image: string
}

export type createFile = {
  figma_file_id: string
  figma_file_key: string
  figma_name: string
  user_email: string
}

export type createTask = {
  figma_id: string
  file_key: string
  figma_uuid: string
  message: string
  figma_order_id: string
  figma_createdOn: string
  board_name: string
  board_number: string
  user_id: string
  creator_img: string
  creator_name:string
}

export type getTasks = {
  user_figma_id: string
  figma_file_key : string
}

export type AddTag = {
  tag: string
  task_figma_id: string
  user_figma_id: string
}

export type CreateTodo = {
  todo: string
  task_id: string
  user_id: string
  file_id: string
  todo_id: string
}


export type Status = {
  task_id?: string
  todo_id?: string
  user_id: string
}