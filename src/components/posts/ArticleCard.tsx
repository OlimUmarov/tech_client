import { Posts } from "../../types/posts";
import { MdVisibility } from "react-icons/md";
import { formatDate } from "./formatDate";

export const ArticleCard = (props: Posts,) => {

  return (
    <div 
    className="relative post-item flex max-md:flex-col max-lg:w-full max-md:w-full max-sm:w-full cursor-pointer "
    >

      <div className="post-item__content">
        <section className="lg:h-32">
          <h1 className="post-item__title ">{props.title}</h1>
          <div className="post-item__desc">
            <p>{props.shortcontent}</p>
          </div>
        </section>

        <section className="pt-4 flex gap-2 post-item__desc">
          <span className="post-item__desc post ">design</span>
          <div className="flex justify-center items-center gap-1">
            <MdVisibility size={18} color="#7CA9C2" />
            <span className="post-item__btn">{props.user_id}</span>
          </div>

          <span className="post-item__btn flex items-center">
            {formatDate(props.actived_at)}
          </span>
        </section>
      </div>

      <section
        color="blue-gray"
        className="post-item__img"
      >
        <img
          src={`http://tech.nextlevelgroup.uz/${props.img}`}
          alt="img"
          className="rounded-2xl"
        />
      </section>
    </div>
  );
};
