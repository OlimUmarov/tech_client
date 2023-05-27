import {
    Tabs,
    TabsHeader,
    Tab,
} from "@material-tailwind/react";
import {useState} from 'react'
type Props = {
setGender: (data: string)=> void,
}

const Gender = ({setGender}: Props) => {
    const [activeTab, setActiveTab] = useState("erkak");

    function handleClick(data: string){
        setActiveTab(data)
        setGender(data)
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
        <Tab key={value} value={value} 
            onClick={() => handleClick(value)}
            className={`flex justify-center items-center bg-[#F5F7F9] text-sm border-2 border-[#F5F7F9] rounded-lg ${activeTab === value ? "border-2 border-[#01A0DA]" : ""}`}>
            {label}
        </Tab>
    ))

    return (

        <Tabs value="activeTab">
            <TabsHeader className="gender w-full  h-12 relative cursor-pointer">
                {genders}
            </TabsHeader>
        </Tabs>
    );
}

export default Gender
