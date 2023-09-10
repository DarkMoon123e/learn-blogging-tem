import Header from "modules/home/Header";
import Banner from "modules/home/Banner";
import TittlePostList from "modules/post/TittlePostList";
import PostList from "modules/post/PostList";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Monkey blogging";
  }, []);
  return (
    <div className="flex flex-col gap-y-3">
      <Header></Header>
      <Banner></Banner>
      <div className="container">
        <TittlePostList>Hot post</TittlePostList>
        <PostList type="hot"></PostList>
        <div className="mb-10"></div>
        <TittlePostList>Approved post</TittlePostList>
        <PostList type="approved"></PostList>
      </div>
    </div>
  );
};

export default HomePage;
