export interface Posts {
    actived_at: string ,
    category: {
      id: string ,
      name: string,
      parent_id: string | null
    },
    content: string,
    id: number,
    img: string,
    likes: number,
    shortcontent: string,
    title: string,
    user_id?: string,
    name?: string
    link?: string
  }
