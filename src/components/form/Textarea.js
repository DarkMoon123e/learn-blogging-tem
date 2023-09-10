import { useController } from "react-hook-form";

const Textarea = ({ type = "text", id, control, name, ...props }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div className="relative">
      <textarea
        id={id}
        className="w-[500px] h-[200px] border rounded-lg border-slate-100 p-4 font-medium pr-10 resize-none"
        {...props}
        {...field}
      />
    </div>
  );
};

export default Textarea;
