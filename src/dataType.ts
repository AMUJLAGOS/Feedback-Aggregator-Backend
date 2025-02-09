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

export type createComment = {
  figma_id: string
  file_key: string
  figma_uuid: string
  comment: string
  figma_order_id: string
  createdOn: string
  board_name: string
  board_number: string
}