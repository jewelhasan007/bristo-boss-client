import chefService from "../../../assets/home/chef-service.jpg";

const ChefService = () => {
  return (
    <div className="my-3 relative ">
      <img src={chefService} alt="" />
      <div className="absolute top-1/2 p-5 m-4 ">
        <h1 className=" bg-white text-center uppercase px-3 ">Bistro Boss</h1>
        <h3 className=" bg-white text-center px-3 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus, libero accusamus laborum deserunt ratione dolor
          officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
          nihil iusto ducimus incidunt quibusdam nemo.
        </h3>
      </div>
    </div>
  );
};

export default ChefService;
