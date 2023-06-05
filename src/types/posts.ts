export interface Posts {
    actived_at: string ,
    category: {
      id: string ,
      name: string,
      parent_id: string | null
    },
    category_id?: string | number
    content: string,
    id: number,
    img: string,
    likes: number,
    shortcontent: string,
    title: string,
    user_id?: string,
    name?: string,
    link?: string,
    views?:string,
  }
  export type orderByType = 'created_at' | 'likes' | 'views'

  export type catListType = {
    id: number,
    name: string,
    parent_id: string | null
  }

  export type likesListType = {
    post_id: number | string,
    liked: boolean
  }

