import { Posts } from "../../types/posts";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "./formatDate";
import { MdVisibility } from "react-icons/md";

export const PostCard = (props: Posts) => {
  const navigate = useNavigate();

  function linkToPost() {
    navigate(`/post/${props.id}`);
  }

  return (
    <div
      className="card w-72 flex flex-col cursor-pointer"
    >
      <section className="w-72 h-48">
        <img
          src={`http://tech.nextlevelgroup.uz/${props.img}`}
          onClick={linkToPost}
          alt="img"
          className="rounded-xl object-cover w-full h-full hover:rounded-3xl transition-all duration-300 ease-in-out"
        />
      </section>

      <section className="pt-4 flex gap-2 post-item__desc">
        <Link to={`/categories/${props.category}`}
        className="post-item__desc post hover:scale-105 transition-all duration-100 ease-in-out">
          <span>{props.name}</span>
        </Link>
        <div className="flex justify-center items-center gap-1">
          <MdVisibility size={18} color="#7CA9C2" />
          <span className="post-item__btn">{props.views}</span>
        </div>

        <span className="post-item__btn flex items-center">
          {formatDate(props.actived_at)}
        </span>
      </section>

      <section className="pt-4  ">
        <h1
          onClick={linkToPost}
          className="lg:text-xl lg:font-medium  hover:text-blue-500 transition-all duration-300 ease-in-out"
        >
          {props.title}
        </h1>
      </section>
    </div>
  );
};
