import { Button } from "../ui/button";

const ButtonForm = () => {
  return (
    <div>
      <Button
        className=" border-2 hover:border-main-base hover:bg-main-background bg-main-base text-main-background hover:text-main-base transition-all duration-200"
        type="submit"
      >
        Submit
      </Button>
    </div>
  );
};
export default ButtonForm;
