import { ReactNode } from "react";

interface ButtonProps {
  label: string; // this is the inheritance which is being passed from outside
}

export const Button = ({ label }: ButtonProps) => {
  // this is to tell the component, that it is connected with the interface ButtonProps and has access to the label inheritance
  return (
    <button className="bg-blue-500 text-gray-100 py-2.5 px-3 rounded-md cursor-pointer">
      {label}
      {/* the inheritance itself is being passed here. The information of the inheritance comes from outside, all the component does is rendering the inheritance */}
    </button>
  );
};

interface ButtonTwoProps {
  children: ReactNode; // ReactNode is not as strict as other types. All that ReactNode does is, to show that we're expecting Node Elements (like HTML tags or other React Components) as inheritance. The logic is the same
}

export function ButtonTwo({ children }: ButtonTwoProps) {
  return (
    <button className="bg-red-500 text-gray-100 py-2.5 px-3 rounded-md cursor-pointer">
      {children}
    </button>
  );
}
