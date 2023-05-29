import { Posts } from "../../types/posts";
import { AiOutlineLike } from "react-icons/ai";
import { MdVisibility } from "react-icons/md";
import moment from "moment";

export const ArticleCard = (props: Posts) => {
  function formatDate(date: string) {
    return moment(date).format("DD MMM YYYY");
  }

  return (
    <div className="post-item max-lg:w-1/2 max-md:w-1/3 cursor-pointer ">

      <section className="post-item__content">
        <body className="lg:h-32">
          <h1 className="post-item__title ">{props.title}</h1>
          <div className="post-item__desc">
            <p>{props.shortcontent}</p>
          </div>
        </body>

        <footer className="pt-4 flex gap-2 post-item__desc">
          <span className="post-item__desc post ">design</span>
          <div className="flex justify-center items-center gap-1">
            <MdVisibility size={18} color="#7CA9C2" />
            <span className="post-item__btn">{props.user_id}</span>
          </div>

          <span className="post-item__btn flex items-center">
            {formatDate(props.actived_at)}
          </span>
    
          {/* <div className="flex justify-center items-center gap-1">
            <AiOutlineLike size={18} color="#7CA9C2" />
            <span className="post-item__btn">{props.likes}</span>
          </div> */}
         
        </footer>
      </section>

      <section
        color="blue-gray"
        className="post-item__img "
      >
        <img
          src={`http://tech.nextlevelgroup.uz/${props.img}`}
          alt="img"
          className="rounded-2xl "
        />
      </section>
    </div>
  );
};
