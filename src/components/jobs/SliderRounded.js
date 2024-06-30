const SliderRounded = ({ value }) => {
  const isActive = value === "activated";

  return (
    <div
      className={`rounded-full w-12 h-6 flex items-center justify-${
        isActive ? "start" : "end"
      } p-1 bg-${isActive ? "green" : "gray"}-300`}
    >
      <div className={`rounded-full w-4 h-4 bg-white`} />
    </div>
  );
};

export default SliderRounded;