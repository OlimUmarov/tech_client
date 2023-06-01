import { useEffect, useState } from "react";
import ReactiveButton from 'reactive-button';
import { useAppSelector } from "../../app/hook";

type Props = {
    title: string
    onClick?: ()=> void
}

export const LoadingButton: React.FC<Props> = ({title,onClick}) => {
    const [state, setState] = useState('idle');
    const { isLoading } = useAppSelector((state) => state.contentSlice);

    const loadingConditions = ()=> {
        if(isLoading === "loading"){
            setState('loading')
        }
        if(isLoading === "success"){
            setState("success")
        }
        else{
            setState('idle')
        }
    }

    useEffect(()=> {
        loadingConditions()
      },[isLoading])

    return (
        <ReactiveButton
            buttonState={state}
            idleText={title}
            disabled={state === "loading"}
            color={'blue'}
            rounded={false}
            onClick={onClick}
        />
    );
}

