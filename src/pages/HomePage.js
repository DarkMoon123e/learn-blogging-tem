import Header from "modules/home/Header";
import Banner from "modules/home/Banner";
import TittlePostList from "modules/post/TittlePostList";
import PostList from "modules/post/PostList";
import { auth } from "../firebase/firebase-config";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <Header></Header>
      <Banner></Banner>
      <div className="container">
        <TittlePostList>Featured post</TittlePostList>
        <PostList></PostList>
        <div className="mb-10"></div>
        <TittlePostList>Newest post</TittlePostList>
        <PostList></PostList>
      </div>
    </div>
  );
};

export default HomePage;
