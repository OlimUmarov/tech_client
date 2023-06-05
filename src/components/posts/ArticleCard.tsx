import { Posts } from "../../types/posts";
import { formatDate } from "./formatDate";
import { BiLike } from 'react-icons/bi'
import { MdVisibility } from "react-icons/md";

export const ArticleCard = (props: Posts) => {

  return (

        <div className="relative post-item flex max-sm:flex-col max-sm:w-[250px] max-lg:w-[500px] cursor-pointer m-auto">
          <div className="post-item__content ">
            
            <section className="lg:h-30">
              <h1 className="post-item__title max-sm:mb-2">{props.title}</h1>
              <div className="post-item__short max-sm:truncate  mb-4">
                <p>{props.shortcontent}</p>
              </div>
            </section>

            <section className="flex gap-2 post-item__desc pad flex-wrap">
              <span className="post-item__desc post ">{props.name}</span>
              <div className="flex justify-center items-center gap-1 h-5">
                <MdVisibility size={18} color="#7CA9C2" />
                <span className="post-item__btn">{props.views}</span>
              </div>
              <div className="flex justify-center items-center gap-1 h-5">
                <BiLike size={18} color="#7CA9C2" />
                <span className="post-item__btn">{props.likes}</span>
              </div>

              <span className="post-item__btn flex items-center h-5">
                {formatDate(props.actived_at)}
              </span>
            </section>
          </div>

          <section color="blue-gray" className="post-item__img ">
            <img
              src={`http://tech.nextlevelgroup.uz/${props.img}`}
              alt="img"
              className="rounded-2xl max-md:w-40 object-cover max-md:h-28 max-lg:w-40 max-lg:h-28 max-xl:w-48 max-xl:h-30 max-sm:w-96 max-sm:h-44"
            />
          </section>
        </div>
  );
};
