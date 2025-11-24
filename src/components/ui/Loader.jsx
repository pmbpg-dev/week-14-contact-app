import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <ThreeDots
      visible={true}
      height={"30"}
      width={"30"}
      color="#fff"
      radius={"9"}
      ariaLabel="three-dots-loading"
    />
  );
}

export default Loader;
