const OTPStatus = ({ value }) => {
  const isVerified = value === "verified";

  return (
    <div
      className={`rounded-full w-12 h-6 flex items-center justify-${
        isVerified ? "start" : "end"
      } p-1 bg-${isVerified ? "green" : "gray"}-300`}
    >
      <div className={`rounded-full w-4 h-4 bg-white`} />
    </div>
  );
};
export default OTPStatus;