import Button from "components/Button";
import React from "react";

const Banner = () => {
  return (
    <div className="p-5 bg-green-400">
      <div className="container flex items-center justify-center">
        <div className="flex flex-col gap-y-5">
          <h1 className="flex-1 text-3xl font-bold text-white">
            Monkey Blogging
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est omnis
            reprehenderit quibusdam corporis eum suscipit voluptatem repellat
            distinctio ipsam saepe possimus quas ratione maiores incidunt
            obcaecati exercitationem voluptas, at ipsa!
          </p>
          <div>
            <Button to="/manage">Get started</Button>
          </div>
        </div>
        <div className="w-[1000px]">
          <img src="/img-banner.png" alt="Banner" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
