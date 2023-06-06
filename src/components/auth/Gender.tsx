import { useState } from 'react';

type Props = {
  setGender: (data: string) => void,
}

const Gender = ({ setGender }: Props) => {
  const [activeTab, setActiveTab] = useState("erkak");

  function handleClick(data: string) {
    setActiveTab(data);
    setGender(data);
  }

  const data = [
    {
      label: "Erkak",
      value: "erkak",
    },
    {
      label: "Ayol",
      value: "ayol",
    },
  ];

  const genders = data.map(({ label, value }) => (
    <div
      key={value}
      onClick={() => handleClick(value)}
      className={`flex justify-center w-full  items-center border-2 text-sm rounded-lg ${activeTab === value ? "border-2 border-blue-500 " : ""}`}
    >
      {label}
    </div>
  ));

  return (
    <div className="gender w-full relative cursor-pointer  flex rounded-md ">
      {genders}
    </div>
  );
}

export default Gender;